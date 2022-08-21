<?php
use SDK\SDK;
use SDK\Models\QuoteRequest;
use SDK\Models\Package;
use SDK\Models\Origin;
use SDK\Models\Destination;
use SDK\Models\Config;
use SDK\Core\Client\API;
use SDK\Client\People;

class Quote
{

    public function enqueue_scripts()
    {
        wp_enqueue_script('wpfc-cota-facil', plugins_url('assets/js/fclick-simulator.js', plugin_dir_path(__FILE__)), array('jquery'), null, true);
        wp_enqueue_script('jquery.mask', plugins_url('assets/js/jquery.mask.min.js', plugin_dir_path(__FILE__)), array('jquery'), null, true);
        wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
        
        wp_enqueue_style('fclick-grid', plugins_url('assets/css/fclick-grid.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style('fclick-simulator', plugins_url('assets/css/fclick-simulator.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style('fclick-modal', plugins_url('assets/css/fclick-modal.css', plugin_dir_path(__FILE__)));


        wp_localize_script('wpfc-cota-facil', 'ajax_cotafacil', array(
            'url' => admin_url("admin-ajax.php"),
            'options' => self::get_category()
        ));
    }

    public static function get_category()
    {
        $product_category = array (
            'Categorias do produto',
            'Bebidas',
            'Vidro',
            'Outros'
        );

        return json_encode( $product_category );
    }

    public static function create_quote_page()
    {
        $html = file_get_contents( FCLICK_QUOTE_PATH . 'assets/templates/fclick-quote.php' );

        return $html;
    }

    public static function add_error($message, bool $success = false)
    {
        $data = array(
            'error' => array (
                'message' => $message
            ),
            'success' => $success
        );

        return wp_send_json(json_encode( $data ));

    } 

    public static function get_quotes()
    {

        $quote_request = new QuoteRequest();

        $config = new Config;
        $config->setQuoteType('full');
        $config->setOrder('total');
        $config->setNoRetrieve(true);
        $config->setDenyCarriers(null);
        $config->setDomain('expressogp.freteclick.com.br');
        $quote_request->setConfig($config);

        if(!empty($_POST['cep_retriver'])){
            $retriver_address = self::get_address($_POST['cep_retriver']);

            if($retriver_address === null){
                self::add_error('Não foi possível localizar o endereço informado, por favor tente novamente!', false);
            }

        }else{
            self::add_error('Endereco de coleta incorreto!', false);
        }

        if(!empty($_POST['cep_delivery'])){
            $delivery_address = self::get_address($_POST['cep_delivery']);
            
            if($delivery_address === null){
                self::add_error('Não foi possível localizar o endereço informado, por favor tente novamente!', false);
            }

        }else{
            self::add_error('Endereco de entrega incorreto!', false);
        }

        if(empty($_POST['custumer-name'])){
            self::add_error('Informe seu nome completo!');
        }

        if(empty($_POST['custumer-email'])){
            self::add_error('Informe seu melhor e-mail!');
        }

        if(empty($_POST['custumer-phone'])){
            self::add_error('Informe seu telefone');
        }

        $contact = array(
            'name' => $_POST['custumer-name'],
            'email' => $_POST['custumer-email'],
            'phone' => self::format_number( $_POST['custumer-phone'] )
        );

        $quote_request->setContact($contact);

        $origin = new Origin;			
        $origin->setCity($retriver_address['city']);
        $origin->setState($retriver_address['state']);
        $origin->setCountry($retriver_address['country']);
        $quote_request->setOrigin($origin);

        $destination = new Destination();			
        $destination->setCity($delivery_address['city']);
        $destination->setState($delivery_address['state']);
        $destination->setCountry($delivery_address['country']);
        $quote_request->setDestination($destination); 


        if(empty($_POST['product-quantity'])){
            self::add_error('Informe a quantidade de produtos!', false);
        }
        if(empty($_POST['product-weight'])){
            self::add_error('Informe o peso do produto!', false);
        }
        if(empty($_POST['product-height'])){
            self::add_error('Informe a altura do produto!', false);
        }
        if(empty($_POST['product-width'])){
            self::add_error('Informe a largura do produto!', false);
        }
        if(empty($_POST['product-depth'])){
            self::add_error('Informe a profundidade do produto!', false);
        }
        if(empty($_POST['product-type'])){
            self::add_error('Você deve informar o tipo de produto!', false);
        }
        if(empty($_POST['product-invoice-total'])){
            self::add_error('Você deve informar o valor do produto!', false);
        }

        $package = new Package();
        $package->setQuantity($_POST['product-quantity']);
        $package->setWeight(self::format_number( $_POST['product-weight'] ) / 1000);
        $package->setHeight(self::format_number( $_POST['product-height'] ) / 100);  // /100
        $package->setWidth(self::format_number( $_POST['product-width'] ) / 100);  // /100
        $package->setDepth(self::format_number( $_POST['product-depth'] ) /100 );  // /100
        $package->setProductType($_POST['product-type']);
        $package->setProductPrice(self::format_number( $_POST['product-invoice-total'] ));					
        $quote_request->addPackage($package);	
	

        $SDK = new SDK('242c5d6f05fd292bc91fd67170dc5a04');
        $cotafacil = $SDK->cotaFacilClient();			
        $array_resp = $cotafacil::quote($quote_request);		
		
		wp_send_json( $array_resp );
        wp_die();

    }

    public static function format_number($data)
	{
		return preg_replace("/[^0-9]/", "", $data);
	}

    public static function get_address($data)
	{

		$cep = self::format_number($data);

		$url_api = "https://api.freteclick.com.br/cep_address/$cep";

		$headers = array(         
			'Accept:application/ld+json',
			'Content-Type:application/json',
			'api-token: 242c5d6f05fd292bc91fd67170dc5a04'
		);

		$ch = curl_init();
	
		curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch, CURLOPT_URL, $url_api);
	
		$request =  json_decode(curl_exec($ch), true);
	
		curl_close($ch); 
		
		if($request['@type'] === "hydra:Error"){
			return null;
		}

		return $request;
			
	}

}
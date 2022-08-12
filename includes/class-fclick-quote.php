<?php
use SDK\SDK;
use SDK\Models\QuoteRequest;
use SDK\Models\Package;
use SDK\Models\Origin;
use SDK\Models\Destination;
use SDK\Models\Config;

class Quote
{

    public function enqueue_scripts()
    {
        wp_enqueue_script('wpfc-cota-facil', plugins_url('assets/js/fclick-simulator.js', plugin_dir_path(__FILE__)), array('jquery'), null, true);
        wp_enqueue_style('fclick-grid', plugins_url('assets/css/fclick-grid.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style('fclick-simulator', plugins_url('assets/css/fclick-simulator.css', plugin_dir_path(__FILE__)));

        wp_localize_script('wpfc-cota-facil', 'ajax_cotafacil', array(
            'url' => admin_url("admin-ajax.php"),
            'options' => self::get_category(),
        ));
    }

    public static function get_category()
    {
        $product_category = [
            'Categorias do produto',
            'Bebidas',
            'Vidro',
            'Outros'
        ];

        return json_encode( $product_category );
    }

    public static function create_quote_page()
    {
        $html = file_get_contents( FCLICK_QUOTE_PATH . 'assets/templates/fclick-quote.php' );

        return $html;
    }

    public static function get_quotes()
    {
        $quote_request = new QuoteRequest();

        $org = self::get_address($_POST['cepcollect']);

        //echo $org['city'];
    
        $origin = new Origin;			
        $origin->setCity($org['city']);
        $origin->setState($org['state']);
        $origin->setCountry($org['country']);
        $quote_request->setOrigin($origin);


        $config = new Config;
        $config->setQuoteType('full');
        $config->setOrder('total');
        $config->setNoRetrieve(true);
        $config->setDenyCarriers(null);
        $quote_request->setConfig($config); 
        

        $dest = self::get_address($_POST['cepcollect']);

        $destination = new Destination();			
        $destination->setCity($dest['city']);
        $destination->setState($dest['state']);
        $destination->setCountry($dest['country']);
        $quote_request->setDestination($destination);

        $package = new Package();
        $package->setQuantity(1);
        $package->setWeight(20);
        $package->setHeight(30 / 100);  // /100
        $package->setWidth(40 / 100);  // /100
        $package->setDepth(50 /100 );  // /100
        $package->setProductType(50);
        $package->setProductPrice(50);					
        $quote_request->addPackage($package);	

			
        $SDK = new SDK('242c5d6f05fd292bc91fd67170dc5a04');
        $cotafacil = $SDK->cotaFacilClient();			
        $array_resp = $cotafacil::quote($quote_request);		
		
		wp_send_json($array_resp );
        wp_die();

    }

    public static function format_cep($data)
	{
		return preg_replace("/[^0-9]/", "", $data);
	}

    public static function get_address($data)
	{

		$cep = self::format_cep($data);

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
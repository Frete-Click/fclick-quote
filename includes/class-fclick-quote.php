<?php

class Quote
{

    public function enqueue_scripts()
    {
        wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
        wp_enqueue_script('freteclick-api',  plugins_url('assets/js/fclick-api.js', plugin_dir_path(__FILE__) ));
        wp_enqueue_script('fclick-popup', plugins_url('assets/js/fclick-popup.js', plugin_dir_path(__FILE__)));
        wp_enqueue_script('wpfc-cota-facil', plugins_url('assets/js/fclick-simulator.js', plugin_dir_path(__FILE__)), array('jquery'), null, true);
        wp_enqueue_script('jquery.mask', plugins_url('assets/js/jquery.mask.min.js', plugin_dir_path(__FILE__)), array('jquery'), null, true);
        
        wp_enqueue_style('fclick-simulator', plugins_url('assets/css/fclick-simulator.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style('fclick-modal', plugins_url('assets/css/fclick-modal.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style('fclick-popup', plugins_url('assets/css/fclick-popup.css', plugin_dir_path(__FILE__)));
        wp_enqueue_style( 'dashicons' );


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

    public static function create_modal()
    {
        $html = file_get_contents( FCLICK_QUOTE_PATH . 'assets/templates/modal.php');
        
        echo $html;
    }

    public static function create_popup()
    {
        $html = file_get_contents( FCLICK_QUOTE_PATH . 'assets/templates/popup.php');
        
        echo $html;
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



    public static function format_number($data)
	{
		return preg_replace("/[^0-9]/", "", $data);
	}

}

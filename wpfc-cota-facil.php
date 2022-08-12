<?php
/**
 * Plugin Name:			Cota Fácil - Cotação de Fretes On-line
 * Description:			Cotação de Fretes On-line! Shortcode [wpfc-cota-facil]
 * Version:				1.0.0
 * Author:				Frete Click
 * Author URI:			https://www.freteclick.com.br/
 * Requires at least:	5.0
 * Tested up to:		5.9
 * Requires PHP: 		7.0
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * 
 * Text Domain: fclick_quote
 * Domain Path: /languages
 *
 */

define( 'FCLICK_QUOTE_PATH', plugin_dir_path( __FILE__ ) );

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if(!class_exists('CotaFacil_Main')){

    class CotaFacil_Main
    {

        protected static $instance = null;

        private function __construct()
        {
            require_once FCLICK_QUOTE_PATH . 'vendor/autoload.php';
            require_once FCLICK_QUOTE_PATH . 'includes/class-fclick-quote.php';
            
            add_action('wp_enqueue_scripts', array('Quote', 'enqueue_scripts'));
            add_shortcode('wpfc-cota-facil', array('Quote', 'create_quote_page'));

            add_action('wp_ajax_get_quotes', array('Quote', 'get_quotes'));
            add_action('wp_ajax_nopriv_get_quotes', array('Quote', 'get_quotes'));
            
        }

        public static function get_instance()
        {
            if ( null === self::$instance ) {
                self::$instance = new self;
            }

            return self::$instance;
        }

    }

    add_action('plugins_loaded', array('CotaFacil_Main', 'get_instance'));

}

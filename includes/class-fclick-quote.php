<?php

class Quote
{

    public static function create_quote_page()
    {
        $html = file_get_contents( FCLICK_QUOTE_PATH . 'assets/templates/fclick-quote.php' );

        return $html;
    }

}

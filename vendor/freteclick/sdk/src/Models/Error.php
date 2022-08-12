<?php

namespace SDK\Models;

class Error {

    protected static $_errors = array();

    public static function getErrors() {
        return self::$_errors;
    }

    public static function addError($error) {
        if (is_object($error) && method_exists($error, 'getMessage')) {
            $return['code'] = $error->getCode();
            $return['message'] = $error->getMessage();
            $return['file'] = $error->getFile();
            $return['line'] = $error->getLine();
            $return['trace'] = $error->getTrace();
            $return['previous'] = $error->getPrevious();
        } elseif (!is_array($error)) {
            $return['code'] = self::discoveryErrorCode($error);
            $return['message'] = self::discoveryMessage($return['code'], $error);
        } elseif (!isset($error['message']) && !isset($error['code'])) {
            foreach ($error AS $e) {
                $return = self::discoveryErrorCode($e);
            }
        } else {
            $return['code'] = isset($error['code']) ? $error['code'] : self::discoveryErrorCode($error['message']);
            $return['message'] = self::discoveryMessage($return['code'], $error['message'], isset($error['values']) ? $error['values'] : array());
        }
        self::$_errors[$return['code']] = $return;
    }

    public static function discoveryErrorCode($message) {
        return md5($message);
    }

    public static function discoveryMessage($code, $message, array $values = array()) {
        //$translate = self::$_translateModel->translateFromKey($message);
        //return vsprintf(is_object($translate) ? $translate->getTranslate() : $translate, $values);
        return vsprintf($message, $values);
    }

    public function __destruct() {
        foreach (self::getErrors() AS $error) {
            throw new \Exception($error);
        }
    }

}

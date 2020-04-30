<?php
/* 
 * @category Lib
 * @package Test Suit
 * @copyright 2011, 2012 Dmitry Sheiko (http://dsheiko.com)
 * @license GNU
 */

/**
 * Logger in FireBug fashion
 */
class Lib_Console
{

    /**
     * Decorator for trace info
     * @param array $trace - debug_backtrace results
     * @return string
     */
    private static function _debugDecorator($trace)
    {
        return sprintf("%s : %d >", str_replace(BASE_PATH, ""
            , $trace[0]["file"]), $trace[0]["line"]);
    }

    /**
     * Logger implementation
     * @param array $args
     * @param string $logName
     */
    private static function _log($args, $logName = "error")
    {
        $logExt = "." . date("Y-m-d") . ".log";
        foreach ($args as $data) {
            file_put_contents(LOG_PATH . "/" . $logName . $logExt
                ,  print_r($data, 1) . "\n", FILE_APPEND);
        }
    }
    /**
     * Generic logger alias
     * Usage: console::log(mixed, mixed, ..)
     */
    public static function log()
    {
        $trace = debug_backtrace();
        $args = func_get_args();
        $args = array_merge(array(self::_debugDecorator($trace)), $args);
        self::_log($args, 'info');
    }
   
}

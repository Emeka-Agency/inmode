<?php

    $LOG_DIRECTORY = './logs';
    $ERROR_LOG_FILE = '/error.log';
    $EVENT_LOG_FILE = '/event.log';

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function dateTime()
    {
        return date("Y-m-d H:i:s", time());
    }

    /**
     * Short - 
     * 
     * Detailed - 
     */
    function lastError() {
        logEvent(json_encode(error_get_last()));
        logError(json_encode(error_get_last()));
    }

    // DONE save session pour ne pas init de nouveau logs à chaque changement de page
    /**
     * Short - Init logs
     * 
     * Detailed - Add a separation line and the date of actual new session
     * 
     * @param string|int|null $time Current timestamp
     */
    function initLogs($time)
    {
        logEvent("/////////////////////////////////////".PHP_EOL."Nouvelle session ".date("Y-m-d H:i:s", $time).PHP_EOL);
        logError("/////////////////////////////////////".PHP_EOL."Nouvelle session ".date("Y-m-d H:i:s", $time).PHP_EOL);
    }

    /**
    * Short - Log errors
    *
    * Detailed - 
    *
    * @param string $error
    */
    function logError($error = "")
    {
        if(!is_dir($GLOBALS['LOG_DIRECTORY'])) {
            emmitDir($GLOBALS['LOG_DIRECTORY']);
        }
        error_log(dateTime().' - '.$GLOBALS['request_time'] .' - '.'Étape '.(++$GLOBALS['index']).' - '.$error.PHP_EOL.PHP_EOL, 3, $GLOBALS['LOG_DIRECTORY'].$GLOBALS['ERROR_LOG_FILE'], NULL);
    }

    /**
    * Short - Log events
    *
    * Detailed - 
    *
    * @param string $message
    */
    function logEvent($message = "")
    {
        if(!is_dir($GLOBALS['LOG_DIRECTORY'])) {
            emmitDir($GLOBALS['LOG_DIRECTORY']);
        }
        $flux = fopen($GLOBALS['LOG_DIRECTORY'].$GLOBALS['EVENT_LOG_FILE'], 'a', false, NULL);
        try
        {
            fwrite($flux, dateTime().' - '.$GLOBALS['request_time'] .' - '.'Étape '.(++$GLOBALS['index']).' - '.$message.PHP_EOL);
        }
        catch (Exception $e)
        {
            logEvent("utils logEvent() Exception");
            logError($e);
        }
        fclose($flux);
    }

    /**
    * Short - Log events
    *
    * Detailed - 
    *
    * @param string $message
    * @param string $file
    */
    function logFile($message, $file)
    {
        if(!is_dir($file)) {
            emmitDir($file);
        }
        $flux = fopen($file, 'a', false, NULL);
        try
        {
            fwrite($flux, $message.PHP_EOL);
        }
        catch (Exception $e)
        {
            logEvent("utils logFile() Exception");
            logError($e);
        }
        fclose($flux);
    }
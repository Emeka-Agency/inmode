<?php

    $LOG_DIRECTORY = './logs';
    $ERROR_LOG_FILE = '/error.log';
    $EVENT_LOG_FILE = '/event.log';

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function dateTime()
    {
        return date("Y-m-d H:i:s", time());
    }

    // DONE save session pour ne pas init de nouveau logs à chaque changement de page
    /**
     * Short - Init logs
     * 
     * Detailed - Add a separation line and the date of actual new session
     * 
     * @param null|int $time Current timestamp
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
    * @param Type $name Description
    *
    * @return retour
    */
    function logError(string $error = "")
    {
        emmitDir($GLOBALS['LOG_DIRECTORY']);
        error_log(dateTime().' - '.$GLOBALS['request_time'] .' - '.$error.PHP_EOL.PHP_EOL, 3, $GLOBALS['LOG_DIRECTORY'].$GLOBALS['ERROR_LOG_FILE'], NULL);
    }

    function extractError(\Exception $e, string $prefix = "", string $suffix = "")
    {
        return [
            ($prefix != "" ? $prefix."_" : "")."message".($suffix != "" ? "_".$suffix : "") => $e->getMessage(),
            ($prefix != "" ? $prefix."_" : "")."line".($suffix != "" ? "_".$suffix : "") => $e->getLine(),
            ($prefix != "" ? $prefix."_" : "")."code".($suffix != "" ? "_".$suffix : "") => $e->getCode(),
            ($prefix != "" ? $prefix."_" : "")."trace".($suffix != "" ? "_".$suffix : "") => $e->getTrace(),
        ];
    }

    /**
    * Short - Log events
    *
    * Detailed - 
    *
    * @param Type $name Description
    *
    * @return retour
    */
    function logEvent(string $message = "")
    {
        emmitDir($GLOBALS['LOG_DIRECTORY']);
        $flux = fopen($GLOBALS['LOG_DIRECTORY'].$GLOBALS['EVENT_LOG_FILE'], 'a', false, NULL);
        try
        {
            fwrite($flux, dateTime().' - '.$GLOBALS['request_time'] .' - '.$message.PHP_EOL);
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
    * @param Type $name Description
    *
    * @return retour
    */
    function logFile($message, $file)
    {
        emmitDir($file);
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

    // FRONT LOGS

    $FRONT_LOG_DIRECTORY = './front_logs';
    $ERROR_FRONT_LOG_FILE = '/ferror.log';
    $EVENT_FRONT_LOG_FILE = '/fevent.log';

    /**
    * Short - Log errors
    *
    * Detailed - 
    *
    * @param Type $name Description
    *
    * @return retour
    */
    function frontLogError(string $error = "")
    {
        try
        {
            emmitDir($GLOBALS['FRONT_LOG_DIRECTORY']);
            error_log(dateTime().' - '.$GLOBALS['request_time'] .' - '.$error.PHP_EOL.PHP_EOL, 3, $GLOBALS['FRONT_LOG_DIRECTORY'].$GLOBALS['ERROR_FRONT_LOG_FILE'], NULL);
            return true;
        }
        catch(\Exception $e)
        {
            return false;
        }
    }


    /**
    * Short - Log events
    *
    * Detailed - 
    *
    * @param Type $name Description
    *
    * @return retour
    */
    function frontLogEvent(string $message = "")
    {
        emmitDir($GLOBALS['FRONT_LOG_DIRECTORY']);
        $flux = fopen($GLOBALS['FRONT_LOG_DIRECTORY'].$GLOBALS['EVENT_FRONT_LOG_FILE'], 'a', false, NULL);
        try
        {
            fwrite($flux, dateTime().' - '.$GLOBALS['request_time'] .' - '.$message.PHP_EOL);
        }
        catch (Exception $e)
        {
            logEvent("utils frontLogEvent() Exception");
            logError($e);
            fclose($flux);
            return false;
        }
        fclose($flux);
        return true;
    }
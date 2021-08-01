<?php

    require_once('./tools/is_type.php');
    require_once('./tools/log.php');
    require_once('./tools/mysql.php');
    require_once('./tools/encrypt.php');
    require_once('./tools/request.php');
    require_once('./tools/utils.php');
    require_once('./tools/order_object.php');
    require_once('./tools/mail.php');
    require_once('./tools/fetch.php');
    require_once('./tools/inmode_panel.php');

    /**
     * Short - Get key index in associative array
     * 
     * Detailed - 
     * 
     * @param string $string Key to search
     * @param array $object Associative array
     * 
     * @return integer Key index or -1 if key does not exist in object
     */
    function objectKeyIndex($string = null, $object = null)
    {
        if($string == null || $object == null) {return -1;}
        if(gettype($string) != "string" || gettype($object) != "array") {return -1;}
        $temp = array_search($string, array_keys($object));
        return (gettype($temp) == 'integer' ? $temp : -1);
    }

    /**
     * Short - Process schema to usable valid string
     * 
     * Detailed - 
     * 
     * @param array $object Object schema of table
     * 
     * @return string Stringifies table schema
     */
    function buildSchema($object)
    {
        $temp = [];
        foreach($object as $key => $val)
        {
            $temp[] = $key.' '.$val;
        }
        return implode(', ', $temp);
    }

    /**
    * Short - Recursively create dir if not exists
    *
    * Detailed - 
    *
    * @param string $path Description
    */
    function emmitDir($path)
    {
        // TODO check if is a file or directory
        if (!file_exists($path))
        {
            mkdir($path, 0755, $recursive = true);
            logEvent(json_encode(error_get_last()["message"]));
        }
    }

    /**
     * Short - Check if string is a valid path
     * 
     * Detailed - 
     * 
     * @param string $val String
     * 
     * @return boolean
     */
    function isAPath($val)
    {
        if(!isString($val))
        {
            return false;
        }
        return true;
    }

    /**
     * Short - Check if path is file or directory
     * 
     * Detailed - 
     * 
     * @param string $path Path
     * 
     * @return string 
     */
    function pathIs($path  = "")
    {
        if(!isString($path))
        {
            return 'not_a_string';
        }
        if(!isAPath($path))
        {
            return 'not_a_path';
        }
        if(strlen(pathinfo($path, PATHINFO_EXTENSION)) > 0)
        {
            return 'file:'.pathinfo($path, PATHINFO_EXTENSION);
        }
        return 'directory';
    }

    /**
    * Short - Set parameters in $_SESSION
    *
    * Detailed - 
    *
    * @param string $label Name of value
    * @param mixed $value Value
    */
    function setSession($label, $value)
    {
        logEvent("Set \$_SESSION ".$label." to ".$value);
        $_SESSION[$label] = $value;
    }

    /**
    * Short - Get parameters in $_SESSION
    *
    * Detailed - 
    *
    * @param string $label Name of value
    * 
    * @return string|null
    */
    function getSession($label)
    {
        logEvent("Get \$_SESSION ".$label);
        if(isset($_SESSION[$label]))
        {
            return $_SESSION[$label];
        }
        else
        {
            return null;
        }
    }

    /**
     * Short -
     * 
     * Detailed - 
     * 
     * @param string $string
     * @param string $regex
     * 
     * @return string
     */
    function removeSpecialChars($string, $regex = "/[^A-Za-z0-9.]/")
    {
        return preg_replace($regex, "", $string);
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     * 
     */
    function randomPassword() {
        $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        $pass = [];
        for ($i = 0; $i < 32; $i++) {
            $n = rand(0, strlen($alphabet)-1);
            $pass[] = $alphabet[$n];
        }
        return implode('', $pass);
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function buildDate(string $date, string $type = "full"):string
    {
        switch($type)
        {
            case 'full':
            default:
                // return date('l d F Y à H:i:s', time($date));
                return strftime('%A %d %B %G à %H:%M:%S', strtotime($date));
        }
    }
    
    /**
     * 
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $str
     * 
     * @return string
     */
    function hardTrim($str) {
        if(gettype($str) != "string") {return "";}
        $str = preg_replace('/ /', ' ', $str);
        $str = preg_replace('/\n/', ' ', $str);
        $str = preg_replace('/\r/', ' ', $str);
        $str = preg_replace('/\t/', ' ', $str);
        return trim($str);
    }
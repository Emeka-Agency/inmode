<?php

use App\Modeles\App;

    require_once('./tools/is_type.php');
    require_once('./tools/log.php');
    require_once('./tools/mysql.php');
    require_once('./tools/encrypt.php');
    require_once('./tools/request.php');

    /**
     * Short - Create a standardized pretty JSON object for answer
     * 
     * Detailed - 
     * 
     * @param mixed Value to send
     */
    function JSONResponse($value = null)
    {
        if(!in_array(gettype($value), ["array", "object"])) {return JSONResponse([]);}
        header('Content-Type: application/json');
        return json_encode($value, JSON_FORCE_OBJECT|JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
    }

    /**
     * Short - Return a standardized object 
     */
    function errorBody($error = null)
    {
        if(!is_string($error))
        {
            return "";
        }

        switch($error)
        {
            case "wrong_method":
                return [
                    "status" => "error",
                    "message" => "Wrong method used (".App::__request_method().")"
                ];
            case "null_value":
                return [
                    "status" => "error",
                    "message" => "Null value provided for needed parameter"
                ];
            case "":
            default:
                return [
                    "status" => "error",
                    "message" => "Something happened"
                ];
        }
    }

    /**
     * Short - Get key index in associative array
     * 
     * Detailed - 
     * 
     * @param string Key to search
     * @param object Associative array
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
     * @param object Object schema of table
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
    *
    * @return none
    */
    function emmitDir(string $path)
    {
        // TODO check if is a file or directory
        if (!file_exists($path))
        {
            mkdir($path, 0700, $recursive = true);
        }
    }

    /**
     * Short - Check if string is a valid path
     * 
     * Detailed - 
     * 
     * @param string String
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
     * @param string Path
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
    * @param any $value Value
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
     * @param string
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
     */
    function sendMail($to, $subject, $content) {
        $headers = 'From: aoeweb@emeka.fr' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
        mail($to, $subject, $content, $headers);
    }

    /**
     * Short - 
     * 
     * Detailed - 
     */
    function read_file($file_path = null, $file_length = null)
    {
        if(!is_string($file_path)) {return null;}
        try
        {
            $flux = fopen($file_path, "r", false, NULL);

            if($flux == false)
            {
                throw new Exception("Impossible to open '$file_path'");
            }

            $content = fread($flux, $file_length ?? filesize($file_path));

            fclose($flux);

            return $content;
        }
        catch(Exception $e)
        {
            logError("utils.php readFile() Exception : $e->getMessage()");
            return null;
        }
    }
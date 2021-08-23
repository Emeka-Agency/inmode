<?php
    require_once('./tools/log.php');
    require_once('./tools/mail.php');
    require_once('./tools/is_type.php');

    /**
    * Short - Recursively create dir if not exists
    *
    * Detailed - 
    *
    * @param string $path Description
    *
    * @return none
    */
    function emmitDir($path)
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
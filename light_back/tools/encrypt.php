<?php

    /**
     * Short - 
        *
        * Detailed - 
        *
        * @param Type $name Description
        *
        * @return string
        */
    function encrypt($str, $method = 'sha256')
    {
        return !$str ? NULL : hash($method, $str);
    }
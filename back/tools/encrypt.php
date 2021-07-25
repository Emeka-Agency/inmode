<?php

    /**
     * Short - 
        *
        * Detailed - 
        *
        * @param string $str
        * @param string $method
        *
        * @return string
        */
    function encrypt($str, $method = 'sha256')
    {
        logEvent('encrypt()');
        return !$str ? NULL : hash($method, $str);
    }
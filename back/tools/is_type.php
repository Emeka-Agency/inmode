<?php

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isInteger($elem){return gettype($elem) == "integer";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isFloat($elem){return gettype($elem) == "float";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isDouble($elem){return gettype($elem) == "double";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isString($elem){return gettype($elem) == "string";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isBoolean($elem){return gettype($elem) == "boolean";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isArray($elem){return gettype($elem) == "array";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isObject($elem){return gettype($elem) == "object";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isNULL($elem){return gettype($elem) == "NULL";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isResource($elem){return gettype($elem) == "resource";}
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param mixed $elem
     * 
     * @return bool
     */
    function isNumber($elem){return (isInteger($elem) || isFloat($elem) || isDouble($elem));
    }
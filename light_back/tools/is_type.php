<?php

    function isInteger($elem){return gettype($elem) == "integer";}
    function isFloat($elem){return gettype($elem) == "float";}
    function isDouble($elem){return gettype($elem) == "double";}
    function isString($elem){return gettype($elem) == "string";}
    function isBoolean($elem){return gettype($elem) == "boolean";}
    function isArray($elem){return gettype($elem) == "array";}
    function isObject($elem){return gettype($elem) == "object";}
    function isNULL($elem){return gettype($elem) == "NULL";}
    function isResource($elem){return gettype($elem) == "resource";}
    function isNumber($elem){return (isInteger($elem) || isFloat($elem) || isDouble($elem));}
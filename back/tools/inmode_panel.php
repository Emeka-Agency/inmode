<?php

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param array $datas
 * @param string $token
 * @param string $ObjectName
 * @param string $fieldName
 * 
 * @return array|bool
 */
function _create_object($datas = [], $token, $ObjectName, $fieldName) {
    logEvent('_create_object '.$ObjectName);
    
    $id = object_id($datas[$fieldName], $token, $ObjectName, $fieldName);
    if($id) {
        return false;
    }
    return _request(
        "POST",
        $token,
        $_ENV['STRAPI_URL'].'/'.$ObjectName,
        $datas
    );
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $reference
 * @param array $datas
 * @param string $token
 * @param string $ObjectName
 * @param string $fieldName
 * 
 * @return array|bool
 */
function _update_object($reference, $datas = [], $token, $ObjectName, $fieldName) {
    logEvent('_update_object '.$ObjectName.' with reference '.$reference);
    $id = object_id($reference, $token, $ObjectName, $fieldName);
    if(!$id) {
        return false;
    }
    return _request(
        "PUT",
        $token,
         $_ENV['STRAPI_URL'].'/'.$ObjectName.'/'.$id,
        $datas
    );
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $value
 * @param string $token
 * @param string $ObjectName
 * @param string $fieldName
 * 
 * @return array
 */
function _load_object($value, $token, $ObjectName, $fieldName) {
    logEvent('_load_object '.$ObjectName.' with '.$fieldName.' '.$value);
    return _request(
        "GET",
        $token,
         $_ENV['STRAPI_URL'].'/'.$ObjectName.'/?'.$fieldName.'='.$value,
    );
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $reference
 * @param string $token
 * @param string $ObjectName
 * @param string $fieldName
 * 
 * @return array|bool
 */
function _delete_object($reference, $token, $ObjectName, $fieldName) {
    logEvent('_delete_object '.$ObjectName.' with reference '.$reference);
    $id = object_id($reference, $token, $ObjectName, $fieldName);
    if(!$id) {
        return false;
    }
    return _request(
        "DELETE",
        $token,
        $_ENV['STRAPI_URL'].'/'.$ObjectName.'/'.$id,
    );
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $reference
 * @param string $token
 * @param string $ObjectName
 * @param string $fieldName
 * 
 * @return array|bool
 */
function object_id($reference, $token, $ObjectName, $fieldName) {
    logEvent('object_id()');

    $_res = _load_object($reference, $token, $ObjectName, $fieldName);
    if(!$_res) {
        return false;
    }
    if($_res['data'] && count($_res['data']) == 0) {
        return false;
    }
    return $_res['data'][0]['id'];
}

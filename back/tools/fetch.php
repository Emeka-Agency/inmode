<?php

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $token
 * @param array $body
 * 
 * @return array
 */
function request_init($token, $body = []) {
    logEvent('request_init()');
    return [
        // method => method,
        // headers => {'content-type': 'application/json'},
        // mode => 'cors',
        // cache => 'default',
        // body => JSON.stringify(typeof body == "object" && body != {} ? body : {}),
        // ...body,
        // identifier => process.env.STRAPI_ID,
        // password => process.env.STRAPI_PASS,
    ];
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $token
 * 
 * @return array
 */
function bearer($token) {
    logEvent('bearer()');
    if(gettype($token) != "string" || (gettype($token) == 'string' && strlen($token) == 0)) {
        return [];
    }
    return [
        'Authorization' => 'Bearer '.$token,
        'Content-Type' => 'application/json'
    ];
}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $token
 * @param bool $_bearer
 * @param array $_options
 * 
 * @return array
 */
function _headers($token, $_bearer = true, $_options = []) {
    logEvent('headers()');
    $headers = [];
    if($_bearer == true) {
        array_merge($headers, bearer($token));
    }
    else {
        array_merge($headers, ['Content-Type' => 'application/json']);
    }
    logEvent(gettype($_options));
    logEvent(gettype($_options) == "array");
    logEvent(count(array_keys($_options)));
    if(gettype($_options) == "array" && count(array_keys($_options)) > 0) {
        array_merge($headers, $_options);
    }
    return $headers;
}
// method   token   url         body                        _bearer options
// 'POST'   null    PHP_back    mailBody(order, 'client')   false   {}

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param string $method
 * @param string $token
 * @param string $url
 * @param array $body
 * @param bool $_bearer
 * @param array $options
 * 
 * @return array
 */
function _request($method, $token, $url, $body = [], $_bearer = true, $options = []) {
    logEvent('_request()');
    logEvent('method : '.$method);
    logEvent('url : '.$url);
    // logEvent(JSON.stringify(body));
    $retour = null;
    // CURLOPT_ENCODING
    // CURLOPT_MAXREDIRS
    // CURLOPT_TIMEOUT
    // CURLOPT_FOLLOWLOCATION
    // CURLOPT_HTTP_VERSION
    // CURLOPT_CUSTOMREQUEST
    // CURLOPT_HTTPHEADER
    switch($method) {
        case "POST":
        case "PUT":
            if($_bearer == true) {
                // logEvent({method: method,url: url,headers: _headers(token),data: body,});
                try
                {
                    $retour = request(
                        $url,
                        [
                            CURLOPT_CUSTOMREQUEST => $method,
                            CURLOPT_HTTPHEADER => _headers($token, $_bearer, $options),
                        ],
                        $body,
                        true
                    );
                }
                catch(\Exception $e)
                {
                    logEvent(json_encode($e));
                    throw $e;
                }
            }
            else {
                try
                {
                    $retour = request(
                        $url,
                        [
                            CURLOPT_CUSTOMREQUEST => $method,
                            CURLOPT_HTTPHEADER => _headers(null, false, $options)
                        ],
                        $body,
                        true
                    );
                }
                catch(\Exception $e)
                {
                    logEvent(json_encode($e));
                    throw $e;
                }
            }
            break;
        case "DELETE":
        case "GET":
            if($_bearer == true) {
                // logEvent({method: method,url: url,headers: bearer(token),});
                try
                {
                    $retour = request(
                        $url,
                        [
                            CURLOPT_CUSTOMREQUEST => $method,
                            CURLOPT_HTTPHEADER => bearer($token)
                        ],
                        [],
                        true
                    );
                }
                catch(\Exception $e)
                {
                    logEvent(json_encode($e));
                    throw $e;
                }
            }
            else {
                try
                {
                    $retour = request(
                        $url,
                        [
                            CURLOPT_CUSTOMREQUEST => $method,
                            CURLOPT_HTTPHEADER => _headers(null, false, $options)
                        ],
                        [],
                        true
                    );
                }
                catch(\Exception $e)
                {
                    logEvent(json_encode($e));
                    throw $e;
                }
            }
            break;
        default:
            return false;
    }
    logEvent('$retour : '.json_encode($retour));
    return $retour;
}

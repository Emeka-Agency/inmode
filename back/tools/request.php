<?php

    function request(string $url, array $params = [], array $body = [], $array = false):array
    {
        if(gettype($url) != "string")
        {
            return [
                'status' => 'error',
                'error' => 'URL parameter error'
            ];
        }
        // if(!empty($params)) {}
        // if(!empty($body)) {}

        logEvent('curl to '.$url);

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_CAINFO, $GLOBALS['cert_path']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $retour = curl_exec($ch);

        if($retour === false) {
            $retour = [
                'status' => 'error',
                'error' => curl_error($ch)
            ];
        }
        else {
            $retour = [
                'status' => 'success',
                'datas' => json_decode($retour, $array)
            ];
        }

        curl_close($ch);

        return $retour;
    }

    function reset_request($method = "", $action = ""){
        if($method == "POST") {unset($_POST[$action]);}
        if($method == "GET") {unset($_GET[$action]);}
        if($method == "DELETE") {unset($_DELETE[$action]);}
        if($method == "UPDATE") {unset($_UPDATE[$action]);}
    };

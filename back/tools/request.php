<?php

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $url
     * @param array $params
     * @param array $body
     * @param bool $array
     * 
     * @return array
     */
    function request($url, $params = [], $body = [], $array = false)
    {
        logEvent('request()');
        if(gettype($url) != "string")
        {
            return [
                'status' => 'error',
                'error' => 'URL parameter error'
            ];
        }
        
        logEvent('curl to '.$url);
        logEvent('body : '.json_encode($body));
        logEvent('array : '.($array == true ? 'true' : 'false'));
        
        $ch = curl_init($url);
        
        // CERTIFICAT DE SÉCURITÉ
        if(isset($GLOBALS['cert_path']) && !isset($GLOBALS['cert_path']))
        {
            logEvent("[CURLOPT_CAINFO => ".$GLOBALS['cert_path']."]");
            curl_setopt($ch, CURLOPT_CAINFO, $GLOBALS['cert_path']);
        }
        // RETURNS A STRING INSTEAD OF DISPLAYING IT DIRECTLY
        logEvent("[CURLOPT_RETURNTRANSFER => true]");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        logEvent("[CURLINFO_HEADER_OUT => true]");
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);

        if(!empty($body)) {
            logEvent("[CURLOPT_POSTFIELDS => ".json_encode($body)."]");
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }

        logEvent('$params : '.json_encode($params));

        // curl_setopt_array($ch, $params);
        foreach($params as $param=>$value) {
            curl_setopt($ch, $param, $value);
        }

        logEvent('$ch before execution : '.json_encode(curl_getinfo($ch, CURLINFO_HEADER_OUT )));
        
        $retour = curl_exec($ch);

        logEvent('$ch after execution : '.json_encode(curl_getinfo($ch, CURLINFO_HEADER_OUT )));

        if($retour === false) {
            logEvent(json_encode(
                [
                    'status' => 'error',
                    'error' => curl_error($ch)
                ]
            ));
            $retour = [
                'status' => 'error',
                'error' => curl_error($ch)
            ];
        }
        else {
            logEvent(json_encode(
                [
                    'status' => 'success',
                    'datas' => json_decode($retour, $array)
                ]
            ));
            $retour = [
                'status' => 'success',
                'datas' => json_decode($retour, $array)
            ];
        }

        curl_close($ch);

        return $retour;
    }

<pre>
    <?php
        $url = $_ENV['STRAPI_URL'];
        $strapi_auth = [
            "identifier" => $_ENV['STRAPI_ID'],
            "password"  =>  $_ENV['STRAPI_PASS'],
        ];

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string $url
         * @param string $auth
         * 
         * @return string
         */
        function strapi_auth_curl($url, $auth){
            logEvent('strapi_auth_curl()');
            $curl = curl_init();
    
            curl_setopt_array($curl, array(
                CURLOPT_URL => $url.'/auth/local',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS =>json_encode($auth),
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
            ));
    
            $response = curl_exec($curl);
    
            curl_close($curl);
            return $response;
        }
        
        $login = strapi_auth_curl($url, $strapi_auth);
        $strapi_res = json_decode($login);
    
        print_r($strapi_res);
        print_r($strapi_res->jwt);
    ?>
</pre>
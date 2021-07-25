<!DOCTYPE html>
<html>

<body>
    <pre>
    <?php
    
        $url = "http://inmode-content.emeka.fr/auth/local";
        $array = true;
        $body = [
            "identifier" => "inmode@emeka.fr",
            "password" => "@f2WE5&kYC#fpxQSNUu%nSh95EP*ganF"
        ];

        $ch = curl_init($url);

        // curl_setopt($ch, CURLOPT_CAINFO, $GLOBALS['cert_path']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        //   curl_setopt($ch, CURLOPT_PORT, 1337);

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

        echo '<pre>';

        echo json_encode($retour);

        echo '</pre>';

    ?>
    </pre>
</body>

</html>
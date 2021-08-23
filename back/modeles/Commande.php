<?php

    namespace InmodeBack\Model;

    class Commande
    {
        private $awaiting_mail = null;
        const ORDERS_DIR = "./save_orders";

        public function __construct()
        {
            
        }
        
        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string|null $_type
         * @param string|null $_reference
         * @param array|null $_datas
         * 
         * @return bool
         */
        private function keep_mail($_type = null, $_reference = null, $name = null) {

            // IMPORTANT - Vérifier que keep_mail sauvegarde dans le bon dossier

            // IMPORTANT - Vérifier que pursue_mail récupère les bonnes données

            // CANCEL - Vérifier que pursue_mail détruise les données une fois envoyées

            logEvent('keep_mail()');
            if($_type == null || $_reference == null || $name == null) {
                logEvent('There are missing values to keep datas in safety during the payment process. The mail gonna be sent.');
                return false;
            }
            if(gettype($_type) != 'string' || gettype($_reference) != 'string' || gettype($name) != 'string') {
                logEvent('Values types restrictions are not fullfiled. Datas can\'t be safely kept durung the payment process. The mail gonna be sent.');
                return false;
            }
            try
            {
                logEvent('Attempt to create '.\InmodeBack\Model\Mail::KEPT_MAILS_DIR);
                emmitDir(\InmodeBack\Model\Mail::KEPT_MAILS_DIR);
                $save = fopen(\InmodeBack\Model\Mail::KEPT_MAILS_DIR.'/save_'.$_reference.'.json', 'w+');

                fwrite($save, json_encode([
                    'type' => $_type,
                    'name' => $name,
                ]));

                fclose($save);

                $this->awaiting_mail = true;
                return true;
            }
            catch(\Exception $e)
            {
                $this->awaiting_mail = false;
                return false;
            }
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string|null $_reference
         * @param string|null $_status
         * 
         * @return bool
         */
        private function pursue_mail($_reference = null, $_status = null) {
            logEvent('pursue_mail()');
            if($_reference == null) {
                logEvent('The order reference \'_reference\' was not provided');
                return false;
            }
            if($_status == null) {
                logEvent('The order status \'_status\' was not provided');
                return false;
            }
            if(gettype($_reference) != 'string') {
                logEvent('The order reference \'_reference\' was not the correct type');
                return false;
            }
            if(gettype($_status) != 'string') {
                logEvent('The order status \'_status\' was not the correct type');
                return false;
            }
            try
            {
                logEvent('Attempt to create '.\InmodeBack\Model\Mail::KEPT_MAILS_DIR);
                emmitDir(\InmodeBack\Model\Mail::KEPT_MAILS_DIR);
                $path = \InmodeBack\Model\Mail::KEPT_MAILS_DIR.'/save_'.$_reference.'.json';
                $save = fopen($path, 'r');

                if($save != false)
                {
                    $content = fread($save, filesize($path));

                    if($content == false) {
                        fclose($save);
                        return false;
                    }

                    $content = json_decode($content, true);
    
                    fclose($save);
    
                    $this->awaiting_mail = true;
                    if($this->send_mail($content['type']))
                    {
                        // logEvent('Mail for order '.$_reference.' was sended with its new payment status');
                        return true;
                    }
                    return false;
                }
                return false;

            }
            catch(\Exception $e)
            {
                $this->awaiting_mail = false;
                return false;
            }
            logEvent('An error happened during the mail pursue protocol for the order referenced as '.$_reference);
            return false;
        }

        // TODO vars d'erreur
        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string|null $type
         * @param array|null $datas
         * 
         * @return bool
         */
        private function send_mail($type = null, $datas = null) {
            logEvent('send_mail()');
            if($type == null || gettype($type) != "string") {
                return false;
            }
            
            if($datas == null || gettype($datas) != "array") {
                return false;
            }
            
            /* let mailOptions = {
                from: process.env.MAILER_USER,
                to: datas.to,
                subject: "",
                // text: "", // for only text content
                html: "",
            }; */
            
            switch($type) {
                case "sepa":
                case "soge":
                    // mailOptions.subject = "Votre commande Inmode";
                    // mailOptions.html = MailSOGEPayment(datas.order);
                    return $GLOBALS['mail']->MailPayment($datas, $type);
                default:
                    return false;
            }
            
            /* transporter.sendMail(mailOptions, function(error, info) {
                if(error) {
                    return false;
                }
                else {
                    return true;
                }
            }); */
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order create worked or not
         */
        public function orderCreate()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-create');
            if(empty($_POST)) {
                logEvent('Form empty. Error 400');
                http_response_code(400);
                echo json_encode(
                    [
                        'status' => 'error',
                        'message' => 'Form empty'
                    ]
                );
                return false;
            }
            try {
                $_body = build_order_object();
                if(isset($_body['error'])) {
                    throw $_body['error'];
                }
                else {
                    try {
                        logEvent('Attempt to create '.self::ORDERS_DIR);
                        emmitDir(self::ORDERS_DIR);
                        $name = self::ORDERS_DIR.'/'.date('Y-m-d_H:i:s', time()).'-'.$GLOBALS['request_time'].'-'.$_body['Reference'].'.json';
                        $flux = fopen($name, 'w');
            
                        if($flux == false)
                        {
                            unset($flux);
                            lastError();
                            throw new \Exception('Impossible to create flux of file "'.$name.'"');
                        }
                        else {
                            if(fwrite($flux, trim(json_encode($_body))) == false) {
                                lastError();
                                throw new \Exception('Impossible to save mail in file "'.$name.'"');
                            }
                            if(fclose($flux) == false) {
                                lastError();
                                throw new \Exception('Impossible to close flux of file "'.$name.'"');
                            }
                            unset($flux);
                            echo json_encode([
                                'status' => 'success',
                                'message' => 'Order created',
                            ]);
                            // SEND MAIL
                            if($_POST['SEPA']) {
                                $this->send_mail('sepa', $_body);
                                return true;
                            }
                            else {
                                // TODO mail order
                                // DONE mail order
                                if(!$this->keep_mail('soge', $_body['Reference'], $name)) {
                                    logEvent('Datas cannot be safely saved so the mails were sended as proof');
                                    $this->send_mail('soge', $_body);
                                    return false;
                                }
                                else {
                                    logEvent('Datas were successfully saved. Mail for order '.$_body['Reference'].' will be sent when the payment status will be updated to an authorized status');
                                    return true;
                                }
                            }
                            return true;
                        }
                    }
                    catch(\Exception $e) {
                        logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Impossible to create order'
                        ]);
                        return false;
                    }
                }
            }
            catch (\Exception $e) {
                logEvent('order-create error');
                logEvent(json_encode($e));
                echo json_encode([
                    'status' => 'error',
                    'error' => $e,
                    'message' => 'Impossible to create order'
                ]);
                return false;
            }
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order payment update worked or not
         */
        public function orderPaymentUpdate()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-payment-update');
            if(empty($_POST)) {
                logEvent('Form empty. Error 400');
                http_response_code(400);
                echo json_encode(
                    [
                        'status' => 'error',
                        'message' => 'Form empty'
                    ]
                );
                return false;
            }
            if(!is_secured()) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Call was not secured',
                ]);
                return false;
            }
            try {
                //const token = process.env.BEARER;
                // $token = $GLOBALS['app']->get_strapi_jwt();
                try {
                    // IMPORTANT - save_reference.json

                    $name = \InmodeBack\Model\Mail::KEPT_MAILS_DIR.'/save_'.$_POST['vads_order_id'].'.json';
                    
                    $content = file_get_contents($name);

                    if(gettype($content) != "string") {
                        logEvent('Impossible to read file '.$name);
                        return false;
                    }

                    $content = json_decode($content, true);

                    if(!isset($content['name'])) {
                        logEvent('Name param not set on keep mail file, can\'t find the related order to send a mail');
                        return false;
                    }

                    $name = $content['name'];
                    
                    $content = file_get_contents($name);

                    if(gettype($content) != "string") {
                        logEvent('Impossible to read file '.$name);
                        return false;
                    }

                    $content = json_decode($content, true);

                    $content['Status'] = $_POST['vads_trans_status'];
                    $content['Paid'] = isPaid($content['Status']);

                    if(file_put_contents($name, json_encode($content)) == false) {
                        logEvent('Can\'t overwrite file "'.$name.'"');
                        return false;
                    }

                    $_POST = $content;

                    if($this->send_mail('soge', $content)) {
                        $retour = json_encode([
                            'status' => 'success',
                            'message' => 'Order was successfully updated and mails sended'
                        ]);
                        logEvent($retour);
                        echo $retour;
                        return true;
                    }
                    else {
                        $retour = json_encode([
                            'status' => 'error',
                            'message' => 'Order was successfully updated but mails were not sended'
                        ]);
                        logEvent($retour);
                        logError($retour);
                        echo $retour;
                        return false;
                    }

                    return true;

                    // $_post = update_order_payment_status($_POST['vads_order_id'], $_POST['vads_trans_status'], $token);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // logEvent($_post);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // // if(isset(_post['error'])) {
                    // //     throw _post['error'];
                    // // }
                    // if($_post == null || $_post == false || !isset($_post)) {
                    //     http_response_code(400);
                    //     echo json_encode(
                    //         [
                    //             'status' => 'error',
                    //             'message' => 'update payment status did not work'
                    //         ]
                    //     );
                    //     return false;
                    // }
                    // if(!isset($_post['data']) || count($_post['data']) == 0) {
                    //     http_response_code(400);
                    //     echo json_encode(
                    //         [
                    //             'status' => 'error',
                    //             'message' => 'update_payment.data is empty'
                    //         ]
                    //     );
                    //     return false;
                    // }
                    // logEvent("Checking if order '".$_POST['vads_order_id']."' has awainting mails");
                    // try {
                    //     logEvent(json_encode(array_keys($this->awaiting_mail)));
                    //     if(isset($this->awaiting_mail[$_POST['vads_order_id']])) {
                    //         logEvent('Order '.$_POST['vads_order_id'].' got awaiting mails');
                    //         $this->pursue_mail($_POST['vads_order_id'], $_POST['vads_trans_status']);
                    //     }
                    //     else {
                    //         logEvent('There had not any awaiting mail for order '.$_POST['vads_order_id']);
                    //     }
                    // }
                    // catch(\Exception $e) {
                    //     logError('Étape '.(++$GLOBALS['index']).' - '."An error happened during mail pursuing for order '".$_POST['vads_order_id']."'");
                    //     logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                    // }
                    // http_response_code(200);
                    // echo json_encode([
                    //     'status' => 'success',
                    //     'order' => $_post['data'],
                    // ]);
                    // return true;
                }
                catch(\Exception $e) {
                    logError('Étape '.(++$GLOBALS['index']).' - '.'/order-payment-update error');
                    logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                    http_response_code(500);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error during order payment update',
                        'error' => $e,
                    ]);
                    return false;
                }
            }
            catch(\Exception $e) {
                logError('Étape '.(++$GLOBALS['index']).' - '.'/order-payment-update jwt token error');
                logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Error during jwt fetch',
                    'error' => $e,
                ]);
                return false;
            }
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order update worked or not
         */
        public function orderUpdate()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-update');
            if(empty($_POST)) {
                logEvent('Form empty. Error 400');
                http_response_code(400);
                return 'Form empty';
            }
            if(!is_secured()) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Call was not secured',
                ]);
                return false;
            }
            try {
                //const token = process.env.BEARER;
                // $token = $GLOBALS['app']->get_strapi_jwt();
                try {
                    // $_update = update_order_object($_POST['OrderId'], $token);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // logEvent($_update);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // // if(isset($_update['error'])) {
                    // //     throw $_update['error'];
                    // // }
                    // if(!$_update) {
                    //     logEvent('Update did not work');
                    //     http_response_code(500);
                    //     return 'update did not work';
                    // }
                    // if(!isset($_update['data']) || count($_update['data']) == 0) {
                    //     http_response_code(500);
                    //     return 'update.data is empty';
                    // }
                    // // http_response_code(200).send({
                    // //     'status': 'success',
                    // //     order: _update.data,
                    // // });
                    // http_response_code(200);
                    // echo true;
                    return true;
                }
                catch(\Exception $e) {
                    logError('Étape '.(++$GLOBALS['index']).' - '.'/order-update error');
                    logError('Étape '.(++$GLOBALS['index']).' - '.$e);
                    http_response_code(500);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error during order update',
                        'error' => $e,
                    ]);
                    return false;
                }
            }
            catch(\Exception $e) {
                logError('Étape '.(++$GLOBALS['index']).' - '.'/order-update jwt token error');
                logError('Étape '.(++$GLOBALS['index']).' - '.$e);
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Error during jwt fetch',
                    'error' => $e,
                ]);
                return false;
            }
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order load worked or not
         */
        public function orderLoad()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-load');
            if(empty($_POST)) {
                logEvent('Form empty. Error 400');
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Form empty'
                ]);
                return false;
            }
            try {
                //const token = process.env.BEARER;
                // $token = $GLOBALS['app']->get_strapi_jwt();
                try {

                    $files = scandir(self::ORDERS_DIR);

                    foreach($files as $file) {
                        if(substr($file, -11, 6) == $_POST['reference']) {

                            $content = file_get_contents(self::ORDERS_DIR.'/'.$file);

                            if(gettype($content) == 'string') {
                                echo json_encode([
                                    'status' => 'success',
                                    'order' => json_decode($content)
                                ]);
                                logEvent('order '.$_POST['reference']. ' was successfully loaded and returned');
                                return true;
                            }
                            else {
                                logEvent('Can\'t load order '.$_POST['reference']);
                                logError('Can\'t load order '.$_POST['reference']);
                                echo json_encode([
                                    'status' => 'error',
                                    'order' => null
                                ]);
                                return false;
                            }
                        }
                    }
                    logEvent('order '.$_POST['reference']. ' does not exist');
                    logError('order '.$_POST['reference']. ' does not exist');
                    echo json_encode([
                        'status' => 'error',
                        'order' => null
                    ]);
                    return false;

                    // $_get = load_order_object($_POST['reference'], $token);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // logEvent(json_encode($_get));
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // if(isset($_get['error'])) {
                    //     throw $_get['error'];
                    // }
                    // if($_get == false) {
                        // http_response_code(400);
                        // echo json_encode([
                        //     'status' => 'error',
                        //     'message' => 'load did not work'
                        // ]);
                        // return false;
                    // }
                    // if(!isset($_get['data']) || count($_get['data']) == 0) {
                    //     http_response_code(400);
                    //     echo json_encode([
                    //         'status' => 'error',
                    //         'message' => 'load.data is empty'
                    //     ]);
                    //     return false;
                    // }
                    // http_response_code(200);
                    // echo json_encode([
                    //     'status' => 'success',
                    //     'order' => $_get['data'][0]
                    // ]);
                    // return true;
                }
                catch(\Exception $e) {
                    logError('Étape '.(++$GLOBALS['index']).' - '.'/order-load error');
                    logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                    http_response_code(500);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error during order load',
                        'error' => $e,
                        'order' => null
                    ]);
                    return false;
                }
            }
            catch(\Exception $e) {
                logError('Étape '.(++$GLOBALS['index']).' - '.'/order-load jwt token error');
                logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Error during jwt fetch',
                    'error' => $e,
                    'order' => null
                ]);
                return false;
            }
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order delete worked or not
         */
        public function orderDelete()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-delete');
            if(empty($_POST)) {
                logEvent('Form empty. Error 400');
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Form empty'
                ]);
                return false;
            }
            try {
                //const token = process.env.BEARER;
                // $token = $GLOBALS['app']->get_strapi_jwt();
                try {
                    // $_delete = delete_order_object($_POST['reference'], $token);
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // logEvent(json_encode($_delete));
                    // logEvent('///////////////////////');
                    // logEvent('///////////////////////');
                    // // if(isset($_delete['error'])) {
                    // //     throw $_delete['error'];
                    // // }
                    // if($_delete == false) {
                        http_response_code(400);
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'delete did not work'
                        ]);
                        return false;
                    // }
                    // if(!isset($_delete['data']) || count($_delete['data'])) {
                    //     http_response_code(400);
                    //     echo json_encode([
                    //         'status' => 'error',
                    //         'message' => 'delete.data is empty'
                    //     ]);
                    //     return false;
                    // }
                    // http_response_code(200);
                    // echo json_encode([
                    //     'status' => 'success',
                    //     'reference' => $_POST['reference']
                    // ]);
                    return true;
                }
                catch(\Exception $e) {
                    logError('Étape '.(++$GLOBALS['index']).' - '.'/order-delete error');
                    logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                    http_response_code(500);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Error during order delete',
                        'error' => $e,
                    ]);
                    return false;
                }
            }
            catch(\Exception $e) {
                logError('Étape '.(++$GLOBALS['index']).' - '.'/order-delete jwt token error');
                logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Error during jwt fetch',
                    'error' => $e,
                ]);
                return false;
            }
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool Wether the order signature worked or not
         */
        public function orderSignature()
        {
            logEvent('/////////////////////////');
            logEvent('/back/orders/order-signature');
            // logEvent(JSON.stringify($_POST));
            // logEvent('$_POST', $_POST);
            // logEvent('$_POST['string']', $_POST['string']);
            try {
                logEvent('try');
                logEvent('BO_KEY : '.$_ENV['BO_KEY']);
                logEvent(json_encode($_POST));
                logEvent(json_encode($_ENV));
                logEvent('isset($_POST["string"]:'.(isset($_POST["string"]) ? 'true' : 'false'));
                // $signature = encrypt($_POST['string'].'+'.$_ENV['BO_KEY'], $_ENV['BO_KEY'], 'sha256');
                $signature = base64_encode(hash_hmac("sha256", $_POST['string'].'+'.$_ENV['BO_KEY'], $_ENV['BO_KEY'], true));
                logEvent('signature : '.$signature);
                http_response_code(200);
                echo json_encode([
                    'status' => 'success',
                    'signature' => $signature
                ]);
                logEvent(json_encode(['signature' => $signature]));
                return true;
            }
            catch(\Exception $e) {
                logError(json_encode($e));
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'error' => $e,
                    'signature' => ''
                ]);
                return false;
            }
            return true;
        }

        /**
         * Short - Get the build orders list
         * 
         * Detailed - 
         * 
         * @return 
         */
        public function avoirPresentationCommandes(bool $estConnecte = false)
        {
            $estConnecte = $estConnecte == true ? $estConnecte : $GLOBALS['app']->estAdminZone();
            $temp = [];
            foreach($this->avoirListeCommandes() as $key => $value) {
                $value = str_replace($GLOBALS['app']->avoirURLBase().'/', "", $value);
                $fp = fopen($value, 'r');
                // No file exists for the provided path
                if($fp == false) {
                    logEvent('No file exists for the provided path');
                    fclose($fp);
                    continue;
                }
                $content = fread($fp, filesize($value));
                // No content on opened file
                if($content == false) {
                    logEvent('No content on opened file');
                    fclose($fp);
                    continue;
                }
                $content = json_decode($content, true);
                fclose($fp);
                array_push($temp, $content);
            }
            return $temp;
        }

        /**
         * Short - Get the orders list
         * 
         * Detailed - 
         * 
         * @return 
         */
        public function avoirListeCommandes()
        {
            $temp = [];
            emmitDir(self::ORDERS_DIR);
            logEvent('scandir '.self::ORDERS_DIR);
            logEvent(json_encode(scandir(self::ORDERS_DIR)));
            $values = scandir(self::ORDERS_DIR);
            rsort($values);
            foreach($values as $value)
            {
                !in_array($value, ['.', '..']) && !is_dir(self::ORDERS_DIR.$value) && $temp[pathinfo($value, PATHINFO_FILENAME)] = self::ORDERS_DIR.'/'.$value;
            }
            return $temp;
        }

        /**
         * Short - Get one order
         * 
         * Detailed - 
         * 
         * @return 
         */
        public function avoirCommande($ref)
        {
            if(gettype($ref) != "string") {return null;}
            $path = self::ORDERS_DIR.'_bo_'.$ref.'.json';
            logEvent('load order at '.$path);
            if(file_exists($path)) {
                logEvent('Order exists');
                $fp = fopen($path, 'r');
                // No file exists for the provided path
                if($fp == false) {
                    logEvent('No file exists for the provided path');
                    fclose($fp);
                    return null;
                }
                $content = fread($fp, filesize($path));
                // No content on opened file
                if($content == false) {
                    logEvent('No content on opened file');
                    fclose($fp);
                    return null;
                }
                fclose($fp);
                return json_decode($content, true);
            }
            return null;
        }

    }
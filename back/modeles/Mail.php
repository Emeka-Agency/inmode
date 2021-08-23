<?php

    namespace InmodeBack\Model;

    class Mail
    {
        const KEPT_MAILS_DIR = './save_ketp';

        public function __construct()
        {

        }

        /**
         * Short - 
         * 
         * Detailed - 
         */
        public function sendFullContact()
        {
            logEvent('sendFullContact()');

            $retour = tryMail('mael.fallet@gmail.com', $_POST['speciality'], 'full-contact', 'full-contact', true);
            if($retour == false) {return false;}
            $retour = tryMail('mael.fallet@hotmail.fr', $_POST['speciality'], 'full-contact', 'full-contact', true);
            if($retour == false) {return false;}

            // $retour = tryMail('contactinmode@gmail.com', $_POST['speciality'], 'full-contact', 'full-contact', true);
            // if($retour == false) {return false;}
            // $retour = tryMail('contact.fr@inmodemd.com', $_POST['speciality'], 'full-contact', 'full-contact', true);
            // if($retour == false) {return false;}
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         */
        public function sendContactUs()
        {
            logEvent('sendContactUs()');

            $retour = tryMail('mael.fallet@gmail.com', $_POST['subject'], 'contact-us', 'contact-us', true);
            if($retour == false) {return false;}
            $retour = tryMail('mael.fallet@hotmail.fr', $_POST['subject'], 'contact-us', 'contact-us', true);
            if($retour == false) {return false;}

            // $retour = tryMail('contactinmode@gmail.com', $_POST['subject'], 'contact-us', 'contact-us', true);
            // if($retour == false) {return false;}
            // $retour = tryMail('contact.fr@inmodemd.com', $_POST['subject'], 'contact-us', 'contact-us', true);
            // if($retour == false) {return false;}
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param array $body
         */
        public function sendOrderMail($body = [])
        {
            logEvent('sendOrderMail()');
            logEvent('$body : '.json_encode($body));
            if(empty($body)) {return false;}

            $_POST['action'] = 'order-mail';
            $_POST['for'] = $body['for'];
            $_POST['type'] = $body['type'];

            if(isset($body['order']['Shipping']) && isset($body['order']['Shipping']['Mail']) && $body['for'] == 'client') {
                logEvent('======= Mail shipping client');
                $retour = orderMail('mael.fallet@gmail.com', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                if($retour == false) {return false;}
                // $retour = orderMail('mael.fallet@hotmail.fr', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}

                // $retour = orderMail('contactinmode@gmail.com', 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}
                $retour = orderMail($body['order']['Shipping']['Mail'], 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                if($retour == false) {return false;}
            }
            if(isset($body['order']['Billing']) && $body['for'] == 'client') {
                logEvent('======= Mail billing client');
                $retour = orderMail('mael.fallet@gmail.com', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                if($retour == false) {return false;}
                // $retour = orderMail('mael.fallet@hotmail.fr', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}

                // $retour = orderMail('contactinmode@gmail.com', 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}
                $retour = orderMail($body['order']['Billing']['Mail'], 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                if($retour == false) {return false;}
            }
            if($body['for'] == 'pro') {
                logEvent('======= Mail pro');
                $retour = orderMail('mael.fallet@gmail.com', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                if($retour == false) {return false;}
                // $retour = orderMail('mael.fallet@hotmail.fr', 'Test - Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}

                // $retour = orderMail('contactinmode@gmail.com', 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}
                // $retour = orderMail('contact.fr@inmodemd.com', 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
                // if($retour == false) {return false;}
            }
            // $retour = orderMail('mael.fallet@gmail.com' , 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], true);
            // if($retour == false) {return false;}
            // $retour = orderMail('mael.fallet@hotmail.fr' , 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], true);
            // if($retour == false) {return false;}

            // $retour = orderMail('contactinmode@gmail.com' , 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
            // if($retour == false) {return false;}
            // $retour = orderMail('contact.fr@inmodemd.com' , 'Commande '.$body['order']['Reference'], 'order-mail', $body['type'], false);
            // if($retour == false) {return false;}
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         */
        public function sendFailMail()
        {
            logEvent('sendFailMail()');

            $retour = tryMail('mael.fallet@gmail.com' , 'Erreur envoi de mail '.$_POST['for'], $_POST['action'], 'fail-mail', false);
            if($retour == false) {return false;}
            
            $retour = tryMail('inmode@emeka.fr' , 'Erreur envoi de mail '.$_POST['for'], $_POST['action'], 'fail-mail', false);
            if($retour == false) {return false;}
            return true;
        }
        

        // SWITCH LOCALHOST
        // const PHP_back = 'http://localhost/inmode/back/app.php';
        // const PHP_back = 'https://inmode.emeka.fr/back/app.php';
        const PHP_back = 'https://inmodemd.fr/back/app.php';
        
        const usedValues = [
            'Reference',
            'Date',
            'Article',
            'Shipping',
            'Paid',
            'Status',
            'Billing',
            'Firstname',
            'Lastname',
            'Society',
            'DeliveryTax',
            'Total',
            'Paiement',
            'Country',
            'TVA_Intra',
        ];
        
        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param array|null $_datas
         * @param string|null $_receiver
         * @param string|null $_type
         * 
         * @return array|null
         */
        function mailBody($_datas = null, $_receiver = null, $_type = null) {
            logEvent('//////////////////');
            logEvent('mailBody');
            // logEvent(_datas);
            logEvent($_receiver);
            logEvent($_type);
            logEvent('//////////////////');
            if($_datas == null || $_receiver == null) {
                logEvent('Cas 1');
                return null;
            }
            if(gettype($_receiver) != 'string' || gettype($_type) != 'string') {
                logEvent('Cas 2');
                return null;
            }
            if(gettype($_datas) != "array") {
                logEvent('Cas 3');
                return null;
            }
            $_body = [];
            $_order = [];
            foreach(self::usedValues as $key) {
                if(isset($_datas[$key])) {
                    // logEvent(`_datas[${key}] : ${_datas[key]}`);
                    $_order[$key] = $_datas[$key];
                }
            };
            $_body['order'] = $_order;
            try {
                $_body['email'] = $_datas['Billing']['Mail'];
            }
            catch (\Exception $e) {
                logEvent('Cas 4');
                logEvent(json_encode($e));
                logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                return null;
            }
            $_body['action'] = 'order-mail';
            $_body['for'] = $_receiver;
            $_body['type'] = $_type;
            // logEvent('$$$$$//////////////////$$$$$');
            // logEvent('mailBody body');
            // logEvent(_body);
            // logEvent('$$$$$//////////////////$$$$$');
            return $_body;
        }
        
        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param array|null $order
         * @param string|null $_payment
         * 
         * @return bool
         */
        public function MailPayment($order = null, $_payment = null) {
            logEvent('//////////////////');
            logEvent('MailPayment');
            // logEvent(json_encode($order));
            logEvent(json_encode($_payment));
            logEvent('//////////////////');
            if ($order == null || gettype($order) != "array") {
                logEvent('MailPayment null 1');
                return false;
            }
            if($_payment == null) {
                logEvent('MailPayment null 2');
                return false;
            }
            $_body_client = $this->mailBody($order, 'client', $_payment);
            if($_body_client == null) {
                logEvent('MailPayment null 3');
                return null;
            }
            $_body_pro = $this->mailBody($order, 'pro', $_payment);
            if($_body_pro == null) {
                logEvent('MailPayment null 4');
                return null;
            }
            
            $retour = $this->sendOrderMail($_body_client);
            if($retour == false) {return false;}
            $retour = $this->sendOrderMail($_body_pro);
            if($retour == false) {return false;}

            return true;

            // // DONE IMPORTANT : Remplacer par appel direct aux fonctions de mail
            // $res_client =  _request('POST', null, self::PHP_back, $_body_client, false, []);
            // if($res_client == null || $res_client == false || $res_client == undefined) {
            //     _request('POST', null, self::PHP_back, ['action' => 'fail-mail', 'type' => 'order', 'for' => 'client', 'reference' => $order['Reference']], false);
            // }
            // /////////////////////////////////
            // // DONE IMPORTANT : Remplacer par appel direct aux fonctions de mail
            // $res_pro =  _request('POST', null, self::PHP_back, $_body_pro, false, []);
            // if($res_pro == null || $res_pro == false || $res_pro == undefined) {
            //     _request('POST', null, self::PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'pro', 'reference': order.Reference}, false);
            // }
            // return true;
        }

        /**
         * Short - Get the mails list
         * 
         * Detailed - 
         * 
         * @return 
         */
        public function avoirListeMails()
        {
            $temp = [];
            emmitDir(self::KEPT_MAILS_DIR);
            foreach(scandir(self::KEPT_MAILS_DIR) as $value)
            {
                !in_array($value, ['.', '..']) && !is_dir(self::KEPT_MAILS_DIR.$value) && $temp[pathinfo($value, PATHINFO_FILENAME)] = $GLOBALS['app']->avoirURLBase().'/'.self::KEPT_MAILS_DIR.$value;
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
        public function avoirMail($bo)
        {
            if(gettype($bo) != "string") {return null;}
            $path = self::KEPT_MAILS_DIR.'_bo_'.$bo.'.json';
            logEvent('load mail at '.$path);
            if(file_exists($path)) {
                logEvent('Mail exists');
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
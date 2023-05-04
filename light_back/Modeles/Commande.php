<?php

namespace App\Modeles;

use Automattic\WooCommerce\Client;
use Automattic\WooCommerce\HttpClient\HttpClientException;

class Commande {

    // DB CREATION
    static $table_name = 'order';
    static $table_schema = [
        
    ]; // DONE change in a map (object) structure to easily get object->keys() and object->values() //
    static $db_locale = "DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
    private $db_created = true;

    // CLASS VALUES
    private $mode;
    private $version;

    private $admin_zone;

    const QUEUE_FILE = "./private/queue.json";

    // DONE
    private static function get_queue()
    {
        logEvent("Commande::get_queue()");
        try
        {
            if(!is_file(self::QUEUE_FILE))
            {
                $flux = fopen(self::QUEUE_FILE, "w", false, NULL);
                fwrite($flux, json_encode([], JSON_FORCE_OBJECT));
                fclose($flux);
            }
            
            $queue = read_file(self::QUEUE_FILE);

            if($queue == null)
            {
                throw new \Exception("Can't read from 'queue.json'");
            }

            logEvent("Commande::get_queue() : ".$queue);
            return json_decode($queue, true);
        }
        catch (\Exception $e)
        {
            logEvent("Commande::get_queue : ".$e->getMessage());
            logError("Commande::get_queue : ".$e->getMessage());
            return null;
        }
    }

    // DONE
    private static function set_queue($content)
    {
        logEvent("Commande::set_queue(".(is_string($content) ? $content : json_encode(is_array($content) ? $content : [])).")");
        try
        {
            
            logEvent("Mise à jour de queue.json");
            logEvent($content);
            return file_put_contents(self::QUEUE_FILE, $content);
        }
        catch(\Exception $e)
        {
            logEvent("Commande::set_queue : ".$e->getMessage());
            logError("Commande::set_queue : ".$e->getMessage());
            return null;
        }
    }

    // DONE
    private static function __order__isPaid($status)
    {
        logEvent("Commande::__order__isPaid($status)");
        if(!is_string($status)) {return false;}
        switch($status) {
            case 'ACCEPTED':
            case 'AUTHORISED':
            case 'AUTHORISED_TO_VALIDATE':
            case 'CAPTURED':
            case 'INITIAL':
            case 'UNDER_VERIFICATION':
            case 'WAITING_AUTHORISATION':
            case 'WAITING_AUTHORISATION_TO_VALIDATE':
            case 'WAITING_FOR_PAYMENT':
                logEvent("Commande::__order__isPaid($status) : true");
                return true;
            case 'ABANDONED':
            case 'CANCELLED':
            case 'CAPTURE_FAILED':
            case 'EXPIRED':
            case 'REFUSED':
            case 'SUSPENDED':
            default:
                logEvent("Commande::__order__isPaid($status) : false");
                return false;
        }
    }

    private static function soge_to_wp($status)
    {
        logEvent("Commande::soge_to_wp($status)");
        if(!is_string($status)) {return false;}
        switch($status)
        {
            case 'ACCEPTED': logEvent("Commande::soge_to_wp($status) : completed");return "completed";
            case 'AUTHORISED': logEvent("Commande::soge_to_wp($status) : completed");return "completed";
            case 'AUTHORISED_TO_VALIDATE': logEvent("Commande::soge_to_wp($status) : completed");return "completed";
            case 'CAPTURED': logEvent("Commande::soge_to_wp($status) : completed");return "completed";
            case 'INITIAL': logEvent("Commande::soge_to_wp($status) : completed");return "completed";
            case 'UNDER_VERIFICATION': logEvent("Commande::soge_to_wp($status) : on-hold");return "on-hold";
            case 'WAITING_AUTHORISATION': logEvent("Commande::soge_to_wp($status) : on-hold");return "on-hold";
            case 'WAITING_AUTHORISATION_TO_VALIDATE': logEvent("Commande::soge_to_wp($status) : on-hold");return "on-hold";
            case 'WAITING_FOR_PAYMENT': logEvent("Commande::soge_to_wp($status) : on-hold");return "on-hold";
            case 'ABANDONED': logEvent("Commande::soge_to_wp($status) : cancelled");return "cancelled";
            case 'CANCELLED': logEvent("Commande::soge_to_wp($status) : cancelled");return "cancelled";
            case 'CAPTURE_FAILED': logEvent("Commande::soge_to_wp($status) : failed");return "failed";
            case 'EXPIRED': logEvent("Commande::soge_to_wp($status) : failed");return "failed";
            case 'REFUSED': logEvent("Commande::soge_to_wp($status) : failed");return "failed";
            case 'SUSPENDED': logEvent("Commande::soge_to_wp($status) : failed");return "failed";
            default: logEvent("Commande::soge_to_wp($status) : failed");return "failed";
        }
    }

    // DONE
    private static function getClient()
    {
        logEvent("Commande::getClient()");
        logEvent("WP URL : ".$_ENV["woo_url"]);

        try
        {
            return new Client(
                $_ENV["woo_url"], // Your store URL
                $_ENV["consumer_key"], // Your consumer key
                $_ENV["secret_key"], // Your consumer secret
                [
                    'wp_api' => true, // Enable the WP REST API integration
                    'version' => 'wc/v3' // WooCommerce WP REST API version
                ]
            );
        }
        catch(\Exception $e)
        {
            logEvent("Commande::getClient() : error : $e->getMessage()");
            logError("Commande::getClient() : error : $e->getMessage()");
            return null;
        }
    }

    // DONE
    private static function createOrder($datas = []) {
        try
        {
            
            logEvent("Commande::createorder(".(json_encode(is_array($datas) ? $datas : [])).")");
            $errors = [];
            if(!isset($datas["sepa"])) {$errors ["sepa"]= "missing parameter";}
            if(!isset($datas["reference"])) {$errors ["reference"]= "missing parameter";}
            if(!isset($datas["delivery_tax"])) {$errors ["delivery_tax"]= "missing parameter";}
            if(!isset($datas["total"])) {$errors ["total"]= "missing parameter";}
            // BILLING
            if(!isset($datas["billing"])) {$errors ["billing"]= "missing parameter";}
            else {
                if(!isset($datas["billing"]["firstname"])) {$errors["billing_firstname"] = "missing parameter";}
                if(!isset($datas["billing"]["lastname"])) {$errors["billing_lastname"] = "missing parameter";}
                if(!isset($datas["billing"]["address"])) {$errors["billing_address"] = "missing parameter";}
                if(!isset($datas["billing"]["city"])) {$errors["billing_city"] = "missing parameter";}
                if(!isset($datas["billing"]["zip"])) {$errors["billing_zip"] = "missing parameter";}
                if(!isset($datas["billing"]["country"])) {$errors["billing_country"] = "missing parameter";}
                if(!isset($datas["billing"]["mail"])) {$errors["billing_mail"] = "missing parameter";}
                if(!isset($datas["billing"]["phone"])) {$errors["billing_phone"] = "missing parameter";}
            }
            // SHIPPING
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["firstname"])) {$errors["shipping_firstname"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["lastname"])) {$errors["shipping_lastname"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["address"])) {$errors["shipping_address"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["city"])) {$errors["shipping_city"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["zip"])) {$errors["shipping_zip"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["country"])) {$errors["shipping_country"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["mail"])) {$errors["shipping_mail"] = "missing parameter";}
            if(isset($datas["shipping"]) && !isset($datas["shipping"]["phone"])) {$errors["shipping_phone"] = "missing parameter";}
            // ARTICLES
            if(!isset($datas["articles"])) {$errors ["articles"]= "missing parameter";}
            else {
                foreach($datas["articles"] as $index => $article)
                {
                    if(!isset($article["wp_id"])) {$errors["article_".$index."_wp_id"] = "missing parameter";}
                    if(!isset($article["quantity"])) {$errors["article_".$index."_quantity"] = "missing parameter";}
                }
            }
    
            if(!isset($datas["delivery_tax"])) {$errors ["delivery_tax"]= "missing parameter";}
            if(!isset($datas["has_fees"])) {$errors ["has_fees"]= "missing parameter";}
    
            if(count($errors) > 0)
            {
                logEvent(json_encode($errors));
                logError(json_encode($errors));
                http_response_code(400);
                return [
                    "status" => "error",
                    "message" => "Errors in request",
                    "location" => "Commande::createorder"
                ];
            }
        }
        catch(\Exception $e)
        {
            logEvent("Commande::createOrder() : error : $e->getMessage()");
            logError("Commande::createOrder() : error : $e->getMessage()");
        }

        try
        {
            logEvent("Commande::createOrder() good return");
            return array_merge(
                self::general_part($datas),
                self::billing_part($datas),
                self::shipping_part($datas),
                self::articles_part($datas),
                self::delivery_tax_part($datas),
                self::fees_part($datas)
            );
        }
        catch(\Exception $e)
        {
            logEvent("Commande::createOrder() : error : $e->getMessage()");
            logError("Commande::createOrder() : error : $e->getMessage()");
            http_response_code(500);
            return [];
        }
    }
    
    // DONE
    public static function createWPOrder($datas = [])
    {
        logEvent("Commande::createWPOrder(".(json_encode(is_array($datas) ? $datas : [])).")");
        $woocommerce = self::getClient();

        $order = self::createOrder($datas);

        if(http_response_code() >= 300)
        {
            logEvent("Commande::createWPOrder() : error with http_response_code : ".http_response_code());
            logError("Commande::createWPOrder() : error with http_response_code : ".http_response_code());
            return $order;
        }

        try
        {
            $wp_result = $woocommerce->post('orders', $order);
            
            if(isset($datas['sepa']) && $datas['sepa'] == false)
            {
                try
                {
                    $queue = self::get_queue();
                    if(!isset($queue[$datas['reference']]))
                    {
                        $queue[$datas['reference']] = $wp_result->id;
                    }
                    logEvent("Commande::createOrder(".json_encode($queue).")");
                    self::set_queue(json_encode($queue));
                }
                catch(\Exception $e)
                {
                    logEvent($e->getMessage());
                    logError($e->getMessage());
                    return [];
                }
            }
            
            // $queue = self::get_queue();
            // $queue[$order["order_key"] ?? $_POST["reference"]] = $wp_result->id;
            // logEvent("Commande::createWPOrder(".json_encode($queue).")");
            // self::set_queue(json_encode($queue));
            http_response_code(200);
            return [
                "wp_id" => $wp_result->id ?? null,
                "number" => $wp_result->number ?? null,
                "reference" => $order["order_key"] ?? $_POST["reference"] ?? null
            //     "reference" => array_filter(
            //         array_map(
            //             function($meta) {
            //                 if(is_array($meta) && isset($meta["key"]) && isset($meta["value"]) && $meta["key"] == "reference")
            //                 {
            //                     return $meta["value"];
            //                 }
            //                 return null;
            //             }, $wp_result->meta_data ?? []
            //         ),
            //         function($elem) {
            //             return gettype($elem) == "string";
            //         }
            //     )[0] ?? null
            ];
        }
        // catch(HttpClientException $w_err)
        // {
        //     http_response_code(500);
        //     return [
        //         "request" => $w_err->getRequest(),
        //         "response" => $w_err->getResponse(),
        //     ];
        // }
        catch(\Exception $e)
        {
            logEvent("Commande::createWPOrder : ".$e->getMessage());
            logEvent(json_encode(extractError($e, "create_order", "wp_order")));
            logError("Commande::createWPOrder : ".$e->getMessage());
            logError(json_encode(extractError($e, "create_order", "wp_order")));
            http_response_code(500);
            return [
                "status" => "error",
                "datas" => $order,
                "location" => "Commande::createWPOrder"
            ];
        }
    }

    // DONE
    private static function getCountry($country = null)
    {
        logEvent("Commande::getCountry($country)");
        if(gettype($country) != "string") {return "FR";}
        switch(strtolower($country)) {
            case "lu": return "LU";
            case "luxembourg": return "LU";
            case "be": return "BE";
            case "belgique": return "BE";
            case "fr":
            case "france":
            default: return "FR";
        }
    }
    
    // DONE
    public static function orderSignature($datas)
    {
        logEvent("Commande::orderSignature(".(json_encode(is_array($datas) ? $datas : [])).")");
        try
        {
            $signature = base64_encode(hash_hmac("sha256", $datas["string"].'+'.$_ENV["bo_key"], $_ENV["bo_key"], true));
            http_response_code(200);
            return [
                "status" => "success",
                "signature" => $signature
            ];
        }
        catch(\Exception $e)
        {
            http_response_code(500);
            logEvent($e->getMessage());
            logError($e->getMessage());
            return [
                "status" => "error",
                "message" => "Impossible to create the signature",
                "location" => "Commande::orderSignature"
            ];
        }
    }

    public static function order_details($content)
    {
        logEvent("Commande::order_details(".(json_encode(is_array($content) ? $content : [])).")");
        return self::order_load($content);
    }

    private static function get_wp_id($content)
    {
        logEvent("Commande::get_wp_id(".(json_encode(is_array($content) ? $content : [])).")");
        try
        {
            $queue = self::get_queue();
            logEvent("queue : ".json_encode($queue));
            if(isset($queue[$content["vads_order_id"]]))
            {
                $wp_id = $queue[$content["vads_order_id"]];
                return $wp_id;
            }
            else
            {
                logEvent(json_encode($content));
                logError(json_encode($content));
                throw new \Exception("'vads_order_id' was not properly set in the queue.json file");
            }
        }
        catch(\Exception $e)
        {
            logEvent("Commande::order_payment_update error : ".$e->getMessage());
            logError("Commande::order_payment_update error : ".$e->getMessage());
            http_response_code(500);
            return [
                "status" => "error",
                "message" => "Something wrong happened",
                "location" => "Commande::get_wp_id"
            ];
        }
    }

    // DONE
    public static function order_payment_update($content = null)
    {
        logEvent("Commande::order_payment_update(".(json_encode(is_array($content) ? $content : [])).")");
        if(!is_array($content))
        {
            http_response_code(400);
            return errorBody("null_value");
        }

        logEvent(json_encode($content));

        $wp_id = self::get_wp_id($content);

        if(!is_integer($wp_id))
        {
            return $wp_id;
        }

        $woocommerce = self::getClient();
        
        $data = [
            "status" => self::soge_to_wp($content['status'] ?? $content['vads_trans_status'] ?? "ABANDONED"),
            "paid" => self::__order__isPaid($content['status'] ?? $content['vads_trans_status'] ?? "ABANDONED")
        ];

        try
        {
            $wp_result = $woocommerce->put('orders/'.$wp_id, $data);
    
            logEvent(json_encode($wp_result));
    
            http_response_code(200);
            return [
                "status" => "success"
            ];
        }
        catch(\Exception $e)
        {
            logEvent("Commande::order_payment_update error : ".$e->getMessage());
            logError("Commande::order_payment_update error : ".$e->getMessage());
            http_response_code(500);
            return [
                "status" => "error",
                "location" => "Commande::order_payment_update"
            ];
        }
        
    }

    // TODO
    public static function order_load($content = null)
    {
        logEvent("Commande::order_load(".(json_encode(is_array($content) ? $content : [])).")");
        $woocommerce = self::getClient();

        try
        {
            $queue = self::get_queue();
            $wp_result = $woocommerce->get('orders/'.$queue[$content["reference"]]);
            http_response_code(200);
            return [
                "status" => "success",
                "order" => $wp_result
            ];
        }
        catch(\Exception $e)
        {
            logEvent("Commande::order_load() : error : $e->getMessage()");
            logError("Commande::order_load() : error : $e->getMessage()");
            http_response_code(500);
            return [
                "status" => "error",
                "message" => $e->getMessage(),
                "location" => "Commande::order_load"
            ];
        }
    }

    // TODO
    public static function order_cancel($content)
    {
        logEvent("Commande::order_cancel(".(json_encode(is_array($content) ? $content : [])).")");
        return self::order_payment_update([
            "vads_order_id" => $content["vads_order_id"],
            "vads_order_status" => $content["vads_order_status"] ?? $content["status"] ?? "CANCELLED"
        ]);
    }


    // DONE
    private static function general_part($datas = [])
    {
        logEvent("Commande::general_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return [
            'payment_method' => isset($datas['sepa']) && $datas['sepa'] == false ? 'sogecommerce' : 'bacs',
            'payment_method_title' => isset($datas['sepa']) && $datas['sepa'] == false ? 'sogecommerce' : 'bacs',
            'set_paid' => isset($datas['sepa']) && $datas['sepa'] ? true : false,
            // EXPLAIN - Si le paiement n'est pas défini ou que c'est un virement, le statut par défaut est complété, confiance client
            // Vu avec Jarod et Jaws puis reconfirmé le 12/09/2022
            'status' => isset($datas['sepa']) && $datas['sepa'] == false ? 'pending' : 'completed',
            // 'status' => isset($datas['sepa']) && $datas['sepa'] == false ? 'pending' : 'on-hold',
            'currency' => 'EUR',
            'order_key' => $datas['reference'] ?? null,
            'transaction_id' => $datas['reference'] ?? null,
            'shipping_total' => isset($datas['delivery_tax']) ? $datas['delivery_tax'] : 0,
            'total' => isset($datas['total']) ? $datas['total'] : 0,
            // 'customer_note' => isset($datas['custom']) ? $datas['custom'] : null,
            "meta_data" => [
                [
                    "key" => "reference",
                    "value" => $datas['reference'] ?? null
                ],
                [
                    "key" => "details",
                    "value" => $datas['custom'] ?? null
                ]
            ]
        ];
    }

    // DONE
    private static function billing_part($datas = [])
    {
        logEvent("Commande::billing_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return isset($datas['billing']) ?
            [
                'billing' => [
                    'first_name' => $datas['billing']['firstname'] ?? '---',
                    'last_name' => $datas['billing']['lastname'] ?? '---',
                    'address_1' => $datas['billing']['address'] ?? '---',
                    'city' => $datas['billing']['city'] ?? '---',
                    'postcode' => $datas['billing']['zip'] ?? '---',
                    'country' => isset($datas['billing']['country']) ? self::getCountry($datas['billing']['country']) : '---',
                    'email' => $datas['billing']['mail'] ?? '---',
                    'phone' => $datas['billing']['phone'] ?? '---'
                ],
            ] : [];
    }

    // DONE
    private static function shipping_part($datas = [])
    {
        logEvent("Commande::shipping_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return isset($datas['shipping']) ?
            [
                'shipping' => [
                    'first_name' => $datas['shipping']['firstname'] ?? '---',
                    'last_name' => $datas['shipping']['lastname'] ?? '---',
                    'address_1' => $datas['shipping']['address'] ?? '---',
                    'city' => $datas['shipping']['city'] ?? '---',
                    'postcode' => $datas['shipping']['zip'] ?? '---',
                    'country' => isset($datas['shipping']['country']) ? self::getCountry($datas['shipping']['country']) : '---',
                    'email' => $datas['shipping']['mail'] ?? '---',
                    'phone' => $datas['shipping']['phone'] ?? '---'
                ]
            ] : [];
    }

    // DONE
    private static function articles_part($datas = [])
    {
        logEvent("Commande::articles_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return isset($datas['articles']) && count($datas['articles']) > 0 ? [
                'line_items' => array_map(function($article) {
                    return [
                        'product_id' => $article['wp_id'] ?? null,
                        'quantity' => $article['quantity'] ?? 0
                    ];
                }, $datas['articles'])
            ] : [];
    }

    // DONE
    private static function delivery_tax_part($datas = [])
    {
        logEvent("Commande::delivery_tax_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return isset($datas['delivery_tax']) && $datas['delivery_tax'] > 0 ?
            [
                "shipping_lines" => [
                    [
                        "method_id" => "flat_rate",
                        "method_title" => "Expédition",
                        "total" => "50.00"
                    ]
                ]
            ] : [];
    }

    // DONE
    private static function fees_part($datas = [])
    {
        logEvent("Commande::fees_part(".(json_encode(is_array($datas) ? $datas : [])).")");
        return isset($datas['has_fees']) && $datas['has_fees'] > 0 ?
            [
                "fee_lines" => [
                    [
                        "name" => "TVA applicable",
                        "tax_status" => "taxable",
                        "amount" => number_format($datas['has_fees'], 0),
                        "total" => number_format($datas['has_fees'], 2, ',', ' ')
                    ]
                ]
            ]: [];
    }
}
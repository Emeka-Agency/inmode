<?php

namespace App\Controller;

use App\Modeles\Commande;

class ControleurCommandes {

    public static function resolve($path_schema = [])
    {
        logEvent("resolve(".json_encode(is_array($path_schema) ? $path_schema : []).")");
        if(!is_array($path_schema)) {return [];}
        logEvent("resolve(".json_encode($path_schema).")");
        switch(array_shift($path_schema))
        {
            case "":
            case null:
                return self::afficheCommandes();
            case $GLOBALS["app"]->avoirURL("order-signature"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_signature();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            case $GLOBALS["app"]->avoirURL("order-details"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_details();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            case $GLOBALS["app"]->avoirURL("order-payment-update"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_payment_update();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            case $GLOBALS["app"]->avoirURL("order-create"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_create();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            case $GLOBALS["app"]->avoirURL("order-load"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_load();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            case $GLOBALS["app"]->avoirURL("order-cancel"):
                if($_SERVER["REQUEST_METHOD"] == "POST") {return self::order_cancel();}
                else {echo JSONResponse(errorBody("wrong_method")); return false;}
            default: return [];
        }
    }

    public static function afficheCommandes()
    {
        logEvent("afficheCommandes()");
        try
        {
            echo $GLOBALS['twig']->render(
                'pages/orders.html.twig',
                [
                    'page_title' => 'Commandes',
                    'route' => 'orders',
                    'page_params' => $GLOBALS['app']->getParametresPage("orders")
                ]
            );
            return true;
        }
        catch(\Exception $e)
        {
            echo $e->getFile().":".$e->getLine()." => ".$e->getMessage();
            return false;
        }
    }

    public static function order_signature()
    {
        logEvent("order_signature(".json_encode(is_array($_POST) ? $_POST : []).")");
        if(isset($_POST["string"]))
        {
            http_response_code(200);
            echo JSONResponse(Commande::orderSignature($_POST));
            return true;
        }
        else
        {
            http_response_code(400);
            echo JSONResponse([
                "status" => "error",
                "message" => "Le paramètre 'string' est absent"
            ]);
            return false;
        }
    }

    public static function order_details()
    {
        logEvent("order_details(".json_encode(is_array($_POST) ? $_POST : []).")");
        echo JSONResponse(Commande::order_details($_POST));
    }

    public static function order_payment_update()
    {
        logEvent("order_payment_update(".json_encode(is_array($_POST) ? $_POST : []).")");
        echo JSONResponse(Commande::order_payment_update($_POST));
    }

    public static function order_create()
    {
        logEvent("order_create(".json_encode(is_array($_POST) ? $_POST : []).")");
        echo JSONResponse(Commande::createWPOrder($_POST));
    }

    public static function order_load()
    {
        logEvent("order_load(".json_encode(is_array($_POST) ? $_POST : []).")");
        echo JSONResponse(Commande::order_load($_POST));
    }

    public static function order_cancel()
    {
        logEvent("order_cancel(".json_encode(is_array($_POST) ? $_POST : []).")");
        echo JSONResponse(Commande::order_cancel($_POST));
    }

}
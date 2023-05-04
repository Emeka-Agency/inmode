<?php

namespace App\Controller;

class ControleurBase {

    public static function resolve($path_schema = [])
    {
        logEvent("resolve(".json_encode(is_array($path_schema) ? $path_schema : []).")");
        if(!is_array($path_schema)) {return [];}
        switch(array_shift($path_schema))
        {
            case "":
            case null:
                return self::afficheHome();
            default: return [];
        }
    }

    public static function afficheHome()
    {
        logEvent("afficheHome()");
        try
        {
            echo $GLOBALS['twig']->render(
                'pages/home.html.twig',
                [
                    'page_title' => 'Accueil',
                    'route' => 'home',
                    'page_params' => $GLOBALS['app']->getParametresPage("home")
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
}
<?php

    $loader = new \Twig\Loader\FilesystemLoader('views');
    $twig = new \Twig\Environment($loader, [
        // 'cache' => './comp_cache',
    ]);

    // ADD GLOBAL VARIABLES

    $twig->addGlobal('avoirListeIconesDefaut', $GLOBALS['app']->avoirListeIconesDefaut());
    $twig->addGlobal('particule_url', $GLOBALS['particule_url']);
    $twig->addGlobal('particule_admin_secret', $_ENV['particule_admin_secret']);
    if(isset($GLOBALS['user']) && $GLOBALS['user']->estConnecte())
    {
        $twig->addGlobal('role_utilisateur', $GLOBALS['user']->getUserRole());
        $twig->addGlobal('pseudo_utilisateur', $GLOBALS['user']->getUserPseudo());
        $twig->addGlobal('creation_utilisateur', $GLOBALS['user']->getAccountCreation());
        $twig->addGlobal('limite_telechargement', $GLOBALS['user']->avoirLimiteTel());
    }
    $twig->addGlobal('algo_decoupage_admin_connexion', $_ENV['algo_decoupage_admin_connexion']);
    $twig->addGlobal('algo_decoupage_connexion_utilisateur', $_ENV['algo_decoupage_connexion_utilisateur']);
    $twig->addGlobal('algo_decoupage_jeton_session', $_ENV['algo_decoupage_jeton_session']);
    $twig->addGlobal('algo_decoupage_is_module', $_ENV['algo_decoupage_is_module']);
    $twig->addGlobal('_mode', $GLOBALS['app']->avoirModeEnv());
    $twig->addGlobal('_prod', $GLOBALS['app']->estPhaseDev());
    $twig->addGlobal('_dev', $GLOBALS['app']->estPhaseProd());
    $twig->addGlobal('request_params', $_REQUEST);

    // ADD FILTERS



    // ADD FUNCTIONS

    //// App functions
    $twig->addFunction(new \Twig\TwigFunction('avoirCheminIcon', function ($string) {return $GLOBALS['app']->avoirURLBase().'/public/assets/icons/'.$string;}));
    $twig->addFunction(new \Twig\TwigFunction('avoirCheminImage', function ($string) {return $GLOBALS['app']->avoirURLBase().'/public/assets/images/'.$string;}));
    $twig->addFunction(new \Twig\TwigFunction('versionApplication', function () {return $GLOBALS['app']->avoirVersion();}));
    $twig->addFunction(new \Twig\TwigFunction('avoirURLActuelle', function () {return $GLOBALS['app']->avoirURLActuelle();}));
    $twig->addFunction(new \Twig\TwigFunction('avoirCheminIconesParDefaut', function ($string) {return $GLOBALS['app']->avoirCheminIconesParDefaut($string);}));
    $twig->addFunction(new \Twig\TwigFunction('avoirCheminImagesParDefaut', function ($string) {return $GLOBALS['app']->avoirCheminImagesParDefaut($string);}));
    $twig->addFunction(new \Twig\TwigFunction('iconesParDefaut', function () {return $GLOBALS['app']->iconesParDefaut();}));
    $twig->addFunction(new \Twig\TwigFunction('imagesParDefaut', function () {return $GLOBALS['app']->imagesParDefaut();}));

    $twig->addFunction(new \Twig\TwigFunction('avoirURL', function (string $route, $param = null) {return $GLOBALS['particule_url'].route($route, $param);}));
    $twig->addFunction(new \Twig\TwigFunction('adminZone', function () {return $GLOBALS['app']->estAdminZone();}));

    //// UserManager functions
    $twig->addFunction(new \Twig\TwigFunction('estConnecte', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->estConnecte() : false;}));
    $twig->addFunction(new \Twig\TwigFunction('estAdmin', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->estAdmin() : false;}));
    $twig->addFunction(new \Twig\TwigFunction('estPremium', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->estPremium() : false;}));
    // User rights
    $twig->addFunction(new \Twig\TwigFunction('peutConnecterAdmin', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->peutConnecterAdmin() : false;}));
    $twig->addFunction(new \Twig\TwigFunction('peutCreerUtilisateur', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->peutCreerUtilisateur() : false;}));
    $twig->addFunction(new \Twig\TwigFunction('peutCreerAdmin', function (){return isset($GLOBALS['user']) ? $GLOBALS['user']->peutCreerAdmin() : false;}));

    //// Generic functions // Tools
    $twig->addFunction(new \Twig\TwigFunction('route', function ($string = null, $param = null){return route($string, $param);}));
    $twig->addFunction(new \Twig\TwigFunction('encrypt', function ($string, $method = null)
    {
        return encrypt($string, $method);
    }));
    $twig->addFunction(new \Twig\TwigFunction('json_encode', function ($ressource) {return json_encode($ressource);}));
    $twig->addFunction(new \Twig\TwigFunction('json_decode', function ($ressource) {return json_decode($ressource);}));
    $twig->addFunction(new \Twig\TwigFunction('print_r', function ($array) {return print_r($array);}));
    $twig->addFunction(new \Twig\TwigFunction('get_type', function ($array) {return gettype($array);}));
    $twig->addFunction(new \Twig\TwigFunction('ucfirst', function ($string) {return ucfirst($string);}));
    $twig->addFunction(new \Twig\TwigFunction('arrayToObject', function ($array) {
        if(gettype($array) != "array") {return null;}
        $temp = [];
        logEvent("arrayToObject");
        foreach($array as $key=>$elem) {
            logEvent("loop ".$key);
            logEvent(gettype($elem));
            logEvent($elem['fields']['block'][0]);
            $temp[$elem['fields']['block'][0]] = $elem;
        }
        logEvent(json_encode($temp));
        return $temp;
    }));

    $twig->addFunction(new \Twig\TwigFunction('necessiteDragula', function (string $route):bool
    {
        if(gettype($route) != "string") {return false;}
        switch($route)
        {
            case 'create-bo':
            case 'edit-bo':
                return true;
            default: return false;
        }
    }));
    $twig->addFunction(new \Twig\TwigFunction('necessiteTippy', function (string $route):bool
    {
        if(gettype($route) != "string") {return false;}
        switch($route)
        {
            case 'create-bo':
            case 'edit-bo':
                return true;
            default: return false;
        }
    }));

    //// CONST TEXTS

    $twig->addFunction(new \Twig\TwigFunction('forbidden_reason', function($code = null):string {
        if(gettype($code) != "string") {
            return "You actually does not have the right to access that service.";
        }
        switch($code) {
            case "na":
                return "That area is forbidden until you're at least admin.";
            case "nc":
                return "You can't actually build orders. If you wanna so, you'll have to get premium.";
            default:
                return "You actually does not have the right to access that service.";
        }
    }));


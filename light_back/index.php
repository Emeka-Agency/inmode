<?php

    header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");    // cache for 1 day
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, DELETE");
    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    $http_host = $_SERVER['HTTP_HOST'];
    $server_name = $_SERVER['SERVER_NAME'];
    $request_scheme = $_SERVER['REQUEST_SCHEME'];
    $request_uri = $_SERVER['REQUEST_URI'];
    $script_name = $_SERVER['SCRIPT_NAME'];
    $php_self = $_SERVER['PHP_SELF'];
    
    // $php_referer = $_SERVER['HTTP_REFERER'];

    $mode = null;
    if(($http_host == $server_name) && $server_name == "localhost") {$mode = "dev";}
    else if(str_contains($http_host, "emeka.fr")) {$mode = "stage";}
    else {$mode = "prod";}

    $_ENV = parse_ini_file('private/config.'.$mode.'.ini');

    // $cert_path = __DIR__ . DIRECTORY_SEPARATOR . 'private/airtable_cert.cer';

    function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }
    
    $request_time = generateRandomString();

    header("Content-type: text/html; charset=UTF-8");
    date_default_timezone_set('Europe/Paris');
    setlocale(LC_TIME, "fr_FR");

    // INIT TOOLS AND SETTINGS
    require_once('./settings/errors.php');
    require_once('./tools/utils.php');

    logEvent("///////////////// Requête ".$request_time);

    // INIT APP
    require_once('./Modeles/Application.php');

    $particule_url = null;
    if($mode == "dev") {$particule_url = "/inmode/light_back/";}
    if($mode == "stage") {$particule_url = "/admin/";}
    if($mode == "prod") {$particule_url = "/admin/";}

    $app = new App\Modeles\App($mode);
    /**
     * Short - Return path for given name route
     * 
     * Detailed - 
     * 
     * @param string $route Route given name
     * 
     * @return string Route path or 404
     */
    function route($route, $param = null)
    {
        return $GLOBALS['app']->avoirURL($route, $param);
    }

    // INIT MANAGER
    // INIT USER

    // INIT PLUGINS
    require dirname(__DIR__).($mode == "dev" ? '/light_back' : '/admin').'/vendor/autoload.php';
    require_once('./tools/twig_config.php');

    // ROUTER

    $path = str_replace(["https", "http", "://", $particule_url], "", $request_uri);

    $path_schema = explode("/", parse_url($path)['path']);
    $path_schema = array_map(function($elem){return '/'.$elem;}, $path_schema);

    $req_body = file_get_contents('php://input');

    if($_POST == null)
    {
        $_POST = json_decode($req_body, true);
    }

    logEvent(json_encode($path_schema));
    
    if(!is_file("./private/queue.json") || (is_file("./private/queue.json") && filesize("./private/queue.json") == 0))
    {
        file_put_contents("./private/queue.json", json_encode([], JSON_FORCE_OBJECT));
    }

    $retour = [];

    switch(array_shift($path_schema))
    {
        case route("orders"):
            require_once('./Modeles/Commande.php');
            require_once("./Controleurs/Commandes.php");
            return ControleurCommandes::resolve($path_schema ?? []);
        case route("home"):
            require_once("./Controleurs/Base.php");
            return ControleurBase::resolve($path_schema ?? []);
        default:
            return false;
    }

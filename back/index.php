<?php

    // phpinfo();
    // die();
    
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

    $mode = (($http_host == $server_name) && $server_name == "localhost") ? "development" : "production";

    $_ENV = $mode == "development" ? parse_ini_file('private/config.dev.ini') : parse_ini_file('private/config.prod.ini');

    // $cert_path = __DIR__ . DIRECTORY_SEPARATOR . 'private/airtable_cert.cer';

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param integer $length
     * 
     * @return string
     */
    function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $error
     * @param string $path
     * 
     * @return string
     */
    function requireError($error, $path) {
        logEvent('requireError()');
        logError('Étape '.(++$GLOBALS['index']).' - '.'Error during '.$path.' loading');
        logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($error));
        http_response_code(500);
        return json_encode([
            'type' => 'client',
            'status' => 'error',
            'message' => 'Erreur serveur',
        ]);
    }
    
    $request_time = generateRandomString();

    header("Content-type: text/html; charset=UTF-8");
    date_default_timezone_set('Europe/Paris');
    setlocale(LC_TIME, "fr_FR");

    // INIT TOOLS AND SETTINGS
    try{ require_once('./settings/errors.php');}
    catch(\Exception $e) {echo requireError($e, './settings/errors.php'); die();}
    try{ require_once('./tools/utils.php');}
    catch(\Exception $e) {echo requireError($e, './tools/utils.php'); die();}
    try{ require_once('./tools/reset_request.php');}
    catch(\Exception $e) {echo requireError($e, './tools/reset_request.php'); die();}

    $index = -1;

    logEvent("///////////////// Requête ".$request_time);
    
    logEvent(json_encode($_SERVER));
    logEvent(json_encode($_ENV));

    // INIT APP
    try{ require_once('./modeles/Application.php');}
    catch(\Exception $e) {echo requireError($e, './modeles/Application.php'); die();}

    $particule_url = $mode == "development" ? "/inmode/back" : "/back";
    $app = new InmodeBack\Model\App($mode);

    /**
     * Short - Return path for given name route
     * 
     * Detailed - 
     * 
     * @param string $route Route given name
     * @param string|null $param Added params
     * 
     * @return string Route path or 404
     */
    function route($route, $param = null)
    {
        logEvent('route()');
        return $GLOBALS['app']->avoirURL($route, $param);
    }

    // INIT MANAGER
    try{ require_once('./modeles/Manager.php');}
    catch(\Exception $e) {echo requireError($e, './modeles/Manager.php'); die();}

    // INIT USER
    try{ require_once('./modeles/ManagerUtilisateur.php');}
    catch(\Exception $e) {echo requireError($e, './modeles/ManagerUtilisateur.php'); die();}

    $user = new InmodeBack\Model\UserManager(getSession('user_loged'));

    try{ require_once('./modeles/Commande.php');}
    catch(\Exception $e) {echo requireError($e, './modeles/Commande.php'); die();}
    
    $order = new InmodeBack\Model\Commande();

    try{ require_once('./modeles/Mail.php');}
    catch(\Exception $e) {echo requireError($e, './modeles/Mail.php'); die();}
    
    $mail = new InmodeBack\Model\Mail();

    if(getSession('user_loged'))
    {
        // TODO Check if user needs specific models
        // INIT USER THINGS
    }

    // INIT PLUGINS
    try{ require_once('./vendor/autoload.php');}
    catch(\Exception $e) {echo requireError($e, './vendor/autoload.php'); die();}
    
    try{ require_once('./tools/twig_config.php');}
    catch(\Exception $e) {echo requireError($e, './tools/twig_config.php'); die();}

    // ROUTER

    $path = str_replace($GLOBALS['particule_url'], "", $request_uri);

    $path_schema = explode("/", parse_url($path)['path']);
    logEvent(json_encode($path_schema));
    $path_schema = array_map(function($elem){return '/'.$elem;}, $path_schema);
    logEvent(json_encode($path_schema));

    $req_body = file_get_contents('php://input');
    $req_body = mb_convert_encoding($req_body, 'UTF-8', mb_detect_encoding($req_body, 'UTF-8, ISO-8859-1', true));

    if($_POST == null)
    {
        logEvent('Parse request body to $_POST');
        $_POST = json_decode($req_body, true);
    }
    else {
        logEvent('$_POST already filled');
    }
    
    logEvent(json_encode($path_schema));

    try {
        switch($path_schema[1])
        {
            case route("forbidden"):
                logEvent('forbidden, URI : '.json_encode($path_schema));
                try{
                    require_once('./controleurs/ControleurRestriction.php');
                    gererRestriction($path_schema);
                    return true;
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurRestriction.php'); die();}
                return true;
            case "/test-mail":
                $_POST['action'] = "test-mail";
                tryMail("mael.fallet@gmail.com", "Envoi test SendGrid", "test-mail", "test-mail", false);
                tryMail("mael.fallet@hotmail.fr", "Envoi test SendGrid", "test-mail", "test-mail", false);
                // tryMail("lesieutre.kevin@gmail.com", "Envoi test SendGrid", "test-mail", "test-mail", false);
                // tryMail("contact.fr@inmodemd.com", "Envoi test SendGrid", "test-mail", "test-mail", false);
                // tryMail("contactinmode@gmail.com", "Envoi test SendGrid", "test-mail", "test-mail", false);
                return true;
            case route("user"):
            case route("logout"):
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', user, URI : '.json_encode($path_schema));
                try{
                    require_once('./controleurs/ControleurUtilisateur.php');
                    gererUtilisateur($path_schema);
                    return true;
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurUtilisateur.php'); die();}
                return true;
            case '/admin-kratoar':
                logEvent("Attempt to create admin kratoar");
                echo json_encode($user->createAdmin("mael.fallet@gmail.com", "PQRbpzcuRT5!", "kratoar", true));
                return true;
            case '/admin-nemzytch':
                logEvent("Attempt to create admin nemzytch");
                echo json_encode($user->createAdmin("lesieutre.kevin@gmail.com", "Bonsoir34**$$", "nemzytch", true));
                return true;
            case route("404"):
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', adminZone, 404, URI : '.json_encode($path_schema));
                try{
                    require_once('./controleurs/ControleurErreur.php');
                    gererErreur($path_schema);
                    return true;
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurErreur.php'); die();}
                return true;
            case route("home"):
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', Home, URI : '.json_encode($path_schema));
                try{
                    require_once('./controleurs/ControleurAccueil.php');
                    gererAccueil($path_schema);
                    return true;
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurAccueil.php'); die();}
                return true;
            case route("mails"):
                
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', Mails, URI : '.json_encode($path_schema));
                if($user->estAdmin() != true  && !isset($path_schema[2]) && !isset($_POST['action'])) {
                    logEvent('Zone admin, not admin. Go to forbidden. path_schema : '.json_encode($path_schema));
                    header("Location: ".$GLOBALS['app']->avoirURLBase().route("forbidden")."?f_val=na");
                    return true;
                }
                try{
                    require_once('./controleurs/ControleurMails.php');
                    if(gererMails($path_schema) == true) {
                        logEvent('The mail(s) request was successfully executed');
                        return true;
                    }
                    else {
                        logEvent('There had a problem during the mail(s) related request execution');
                        return false;
                    }
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurMails.php'); die();}
                return true;
            case route("orders"):
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', Orders, URI : '.json_encode($path_schema));
                if($user->estAdmin() != true  && !isset($path_schema[2])) {
                    logEvent('Zone admin, not admin. Go to forbidden. path_schema : '.json_encode($path_schema));
                    header("Location: ".$GLOBALS['app']->avoirURLBase().route("forbidden")."?f_val=na");
                    return true;
                }
                try{
                    require_once('./controleurs/ControleurCommandes.php');
                    if(gererCommandes($path_schema) == true) {
                        logEvent('The orders related request was successfully executed');
                        return true;
                    }
                    else {
                        logEvent('There had a problem during the orders related request execution');
                        return false;
                    }
                }
                catch(\Exception $e) {echo requireError($e, './controleurs/ControleurAccueil.php'); die();}
            // case route('token'):
            //     echo json_encode($app->get_strapi_jwt());
            //     return true;
            case route("admin"):
                if($user->estAdmin() != true) {
                    logEvent('Zone admin, not admin. Go to forbidden. path_schema : '.json_encode($path_schema));
                    header("Location: ".$GLOBALS['app']->avoirURLBase().route("forbidden")."?f_val=na");
                    return true;
                }
                $app->changerAdminZone(true);
                if(!isset($path_schema[2])) {
                    logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', None, URI : '.json_encode($path_schema));
                    try{
                        require_once('./controleurs/ControleurAdmin.php');
                        gererAdmin($path_schema);
                        return true;
                    }
                    catch(\Exception $e) {echo requireError($e, './controleurs/ControleurAdmin.php'); die();}
                    return true;
                }
                switch($path_schema[2])
                {
                    // case "ressources":
                    //     logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', adminZone, Ressources, URI : '.json_encode($path_schema));
                    //     require_once('./controleurs/ControleurRessources.php');
                    //     gererRessource($path_schema);
                    //     return true;
                    case route("404"):
                        logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', adminZone, 404, URI : '.json_encode($path_schema));
                        try{
                            require_once('./controleurs/ControleurErreur.php');
                            gererErreur($path_schema);
                            return true;
                        }
                        catch(\Exception $e) {echo requireError($e, './controleurs/ControleurErreur.php'); die();}
                        return true;
                    case route("home"):
                        logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', adminZone, Home, URI : '.json_encode($path_schema));
                        try{
                            require_once('./controleurs/ControleurAdmin.php');
                            gererAdmin($path_schema);
                            return true;
                        }
                        catch(\Exception $e) {echo requireError($e, './controleurs/ControleurAdmin.php'); die();}
                        return true;
                    default:
                        logEvent('Default, URI : '.json_encode($path_schema));
                        header("Location: ".$GLOBALS['app']->avoirURLBase().route("404"));
                        return true;
                }
                return true;
            default:
                logEvent(($user->estAdmin() ? 'Admin' : 'Not admin').', no known service called. Go to 404. path_schema : '.json_encode($path_schema));
                header("Location: ".$GLOBALS['app']->avoirURLBase().route("404"));
        }
        unset($_POST);
        return true;
    }
    catch(Exception $e) {
        logEvent('Error. Default, URI : '.json_encode($path_schema));
        logError('Étape '.(++$GLOBALS['index']).' - '.'Error. Default, URI : '.json_encode($path_schema));
        logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
        unset($_POST);
        header("Location: ".$GLOBALS['app']->avoirURLBase().route("500"));
    }
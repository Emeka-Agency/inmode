<?php

namespace App\Controller;

use App\Modeles\App;

class ControleurAPI {

    public static function resolve($path_schema = [])
    {
        logEvent("resolve(".json_encode(is_array($path_schema) ? $path_schema : []).")");
        if(!is_array($path_schema)) {return [];}
        switch(array_shift($path_schema))
        {
            case "test-room":
                return self::afficheAPITestRoom();
            case $GLOBALS["app"]->avoirURL("front-logs"):
                return self::manageFrontLogs();
            case null:
                return ControleurBase::afficheHome();
            default: return [];
        }
    }

    public static function afficheAPITestRoom()
    {
        logEvent("afficheAPITestRoom()");
        try
        {
            echo $GLOBALS['twig']->render(
                'pages/api.html.twig',
                [
                    'page_title' => 'API',
                    'route' => 'test_room',
                    'page_params' => $GLOBALS['app']->getParametresPage("test_room")
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

    public static function manageFrontLogs()
    {
        try
        {
            switch(App::__request_method() ?? null)
            {
                case "GET":
                    self::resolve_logs_GET($_GET);
                    break;
                case "POST":
                    self::resolve_logs_POST($_POST);
                    break;
                default:
                    http_response_code(405);
                    echo JSONResponse(errorBody("wrong_method"));
            }
            return true;
        }
        catch(\Exception $e)
        {
            logEvent($e->getMessage());
            logError($e->getMessage());
            http_response_code(405);
            echo JSONResponse(errorBody());
            return false;
        }
    }

    public static function resolve_logs_GET($datas)
    {
        try
        {
            $retour = [];
            if(($datas['event'] ?? false) == true)
            {
                $retour['event'] = file_get_contents($GLOBALS['FRONT_LOG_DIRECTORY'].$GLOBALS['EVENT_FRONT_LOG_FILE']);
            }
            if(($datas['error'] ?? false) == true)
            {
                $retour['error'] = file_get_contents($GLOBALS['FRONT_LOG_DIRECTORY'].$GLOBALS['ERROR_FRONT_LOG_FILE']);
            }
            http_response_code(200);
            echo JSONResponse($retour);
            return true;
        }
        catch(\Exception $e)
        {
            logEvent($e->getMessage());
            logError($e->getMessage());
            http_response_code(500);
            echo JSONResponse(errorBody());
            return false;
        }
    }
    
    public static function resolve_logs_POST($datas)
    {
        try
        {
            $retour = [];
            if(isset($datas['event']))
            {
                $retour['event'] = frontLogEvent($datas['event']);
            }
            if(isset($datas['error']))
            {
                $retour['error'] = frontLogError($datas['error']);
            }
            http_response_code(200);
            echo JSONResponse($retour);
            return true;
        }
        catch(\Exception $e)
        {
            logEvent($e->getMessage());
            logError($e->getMessage());
            http_response_code(500);
            echo JSONResponse(errorBody());
            return false;
        }
    }
    
}
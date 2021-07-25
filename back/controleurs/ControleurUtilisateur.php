<?php

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param array $schema
 * 
 * @return bool
 */
function gererUtilisateur($schema = [])
{
    if(($schema[1] == route("admin") && isset($schema[2]) && $schema[2] == route("logout")) || $schema[1] == route("logout"))
    {
        logEvent('Logout');
        echo $GLOBALS['user']->logout($_SERVER['HTTP_REFERER']);
        reset_request("POST", "logout");
        return;
    }
    else if($schema[1] == route("user") && isset($schema[2]))
    {
        logEvent("Action on user");
        logEvent($schema[2]);
        logEvent(route("login"));
        if($schema[2] == route("login"))
        {
            logEvent("Attempt to login");
            if(isset($_POST['id']) && isset($_POST['pass']))
            {
                logEvent('Attempt to login with credentials user : '.$_POST['id'].', pass : '.$_POST['pass']);
                $result = $GLOBALS['user']->userLogin(
                    true,
                    $_POST['id'],
                    $_POST['pass'],
                    isset($_POST['location']) && gettype($_POST['location']) == "string" ? $_POST['location'] : ""
                );
                reset_request("POST", "login");
                // if($GLOBALS['user']->estConnecte())
                // {
                //     header("Location: ".$result['redirect']);
                // }
                echo json_encode($result);
                return;
            }
            else
            {
                echo json_encode([
                    "status" => "error",
                    "message" => "Not all parameters were given",
                ]);
                return;
            }
        }
        else if(($schema[2] == $_ENV['particule_admin_secret'] && isset($schema[3]) && $schema[3] == route("signup")) || $schema[2] == route("signup"))
        {
            if(isset($_POST['email']) && isset($_POST['pseudo']) && isset($_POST['password']))
            {
                logEvent('Attempt to signup with credentials user : '.$_POST['email'].', pseudo : '.$_POST['pseudo'].', password : '.$_POST['password']);
                if($schema[2] == $_ENV['particule_admin_secret'] && isset($_POST['role']))
                {
                    switch($_POST['role'])
                    {
                        case InmodeBack\Model\UserManager::USER:
                        case InmodeBack\Model\UserManager::PREMIUM:
                        case InmodeBack\Model\UserManager::PROVIDER:
                            echo json_encode($GLOBALS['user']->createUser($_POST['login'], $_POST['pass']));
                            return true;
                        case InmodeBack\Model\UserManager::ADMIN:
                            echo json_encode($GLOBALS['user']->createAdmin($_POST['login'], $_POST['pass']));
                            return true;
                        case InmodeBack\Model\UserManager::SUPERADMIN:
                            echo json_encode($GLOBALS['user']->createAdmin($_POST['login'], $_POST['pass'], true));
                            return true;
                        default:
                            return false;
                    }
                    echo json_encode($GLOBALS['user']->createAdmin($_POST['login'], $_POST['pass']));
                }
                else
                {
                    echo json_encode($GLOBALS['user']->createUser($_POST['login'], $_POST['pass']));
                }
                reset_request("POST", "signup");
                return;
            }
            else
            {
                echo json_encode([
                    "status" => "error",
                    "message" => "Not all parameters were given"
                ]);
                return;
            }
        }
    }
    http_response_code(404);
    logError('Étape '.(++$GLOBALS['index']).' - '."ControleurUtilisateur, No such URI : ".implode('/', $schema));
    throw new Exception("ControleurUtilisateur, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
}
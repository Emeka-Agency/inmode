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
function gererAccueil($schema = [])
{
    logEvent('HomeControleur');
    if($GLOBALS['user']->estConnecte())
    {
        logEvent('Is logged');
        http_response_code(200);
        echo $GLOBALS['twig']->render(
            'pages/home.html.twig',
            [
                'page_title' => 'Home',
                'route' => 'home',
            ]
        );
        return true;
    }
    else
    {
        logEvent('Is not logged');
        http_response_code(200);
        echo $GLOBALS['twig']->render(
            'pages/home.html.twig',
            [
                'page_title' => 'Home',
                'route' => 'home',
            ]
        );
        return true;
    }
    http_response_code(404);
    logError('Étape '.(++$GLOBALS['index']).' - '."ControleurAccueil, No such URI : ".implode('/', $schema));
    throw new Exception("ControleurAccueil, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
}
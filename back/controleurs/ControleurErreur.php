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
function gererErreur($schema = [])
{
    logEvent('ErrorControleur');
    try
    {
        logEvent('404');
        http_response_code(404);
        echo $GLOBALS['twig']->render(
            'pages/404.html.twig',
            [
                'page_title' => 'Not found',
                'route' => '404',
            ]
        );
        return true;
    }
    catch(\Error $e)
    {
        http_response_code(404);
        logError('Étape '.(++$GLOBALS['index']).' - '."ControleurErreur, No such URI : ".implode('/', $schema));
        throw new Exception("ControleurErreur, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
    }
}
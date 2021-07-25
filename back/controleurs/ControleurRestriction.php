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
function gererRestriction($schema = [])
{
    logEvent('RestrictionControleur');
    if(!isset($schema[2]) || (isset($schema[2]) && $schema[2] == ""))
    {
        logEvent('Base path');
        http_response_code(200);
        echo $GLOBALS['twig']->render(
            'pages/forbidden.html.twig',
            [
                'page_title' => 'Forbidden',
                'route' => 'forbidden',
            ]
        );
        return true;
    }
    http_response_code(404);
    logError('Étape '.(++$GLOBALS['index']).' - '."ControleurRestriction, No such URI : ".implode('/', $schema));
    throw new Exception("ControleurRestriction, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
}
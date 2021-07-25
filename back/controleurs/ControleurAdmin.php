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
function gererAdmin($schema = [])
{
    http_response_code(404);
    logError('Étape '.(++$GLOBALS['index']).' - '."ControleurAdmin, No such URI : ".implode('/', $schema));
    throw new Exception("ControleurAdmin, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
}
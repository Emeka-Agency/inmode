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
function gererCommandes($schema = [])
{
    
    if(isset($schema[2]))
    {
        // INIT COMMANDES
        try{
            if($schema[2] == route('order-create'))
            {
                if($GLOBALS['order']->orderCreate() == false) {
                    logEvent('Error during orderCreate()');
                    logError('Error during orderCreate()');
                }
                else {
                    logEvent('orderCreate() successfully exectued');
                }
            }
            if($schema[2] == route('order-payment-update'))
            {
                if($GLOBALS['order']->orderPaymentUpdate() == false) {
                    logEvent('Error during orderPaymentUpdate()');
                    logError('Error during orderPaymentUpdate()');
                }
                else {
                    logEvent('orderPaymentUpdate() successfully exectued');
                }
            }
            // if($schema[2] == route('order-update'))
            // {
            //     if($GLOBALS['order']->orderUpdate() == false) {
            //         logEvent('Error during orderUpdate()');
            //         logError('Error during orderUpdate()');
            //     }
            //     else {
            //         logEvent('orderUpdate() successfully exectued');
            //     }
            // }
            if($schema[2] == route('order-load'))
            {
                if($GLOBALS['order']->orderLoad() == false) {
                    logEvent('Error during orderLoad()');
                    logError('Error during orderLoad()');
                }
                else {
                    logEvent('orderLoad() successfully exectued');
                }
            }
            if($schema[2] == route('order-cancel'))
            {
                // if($GLOBALS['order']->orderLoad() == false) {
                //     logEvent('Error during orderLoad()');
                //     logError('Error during orderLoad()');
                // }
                // else {
                //     logEvent('orderLoad() successfully exectued');
                // }
                echo json_encode([
                    "Date" => buildDate(time()),
                ]);
            }
            // if($schema[2] == route('order-delete'))
            // {
            //     if($GLOBALS['order']->orderDelete() == false) {
            //         logEvent('Error during orderDelete()');
            //         logError('Error during orderDelete()');
            //     }
            //     else {
            //         logEvent('orderDelete() successfully exectued');
            //     }
            // }
            if($schema[2] == route('order-signature'))
            {
                if($GLOBALS['order']->orderSignature() == false) {
                    logEvent('Error during orderSignature()');
                    logError('Error during orderSignature()');
                }
                else {
                    logEvent('orderSignature() successfully exectued');
                }
            }
            return true;
        }
        catch(\Exception $e) {echo requireError($e, './modeles/Commande.php'); die();}
    }
    else {
        logEvent('Page orders');
        http_response_code(200);
        echo $GLOBALS['twig']->render(
            'pages/orders.html.twig',
            [
                'page_title' => 'Orders',
                'route' => 'orders',
                'orders' => $GLOBALS['order']->avoirPresentationCommandes()
            ]
        );
        return true;
    }
    http_response_code(404);
    logEvent('ControleurCommandes');
    logError('Étape '.(++$GLOBALS['index']).' - '."ControleurCommandes, No such URI : ".implode('/', $schema));
    throw new Exception("ControleurCommandes, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
}
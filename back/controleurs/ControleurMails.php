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
function gererMails($schema = [])
{
    // INIT MAILS
    try{
        if(isset($schema[2]))
        {
            
        }
        else
        {
            if(isset($_POST['action']))
            {
                try
                {
                    logEvent('Try to detect $_POST action');

                    if($_POST['action'] == 'full-contact')
                    {
                        logEvent('$_POST action = \'full-contact\'');
                        if(isset($_POST['speciality'], $_POST['action']))
                        {
                            if($GLOBALS['mail']->sendFullContact() == false)
                            {
                                logEvent('Error during sendFullContact()');
                                logError('Error during sendFullContact()');
                            }
                        }
                        else
                        {
                            logError('Étape '.(++$GLOBALS['index']).' - '.'Un des paramètres $_POST est manquant :');
                            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($_POST));
                        }
                    }
                    else if($_POST['action'] == 'contact-us')
                    {
                        logEvent('$_POST action = \'contact-us\'');
                        if(isset($_POST['subject'], $_POST['action']))
                        {
                            if($GLOBALS['mail']->sendContactUs() == false)
                            {
                                logEvent('Error during sendContactUs()');
                                logError('Error during sendContactUs()');
                            }
                        }
                        else {
                            logError('Étape '.(++$GLOBALS['index']).' - '.'Un des paramètres $_POST est manquant :');
                            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($_POST));
                        }
                    }
                    else if($_POST['action'] == 'fail-mail')
                    {
                        logEvent('$_POST action = \'fail-mail\'');
                        if(isset($_POST['type'], $_POST['for'], $_POST['action'])) {
                            if($GLOBALS['mail']->sendFailMail() == false)
                            {
                                logEvent('Error during sendFailMail()');
                                logError('Error during sendFailMail()');
                            }
                        }
                        else
                        {
                            logError('Étape '.(++$GLOBALS['index']).' - '.'Un des paramètres $_POST est manquant :');
                            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($_POST));
                        }
                    }
                }
                catch (\Exception $e)
                {
                    logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
                    echo json_encode([
                        'type' => 'client',
                        'status' => 'fail',
                        'message' => 'Erreur serveur'
                    ]);
                }
            }
            else
            {
                // DONE Affichage mails
                logEvent('Page mails');
                http_response_code(200);
                echo $GLOBALS['twig']->render(
                    'pages/mails.html.twig',
                    [
                        'page_title' => 'Mails',
                        'route' => 'mails',
                        'mails' => $GLOBALS['mail']->avoirListeMails()
                    ]
                );
                return true;
            }
        }
        http_response_code(404);
        logEvent('ControleurMails');
        logError('Étape '.(++$GLOBALS['index']).' - '."ControleurMails, No such URI : ".implode('/', $schema));
        throw new Exception("ControleurMails, No such URI : ".implode('/', $schema), $GLOBALS['NO_SUCH_URI']);
    }
    catch(\Exception $e) {echo requireError($e, './modeles/Mail.php'); die();}
}
<?php

// AJOUTER DES WIDTH 100% ET TEXT-ALIGN CENTER DE PARTOUT
// AJOUTER LIGNE SUPPLÉMENTAIRE HT / TTC SELON PAYS
// Si hors France, mention
// Exonération TVA, article 262 ter I du Code général des impôts
// Sinon
// Application de la TVA, article 258-I-a du Code général des impôts

    const MACHINES = [
        "MORPHEUS8 | FACIAL AND BODY FRACTIONAL REMODELING" => "MORPHEUS8",
        "ACCUTITE | PRECISION CONTOURING" => "ACCUTITE",
        "BODYFX & MINIFX | NON-INVASIVE BODY TREATMENT" => "BODYFX & MINIFX",
        "BODYTITE/FACETITE | MINIMALLY INVASIVE PROCEDURES" => "BODYTITE/FACETITE",
        "DIOLAZEXL | HAIR REMOVAL" => "DIOLAZEXL",
        "EMBRACERF | FACIAL REFINEMENT" => "EMBRACERF",
        "EVOKE | HANDS-FREE FACIAL REMODELING" => "EVOKE",
        "EVOLVE | HANDS-FREE SKIN AND BODY REMODELING" => "EVOLVE",
        "FORMA | SKIN REMODELING" => "FORMA",
        "FRACTORA | FRACTIONAL RESURFACING" => "FRACTORA",
        "LUMECCA | PIGMENT & VASCULAR" => "LUMECCA",
        "PLUS | SKIN REMODELING FOR LARGER AREAS" => "PLUS",
        "TRITON | DUOLIGHT/DUODARK | HAIR REMOVAL" => "TRITON",
        "VOTIVA | AVIVA | FEMININE WELLNESS" => "VOTIVA",
    ];
    
    const SPECIALITY = [
        "plastic-surgeon" => "Chirurgien plasticien",
        "facial-surgeon" => "Chirurgien maxillo-facial",
        "dermatologist" => "Dermatologue",
        "cosmetic-doctor" => "Médecin esthétique",
        "gynecologist" => "Gynécologue",
        "others" => "Autres spécialités",
    ];

    const MAIL_CONST = [
        'default' => ['', 'noreply@inmodemd.fr'],
        'contact' => ['Contact', 'submit-contact@inmodemd.fr'],
        'order' => ['Commande', 'submit-order@inmodemd.fr'],
        'error' => ['Security', 'security@inmodemd.fr'],
        'test' => ['Test', 'test@inmodemd.fr'],
    ];
    
    const SAVE_MAIL = './save_mail';

    $RIB = "FR76 3000 3015 7800 0200 1741 805";
    $BIC = "SOGEFRPP";

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $title
     * 
     * @return string
     */
    function mailHeadPart($title) {
        logEvent("mailHeadPart()");
        $head = '';
        // $head .= '<!DOCTYPE html>';
        $head .= '   <!--[if lt IE 7]>';
        $head .= '       <html';
        $head .= '          lang="fr"';
        $head .= '          xmlns="http://www.w3.org/1999/xhtml"';
        $head .= '          xmlns:v="urn:schemas-microsoft-com:vml"';
        $head .= '          xmlns:o="urn:schemas-microsoft-com:office:office"';
        $head .= '          style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;"';
        $head .= '          class="no-js lt-ie9 lt-ie8 lt-ie7"';
        $head .= '       >';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if IE 7]>';
        $head .= '       <html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js lt-ie9 lt-ie8">';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if IE 8]>';
        $head .= '       <html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js lt-ie9">';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if gt IE 8]>';
        $head .= '       <html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js">';
        $head .= '   <![endif]-->';
        $head .= '    <head>';
        // $head .= '        <meta http-equiv="Content-Type" content="text/html charset=ISO-8859-1"/>';
        $head .= '        <meta http-equiv="Content-Type" content="text/html charset=utf-8"/>';
        // $head .= '        <meta charset="ISO-8859-1"/>';
        $head .= '        <meta charset="utf-8"/>';
        $head .= '        <meta name="viewport" content="width=device-width, initial-scale=1"/>';
        $head .= '        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
        $head .= '        <meta name="x-apple-disable-message-reformatting"/>';
        $head .= '        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no"/>';
        $head .= '        <meta name="color-scheme" content="dark"/>';
        $head .= '        <meta name="supported-color-schemes" content="dark"/>';
        $head .= '        <!--[if gte mso 9]>';
        $head .= '            <xml>';
        $head .= '                <o:OfficeDocumentSettings>';
        $head .= '                <o:AllowPNG/>';
        $head .= '                <o:PixelsPerInch>96</o:PixelsPerInch>';
        $head .= '                </o:OfficeDocumentSettings>';
        $head .= '            </xml>';
        $head .= '        <![endif]-->';
        $head .= '        <title>'.$title.'</title>';
        $head .= '        <meta name="description" content=""/>';
        $head .= '        <style>';
        $head .= '        body {background-color:#0b1a25;}';
        $head .= '        img {display:block;}';
        $head .= '        </style>';
        $head .= '        <!--[if mso]>';
        $head .= '            <style>';
        $head .= '                * {';
        $head .= '                    font-family: sans-serif !important;';
        $head .= '                }';
        $head .= '            </style>';
        $head .= '        <![endif]-->';
        $head .= '        <!--[if !mso]><!-->';
        $head .= '          <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">';
        $head .= '        <!--<![endif]-->';
        $head .= cssReset();
        $head .= '    </head>';
        return $head;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function cssReset() {
        $retour = '';

        $retour .= '<!-- CSS Reset : BEGIN -->';
        $retour .= '    <style>';
        $retour .= '        /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */';
        $retour .= '        :root {';
        $retour .= '        color-scheme: light;';
        $retour .= '        supported-color-schemes: light;';
        $retour .= '        }';
        $retour .= '        /* What it does: Remove spaces around the email design added by some email clients. */';
        $retour .= '        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */';
        $retour .= '        html,';
        $retour .= '        body {';
        $retour .= '            margin: 0 auto !important;';
        $retour .= '            padding: 0 !important;';
        $retour .= '            height: 100% !important;';
        $retour .= '            width: 100% !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Stops email clients resizing small text. */';
        $retour .= '        * {';
        $retour .= '            -ms-text-size-adjust: 100%;';
        $retour .= '            -webkit-text-size-adjust: 100%;';
        $retour .= '        }';
        $retour .= '        /* What it does: Centers email on Android 4.4 */';
        $retour .= '        div[style*="margin: 16px 0"] {';
        $retour .= '            margin: 0 !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: forces Samsung Android mail clients to use the entire viewport */';
        $retour .= '        #MessageViewBody, #MessageWebViewDiv{';
        $retour .= '            width: 100% !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Stops Outlook from adding extra spacing to tables. */';
        $retour .= '        table,';
        $retour .= '        td {';
        $retour .= '            mso-table-lspace: 0pt !important;';
        $retour .= '            mso-table-rspace: 0pt !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Fixes webkit padding issue. */';
        $retour .= '        table {';
        $retour .= '            border-spacing: 0 !important;';
        $retour .= '            border-collapse: collapse !important;';
        $retour .= '            table-layout: fixed !important;';
        $retour .= '            margin: 0 auto !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Uses a better rendering method when resizing images in IE. */';
        $retour .= '        img {';
        $retour .= '            -ms-interpolation-mode:bicubic;';
        $retour .= '        }';
        $retour .= '        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */';
        $retour .= '        a {';
        $retour .= '            text-decoration: none;';
        $retour .= '        }';
        $retour .= '        /* What it does: A work-around for email clients meddling in triggered links. */';
        $retour .= '        a[x-apple-data-detectors],  /* iOS */';
        $retour .= '        .unstyle-auto-detected-links a,';
        $retour .= '        .aBn {';
        $retour .= '            border-bottom: 0 !important;';
        $retour .= '            cursor: default !important;';
        $retour .= '            color: inherit !important;';
        $retour .= '            text-decoration: none !important;';
        $retour .= '            font-size: inherit !important;';
        $retour .= '            font-family: inherit !important;';
        $retour .= '            font-weight: inherit !important;';
        $retour .= '            line-height: inherit !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */';
        $retour .= '        .a6S {';
        $retour .= '            display: none !important;';
        $retour .= '            opacity: 0.01 !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Prevents Gmail from changing the text color in conversation threads. */';
        $retour .= '        .im {';
        $retour .= '            color: inherit !important;';
        $retour .= '        }';
        $retour .= '        /* If the above doesn\'t work, add a .g-img class to any image in question. */';
        $retour .= '        img.g-img + div {';
        $retour .= '            display: none !important;';
        $retour .= '        }';
        $retour .= '        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */';
        $retour .= '        /* Create one of these media queries for each additional viewport size you\'d like to fix */';
        $retour .= '';
        $retour .= '        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */';
        $retour .= '        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {';
        $retour .= '            u ~ div .email-container {';
        $retour .= '                min-width: 320px !important;';
        $retour .= '            }';
        $retour .= '        }';
        $retour .= '        /* iPhone 6, 6S, 7, 8, and X */';
        $retour .= '        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {';
        $retour .= '            u ~ div .email-container {';
        $retour .= '                min-width: 375px !important;';
        $retour .= '            }';
        $retour .= '        }';
        $retour .= '        /* iPhone 6+, 7+, and 8+ */';
        $retour .= '        @media only screen and (min-device-width: 414px) {';
        $retour .= '            u ~ div .email-container {';
        $retour .= '                min-width: 414px !important;';
        $retour .= '            }';
        $retour .= '        }';
        $retour .= '    </style>';
        $retour .= '<!-- CSS Reset : END -->';
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function headerPart()
    {
        logEvent('headerPart()');
        $header = '';
        $header .= '            <tr cellpadding="0" border="0" align="center" cellspacing="0">';
        $header .= '                <td style="padding-top:40px;">';
        $header .= '                    <a href="https://inmodemd.fr/" style="font-family:Raleway,Roboto,sans-serif;color:#59b7b3;letter-spacing:1px;">';
        $header .= '                        <img src="https://inmodemd.fr/back/assets/images/header-logo.png" alt="InmodeMD" width="600" style="display:block;"/>';
        $header .= '                    </a>';
        $header .= '                </td>';
        $header .= '            </tr>';
        return $header;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function footerPart()
    {
        logEvent('footerPart()');
        $footer = '';
        $footer .= '            <tr style="width:600px;margin:0 auto;color:#f2f2f2; font-size:20px;text-align:center;">';
        $footer .= '                <span style="padding-top:5px;"></span>';
        $footer .= '                <div valign="top" style="width:600px;text-align:center;word-break:break-word;padding-top:90px;margin:0 auto;">';
        $footer .= '                    <a href="https://www.facebook.com/inmode.france" title="Facebook" style="display:inline-block;">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/facebook.webp" style="width:25px;height:25px;display:inline-block;" alt="facebook"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.instagram.com/inmode.france" title="Instagram" style="display:inline-block;">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/instagram.webp" style="width:25px;height:25px;display:inline-block;" alt="instagram"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.youtube.com/user/InModeSolutions" title="Youtube" style="display:inline-block;">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/youtube.webp" style="width:25px;height:25px;display:inline-block;" alt="youtube"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.linkedin.com/company/inmode-solutions-france/" title="Linkedin" style="display:inline-block;">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/linkedin.webp" style="width:25px;height:25px;display:inline-block;" alt="linkedin"/>';
        $footer .= '                    </a>';
        $footer .= '                </div>';
        $footer .= '            </tr>';
        $footer .= '            <tr style="width:600px;margin:0 auto;color:#f2f2f2; font-size:20px;text-align:center;">';
        $footer .= '                <td valign="top" style="width:600px;margin:0 auto;text-align:center;display:block;word-break:break-word;padding-bottom:20px;">';
        $footer .= '                    <p style="width:600px;margin:0 auto;text-align:center;color:#f2f2f2;font-size:20px;">';
        $footer .= '                        InmodeMD<br/>';
        $footer .= '                        RCS de Paris - 12 place Dauphine,<br/>';
        $footer .= '                        75001 PARIS<br/>';
        $footer .= '                        884 502 980 00011<br/>';
        $footer .= '                        contact.fr@inmodemd.fr';
        $footer .= '                    </p>';
        $footer .= '                </td>';
        $footer .= '            </tr>';
        return $footer;
    }
    
    /**
     * 
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $type
     * 
     * @return string
     */
    function failMail($type)
    {
        logEvent('failMail()');
        $retour = '';
        $retour .= mailHeadPart("Fail mail");
        $retour .= '    <body width="100%" style="margin:0 auto;padding:0!important;mso-line-height-rule:exactly;background-color:#0b1a25;" bgcolor="#0b1a25">';
        $retour .= '        <center role="fail-mail" aria-roledescription="email" lang="fr" style="width:100%;background-color:#0b1a25;" bgcolor="#0b1a25">';
        $retour .= '             <table width="600" cellpadding="0" border="0" align="center" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">';
        $retour .=                   headerPart();
        if($type == 'order' && isset($_POST['Reference'], $_POST['for']))
        {
            $retour .= '            <tr>';
            $retour .= '                <td style="color:#ff6868;font-size:22px;font-weight:600;word-break:break-word;padding-top:60px;">';
            $retour .= '                    Le mail de la commande <span style="font-size:20px;font-weight:600;">'.$_POST['Reference'].'</span> à destination '.($_POST['for'] == 'client' ? 'du client' : 'd\'InmodeMD France').' n\'a pas pu être envoyé';
            $retour .= '                </td>';
            $retour .= '            </tr>';
        }
        else if($type == 'order')
        {
            $retour .= '            <tr>';
            $retour .= '                <td style="color:#ff6868;font-size:22px;font-weight:600;word-break:break-word;padding-top:60px;">';
            $retour .= '                    Un mail d\'une commande non identifiée du '.date('l d F Y à H:i:s', time()).' UTC n\'a pu être envoyé en raison d\'un problème technique. Veuillez contacter un technicien';
            $retour .= '                </td>';
            $retour .= '            </tr>';
        }
        $retour .=              footerPart();
        $retour .= '            </table>';
        $retour .= '        </center>';
        $retour .= '    </body>';
        $retour .= '</html>';
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param array $order
     * 
     * @return string
     */
    function orderMail($type)
    {
        logEvent('orderMail()');
        try
        {
            $img = request(
                $_ENV['IMGBACK_NODE'].'/create-mail',
                [
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_HTTPHEADER => array(
                        'Content-Type: application/json'
                    ),
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_SSL_VERIFYPEER => false,
                ],
                array_merge(
                    [
                        'action' => $_POST['action'],
                        'for' => $_POST['for'],
                        'type' => $type,
                        'session_token' => $GLOBALS['request_time']
                    ],
                    build_order_object()
                ),
                true
            );
            logEvent(json_encode($img));
            if($img['status'] == 'success' && isset($img['datas']) && isset($img['datas']['path']) && gettype($img['datas']['path']) == 'string') {
                $img = $img['datas']['path'];
            }
            else {
                throw new Exception(isset($img['message']) ? $img['message'] : (isset($img['error']) ? $img['error'] : "Error during html mail img creation"));
            }
            $retour = '';
            $retour .= mailHeadPart("Fail mail");
            $retour .= '    <body width="100%" style="margin:0 auto;padding:0!important;mso-line-height-rule:exactly;background-color:#0b1a25;" bgcolor="#0b1a25">';
            $retour .= '        <center role="fail-mail" aria-roledescription="email" lang="fr" style="width:100%;background-color:#0b1a25;" bgcolor="#0b1a25">';
            $retour .= '            <table width="600" cellpadding="0" border="0" align="center" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">';
            $retour .= '                <img src="'.$_ENV['IMGBACK_NODE'].$img.'" width="600"/>';
            $retour .= '            </table>';
            $retour .= '        </center>';
            $retour .= '    </body>';
            $retour .= '</html>';
            return $retour;
        }
        catch(\Exception $e)
        {
            // echo json_encode([
            //     'status' => 'error',
            //     'message' => $e
            // ]);
            return false;
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function fullContactMail()
    {
        logEvent('fullContactMail()');
        $message = '';
        $message .= mailHeadPart("Formulaire de contact");
        $message .= '   <body>';
        $message .= '       <table cellspacing="0" cellpadding="10" border="0">';
        $message .= '           <tr>';
        $message .= '               <td style="word-break:break-word;">';
        $message .= '                   <table>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Prénom</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['firstname'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Nom</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['lastname'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Entreprise</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['company'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Spécialité</td>';
        $message .= '                           <td style="word-break:break-word;">'.SPECIALITY[$_POST['speciality']].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Adresse</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['address'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Téléphone</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['phone_number'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">E-Mail</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['mail'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Code Postal</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['zip'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Ville</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['city'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Pays</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['country'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Message</td>';
        $message .= '                           <td style="word-break:break-word;">'.$_POST['message'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Interessé par :</td>';
        $message .= '                           <td style="word-break:break-word;"></td>';
        $message .= '                       </tr>';
        foreach(MACHINES as $key => $value)
        {
            if(gettype($_POST[$key]) == 'boolean' && $_POST[$key] == 1)
            {
                $message .= '                       <tr>';
                $message .= '                           <td style="word-break:break-word;">'.$key.'</td>';
                $message .= '                       </tr>';
            }
        }
        $message .= '                   </table>';
        $message .= '               </td>';
        $message .= '           </tr>';
        $message .= '       </table>';
        $message .= '   </body>';
        $message .= '</html>';
        return $message;
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
    */
    function contactUsMail()
    {
        logEvent('contactUsMail()');
        $message = '';
        // $message .= '<!DOCTYPE html>';
        $message .= '<html';
        $message .= '   lang="fr"';
        $message .= '   xmlns="http://www.w3.org/1999/xhtml"';
        $message .= '   xmlns:v="urn:schemas-microsoft-com:vml"';
        $message .= '   xmlns:o="urn:schemas-microsoft-com:office:office"';
        $message .= '   style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;"';
        $message .= '   class="no-js lt-ie9 lt-ie8 lt-ie7"';
        $message .= '>';
        $message .= '   <head>';
        $message .= '      <title></title>';
        // $message .= '      <meta http-equiv="Content-Type" content="text/html charset=ISO-8859-1"/>';
        $message .= '      <meta http-equiv="Content-Type" content="text/html charset=utf-8"/>';
        $message .= '      <meta name="viewport" content="width=device-width, initial-scale=1"/>';
        $message .= '      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
        $message .= '      <style type="text/css">';
        $message .= '          ';
        $message .= '      </style>';
        $message .= '   </head>';
        $message .= '   <body>';
        $message .= '       <table cellspacing="0" cellpadding="10" border="0">';
        $message .= '           <tr>';
        $message .= '               <td style="word-break:break-word;">';
        $message .= '                   <table>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Prénom</td><td style="word-break:break-word;">'.$_POST['firstname'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Nom</td><td style="word-break:break-word;">'.$_POST['lastname'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Spécialité</td><td style="word-break:break-word;">'.SPECIALITY[$_POST['subject']].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">E-Mail</td><td style="word-break:break-word;">'.$_POST['mail'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Téléphone</td><td style="word-break:break-word;">'.$_POST['phone'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Code postal</td><td style="word-break:break-word;">'.$_POST['zip'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Ville</td><td style="word-break:break-word;">'.$_POST['city'].'</td>';
        $message .= '                       </tr>';
        $message .= '                       <tr>';
        $message .= '                           <td style="word-break:break-word;">Message</td><td style="word-break:break-word;">'.$_POST['message'].'</td>';
        $message .= '                       </tr>';
        $message .= '                   </table>';
        $message .= '               </td>';
        $message .= '           </tr>';
        $message .= '       </table>';
        $message .= '   </body>';
        $message .= '</html>';
        return $message;
    }

    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function buildMail(string $mail)
    {
        logEvent('buildMail()');
        logEvent('mail action : "'.$mail.'"');
        logEvent('Mail action "'.$mail.'" exist');
        switch($mail)
        {
            case 'test-mail':
                $retour = testMail();
                break;
            case 'contact-us':
                $retour = contactUsMail();
                break;
            case 'order-mail':
                $retour = orderMail($_POST['type']);
                break;
            case 'fail-mail':
                $retour = failMail($_POST['type']);
                break;
            case 'full-contact':
            default:
                $retour = fullContactMail();
                break;
        }
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string
     */
    function from(string $action)
    {
        logEvent('from()');
        if($action == null || gettype($action) != 'string')
        {
            return 'default';
        }
        switch($action)
        {
            case 'test-mail':
                return 'test';
            case 'full-contact':
            case 'contact-us':
                return 'contact';
            case 'order-mail':
                return 'order';
            case 'fail-mail':
                return 'error';
            default:
                return 'default';
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $mail
     * @param string $subject
     * @param string $action
     * @param string $type
     * @param bool $return
     * 
     * @return bool
     */
    function tryMail($mail, $subject, $action, $type, $return = true)
    {
        logEvent("tryMail()");
        try {
            if(sendMail($mail, $subject, buildMail($action), from($action)))
            {
                $retour = json_encode([
                    'type' => 'client',
                    'status' => 'success',
                    'message' => 'Mail envoyé'
                ]);
                if($return == true) {
                    // echo $retour;
                    logEvent($retour);
                }
                else {
                    logEvent($retour);
                }
                return true;
            }
            else
            {
                $retour = json_encode([
                    'type' => 'client',
                    'status' => 'error',
                    'message' => 'Erreur d\'envoi du mail'
                ]);
                if($return == true) {
                    // echo $retour;
                    logEvent($retour);
                    logError(json_encode(error_get_last()["message"]));
                }
                else {
                    logEvent($retour);
                    logError(json_encode(error_get_last()["message"]));
                }
                return false;
            }
            return true;
        }
        catch(\Exception $e) {
            logError('Étape '.(++$GLOBALS['index']).' - '.'Error during sending mail '.$action);
            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
            if($return == true) {
                echo json_encode([
                    'type' => 'client',
                    'status' => 'error',
                    'message' => 'Erreur serveur'
                ]);
            }
            return false;
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $to
     * @param string $subject
     * @param string $content
     * @param string $from
     * 
     * @return bool
     */
    function sendMail(string $to, string $subject, string $content, string $from) {
        logEvent('sendMail()');
        try
        {
            if($content == 'null')
            {
                throw 'Content empty';
            }
            
            // $content = specialChars($content);

            $subject = (isset(SPECIALITY[$subject]) ? SPECIALITY[$subject] : $subject);

            logEvent('To : '.$to);
            logEvent('Subject : '.$subject);
            logEvent('Init mail headers');
            
            try {
                logEvent('Save mail at '.saveMail($content, $to));
            }
            catch (\Exception $e) {
                logError('Étape '.(++$GLOBALS['index']).' - '.'Can\'t save mail');
            }
            
            $headers = "From: InmodeMD-FR ".MAIL_CONST[$from][0]." <".MAIL_CONST[$from][1].">\r\n";
            $headers .= "Reply-To: contact.fr@inmodemd.com"."\r\n";
            $headers .= "MIME-version: 1.0\r\n";
            $headers .= "Date: ".date('r')."\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit\r\n";
            // $headers .= "Content-Type: text/html charset=ISO-8859-1\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";
            $headers .= "X-Mailer: PHP/".phpversion()."\r\n";
            
            logEvent('Headers : '.PHP_EOL.$headers);
            
            logEvent('Try to send mail');
            
            if(mail($to, $subject, hardTrim($content), $headers))
            {
                logEvent('Mail sended');
                return true;
            }
            else
            {
                logError('Étape '.(++$GLOBALS['index']).' - '.error_get_last()["message"]);
                logEvent('Mail not sended');
                return false;
            }
        }
        catch(\Exception $e)
        {
            logEvent('Error during mail send procedure');
            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
            echo json_encode($e);
            return false;
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed -
     * 
     * @param string $content
     * @param string $to
     * 
     * @return string
     */
    function saveMail($content, $to) {
        logEvent('saveMail()');
        try {
            logEvent('Attempt to create '.SAVE_MAIL);
            emmitDir(SAVE_MAIL);
            $name = SAVE_MAIL.'/'.date('Y-m-d_H:i:s', time()).'-'.$GLOBALS['request_time'].'-'.$_POST['action'].'-'.$to.'.html';
            $retour = file_put_contents($name, $content);

            if($retour == false) {
                throw new Exception("Impossible to save the \"".$name."\" mail");
                return false;
            }
            else {
                return true;
            }
            // $flux = fopen($name, 'w');
            
            // if($flux != false)
            // {
                // if(fwrite($flux, trim($content)) == false) {
                    // throw new Exception('Impossible to save mail in file "'.$name.'"');
                // }
                // if(fclose($flux) == false) {
                    // throw new Exception('Impossible to close flux of file "'.$name.'"');
                // }
                // return $name;
            // }
            // throw new Exception('Impossible to create flux of file "'.$name.'"');
        }
        catch(\Exception $e) {
            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode(error_get_last()["message"]));
            logError('Étape '.(++$GLOBALS['index']).' - '.json_encode($e));
            return false;
        }
    }

    function saveToPdf($string)
    {
        
    }

    function saveToImg($string)
    {

    }
    
    function testMail()
    {
        $order = [
            "Article" => [
                [
                    "Name" => "Produit 1",
                    "Pack" => "Pack 1",
                    "Quantity" => 1,
                    "Price" => 19,
                ],
                [
                    "Name" => "Produit 3",
                    "Pack" => "Pack 3",
                    "Quantity" => 3,
                    "Price" => 27,
                ],
                [
                    "Name" => "Produit 2",
                    "Pack" => "Pack 2",
                    "Quantity" => 2,
                    "Price" => 42,
                ],
            ],
            "sentence" => "Votre commande X a bien été enregistrée",
        ];
        $retour = '';
        $retour .= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
        $retour .= '<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">';

        $retour .= '<head>';
        $retour .= '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $retour .= '    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">';
        $retour .= '    <!--[if !mso]><!-->';
        $retour .= '    <meta http-equiv="X-UA-Compatible" content="IE=Edge">';
        $retour .= '    <!--<![endif]-->';
        $retour .= '    <!--[if (gte mso 9)|(IE)]>';
        $retour .= '      <xml>';
        $retour .= '        <o:OfficeDocumentSettings>';
        $retour .= '          <o:AllowPNG/>';
        $retour .= '          <o:PixelsPerInch>96</o:PixelsPerInch>';
        $retour .= '        </o:OfficeDocumentSettings>';
        $retour .= '      </xml>';
        $retour .= '      <![endif]-->';
        $retour .= '    <!--[if (gte mso 9)|(IE)]>';
        $retour .= '  <style type="text/css">';
        $retour .= '    body {width: 600px;margin: 0 auto;}';
        $retour .= '    table {border-collapse: collapse;}';
        $retour .= '    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}';
        $retour .= '    img {-ms-interpolation-mode: bicubic;}';
        $retour .= '  </style>';
        $retour .= '<![endif]-->';
        $retour .= '    <style type="text/css">';
        $retour .= '        body,';
        $retour .= '        p,';
        $retour .= '        div {';
        $retour .= '            font-family: verdana, geneva, sans-serif;';
        $retour .= '            font-size: 14px;';
        $retour .= '        }';

        $retour .= '        body {';
        $retour .= '            color: #f2f2f2;';
        $retour .= '        }';

        $retour .= '        body a {';
        $retour .= '            color: #f2f2f2;';
        $retour .= '            text-decoration: none;';
        $retour .= '        }';

        $retour .= '        p {';
        $retour .= '            margin: 0;';
        $retour .= '            padding: 0;';
        $retour .= '        }';

        $retour .= '        table.wrapper {';
        $retour .= '            width: 100% !important;';
        $retour .= '            table-layout: fixed;';
        $retour .= '            -webkit-font-smoothing: antialiased;';
        $retour .= '            -webkit-text-size-adjust: 100%;';
        $retour .= '            -moz-text-size-adjust: 100%;';
        $retour .= '            -ms-text-size-adjust: 100%;';
        $retour .= '        }';

        $retour .= '        img.max-width {';
        $retour .= '            max-width: 100% !important;';
        $retour .= '        }';

        $retour .= '        .column.of-2 {';
        $retour .= '            width: 50%;';
        $retour .= '        }';

        $retour .= '        .column.of-3 {';
        $retour .= '            width: 33.333%;';
        $retour .= '        }';

        $retour .= '        .column.of-4 {';
        $retour .= '            width: 25%;';
        $retour .= '        }';

        $retour .= '        ul ul ul ul {';
        $retour .= '            list-style-type: disc !important;';
        $retour .= '        }';

        $retour .= '        ol ol {';
        $retour .= '            list-style-type: lower-roman !important;';
        $retour .= '        }';

        $retour .= '        ol ol ol {';
        $retour .= '            list-style-type: lower-latin !important;';
        $retour .= '        }';

        $retour .= '        ol ol ol ol {';
        $retour .= '            list-style-type: decimal !important;';
        $retour .= '        }';

        $retour .= '        @media screen and (max-width:480px) {';

        $retour .= '            .preheader .rightColumnContent,';
        $retour .= '            .footer .rightColumnContent {';
        $retour .= '                text-align: left !important;';
        $retour .= '            }';

        $retour .= '            .preheader .rightColumnContent div,';
        $retour .= '            .preheader .rightColumnContent span,';
        $retour .= '            .footer .rightColumnContent div,';
        $retour .= '            .footer .rightColumnContent span {';
        $retour .= '                text-align: left !important;';
        $retour .= '            }';

        $retour .= '            .preheader .rightColumnContent,';
        $retour .= '            .preheader .leftColumnContent {';
        $retour .= '                font-size: 80% !important;';
        $retour .= '                padding: 5px 0;';
        $retour .= '            }';

        $retour .= '            table.wrapper-mobile {';
        $retour .= '                width: 100% !important;';
        $retour .= '                table-layout: fixed;';
        $retour .= '            }';

        $retour .= '            img.max-width {';
        $retour .= '                height: auto !important;';
        $retour .= '                max-width: 100% !important;';
        $retour .= '            }';

        $retour .= '            a.bulletproof-button {';
        $retour .= '                display: block !important;';
        $retour .= '                width: auto !important;';
        $retour .= '                font-size: 80%;';
        $retour .= '                padding-left: 0 !important;';
        $retour .= '                padding-right: 0 !important;';
        $retour .= '            }';

        $retour .= '            .columns {';
        $retour .= '                width: 100% !important;';
        $retour .= '            }';

        $retour .= '            .column {';
        $retour .= '                display: block !important;';
        $retour .= '                width: 100% !important;';
        $retour .= '                padding-left: 0 !important;';
        $retour .= '                padding-right: 0 !important;';
        $retour .= '                margin-left: 0 !important;';
        $retour .= '                margin-right: 0 !important;';
        $retour .= '            }';

        $retour .= '            .social-icon-column {';
        $retour .= '                display: inline-block !important;';
        $retour .= '            }';
        $retour .= '        }';
        $retour .= '    </style>';
        $retour .= '    <!--user entered Head Start-->';
        $retour .= '    <!--End Head user entered-->';
        $retour .= '</head>';

        $retour .= '<body>';
        $retour .= '    <center class="wrapper" data-link-color="#f2f2f2"';
        $retour .= '        data-body-style="font-size:14px; font-family:verdana,geneva,sans-serif; color:#f2f2f2; background-color:#0b1a25;">';
        $retour .= '        <div class="webkit">';
        $retour .= '            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#0b1a25">';
        $retour .= '                <tr>';
        $retour .= '                    <td valign="top" bgcolor="#0b1a25" width="100%">';
        $retour .= '                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0"';
        $retour .= '                            cellspacing="0" border="0">';
        $retour .= '                            <tr>';
        $retour .= '                                <td width="100%">';
        $retour .= '                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">';
        $retour .= '                                        <tr>';
        $retour .= '                                            <td>';
        $retour .= '                                                <!--[if mso]>';
        $retour .= '                                                    <center>';
        $retour .= '                                                        <table>';
        $retour .= '                                                            <tr>';
        $retour .= '                                                                <td width="600">';
        $retour .= '                                                 <![endif]-->';
        $retour .= '                                                <table width="100%" cellpadding="0" cellspacing="0" border="0"';
        $retour .= '                                                    style="width:100%; max-width:600px;" align="center">';
        $retour .= '                                                    <tr>';
        $retour .= '                                                        <td role="modules-container"';
        $retour .= '                                                            style="padding:0px 0px 0px 0px; color:#f2f2f2; text-align:left;"';
        $retour .= '                                                            bgcolor="#0b1a25" width="100%" align="left">';
        $retour .= '                                                            <table class="module preheader preheader-hide" role="module"';
        $retour .= '                                                                data-type="preheader" border="0" cellpadding="0"';
        $retour .= '                                                                cellspacing="0" width="100%"';
        $retour .= '                                                                style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">';
        $retour .= '                                                                <tr>';
        $retour .= '                                                                    <td role="module-content">';
        $retour .= '                                                                        <p></p>';
        $retour .= '                                                                    </td>';
        $retour .= '                                                                </tr>';
        $retour .= '                                                            </table>';
        $retour .= '                                                            <table class="wrapper" role="module" data-type="image"';
        $retour .= '                                                                border="0" cellpadding="0" cellspacing="0" width="100%"';
        $retour .= '                                                                style="table-layout: fixed;"';
        $retour .= '                                                                data-muid="b496a446-0585-48bf-be0f-e22405074cd1">';
        $retour .= '                                                                <tbody>';
        $retour .= '                                                                    <tr>';
        $retour .= '                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                                                            valign="top" align="center">';
        $retour .= '                                                                            <img';
        $retour .= '                                                                                class="max-width" border="0"';
        $retour .= '                                                                                src="https://inmode.emeka.fr/back/assets/images/header-logo.png"';
        $retour .= '                                                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"';
        $retour .= '                                                                                width="600" alt=""';
        $retour .= '                                                                                data-proportionally-constrained="true"';
        $retour .= '                                                                                data-responsive="true"';
        $retour .= '                                                                            />';
        $retour .= '                                                                        </td>';
        $retour .= '                                                                    </tr>';
        $retour .= '                                                                </tbody>';
        $retour .= '                                                            </table>';
        $retour .= '                                                            <table class="module" role="module" data-type="code"';
        $retour .= '                                                                border="0" cellpadding="0" cellspacing="0" width="100%"';
        $retour .= '                                                                style="table-layout: fixed;"';
        $retour .= '                                                                data-muid="db6919a4-990c-429a-82a4-9cb1bf027e91">';
        $retour .= '                                                                <tbody>';
        $retour .= '                                                                    <tr>';
        $retour .= '                                                                        <td height="100%" valign="top"';
        $retour .= '                                                                            role="module-content">'.$order['sentence'];
        $retour .= '                                                                        </td>';
        $retour .= '                                                                    </tr>';
        $retour .= '                                                                </tbody>';
        $retour .= '                                                            </table>';
        $retour .= '                                                            <table border="0" cellpadding="0" cellspacing="0"';
        $retour .= '                                                                align="center" width="100%" role="module"';
        $retour .= '                                                                data-type="columns" style="padding:0px 0px 0px 0px;"';
        $retour .= '                                                                bgcolor="#0b1a25" data-distribution="1,1,1,1">';
        $retour .= '                                                                <tbody>';
        $retour .= '                                                                    <tr role="module-content">';
        $retour .= '                                                                        <td height="100%" valign="top">';
        $retour .= '                                                                            <table width="135"';
        $retour .= '                                                                                style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-0">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        foreach($order['Article'] as $item)
        {
            $retour .= '                                                                                            <table class="module"';
            $retour .= '                                                                                                role="module"';
            $retour .= '                                                                                                data-type="code"';
            $retour .= '                                                                                                border="0"';
            $retour .= '                                                                                                cellpadding="0"';
            $retour .= '                                                                                                cellspacing="0"';
            $retour .= '                                                                                                width="100%"';
            $retour .= '                                                                                                style="table-layout: fixed;"';
            $retour .= '                                                                                                data-muid="f58697f2-da7c-4724-b057-ebb3797d25b3">';
            $retour .= '                                                                                                <tbody>';
            $retour .= '                                                                                                    <tr>';
            $retour .= '                                                                                                        <td height="100%"';
            $retour .= '                                                                                                            valign="top"';
            $retour .= '                                                                                                            role="module-content">';
            $retour .=                                                                                                              $item['Name'];
            $retour .= '                                                                                                        </td>';
            $retour .= '                                                                                                    </tr>';
            $retour .= '                                                                                                </tbody>';
            $retour .= '                                                                                            </table>';
        }
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="135"';
        $retour .= '                                                                                style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-1">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        foreach($order['Article'] as $item)
        {
            $retour .= '                                                                                            <table class="module"';
            $retour .= '                                                                                                role="module"';
            $retour .= '                                                                                                data-type="code"';
            $retour .= '                                                                                                border="0"';
            $retour .= '                                                                                                cellpadding="0"';
            $retour .= '                                                                                                cellspacing="0"';
            $retour .= '                                                                                                width="100%"';
            $retour .= '                                                                                                style="table-layout: fixed;"';
            $retour .= '                                                                                                data-muid="f58697f2-da7c-4724-b057-ebb3797d25b3">';
            $retour .= '                                                                                                <tbody>';
            $retour .= '                                                                                                    <tr>';
            $retour .= '                                                                                                        <td height="100%"';
            $retour .= '                                                                                                            valign="top"';
            $retour .= '                                                                                                            role="module-content">';
            $retour .=                                                                                                              $item['Pack'];
            $retour .= '                                                                                                        </td>';
            $retour .= '                                                                                                    </tr>';
            $retour .= '                                                                                                </tbody>';
            $retour .= '                                                                                            </table>';
        }
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="135"';
        $retour .= '                                                                                style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-2">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        foreach($order['Article'] as $item)
        {
            $retour .= '                                                                                            <table class="module"';
            $retour .= '                                                                                                role="module"';
            $retour .= '                                                                                                data-type="code"';
            $retour .= '                                                                                                border="0"';
            $retour .= '                                                                                                cellpadding="0"';
            $retour .= '                                                                                                cellspacing="0"';
            $retour .= '                                                                                                width="100%"';
            $retour .= '                                                                                                style="table-layout: fixed;"';
            $retour .= '                                                                                                data-muid="f58697f2-da7c-4724-b057-ebb3797d25b3">';
            $retour .= '                                                                                                <tbody>';
            $retour .= '                                                                                                    <tr>';
            $retour .= '                                                                                                        <td height="100%"';
            $retour .= '                                                                                                            valign="top"';
            $retour .= '                                                                                                            role="module-content">';
            $retour .=                                                                                                              $item['Quantity'];
            $retour .= '                                                                                                        </td>';
            $retour .= '                                                                                                    </tr>';
            $retour .= '                                                                                                </tbody>';
            $retour .= '                                                                                            </table>';
        }
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="135"';
        $retour .= '                                                                                style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 10px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-3">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        foreach($order['Article'] as $item)
        {
            $retour .= '                                                                                            <table class="module"';
            $retour .= '                                                                                                role="module"';
            $retour .= '                                                                                                data-type="code"';
            $retour .= '                                                                                                border="0"';
            $retour .= '                                                                                                cellpadding="0"';
            $retour .= '                                                                                                cellspacing="0"';
            $retour .= '                                                                                                width="100%"';
            $retour .= '                                                                                                style="table-layout: fixed;"';
            $retour .= '                                                                                                data-muid="f58697f2-da7c-4724-b057-ebb3797d25b3">';
            $retour .= '                                                                                                <tbody>';
            $retour .= '                                                                                                    <tr>';
            $retour .= '                                                                                                        <td height="100%"';
            $retour .= '                                                                                                            valign="top"';
            $retour .= '                                                                                                            role="module-content">';
            $retour .=                                                                                                              $item['Quantity'] * $item['Price'];
            $retour .= '                                                                                                        </td>';
            $retour .= '                                                                                                    </tr>';
            $retour .= '                                                                                                </tbody>';
            $retour .= '                                                                                            </table>';
        }
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                        </td>';
        $retour .= '                                                                    </tr>';
        $retour .= '                                                                </tbody>';
        $retour .= '                                                            </table>';
        $retour .= '                                                            <table border="0" cellpadding="0" cellspacing="0"';
        $retour .= '                                                                align="center" width="100%" role="module"';
        $retour .= '                                                                data-type="columns"';
        $retour .= '                                                                style="padding:15px 150px 15px 150px;" bgcolor="#0b1a25"';
        $retour .= '                                                                data-distribution="1,1,1,1">';
        $retour .= '                                                                <tbody>';
        $retour .= '                                                                    <tr role="module-content">';
        $retour .= '                                                                        <td height="100%" valign="top">';
        $retour .= '                                                                            <table width="75"';
        $retour .= '                                                                                style="width:75px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-0">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        $retour .= '                                                                                            <table class="wrapper"';
        $retour .= '                                                                                                role="module"';
        $retour .= '                                                                                                data-type="image"';
        $retour .= '                                                                                                border="0"';
        $retour .= '                                                                                                cellpadding="0"';
        $retour .= '                                                                                                cellspacing="0"';
        $retour .= '                                                                                                width="100%"';
        $retour .= '                                                                                                style="table-layout: fixed;"';
        $retour .= '                                                                                                data-muid="604aa702-f929-4bd6-aec2-fb0c959add62">';
        $retour .= '                                                                                                <tbody>';
        $retour .= '                                                                                                    <tr>';
        $retour .= '                                                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                                                                                            valign="top"';
        $retour .= '                                                                                                            align="center">';
        $retour .= '                                                                                                            <img class="max-width"';
        $retour .= '                                                                                                                border="0"';
        $retour .= '                                                                                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;"';
        $retour .= '                                                                                                                width="38"';
        $retour .= '                                                                                                                alt=""';
        $retour .= '                                                                                                                data-proportionally-constrained="true"';
        $retour .= '                                                                                                                data-responsive="true"';
        $retour .= '                                                                                                                src="https://inmode.emeka.fr/back/assets/icons/facebook.png"/>';
        $retour .= '                                                                                                        </td>';
        $retour .= '                                                                                                    </tr>';
        $retour .= '                                                                                                </tbody>';
        $retour .= '                                                                                            </table>';
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="75"';
        $retour .= '                                                                                style="width:75px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-1">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        $retour .= '                                                                                            <table class="wrapper"';
        $retour .= '                                                                                                role="module"';
        $retour .= '                                                                                                data-type="image"';
        $retour .= '                                                                                                border="0"';
        $retour .= '                                                                                                cellpadding="0"';
        $retour .= '                                                                                                cellspacing="0"';
        $retour .= '                                                                                                width="100%"';
        $retour .= '                                                                                                style="table-layout: fixed;"';
        $retour .= '                                                                                                data-muid="01426f1c-6714-4d7e-8d55-56c48e895b48">';
        $retour .= '                                                                                                <tbody>';
        $retour .= '                                                                                                    <tr>';
        $retour .= '                                                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                                                                                            valign="top"';
        $retour .= '                                                                                                            align="center">';
        $retour .= '                                                                                                            <img class="max-width"';
        $retour .= '                                                                                                                border="0"';
        $retour .= '                                                                                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;"';
        $retour .= '                                                                                                                width="38"';
        $retour .= '                                                                                                                alt=""';
        $retour .= '                                                                                                                data-proportionally-constrained="true"';
        $retour .= '                                                                                                                data-responsive="true"';
        $retour .= '                                                                                                                src="https://inmode.emeka.fr/back/assets/icons/instagram.png"/>';
        $retour .= '                                                                                                        </td>';
        $retour .= '                                                                                                    </tr>';
        $retour .= '                                                                                                </tbody>';
        $retour .= '                                                                                            </table>';
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="75"';
        $retour .= '                                                                                style="width:75px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-2">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        $retour .= '                                                                                            <table class="wrapper"';
        $retour .= '                                                                                                role="module"';
        $retour .= '                                                                                                data-type="image"';
        $retour .= '                                                                                                border="0"';
        $retour .= '                                                                                                cellpadding="0"';
        $retour .= '                                                                                                cellspacing="0"';
        $retour .= '                                                                                                width="100%"';
        $retour .= '                                                                                                style="table-layout: fixed;"';
        $retour .= '                                                                                                data-muid="beb3312c-e5c0-4b02-b4d2-c836084793a1">';
        $retour .= '                                                                                                <tbody>';
        $retour .= '                                                                                                    <tr>';
        $retour .= '                                                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                                                                                            valign="top"';
        $retour .= '                                                                                                            align="center">';
        $retour .= '                                                                                                            <img class="max-width"';
        $retour .= '                                                                                                                border="0"';
        $retour .= '                                                                                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;"';
        $retour .= '                                                                                                                width="38"';
        $retour .= '                                                                                                                alt=""';
        $retour .= '                                                                                                                data-proportionally-constrained="true"';
        $retour .= '                                                                                                                data-responsive="true"';
        $retour .= '                                                                                                                src="https://inmode.emeka.fr/back/assets/icons/youtube.png"/>';
        $retour .= '                                                                                                        </td>';
        $retour .= '                                                                                                    </tr>';
        $retour .= '                                                                                                </tbody>';
        $retour .= '                                                                                            </table>';
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                            <table width="75"';
        $retour .= '                                                                                style="width:75px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
        $retour .= '                                                                                cellpadding="0" cellspacing="0"';
        $retour .= '                                                                                align="left" border="0" bgcolor=""';
        $retour .= '                                                                                class="column column-3">';
        $retour .= '                                                                                <tbody>';
        $retour .= '                                                                                    <tr>';
        $retour .= '                                                                                        <td';
        $retour .= '                                                                                            style="padding:0px;margin:0px;border-spacing:0;">';
        $retour .= '                                                                                            <table class="wrapper"';
        $retour .= '                                                                                                role="module"';
        $retour .= '                                                                                                data-type="image"';
        $retour .= '                                                                                                border="0"';
        $retour .= '                                                                                                cellpadding="0"';
        $retour .= '                                                                                                cellspacing="0"';
        $retour .= '                                                                                                width="100%"';
        $retour .= '                                                                                                style="table-layout: fixed;"';
        $retour .= '                                                                                                data-muid="375d6118-0af6-4997-bb69-5ec7f932ff7f">';
        $retour .= '                                                                                                <tbody>';
        $retour .= '                                                                                                    <tr>';
        $retour .= '                                                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                                                                                            valign="top"';
        $retour .= '                                                                                                            align="center">';
        $retour .= '                                                                                                            <img class="max-width"';
        $retour .= '                                                                                                                border="0"';
        $retour .= '                                                                                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;"';
        $retour .= '                                                                                                                width="38"';
        $retour .= '                                                                                                                alt=""';
        $retour .= '                                                                                                                data-proportionally-constrained="true"';
        $retour .= '                                                                                                                data-responsive="true"';
        $retour .= '                                                                                                                src="https://inmode.emeka.fr/back/assets/icons/linkedin.png"/>';
        $retour .= '                                                                                                        </td>';
        $retour .= '                                                                                                    </tr>';
        $retour .= '                                                                                                </tbody>';
        $retour .= '                                                                                            </table>';
        $retour .= '                                                                                        </td>';
        $retour .= '                                                                                    </tr>';
        $retour .= '                                                                                </tbody>';
        $retour .= '                                                                            </table>';
        $retour .= '                                                                        </td>';
        $retour .= '                                                                    </tr>';
        $retour .= '                                                                </tbody>';
        $retour .= '                                                            </table>';
        $retour .= '                                                        </td>';
        $retour .= '                                                    </tr>';
        $retour .= '                                                </table>';
        $retour .= '                                                <!--[if mso]>';
        $retour .= '                                                                </td>';
        $retour .= '                                                            </tr>';
        $retour .= '                                                        </table>';
        $retour .= '                                                    </center>';
        $retour .= '                                                <![endif]-->';
        $retour .= '                                            </td>';
        $retour .= '                                        </tr>';
        $retour .= '                                    </table>';
        $retour .= '                                </td>';
        $retour .= '                            </tr>';
        $retour .= '                        </table>';
        $retour .= '                    </td>';
        $retour .= '                </tr>';
        $retour .= '            </table>';
        $retour .= '        </div>';
        $retour .= '    </center>';
        $retour .= '</body>';

        $retour .= '</html>';
        
        return $retour;
    }
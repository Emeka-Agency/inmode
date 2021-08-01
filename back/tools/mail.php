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
        'error' => ['Security', 'security@inmodemd.fr']
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
        // $head .= '        <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"/>';
        $head .= '        <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>';
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
        $header .= '                        <img src="https://inmodemd.fr/back/assets/images/header-logo.png" alt="InmodeMD" width="600" style="display:block;">';
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
    function orderMail()
    {
        logEvent('orderMail()');
        try
        {
            logEvent('Liste Article');
            logEvent(json_encode($_POST['Article']));
            logEvent('Facturation');
            logEvent(json_encode($_POST['Billing']));
            $message = '';
            $message .= mailHeadPart("Commande ".$_POST["Reference"]);
            $message .= '   <body width="100%" style="margin:0 auto;padding:0!important;mso-line-height-rule:exactly;background-color:#0b1a25;" bgcolor="#0b1a25">';
            $message .= '   <center role="article" aria-roledescription="email" lang="fr" style="width:100%;background-color:#0b1a25;" bgcolor="#0b1a25">';
            $message .= '       <table width="600" cellpadding="0" border="0" align="center" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;mso-hide:all;">';
            $message .= '           <tr cellpadding="0" border="0" align="center" cellspacing="0">';
            $message .= '               <td>';
            $message .=                      headerPart();
            $message .=                      orderReceived($_POST['Reference'], $_POST['Date'], $_POST['for'], $_POST['type'], $_POST['Status']);
            $message .=                      orderDetails($_POST['Article'], $_POST['Total'], $_POST['DeliveryTax'], $_POST['Country']);
            $message .=                      orderTVAIntra($_POST['Country'], isset($_POST['TVA_Intra']) ? $_POST['TVA_Intra'] : null);
            $message .=                      orderBilling($_POST['Billing']);
            if(isset($_POST['Shipping']) && $_POST['Shipping'] != null)
            {
                logEvent('Livraison');
                logEvent(json_encode($_POST['Shipping']));
                logEvent(gettype($_POST['Shipping']));
                $message .=                         orderShipping($_POST['Shipping']);
            }
            $message .=                         footerPart();
            $message .= '                 </td>';
            $message .= '              </tr>';
            $message .= '           </table>';
            $message .= '       </center>';
            $message .= '   </body>';
            $message .= '</html>';
            return $message;
        }
        catch(Throwable $e)
        {
            logEvent('Erreur durant orderMail');
            logEvent($e);
            logError('Étape '.(++$GLOBALS['index']).' - '.'Erreur durant orderMail');
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return 'null';
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $status
     * 
     * @return bool
     */
    function isPaid($status) {
        logEvent('isPaid()');
        switch($status) {
            case 'ACCEPTED':
            case 'AUTHORISED':
            case 'CAPTURED':
                return true;
            case 'ABANDONED':
            case 'AUTHORISED_TO_VALIDATE':
            case 'CANCELLED':
            case 'CAPTURE_FAILED':
            case 'EXPIRED':
            case 'REFUSED':
            case 'SUSPENDED':
            case 'UNDER_VERIFICATION':
            case 'WAITING_AUTHORISATION':
            case 'WAITING_AUTHORISATION_TO_VALIDAT':
            default:
                return false;
        }
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string|null $pays
     * 
     * @return bool
     */
    function tva_intra($pays = null)
    {
        logEvent('tva_intra()');
        switch($pays)
        {
            case 'Belgique':
            case 'Luxembourg':
                return true;
            case 'France':
            default:
                return false;
        }
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $reference
     * @param string $date
     * @param string $for
     * @param string $type
     * @param string $statut
     * 
     * @return string
     */
    function orderReceived($reference, $date, $for, $type, $statut)
    {
        logEvent('orderReceived()');
        logEvent('reference : '.$reference);
        logEvent('date : '.$date);
        logEvent('for : '.$for);
        logEvent('type : '.$type);
        logEvent('statut : '.$statut);
        $retour = '';
        $retour .= '        <tr>';
        $retour .= '            <td style="color:#f2f2f2;font-size:18px;font-weight:400;word-break:break-word;padding-top:60px;">';
        if($for == 'client')
        {
            $retour .= 'Nous avons bien reçu votre commande <span style="font-size:20px;font-weight:600;">'.$reference.'</span> effectuée le ';
            $retour .= '<span style="font-size:20px;font-weight:600;">'.buildDate($date, 'full').' UTC</span>. ';
        }
        if($for == 'pro')
        {
            $retour .= 'Une nouvelle commande <span style="font-size:20px;font-weight:600;">'.$reference.'</span> est arrivée.';
        }
        if($for == 'client' && $type == 'sepa')
        {
            $retour .= ' Votre commande vous sera expédiée une fois que vous aurez effectué un virement sur le RIB suivant:';
        }
        if($for == 'client' && $type == 'soge')
        {
            $retour .= ' Votre commande sera expédiée sous peu.';
        }
        if($for == 'pro' && $type == 'sepa')
        {
            $retour .= ' Paiement par virement en attente.';
        }
        if($for == 'pro' && $type == 'soge')
        {
            $retour .= ' Le paiement est '.(isPaid($statut) == true ? 'validé' : 'en attente').'.';
        }
        $retour .= '        </td>';
        $retour .= '    </tr>';
        if($for == 'client' && $type == 'sepa') {
            $retour .= '<tr>';
            $retour .= '    <td style="padding-top:25px;">';
            $retour .= '        <table style="width:400px;border-top-width:2px;border-bottom-width:2px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;display:block;">';
            $retour .= '            <tbody>';
            $retour .= '                <tr style="color:#f2f2f2;font-size:18px;font-weight:400;">';
            $retour .= '                    <td style="width:80px;word-break:break-word;">RIB</td>';
            $retour .= '                    <td style="width:350px;word-break:break-word;">'.$GLOBALS['RIB'].'</td>';
            $retour .= '                </tr>';
            $retour .= '                <tr style="color:#f2f2f2;font-size:18px;font-weight:400;">';
            $retour .= '                    <td style="width:80px;word-break:break-word;">BIC</td>';
            $retour .= '                    <td style="width:350px;word-break:break-word;">'.$GLOBALS['BIC'].'</td>';
            $retour .= '                </tr>';
            $retour .= '            </tbody>';
            $retour .= '        </table>';
            $retour .= '    </td>';
            $retour .= '</tr>';
        }
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param array $articles
     * @param string $total
     * @param string|null $delivery_tax
     * @param string|null $pays
     * 
     * @return string
     */
    function orderDetails($articles, $total, $delivery_tax = null, $pays = null)
    {
        try
        {
            
            logEvent('orderDetails()');
            logEvent(json_encode($articles));
            logEvent(gettype($articles));
            logEvent('total : '.$total);
            logEvent('delivery_tax : '.$delivery_tax);
            logEvent('pays : '.$pays);
            $retour = '';
            $retour .= '   <tr>';
            $retour .= '       <td style="color:#f2f2f2;font-size:22px;font-weight:500;word-break:break-word;padding-top:45px;">';
            $retour .= '           Détails de la commande';
            $retour .= '       </td>';
            $retour .= '   </tr>';
            $retour .= '   <tr>';
            $retour .= '       <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:2px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;">';
            $tva = 0;
            foreach($articles as $article)
            {
                try
                {
                    logEvent($article['Name'].' x '.$article['Quantity'].' = '.$article['Quantity'].' x '.$article['Price'].' = '.($article['Quantity'] * $article['Price']));
                }
                catch(Throwable $e)
                {
                    logError('Étape '.(++$GLOBALS['index']).' - '.print_r($e));
                    logEvent(print_r($e));
                }
                $retour .= '           <tr>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">'.$article['Name'].'</td>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;font-weight:bold;">';
                $retour .= '                       '.$article['Pack'];
                $retour .= '                   </p>';
                $retour .= '               </td>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;">x '.$article['Quantity'].'</p>';
                $retour .= '               </td>';
                $retour .= '               <td style="padding:20px;text-align:right;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;">';
                $retour .= '                       '.($article['Quantity'] * $article['Price']).' EUR';
                $retour .= '                   </p>';
                $retour .= '               </td>';
                $retour .= '           </tr>';
                $tva += $article['Quantity'] * $article['Price'];
            }
            $retour .= '       </table>';
            $retour .= '   </tr>';
            $retour .= '   <tr>';
            $retour .= '       <table style="margin:0 auto;width:600px;display:block;color:#f2f2f2;font-size:16px;font-weight:400;">';
            $retour .= '           <tbody style="display:block;width:100%;text-align:center;">';
            if($delivery_tax != null && is_numeric($delivery_tax) && $delivery_tax > 0)
            {        	
                $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:15px;color:#f2f2f2">';
                $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">Livraison</td>';
                $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.$delivery_tax.' EUR</td>';
                $retour .= '           </tr>';
            }
            if($total != null && is_numeric($total))
            {
                if(!tva_intra($pays))
                {
                    $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:15px;color:#f2f2f2">';
                    $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">TVA</td>';
                    $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.($tva * 0.2).' EUR</td>';
                    $retour .= '           </tr>';
                }
                $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:15px;color:#f2f2f2">';
                $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">TOTAL</td>';
                $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.$total.' EUR</td>';
                $retour .= '           </tr>';
            }
            $retour .= '           </tbody>';
            $retour .= '       </table>';
            $retour .= '   </tr>';
        }
        catch(Throwable $e)
        {
            $retour = '';
        }
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $pays
     * @param string $tva_intra
     * 
     * @return string
     */
    function orderTVAIntra($pays, $tva_intra)
    {
        logEvent('orderTVAIntra()');
        $retour = '';
        $retour .= '    <tr>';
        $retour .= '        <td style="padding-top:15px;font-size:13px;color:#f2f2f2;">';
        if(tva_intra($pays))
        {
            $retour .= '            Exonération TVA, article 262 ter I du Code général des impôts<br/>';
            $retour .= '            TVA intracommunautaire :'.$tva_intra;
        }
        else
        {
            $retour .= '            Application de la TVA, article 258-I-a du Code général des impôts';

        }
        $retour .= '        </td>';
        $retour .= '    </tr>';
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param array $facturation
     * 
     * @return string
     */
    function orderBilling($facturation)
    {
        logEvent('orderBilling()');
        logEvent(json_encode($facturation));
        $retour = '';
        $retour .= '    <tr>';
        $retour .= '        <td style="color:#f2f2f2;font-size:22px;font-weight:500;word-break:break-word;padding-top:45px;">';
        $retour .= '            Détails de facturation';
        $retour .= '        </td>';
        $retour .= '    </tr>';
        $retour .= '    <tr>';
        $retour .= '        <td style="padding-top:15px;">';
        $retour .= '            <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:0px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;">';
        $retour .= '                <tbody>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Facturé à</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Firstname'].' '.$facturation['Lastname'].'</td>';
        $retour .= '                    </tr>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Au</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Address'].', '.(isset($facturation['Address2']) ? $facturation['Address2'].', ' : '').$facturation['ZIP'].' '.$facturation['City'].', '.$facturation['Country'].'</td>';
        $retour .= '                    </tr>';
        if($facturation['Society'] != null)
        {
            $retour .= '                    <tr>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Pour la société</td>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Society'].'</td>';
            $retour .= '                    </tr>';
        }
        $retour .= '                   <tr>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Mail</td>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Mail'].'</td>';
        $retour .= '                   </tr>';
        $retour .= '                   <tr>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Téléphone</td>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Phone'].'</td>';
        $retour .= '                   </tr>';
        $retour .= '               </tbody>';
        $retour .= '           </table>';
        $retour .= '       </td>';
        $retour .= '   </tr>';
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param array $livraison
     * 
     * @return string
     */
    function orderShipping($livraison)
    {
        logEvent('orderShipping()');
        logEvent(json_encode($livraison));
        $retour = '';
        $retour .= '    <tr>';
        $retour .= '        <td style="color:#f2f2f2;font-size:22px;font-weight:500;word-break:break-word;padding-top:45px;">';
        $retour .= '            Détails de livraison';
        $retour .= '        </td>';
        $retour .= '    </tr>';
        $retour .= '    <tr>';
        $retour .= '        <td style="padding-top:15px;">';
        $retour .= '            <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:0px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;">';
        $retour .= '                <tbody>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Facturé à</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Firstname'].' '.$livraison['Lastname'].'</td>';
        $retour .= '                    </tr>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Au</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Address'].', '.($livraison['Address'] != null ? $livraison['Address'].', ' : '').$livraison['ZIP'].' '.$livraison['City'].', '.$livraison['Country'].'</td>';
        $retour .= '                    </tr>';
        if($livraison['Society'] != null)
        {
            $retour .= '                    <tr>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Pour la société</td>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Society'].'</td>';
            $retour .= '                    </tr>';
        }
        if($livraison['Mail'] != null)
        {
            $retour .= '                    <tr>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Pour la société</td>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Mail'].'</td>';
            $retour .= '                    </tr>';
        }
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Téléphone</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Phone'].'</td>';
        $retour .= '                    </tr>';
        $retour .= '                </tbody>';
        $retour .= '            </table>';
        $retour .= '        </tr>';
        $retour .= '    </td>';
        return $retour;
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
        // $message .= '      <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"/>';
        $message .= '      <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>';
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
            case 'contact-us':
                $retour = contactUsMail();
                break;
            case 'order-mail':
                $retour = orderMail();
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
            $headers .= "MIME-version: 1.0\r\nDate: ".date('r')."\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit\r\n";
            // $headers .= "Content-Type: text/html;charset=ISO-8859-1\r\nX-Mailer: PHP/".phpversion()."\r\n";
            $headers .= "Content-Type: text/html;charset=utf-8\r\nX-Mailer: PHP/".phpversion()."\r\n";
            
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

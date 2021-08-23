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
     */
    function mailHeadPart($title) {
        logEvent("mailHeadPart");
        $head = '';
        $head .= '<!DOCTYPE html>';
        $head .= '   <!--[if lt IE 7]>';
        $head .= '       <html style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js lt-ie9 lt-ie8 lt-ie7">';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if IE 7]>';
        $head .= '       <html style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js lt-ie9 lt-ie8">';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if IE 8]>';
        $head .= '       <html style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js lt-ie9">';
        $head .= '   <![endif]-->';
        $head .= '   <!--[if gt IE 8]>';
        // $head .= '   <!-->';
        $head .= '       <html style="font-size:0;font-family:Raleway,Roboto,sans-serif;width:100%;" class="no-js"></html>';
        // $head .= '   <!--<![endif]-->';
        $head .= '   <![endif]-->';
        $head .= '    <head>';
        $head .= '        <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">';
        $head .= '        <meta charset="ISO-8859-1">';
        $head .= '        <meta http-equiv="X-UA-Compatible" content="IE=edge">';
        $head .= '        <title>'.$title.'</title>';
        $head .= '        <meta name="description" content="">';
        $head .= '        <meta name="viewport" content="width=device-width, initial-scale=1">';
        $head .= '        <style>';
        $head .= '        body {background-color:#0b1a25;}';
        $head .= '        img {display:block;}';
        $head .= '        </style>';
        $head .= '    </head>';
        return $head;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function headerPart()
    {
        logEvent('headerPart');
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
     */
    function footerPart()
    {
        logEvent('footerPart');
        $footer = '';
        $footer .= '            <tr style="width:100%;text-align:center;">';
        $footer .= '                <td valign="top" style="width:100%;text-align:center;word-break:break-word;padding-top:90px;">';
        $footer .= '                    <span style="padding-top:5px;"></span>';
        $footer .= '                    <a href="https://www.facebook.com/inmode.france" title="Facebook">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/facebook.webp" style="width:25px;height:25px" alt="facebook"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.instagram.com/inmode.france" title="Instagram">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/instagram.webp" style="width:25px;height:25px" alt="instagram"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.youtube.com/user/InModeSolutions" title="Youtube">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/youtube.webp" style="width:25px;height:25px" alt="youtube"/>';
        $footer .= '                    </a>';
        $footer .= '                    <a href="https://www.linkedin.com/company/inmode-solutions-france/" title="Linkedin">';
        $footer .= '                        <img src="https://inmodemd.fr/back/assets/icons/linkedin.webp" style="width:25px;height:25px" alt="linkedin"/>';
        $footer .= '                    </a>';
        $footer .= '                </td>';
        $footer .= '            </tr>';
        $footer .= '            <tr style="display:block;padding-top:30px;">';
        $footer .= '                <td valign="top" style="text-align:center;display:block;word-break:break-word;padding-bottom:20px;">';
        $footer .= '                    <p style="color:#f2f2f2;font-size:20px;">';
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
     */
    function failMail(string $type):string
    {
        logEvent('failMail');
        $retour = '';
        $retour .= mailHeadPart("Fail mail");
        $retour .= '   <body style="background-color:#0b1a25;" bgcolor="#0b1a25">';
        $retour .= '        <table width="600" cellpadding="0" border="0" align="center" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">';
        $retour .=              headerPart();
        if($type == 'order' && isset($_POST['reference'], $_POST['for']))
        {
            $retour .= '        <tr>';
            $retour .= '            <td style="color:#ff6868;font-size:22px;font-weight:600;word-break:break-word;padding-top:60px;">';
            $retour .= '                Le mail de la commande <span style="font-size:20px;font-weight:600;">'.$_POST['reference'].'</span> à destination '.($_POST['for'] == 'client' ? 'du client' : 'd\'InmodeMD France').' n\'a pas pu être envoyé';
            $retour .= '            </td>';
            $retour .= '        </tr>';
        }
        else if($type == 'order')
        {
            $retour .= '        <tr>';
            $retour .= '            <td style="color:#ff6868;font-size:22px;font-weight:600;word-break:break-word;padding-top:60px;">';
            $retour .= '                Un mail d\'une commande non identifiée du '.date('l d F Y à H:i:s', time()).' UTC n\'a pu être envoyé en raison d\'un problème technique. Veuillez contacter un technicien';
            $retour .= '            </td>';
            $retour .= '        </tr>';
        }
        $retour .=              footerPart();
        $retour .= '        </table>';
        $retour .= '   </body>';
        $retour .= '</html>';
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function orderMail($order)
    {
        logEvent('orderMail');
        try
        {
            logEvent('Liste Article');
            logEvent(json_encode($order['Article']));
            logEvent('Facturation');
            logEvent(json_encode($order['Facturation']));
            $message = '';
            $message .= mailHeadPart("Commande ".$order["Reference"]);
            $message .= '   <body style="background-color:#0b1a25;" bgcolor="#0b1a25">';
            $message .= '       <table width="600" cellpadding="0" border="0" align="center" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">';
            $message .= '           <tr cellpadding="0" border="0" align="center" cellspacing="0">';
            $message .= '               <td>';
            $message .=                     headerPart();
            $message .=                     orderReceived($order['Reference'], $order['Date'], $_POST['for'], $_POST['type'], $order['Statut']);
            $message .=                     orderDetails($order['Article'], $order['Total'], $order['FraisLivraison'], $order['Pays']);
            $message .=                     orderTVAIntra($order['Pays'], isset($order['TVA_Intra']) ? $order['TVA_Intra'] : null);
            $message .=                     orderBilling($order['Facturation']);
            if(isset($order['Livraison']) && $order['Livraison'] != null)
            {
                logEvent('Livraison');
                logEvent(json_encode($order['Livraison']));
                logEvent(gettype($order['Livraison']));
                $message .=                     orderShipping($order['Livraison']);
            }
            $message .=                     footerPart();
            $message .= '               </td>';
            $message .= '           </tr>';
            $message .= '       </table>';
            $message .= '   </body>';
            $message .= '</html>';
            return $message;
        }
        catch(Throwable $e)
        {
            logEvent('Erreur durant orderMail');
            logEvent($e);
            logError('Erreur durant orderMail');
            logError($e);
            return 'null';
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function isPaid($status) {
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
     */
    function tva_intra($pays = null)
    {
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
     */
    function orderReceived(string $reference, string $date, string $for, string $type, string $statut):string
    {
        logEvent('orderReceived');
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
            $retour .= '        <table style="width:400px;border-top-width:2px;border-bottom-width:2px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;width:100%;display:block;">';
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
     */
    function orderDetails(array $articles, string $total, string $delivery_tax = null, $pays = null):string
    {
        try
        {
            
            logEvent('orderDetails');
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
            $retour .= '       <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:2px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;width:100%;">';
            $tva = 0;
            foreach($articles as $article)
            {
                try
                {
                    logEvent($article['Article']['Name'].' x '.$article['Quantite'].' = '.$article['Quantite'].' x '.$article['Article']['price'].' = '.($article['Quantite'] * $article['Article']['price']));
                }
                catch(Throwable $e)
                {
                    logError(print_r($e));
                    logEvent(print_r($e));
                }
                $retour .= '           <tr>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">'.$article['Article']['Name'].'</td>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;font-weight:bold;">';
                $retour .= '                       '.$article['Article']['pack_type'].' ('.$article['Article']['pack_size'].')';
                $retour .= '                   </p>';
                $retour .= '               </td>';
                $retour .= '               <td style="padding:20px;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;">x '.$article['Quantite'].'</p>';
                $retour .= '               </td>';
                $retour .= '               <td style="padding:20px;text-align:right;font-size:18px;color:#f2f2f2;">';
                $retour .= '                   <p style="font-family:Raleway,Roboto,sans-serif;font-size:18px;color:#f2f2f2;">';
                $retour .= '                       '.($article['Quantite'] * $article['Article']['price']).'€';
                $retour .= '                   </p>';
                $retour .= '               </td>';
                $retour .= '           </tr>';
                $tva += $article['Quantite'] * $article['Article']['price'];
            }
            $retour .= '       </table>';
            $retour .= '   </tr>';
            $retour .= '   <tr>';
            $retour .= '       <table style="width:100%;display:block;color:#f2f2f2;font-size:16px;font-weight:400;">';
            $retour .= '           <tbody style="display:block;width:100%;text-align:center;">';
            if($delivery_tax != null && is_numeric($delivery_tax) && $delivery_tax > 0)
            {        	
                $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:15px;color:#f2f2f2;">';
                $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">Livraison</td>';
                $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.$delivery_tax.'€</td>';
                $retour .= '           </tr>';
            }
            if($total != null && is_numeric($total))
            {
                if(!tva_intra($pays))
                {
                    $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:15px;color:#f2f2f2;">';
                    $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">TVA</td>';
                    $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.($tva * 0.2).'€</td>';
                    $retour .= '           </tr>';
                }
                $retour .= '           <tr style="display:block;width:100%;text-align:right;font-size:16px;color:#f2f2f2;">';
                $retour .= '               <td style="display:inline-block;text-align:right;word-break:break-word;">TOTAL</td>';
                $retour .= '               <td style="padding-right:20px;width:100px;display:inline-block;text-align:right;word-break:break-word;">'.$total.'€</td>';
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
     */
    function orderTVAIntra(string $pays, $tva_intra):string
    {
        logEvent('orderTVAIntra');
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
     */
    function orderBilling(array $facturation):string
    {
        logEvent('orderBilling');
        logEvent(json_encode($facturation));
        $retour = '';
        $retour .= '    <tr>';
        $retour .= '        <td style="color:#f2f2f2;font-size:22px;font-weight:500;word-break:break-word;padding-top:45px;">';
        $retour .= '            Détails de facturation';
        $retour .= '        </td>';
        $retour .= '    </tr>';
        $retour .= '    <tr>';
        $retour .= '        <td style="padding-top:15px;">';
        $retour .= '            <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:0px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;width:100%;">';
        $retour .= '                <tbody>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Facturé à</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Prenom'].' '.$facturation['Nom'].'</td>';
        $retour .= '                    </tr>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Au</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Adresse'].', '.($facturation['Adresse2'] != null ? $facturation['Adresse2'].', ' : '').$facturation['CodePostal'].' '.$facturation['Ville'].', '.$facturation['Pays'].'</td>';
        $retour .= '                    </tr>';
        if($facturation['Societe'] != null)
        {
            $retour .= '                    <tr>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Pour la société</td>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Societe'].'</td>';
            $retour .= '                    </tr>';
        }
        $retour .= '                   <tr>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Mail</td>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Mail'].'</td>';
        $retour .= '                   </tr>';
        $retour .= '                   <tr>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Téléphone</td>';
        $retour .= '                       <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$facturation['Telephone'].'</td>';
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
     */
    function orderShipping(array $livraison):string
    {
        logEvent('orderShipping');
        logEvent(json_encode($livraison));
        $retour = '';
        $retour .= '    <tr>';
        $retour .= '        <td style="color:#f2f2f2;font-size:22px;font-weight:500;word-break:break-word;padding-top:45px;">';
        $retour .= '            Détails de livraison';
        $retour .= '        </td>';
        $retour .= '    </tr>';
        $retour .= '    <tr>';
        $retour .= '        <td style="padding-top:15px;">';
        $retour .= '            <table align="center" width="550" style="border-collapse:collapse;border-spacing:0px;border-top-width:2px;border-bottom-width:0px;border-left-width:0px;border-right-width:0px;border-style:solid;border-color:#f2f2f2;width:100%;">';
        $retour .= '                <tbody>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Facturé à</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Prenom'].' '.$livraison['Nom'].'</td>';
        $retour .= '                    </tr>';
        $retour .= '                    <tr>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Au</td>';
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Adresse'].', '.($livraison['Adresse'] != null ? $livraison['Adresse'].', ' : '').$livraison['CodePostal'].' '.$livraison['Ville'].', '.$livraison['Pays'].'</td>';
        $retour .= '                    </tr>';
        if($livraison['Societe'] != null)
        {
            $retour .= '                    <tr>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">Pour la société</td>';
            $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Societe'].'</td>';
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
        $retour .= '                        <td style="color:#f2f2f2;font-size:16px;word-break:break-word;">'.$livraison['Telephone'].'</td>';
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
     */
    function fullContactMail():string
    {
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
    */
    function contactUsMail():string
    {
        $message = '';
        $message = $message.'<!DOCTYPE html>';
        $message = $message.'<html style="width:100%;">';
        $message = $message.'   <head>';
        $message = $message.'      <title></title>';
        $message = $message.'      <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1" />';
        $message = $message.'      <meta name="viewport" content="width=device-width, initial-scale=1" />';
        $message = $message.'      <meta http-equiv="X-UA-Compatible" content="IE=edge" />';
        $message = $message.'      <style type="text/css">';
        $message = $message.'          ';
        $message = $message.'      </style>';
        $message = $message.'   </head>';
        $message = $message.'   <body>';
        $message = $message.'       <table cellspacing="0" cellpadding="10" border="0">';
        $message = $message.'           <tr>';
        $message = $message.'               <td style="word-break:break-word;">';
        $message = $message.'                   <table>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Prénom</td><td style="word-break:break-word;">'.$_POST['firstname'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Nom</td><td style="word-break:break-word;">'.$_POST['lastname'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Spécialité</td><td style="word-break:break-word;">'.SPECIALITY[$_POST['subject']].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">E-Mail</td><td style="word-break:break-word;">'.$_POST['mail'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Téléphone</td><td style="word-break:break-word;">'.$_POST['phone'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Code postal</td><td style="word-break:break-word;">'.$_POST['zip'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Ville</td><td style="word-break:break-word;">'.$_POST['city'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                       <tr>';
        $message = $message.'                           <td style="word-break:break-word;">Message</td><td style="word-break:break-word;">'.$_POST['message'].'</td>';
        $message = $message.'                       </tr>';
        $message = $message.'                   </table>';
        $message = $message.'               </td>';
        $message = $message.'           </tr>';
        $message = $message.'       </table>';
        $message = $message.'   </body>';
        $message = $message.'</html>';
        return $message;
    }

    
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function buildMail(string $mail):string
    {
        logEvent('Build mail');
        logEvent('mail action : "'.$mail.'"');
        if(!in_array($mail, $GLOBALS['mails']))
        {
            logEvent('Mail action "'.$mail.'" does not exist or is not configured');
            return '';
        }
        logEvent('Mail action "'.$mail.'" exist');
        switch($mail)
        {
            case 'contact-us':
                $retour = contactUsMail();
                break;
            case 'order-mail':
                $retour = orderMail($_POST['order']);
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
     */
    function from(string $action):string
    {
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
     */
    function tryMail(string $mail, string $subject, string $action, string $type, $return = true):bool
    {
        
        try {
            if(sendMail($mail, $subject, buildMail($action), from($action)))
            {
                if($return == true) {
                    echo json_encode([
                        'type' => 'client',
                        'status' => 'success',
                        'message' => 'Mail envoyé'
                    ]);
                }
            }
            else
            {
                if($return == true) {
                    echo json_encode([
                        'type' => 'client',
                        'status' => 'fail',
                        'message' => 'Erreur d\'envoi du mail'
                    ]);
                }
            }
            return true;
        }
        catch(\Exception $e) {
            logError('Error during sending mail '.$action);
            logError(json_encode($e));
            if($return == true) {
                echo json_encode([
                    'type' => 'client',
                    'status' => 'fail',
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
     */
    function sendMail(string $to, string $subject, string $content, string $from):bool {
        try
        {
            if($content == 'null')
            {
                throw 'Content empty';
            }
            logEvent('To : '.$to);
            logEvent('Subject : '.SPECIALITY[$subject]);
            logEvent('Init mail headers');
            
            try {
                logEvent('Save mail at '.saveMail($content, $to));
            }
            catch (\Exception $e) {
                logError('Can\'t save mail');
            }
            
            $headers = "From: InmodeMD-GB ".MAIL_CONST[$from][0]." <".MAIL_CONST[$from][1].">\r\n";
            $headers .= "Reply-To: contact.fr@inmodemd.com"."\r\n";
            $headers .= "MIME-version: 1.0\r\nDate: ".date('r')."\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit\r\n";
            $headers .= "Content-Type: text/html;charset=ISO-8859-1\r\nX-Mailer: PHP/".phpversion()."\r\n";
            
            logEvent('Headers : '.PHP_EOL.$headers);
            
            logEvent('Try to send mail');
            
            if(mail($to, SPECIALITY[$subject], trim($content), $headers))
            {
                logEvent('Mail sended');
                return true;
            }
            else
            {
                logError(error_get_last()["message"]);
                logEvent('Mail not sended');
                return false;
            }
        }
        catch(\Exception $e)
        {
            logEvent('Error during mail send procedure');
            logError(json_encode($e));
            echo json_encode($e);
            return false;
        }
    }
    
    /**
     * Short - 
     * 
     * Detailed -
     * 
     */
    function saveMail(string $content, string $to):string {
        try {
            emmitDir(SAVE_MAIL);
            $name = SAVE_MAIL.'/'.date('Y-m-d_H:i:s', time()).'-'.$GLOBALS['request_time'].'-'.$_POST['action'].'-'.$to.'.html';
            file_put_contents($name, trim($content));
            return $name;
        }
        catch(\Exception $e) {
            logError(json_encode($e));
            return '';
        }
    }
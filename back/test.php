<?php
  $order = [
    'id' => '113',
    'Reference' => 'HCkTEd',
    'Date' => '2021-03-23T21:21:18.000Z',
    'Paye' => '[Statut] => UNDER_VERIFICATION',
    'Prenom' => 'Maël',
    'Nom' => 'FALLET',
    'Societe' => null,
    'FraisLivraison' => '50',
    'Total' => '1296',
    'published_at' => '2021-03-23T22:21:18.122Z',
    'created_at' => '2021-03-23T22:21:18.152Z',
    'updated_at' => '2021-03-23T22:21:18.152Z',
    'Article' => [
      [
        'id' => '145',
        'Article' => [
          'id' => '23',
          'reference' => 'HP101806A',
          'Name' => 'HP L10 D18 Type 06 FaceTite',
          'pack_size' => '2',
          'pack_type' => 'canule',
          'price' => '360',
          'discount' => '0',
          'relative' => 'bodytite',
          'published_at' => '2020-10-25T21:42:09.650Z',
          'created_at' => '2020-10-25T21:42:09.650Z',
          'updated_at' => '2020-10-26T01:17:52.354Z',
          'picture' => [
            'id' => '532',
            'name' => 'main.png',
            'alternativeText' => null,
            'caption' => null,
            'width' => '72',
            'height' => '415',
            'formats' => [
              'thumbnail' => [
                'name' => 'thumbnail_main.png',
                'hash' => 'thumbnail_main_5088ee58b1',
                'ext' => '.png',
                'mime' => 'image/png',
                'width' => '27',
                'height' => '156',
                'size' => '8.49',
                'path' => null,
                'url' => '/uploads/thumbnail_main_5088ee58b1.png',
              ]
            ],
            'hash' => 'main_5088ee58b1',
            'ext' => '.png',
            'mime' => 'image/png',
            'size' => '37.55',
            'url' => '/uploads/main_5088ee58b1.png',
            'previewUrl' => null,
            'provider' => 'local',
            'provider_metadata' => null,
            'created_at' => '2020-10-25T21:42:07.849Z',
            'updated_at' => '2020-10-25T21:42:07.881Z',
          ]
        ],
        'Quantite' => '3',
      ]
    ],
    'Livraison' => null,
    'Facturation' => [
      'id' => '114',
      'Prenom' => 'Maël',
      'Nom' => 'FALLET',
      'Telephone' => '0667630604',
      'Adresse' => '124 Rue de Crimée',
      'Pays' => 'GB',
      'CodePostal' => '13003',
      'City' => 'Marseille',
      'Societe' => null,
      'Mail' => 'mael.fallet@gmail.com',
    ]
  ];
  
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function headerPart()
    {
        $header = '';
        $header .= '<table style="width: 100%; display: block; margin: 30px 0; text-align: center;">';
        $header .= '<tbody style="display: block;">';
        $header .= '<tr style="display: block;">';
        $header .= '<td style="display: block;">';
        $header .= '<img src="./assets/images/header-logo.png" width="300px" height="47.5px" alt="Logo Emeka" style="display: inline-block; width: 80%; max-width: 300px;" />';
        $header .= '</td>';
        $header .= '</tr>';
        $header .= '</tbody>';
        $header .= '</table>';
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
        $footer = '';
        $footer .= '<table style="padding-top: 30px; width: 100%;">';
        $footer .= '<tbody>';
        $footer .= '<tr>';
        $footer .= '<td valign="top" style="width: 100%; text-align: center;">';
        $footer .= '<img src="./assets/icons/facebook.webp" width="25" height="25" alt="facebook" style="padding-top: 5px;" />';
        $footer .= '<span';
        $footer .= 'style="padding-left: 10px; color: #f2f2f2; font-size: 20px; position: relative; bottom: 5px;">Facebook</span>';
        $footer .= '<br />';
        $footer .= '<img src="./assets/icons/instagram.webp" width="25" height="25" alt="instagram"';
        $footer .= 'style="padding-top: 5px;" />';
        $footer .= '<span';
        $footer .= 'style="padding-left: 10px; color: #f2f2f2; font-size: 20px; position: relative; bottom: 5px;">Instagram</span>';
        $footer .= '<br />';
        $footer .= '<img src="./assets/icons/youtube.webp" width="25" height="25" alt="youtube" style="padding-top: 5px;" />';
        $footer .= '<span';
        $footer .= 'style="padding-left: 10px; color: #f2f2f2; font-size: 20px; position: relative; bottom: 5px;">YouTube</span>';
        $footer .= '<br />';
        $footer .= '<img src="./assets/icons/linkedin.webp" width="25" height="25" alt="linkedin"';
        $footer .= 'style="padding-top: 5px;" />';
        $footer .= '<span';
        $footer .= 'style="padding-left: 10px; color: #f2f2f2; font-size: 20px; position: relative; bottom: 5px;">Linkedin</span>';
        $footer .= '</td>';
        $footer .= '</tr>';
        $footer .= '</tbody>';
        $footer .= '</table>';
        $footer .= '<table style="padding-top: 30px; width: 100%; display: block;">';
        $footer .= '<tbody style="width: 100%; display: block;">';
        $footer .= '<tr style="display: block;">';
        $footer .= '<td valign="top" style="color: #f2f2f2; font-size: 20px; text-align: center; display: block;">';
        $footer .= 'InmodeMD<br />';
        $footer .= 'RCS de Paris - 12 place Dauphine,<br />';
        $footer .= '75001 PARIS<br />';
        $footer .= '884 502 980 00011<br />';
        $footer .= 'contact.fr@inmodemd.fr';
        $footer .= '</td>';
        $footer .= '</tr>';
        $footer .= '</tbody>';
        $footer .= '</table>';
        return $footer;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function orderMail($order)
    {
        $message = '';
        $message .= '<html style="font-size: 0;font-family: Raleway, Roboto, sans-serif;">';
        $message .= '   <body style="background: #0e0e0e;margin: 0;padding: 15px;border: 2px solid #59b7b3;">';
        $message .= '       <table cellspacing="0" cellpadding="10" border="0" style="background: #0e0e0e; font-family: Roboto; width: 100%;">';
        $message .= '           <tr>';
        $message .= '               <td>';
        $message .=                     headerPart();
        $message .=                     orderReceived($order['Reference'], $order['Date'], 'client', 'sepa');
        // $message .=                     orderDetails($order['Article']);
        // $message .=                     orderBilling($order['Facturation']);
        // if(isset($order['Livraison']) && $order['Livraison'] != null)
        // {
        //     $message .=                     orderShipping([]);
        // }
        $message .=                     footerPart();
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
     */
    function orderReceived(string $reference, string $date, string $for, string $type):string {
        $retour = '';
        $retour .= '<table style="padding-top: 30px; width: 100%; display: block;">';
        $retour .= '<tr>';
        $retour .= '<td style="color: #f2f2f2; font-size: 18px; font-weight: 400;">';
        $retour .= 'Nous avons bien reçu votre commande <span style="font-size: 20px; font-weight: 600;">'.$reference.'</span> effectuée le <span';
        $retour .= 'style="font-size: 20px; font-weight: 600;">'.buildDate($date, 'full').'</span>. ';
        if($for == 'client' && $type == 'sepa')
        {
            $retour .= 'Votre commande vous sera expédiée une fois que vous aurez effectué un virement sur le RIB suivant:';
        }
        if($for == 'client' && $type == 'soge')
        {
            $retour .= '';
        }
        if($for == 'pro' && $type == 'sepa')
        {
            $retour .= '';
        }
        if($for == 'pro' && $type == 'soge')
        {
            $retour .= '';
        }
        $retour .= '</td>';
        $retour .= '</tr>';
        $retour .= '</table>';
        if($for == 'client' && $type == 'sepa') {
            $retour .= '<table style="max-width: 400px; border: 2px solid #f2f2f2; width: 100%; display: block;">';
            $retour .= '<tbody class="SEPA">';
            $retour .= '<tr style="color: #f2f2f2; font-size: 18px; font-weight: 400;" class="RIB">';
            $retour .= '<td style="width: 80px;">RIB</td>';
            $retour .= '<td style="width: 350px;">FR76 3000 3015 7800 0200 1741 805</td>';
            $retour .= '</tr>';
            $retour .= '<tr style="color: #f2f2f2; font-size: 18px; font-weight: 400;" class="BIC">';
            $retour .= '<td style="width: 80px;">BIC</td>';
            $retour .= '<td style="width: 350px;">SOGEFRPP</td>';
            $retour .= '</tr>';
            $retour .= '</tbody>';
            $retour .= '</table>';
        }
        return $retour;
    }
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function orderDetails(array $articles, string $total, string $delivery_tax = null):string
    {
        $retour = '';
        $retour .= '<table style="padding-top: 30px; width: 100%; display: block;">';
        $retour .= '<tr>';
        $retour .= '<td style="color: #f2f2f2; font-size: 22px; font-weight: 500;">';
        $retour .= 'Détails de la commande';
        $retour .= '</td>';
        $retour .= '</tr>';
        $retour .= '</table>';
        $retour .= '<table style="max-width: 550px; border: 2px solid #f2f2f2; width: 100%; display: block; color: #f2f2f2; font-size: 16px; font-weight: 400;">';
        $retour .= '<thead>';
        $retour .= '<tr>';
        $retour .= '<td style="width: 250px;">Article</td>';
        $retour .= '<td style="width: 150px; text-align: center;">Quantité</td>';
        $retour .= '<td style="width: 150px; text-align: center;">Total</td>';
        $retour .= '</tr>';
        $retour .= '</thead>';
        $retour .= '<tbody>';
        $tva = 0;
        foreach($articles as $article)
        {
            $retour .= '<tr>';
            $retour .= '<td style="width: 250px;">'.$article['Article']['Name'].'</td>';
            $retour .= '<td style="width: 150px; text-align: center;">'.$article['Quantite'].'</td>';
            $retour .= '<td style="width: 150px; text-align: center;">'.($article['Quantite'] * $article['Article']['price']).'€</td>';
            $retour .= '</tr>';
            $tva += $article['Quantite'] * $article['Article']['price'];
        }
        $retour .= '</tbody>';
        $retour .= '</table>';
        $retour .= '<table style="max-width: 550px; width: 100%; display: block; color: #f2f2f2; font-size: 16px; font-weight: 400;">';
        $retour .= '<tbody>';
        if($delivery_tax != null && is_numeric($delivery_tax))
        {        	
          $retour .= '<tr>';
          $retour .= '<td style="width: 250px;"></td>';
          $retour .= '<td style="width: 150px; text-align: center;">Livraison</td>';
          $retour .= '<td style="width: 150px; text-align: center;">'.$delivery_tax.'€</td>';
          $retour .= '</tr>';
        }
        if($total != null && is_numeric($total))
        {
          $retour .= '<tr>';
          $retour .= '<td style="width: 250px;"></td>';
          $retour .= '<td style="width: 150px; text-align: center;">TVA</td>';
          $retour .= '<td style="width: 150px; text-align: center;">'.($tva * 0.2).'€</td>';
          $retour .= '</tr>';
          $retour .= '<tr>';
          $retour .= '<td style="width: 250px;"></td>';
          $retour .= '<td style="width: 150px; text-align: center;">TOTAL</td>';
          $retour .= '<td style="width: 150px; text-align: center;">'.$total.'€</td>';
          $retour .= '</tr>';
        }
        $retour .= '</tbody>';
        $retour .= '</table>';
        return $retour;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function orderBilling(object $facturation):string
    {
        $retour = '';
        $retour .= '';
        return $retour;
    }
    /**
     * Short - 
     * 
     * Detailed - 
     * 
     */
    function orderShipping(object $livraison):string
    {
        $retour = '';
        $retour .= '';
        return $retour;
    }
    
    /**
     * Short - 
     * 
     * Detailed - 
     */
    function buildDate(string $date, string $type):string
    {
        switch($type)
        {
            case 'full':
            default:
                return date('l d F Y à h:m:s', time($date));
        }
    }
    
    // echo orderMail($order);
    // echo print_r($order);
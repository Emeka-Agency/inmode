<?php

function orderDoctype() {
    $retour = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    return $retour;
}

function orderHead() {
    $retour = '';

    $retour .= '    <head>';
    $retour .= '        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
    $retour .= '        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">';
    $retour .= '        <!--[if !mso]><!-->';
    $retour .= '            <meta http-equiv="X-UA-Compatible" content="IE=Edge">';
    $retour .= '        <!--<![endif]-->';
    $retour .= '        <!--[if (gte mso 9)|(IE)]>';
    $retour .= '            <xml>';
    $retour .= '                <o:OfficeDocumentSettings>';
    $retour .= '                <o:AllowPNG/>';
    $retour .= '                <o:PixelsPerInch>96</o:PixelsPerInch>';
    $retour .= '                </o:OfficeDocumentSettings>';
    $retour .= '            </xml>';
    $retour .= '        <![endif]-->';
    $retour .= '        <!--[if (gte mso 9)|(IE)]>';
    $retour .= '            <style type="text/css">';
    $retour .= '                body {width: 600px;margin: 0 auto;}';
    $retour .= '                table {border-collapse: collapse;}';
    $retour .= '                table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}';
    $retour .= '                img {-ms-interpolation-mode: bicubic;}';
    $retour .= '            </style>';
    $retour .= '        <![endif]-->';
    $retour .= '        <style type="text/css">';
    $retour .= '            body,';
    $retour .= '            p,';
    $retour .= '            div {';
    $retour .= '                font-family: verdana, geneva, sans-serif;';
    $retour .= '                font-size: 14px;';
    $retour .= '            }';
    $retour .= '            body {';
    $retour .= '                color: #f2f2f2;';
    $retour .= '                margin: 0;';
    $retour .= '            }';
    $retour .= '            body a {';
    $retour .= '                color: #f2f2f2;';
    $retour .= '                text-decoration: none;';
    $retour .= '            }';
    $retour .= '            p {';
    $retour .= '                margin: 0;';
    $retour .= '                padding: 0;';
    $retour .= '            }';
    $retour .= '            table.wrapper {';
    $retour .= '                width: 100% !important;';
    $retour .= '                table-layout: fixed;';
    $retour .= '                -webkit-font-smoothing: antialiased;';
    $retour .= '                -webkit-text-size-adjust: 100%;';
    $retour .= '                -moz-text-size-adjust: 100%;';
    $retour .= '                -ms-text-size-adjust: 100%;';
    $retour .= '            }';
    $retour .= '            img.max-width {';
    $retour .= '                max-width: 100% !important;';
    $retour .= '            }';
    $retour .= '            .column.of-2 {';
    $retour .= '                width: 50%;';
    $retour .= '            }';
    $retour .= '            .column.of-3 {';
    $retour .= '                width: 33.333%;';
    $retour .= '            }';
    $retour .= '            .column.of-4 {';
    $retour .= '                width: 25%;';
    $retour .= '            }';
    $retour .= '            ul ul ul ul {';
    $retour .= '                list-style-type: disc !important;';
    $retour .= '            }';
    $retour .= '            ol ol {';
    $retour .= '                list-style-type: lower-roman !important;';
    $retour .= '            }';
    $retour .= '            ol ol ol {';
    $retour .= '                list-style-type: lower-latin !important;';
    $retour .= '            }';
    $retour .= '            ol ol ol ol {';
    $retour .= '                list-style-type: decimal !important;';
    $retour .= '            }';
    $retour .= '            @media screen and (max-width:480px) {';
    $retour .= '                .preheader .rightColumnContent,';
    $retour .= '                .footer .rightColumnContent {';
    $retour .= '                    text-align: left !important;';
    $retour .= '                }';
    $retour .= '                .preheader .rightColumnContent div,';
    $retour .= '                .preheader .rightColumnContent span,';
    $retour .= '                .footer .rightColumnContent div,';
    $retour .= '                .footer .rightColumnContent span {';
    $retour .= '                    text-align: left !important;';
    $retour .= '                }';
    $retour .= '                .preheader .rightColumnContent,';
    $retour .= '                .preheader .leftColumnContent {';
    $retour .= '                    font-size: 80% !important;';
    $retour .= '                    padding: 5px 0;';
    $retour .= '                }';
    $retour .= '                table.wrapper-mobile {';
    $retour .= '                    width: 100% !important;';
    $retour .= '                    table-layout: fixed;';
    $retour .= '                }';
    $retour .= '                img.max-width {';
    $retour .= '                    height: auto !important;';
    $retour .= '                    max-width: 100% !important;';
    $retour .= '                }';
    $retour .= '                a.bulletproof-button {';
    $retour .= '                    display: block !important;';
    $retour .= '                    width: auto !important;';
    $retour .= '                    font-size: 80%;';
    $retour .= '                    padding-left: 0 !important;';
    $retour .= '                    padding-right: 0 !important;';
    $retour .= '                }';
    $retour .= '                .columns {';
    $retour .= '                    width: 100% !important;';
    $retour .= '                }';
    $retour .= '                .column {';
    $retour .= '                    display: block !important;';
    $retour .= '                    width: 100% !important;';
    $retour .= '                    padding-left: 0 !important;';
    $retour .= '                    padding-right: 0 !important;';
    $retour .= '                    margin-left: 0 !important;';
    $retour .= '                    margin-right: 0 !important;';
    $retour .= '                }';
    $retour .= '                .social-icon-column {';
    $retour .= '                    display: inline-block !important;';
    $retour .= '                }';
    $retour .= '            }';
    $retour .= '        </style>';
    $retour .= '        <!--user entered Head Start-->';
    $retour .= '        <!--End Head user entered-->';
    $retour .= '    </head>';
    return $retour;
}

function orderHeader() {
    $retour = '';
    $retour .= '<table class="wrapper" role="module" data-type="image"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="b496a446-0585-48bf-be0f-e22405074cd1">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
    $retour .= '                valign="top" align="center">';
    $retour .= '                <img class="max-width" border="0"';
    $retour .= '                    style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"';
    $retour .= '                    width="600" alt=""';
    $retour .= '                    data-proportionally-constrained="true"';
    $retour .= '                    data-responsive="true"';
    $retour .= '                    src="https://inmode.emeka.fr/back/assets/images/header-logo.png">';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderFooter() {
    $retour = '';
    $retour .= orderSocial();
    $retour .= orderAdministration();
    return $retour;
}

function orderSocial() {
    $retour = '';
    $retour .= '<table border="0" cellpadding="0" cellspacing="0"';
    $retour .= '    align="center" width="100%" role="module"';
    $retour .= '    data-type="columns"';
    $retour .= '    style="padding:15px 150px 0px 150px;" bgcolor="#0b1a25"';
    $retour .= '    data-distribution="1,1,1,1">';
    $retour .= '    <tbody>';
    $retour .= '        <tr role="module-content">';
    $retour .= '            <td height="100%" valign="top">';
    foreach(['facebook', 'instagram', 'youtube', 'linkedin'] as $value) {
        $retour .= '<table width="75"';
        $retour .= '    style="width:75px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
        $retour .= '    cellpadding="0" cellspacing="0"';
        $retour .= '    align="left" border="0" bgcolor=""';
        $retour .= '    class="column column-0">';
        $retour .= '    <tbody>';
        $retour .= '        <tr>';
        $retour .= '            <td';
        $retour .= '                style="padding:0px;margin:0px;border-spacing:0;">';
        $retour .= '                <table class="wrapper"';
        $retour .= '                    role="module"';
        $retour .= '                    data-type="image"';
        $retour .= '                    border="0"';
        $retour .= '                    cellpadding="0"';
        $retour .= '                    cellspacing="0"';
        $retour .= '                    width="100%"';
        $retour .= '                    style="table-layout: fixed;"';
        $retour .= '                    data-muid="604aa702-f929-4bd6-aec2-fb0c959add62">';
        $retour .= '                    <tbody>';
        $retour .= '                        <tr>';
        $retour .= '                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"';
        $retour .= '                                valign="top"';
        $retour .= '                                align="center">';
        $retour .= '                                <img class="max-width"';
        $retour .= '                                    border="0"';
        $retour .= '                                    style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;"';
        $retour .= '                                    width="30"';
        $retour .= '                                    alt=""';
        $retour .= '                                    data-proportionally-constrained="true"';
        $retour .= '                                    data-responsive="true"';
        $retour .= '                                    src="https://inmode.emeka.fr/back/assets/icons/'.$value.'.png">';
        $retour .= '                            </td>';
        $retour .= '                        </tr>';
        $retour .= '                    </tbody>';
        $retour .= '                </table>';
        $retour .= '            </td>';
        $retour .= '        </tr>';
        $retour .= '    </tbody>';
        $retour .= '</table>';
    }
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderAdministration() {
    $retour = '';
    foreach(['InmodeMD', 'RCS de Paris - 12 Place Dauphiné,', '75001 Paris', '884 502 980 00011'] as $value) {
        $retour .= '<table class="module" role="module" data-type="text"';
        $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
        $retour .= '    style="table-layout: fixed;"';
        $retour .= '    data-muid="e9d5901c-922e-4100-8a2f-719b4723834b.4"';
        $retour .= '    data-mc-module-version="2019-10-22">';
        $retour .= '    <tbody>';
        $retour .= '        <tr>';
        $retour .= '            <td style="padding:0px 0px 0px 0px; line-height:20px; text-align:inherit;"';
        $retour .= '                height="100%" valign="top" bgcolor=""';
        $retour .= '                role="module-content">';
        $retour .= '                <div>';
        $retour .= '                    <div';
        $retour .= '                        style="font-family: inherit; text-align: center">';
        $retour .= '                        <span';
        $retour .= '                            style="font-size: 14px"><strong>'.$value.'</strong></span>';
        $retour .= '                    </div>';
        $retour .= '                    <div></div>';
        $retour .= '                </div>';
        $retour .= '            </td>';
        $retour .= '        </tr>';
        $retour .= '    </tbody>';
        $retour .= '</table>';
    }
    $retour .= '<table class="module" role="module" data-type="text"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="e9d5901c-922e-4100-8a2f-719b4723834b.4.1.1"';
    $retour .= '    data-mc-module-version="2019-10-22">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:0px 0px 0px 0px; line-height:20px; text-align:inherit;"';
    $retour .= '                height="100%" valign="top" bgcolor=""';
    $retour .= '                role="module-content">';
    $retour .= '                <div>';
    $retour .= '                    <div';
    $retour .= '                        style="font-family: inherit; text-align: center">';
    $retour .= '                        <a';
    $retour .= '                            href="mailto:contact.fr@inmodemd.fr?subject=Commande '.$_POST['Reference'].' - Contact"><span';
    $retour .= '                                style="font-size: 14px"><strong>contact.fr@inmodemd.fr</strong></span></a>';
    $retour .= '                    </div>';
    $retour .= '                    <div></div>';
    $retour .= '                </div>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderDivider() {
    $retour = '';
    $retour .= '<table class="module" role="module" data-type="divider"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="10ea3eb0-99ab-4ab9-9e65-5c50afa44e7d.2.1">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:0px 0px 0px 0px;"';
    $retour .= '                role="module-content" height="100%"';
    $retour .= '                valign="top" bgcolor="">';
    $retour .= '                <table border="0" cellpadding="0"';
    $retour .= '                    cellspacing="0" align="center"';
    $retour .= '                    width="100%" height="2px"';
    $retour .= '                    style="line-height:2px; font-size:2px;">';
    $retour .= '                    <tbody>';
    $retour .= '                        <tr>';
    $retour .= '                            <td style="padding:0px 0px 2px 0px;"';
    $retour .= '                                bgcolor="#f2f2f2"></td>';
    $retour .= '                        </tr>';
    $retour .= '                    </tbody>';
    $retour .= '                </table>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderTitre($string) {
    $retour = '';
    $retour .= '<table class="module" role="module" data-type="text"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="460369b1-7e40-43e8-aefe-aac2edd363e1"';
    $retour .= '    data-mc-module-version="2019-10-22">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:30px 0px 0px 0px; line-height:22px; text-align:inherit;"';
    $retour .= '                height="100%" valign="top" bgcolor=""';
    $retour .= '                role="module-content">';
    $retour .= '                <div>';
    $retour .= '                    <div';
    $retour .= '                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                        <span';
    $retour .= '                            style="font-size: 18px"><strong>'.$string.'</strong></span>';
    $retour .= '                    </div>';
    $retour .= '                    <div></div>';
    $retour .= '                </div>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function column_article($string, $margin) {
    $retour = '';
    $retour .= '                <table width="135"';
    $retour .= '                    style="width:135px; border-spacing:0; border-collapse:collapse; margin:'.$margin.';"';
    $retour .= '                    cellpadding="0" cellspacing="0"';
    $retour .= '                    align="left" border="0" bgcolor=""';
    $retour .= '                    class="column column-0">';
    $retour .= '                    <tbody>';
    $retour .= '                        <tr>';
    $retour .= '                            <td';
    $retour .= '                                style="padding:0px;margin:0px;border-spacing:0;">';
    $retour .= '                                <table class="module"';
    $retour .= '                                    role="module"';
    $retour .= '                                    data-type="text"';
    $retour .= '                                    border="0"';
    $retour .= '                                    cellpadding="0"';
    $retour .= '                                    cellspacing="0"';
    $retour .= '                                    width="100%"';
    $retour .= '                                    style="table-layout: fixed;"';
    $retour .= '                                    data-muid="e18353d3-9c8a-48ec-9456-d88fe2999a2c"';
    $retour .= '                                    data-mc-module-version="2019-10-22">';
    $retour .= '                                    <tbody>';
    $retour .= '                                        <tr>';
    $retour .= '                                            <td style="padding:0px 0px 5px 0px; line-height:20px; text-align:inherit;"';
    $retour .= '                                                height="100%"';
    $retour .= '                                                valign="top"';
    $retour .= '                                                bgcolor=""';
    $retour .= '                                                role="module-content">';
    $retour .= '                                                <div>';
    $retour .= '                                                    <div';
    $retour .= '                                                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                                                        <span';
    $retour .= '                                                            style="color: #f2f2f2">'.$string.'</span>';
    $retour .= '                                                    </div>';
    $retour .= '                                                    <div>';
    $retour .= '                                                    </div>';
    $retour .= '                                                </div>';
    $retour .= '                                            </td>';
    $retour .= '                                        </tr>';
    $retour .= '                                    </tbody>';
    $retour .= '                                </table>';
    $retour .= '                            </td>';
    $retour .= '                        </tr>';
    $retour .= '                    </tbody>';
    $retour .= '                </table>';
    return $retour;
}

function column_details_conclusion($string = '<br>') {
    $retour = '';
    $retour .= '<table width="150"';
    $retour .= '    style="width:150px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
    $retour .= '    cellpadding="0" cellspacing="0"';
    $retour .= '    align="left" border="0" bgcolor=""';
    $retour .= '    class="column column-0">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td';
    $retour .= '                style="padding:0px;margin:0px;border-spacing:0;">';
    $retour .= '                <table class="module"';
    $retour .= '                    role="module"';
    $retour .= '                    data-type="text"';
    $retour .= '                    border="0"';
    $retour .= '                    cellpadding="0"';
    $retour .= '                    cellspacing="0"';
    $retour .= '                    width="100%"';
    $retour .= '                    style="table-layout: fixed;"';
    $retour .= '                    data-muid="5baee260-f2ce-4aef-84ae-7565f935b7a1"';
    $retour .= '                    data-mc-module-version="2019-10-22">';
    $retour .= '                    <tbody>';
    $retour .= '                        <tr>';
    $retour .= '                            <td style="padding:0px 0px 0px 0px; line-height:16px; text-align:inherit;"';
    $retour .= '                                height="100%"';
    $retour .= '                                valign="top"';
    $retour .= '                                bgcolor=""';
    $retour .= '                                role="module-content">';
    $retour .= '                                <div>';
    $retour .= '                                    <div';
    $retour .= '                                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                                        '.$string;
    $retour .= '                                    </div>';
    $retour .= '                                    <div>';
    $retour .= '                                    </div>';
    $retour .= '                                </div>';
    $retour .= '                            </td>';
    $retour .= '                        </tr>';
    $retour .= '                    </tbody>';
    $retour .= '                </table>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function column_billing_shipping($title, $value) {
    $retour = '';
    $retour .= '<table border="0" cellpadding="0" cellspacing="0"';
    $retour .= '    align="center" width="100%" role="module"';
    $retour .= '    data-type="columns" style="padding:0px 0px 0px 0px;"';
    $retour .= '    bgcolor="#0b1a25" data-distribution="1,2">';
    $retour .= '    <tbody>';
    $retour .= '        <tr role="module-content">';
    $retour .= '            <td height="100%" valign="top">';
    $retour .= '                <table width="200"';
    $retour .= '                    style="width:200px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
    $retour .= '                    cellpadding="0" cellspacing="0"';
    $retour .= '                    align="left" border="0" bgcolor=""';
    $retour .= '                    class="column column-0">';
    $retour .= '                    <tbody>';
    $retour .= '                        <tr>';
    $retour .= '                            <td';
    $retour .= '                                style="padding:0px;margin:0px;border-spacing:0;">';
    $retour .= '                                <table class="module"';
    $retour .= '                                    role="module"';
    $retour .= '                                    data-type="text"';
    $retour .= '                                    border="0"';
    $retour .= '                                    cellpadding="0"';
    $retour .= '                                    cellspacing="0"';
    $retour .= '                                    width="100%"';
    $retour .= '                                    style="table-layout: fixed;"';
    $retour .= '                                    data-muid="eec183fe-510a-40e0-91ef-eeafe119e1de.2"';
    $retour .= '                                    data-mc-module-version="2019-10-22">';
    $retour .= '                                    <tbody>';
    $retour .= '                                        <tr>';
    $retour .= '                                            <td style="padding:0px 0px 2px 0px; line-height:16px; text-align:inherit;"';
    $retour .= '                                                height="100%"';
    $retour .= '                                                valign="top"';
    $retour .= '                                                bgcolor=""';
    $retour .= '                                                role="module-content">';
    $retour .= '                                                <div>';
    $retour .= '                                                    <div';
    $retour .= '                                                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                                                        '.$title;
    $retour .= '                                                    </div>';
    $retour .= '                                                    <div>';
    $retour .= '                                                    </div>';
    $retour .= '                                                </div>';
    $retour .= '                                            </td>';
    $retour .= '                                        </tr>';
    $retour .= '                                    </tbody>';
    $retour .= '                                </table>';
    $retour .= '                            </td>';
    $retour .= '                        </tr>';
    $retour .= '                    </tbody>';
    $retour .= '                </table>';
    $retour .= '                <table width="400"';
    $retour .= '                    style="width:400px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
    $retour .= '                    cellpadding="0" cellspacing="0"';
    $retour .= '                    align="left" border="0" bgcolor=""';
    $retour .= '                    class="column column-1">';
    $retour .= '                    <tbody>';
    $retour .= '                        <tr>';
    $retour .= '                            <td';
    $retour .= '                                style="padding:0px;margin:0px;border-spacing:0;">';
    $retour .= '                                <table class="module"';
    $retour .= '                                    role="module"';
    $retour .= '                                    data-type="text"';
    $retour .= '                                    border="0"';
    $retour .= '                                    cellpadding="0"';
    $retour .= '                                    cellspacing="0"';
    $retour .= '                                    width="100%"';
    $retour .= '                                    style="table-layout: fixed;"';
    $retour .= '                                    data-muid="eec183fe-510a-40e0-91ef-eeafe119e1de.1.1"';
    $retour .= '                                    data-mc-module-version="2019-10-22">';
    $retour .= '                                    <tbody>';
    $retour .= '                                        <tr>';
    $retour .= '                                            <td style="padding:0px 0px 2px 0px; line-height:16px; text-align:inherit;"';
    $retour .= '                                                height="100%"';
    $retour .= '                                                valign="top"';
    $retour .= '                                                bgcolor=""';
    $retour .= '                                                role="module-content">';
    $retour .= '                                                <div>';
    $retour .= '                                                    <div';
    $retour .= '                                                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                                                        '.$value;
    $retour .= '                                                    </div>';
    $retour .= '                                                    <div>';
    $retour .= '                                                    </div>';
    $retour .= '                                                </div>';
    $retour .= '                                            </td>';
    $retour .= '                                        </tr>';
    $retour .= '                                    </tbody>';
    $retour .= '                                </table>';
    $retour .= '                            </td>';
    $retour .= '                        </tr>';
    $retour .= '                    </tbody>';
    $retour .= '                </table>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function espace() {
    $retour = '';
    $retour .= '<table class="module" role="module" data-type="spacer"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="361f1c2d-7f67-4b70-a071-a0a1f942edb2">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:0px 0px 30px 0px;"';
    $retour .= '                role="module-content" bgcolor="">';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderBody() {
    
    $retour = '';
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
    $retour .= '                                                <![endif]-->';
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
    $retour .= orderHeader();
    $retour .= orderReceived($_POST['Reference'], $_POST['Date'], $_POST['for'], $_POST['type'], $_POST['Status']);
    $retour .= orderDetails($_POST['Article'], $_POST['Total'], $_POST['DeliveryTax'], $_POST['Country']);
    $retour .= orderTVAIntra($_POST['Country'], isset($_POST['TVA_Intra']) ? $_POST['TVA_Intra'] : null);
    $retour .= orderBilling($_POST['Billing']);
    if(isset($_POST['Shipping']) && $_POST['Shipping'] != null)
    {
        logEvent('Livraison');
        logEvent(json_encode($_POST['Shipping']));
        logEvent(gettype($_POST['Shipping']));
        $retour .= orderShipping($_POST['Shipping']);
    }
    $retour .= espace();
    $retour .= orderFooter();
    $retour .= '                                                            </td>';
    $retour .= '                                                        </tr>';
    $retour .= '                                                    </table>';
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
    return $retour;
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
function tva_intra($pays = null) {
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

function orderReceived($reference, $date, $for, $type, $statut) {
    $retour = '';
    $retour .= '<table class="module" role="module" data-type="text"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="85a5dbfe-a5a7-4cbb-b24f-32154c48a9d7"';
    $retour .= '    data-mc-module-version="2019-10-22">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:25px 0px 10px 0px; line-height:22px; text-align:inherit;"';
    $retour .= '                height="100%" valign="top" bgcolor=""';
    $retour .= '                role="module-content">';
    $retour .= '                <div>';
    $retour .= '                    <div';
    $retour .= '                        style="font-family: inherit; text-align: inherit">';
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
    $retour .= '                        </div>';
    $retour .= '                    <div></div>';
    $retour .= '                </div>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    if($for == 'client' && $type == 'sepa') {
        $retour .= orderDivider();
        foreach([
            "RIB" => $GLOBALS['RIB'],
            "BIC" => $GLOBALS['BIC'],
        ] as $key => $value) {
            $retour .= '<table border="0" cellpadding="0" cellspacing="0"';
            $retour .= '    align="center" width="100%" role="module"';
            $retour .= '    data-type="columns" style="padding:0px 0px 0px 0px;"';
            $retour .= '    bgcolor="#0b1a25" data-distribution="1,3">';
            $retour .= '    <tbody>';
            $retour .= '        <tr role="module-content">';
            $retour .= '            <td height="100%" valign="top">';
            $retour .= '                <table width="150"';
            $retour .= '                    style="width:150px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
            $retour .= '                    cellpadding="0" cellspacing="0"';
            $retour .= '                    align="left" border="0" bgcolor=""';
            $retour .= '                    class="column column-0">';
            $retour .= '                    <tbody>';
            $retour .= '                        <tr>';
            $retour .= '                            <td';
            $retour .= '                                style="padding:0px;margin:0px;border-spacing:0;">';
            $retour .= '                                <table class="module"';
            $retour .= '                                    role="module"';
            $retour .= '                                    data-type="text"';
            $retour .= '                                    border="0"';
            $retour .= '                                    cellpadding="0"';
            $retour .= '                                    cellspacing="0"';
            $retour .= '                                    width="100%"';
            $retour .= '                                    style="table-layout: fixed;"';
            $retour .= '                                    data-muid="0364433c-8f2d-47e2-95da-125d7bd47130"';
            $retour .= '                                    data-mc-module-version="2019-10-22">';
            $retour .= '                                    <tbody>';
            $retour .= '                                        <tr>';
            $retour .= '                                            <td style="padding:0px 0px 0px 0px; line-height:22px; text-align:inherit;"';
            $retour .= '                                                height="100%"';
            $retour .= '                                                valign="top"';
            $retour .= '                                                bgcolor=""';
            $retour .= '                                                role="module-content">';
            $retour .= '                                                <div>';
            $retour .= '                                                    <div';
            $retour .= '                                                        style="font-family: inherit; text-align: inherit">';
            $retour .= '                                                        <strong>'.$key.'</strong>';
            $retour .= '                                                    </div>';
            $retour .= '                                                    <div>';
            $retour .= '                                                    </div>';
            $retour .= '                                                </div>';
            $retour .= '                                            </td>';
            $retour .= '                                        </tr>';
            $retour .= '                                    </tbody>';
            $retour .= '                                </table>';
            $retour .= '                            </td>';
            $retour .= '                        </tr>';
            $retour .= '                    </tbody>';
            $retour .= '                </table>';
            $retour .= '                <table width="450"';
            $retour .= '                    style="width:450px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;"';
            $retour .= '                    cellpadding="0" cellspacing="0"';
            $retour .= '                    align="left" border="0" bgcolor=""';
            $retour .= '                    class="column column-1">';
            $retour .= '                    <tbody>';
            $retour .= '                        <tr>';
            $retour .= '                            <td';
            $retour .= '                                style="padding:0px;margin:0px;border-spacing:0;">';
            $retour .= '                                <table class="module"';
            $retour .= '                                    role="module"';
            $retour .= '                                    data-type="text"';
            $retour .= '                                    border="0"';
            $retour .= '                                    cellpadding="0"';
            $retour .= '                                    cellspacing="0"';
            $retour .= '                                    width="100%"';
            $retour .= '                                    style="table-layout: fixed;"';
            $retour .= '                                    data-muid="0364433c-8f2d-47e2-95da-125d7bd47130.1"';
            $retour .= '                                    data-mc-module-version="2019-10-22">';
            $retour .= '                                    <tbody>';
            $retour .= '                                        <tr>';
            $retour .= '                                            <td style="padding:0px 0px 0px 0px; line-height:22px; text-align:inherit;"';
            $retour .= '                                                height="100%"';
            $retour .= '                                                valign="top"';
            $retour .= '                                                bgcolor=""';
            $retour .= '                                                role="module-content">';
            $retour .= '                                                <div>';
            $retour .= '                                                    <div';
            $retour .= '                                                        style="font-family: inherit; text-align: inherit">';
            $retour .= '                                                        '.$value;
            $retour .= '                                                    </div>';
            $retour .= '                                                    <div>';
            $retour .= '                                                    </div>';
            $retour .= '                                                </div>';
            $retour .= '                                            </td>';
            $retour .= '                                        </tr>';
            $retour .= '                                    </tbody>';
            $retour .= '                                </table>';
            $retour .= '                            </td>';
            $retour .= '                        </tr>';
            $retour .= '                    </tbody>';
            $retour .= '                </table>';
            $retour .= '            </td>';
            $retour .= '        </tr>';
            $retour .= '    </tbody>';
            $retour .= '</table>';
        }
        $retour .= orderDivider();
    }
    return $retour;
}

function orderDetails($articles, $total, $delivery_tax = null, $pays = null) {
    $retour = '';
    $retour = orderTitre("Détails de la commande");
    $retour .= orderDivider();
    $tva = 0;
    foreach($articles as $article) {
        $retour .= '<table border="0" cellpadding="0" cellspacing="0"';
        $retour .= '    align="center" width="100%" role="module"';
        $retour .= '    data-type="columns" style="padding:0px 0px 0px 0px;"';
        $retour .= '    bgcolor="#0b1a25" data-distribution="1,1,1,1">';
        $retour .= '    <tbody>';
        $retour .= '        <tr role="module-content">';
        $retour .= '            <td height="100%" valign="top">';
        $retour .= column_article($article['Name'], '0px 10px 0px 0px');
        $retour .= column_article($article['Pack'], '0px 10px 0px 10px');
        $retour .= column_article($article['Quantity'], '0px 10px 0px 10px');
        $retour .= column_article($article['Quantity'] * $article['Price'].'&nbsp;€', '0px 0px 0px 10px');
        $retour .= '            </td>';
        $retour .= '        </tr>';
        $retour .= '    </tbody>';
        $retour .= '</table>';
        $tva += $article['Quantity'] * $article['Price'];
    }
    $retour .= orderDivider();

    if($delivery_tax != null && is_numeric($delivery_tax) && $delivery_tax > 0) {
        orderDetailsConclusion('Livraison', $delivery_tax.'&nbsp€');
    }
    if($total != null && is_numeric($total)) {
        if(!tva_intra($pays)) {
            orderDetailsConclusion('TVA', ($tva * 0.2).'&nbsp€');
        }
        orderDetailsConclusion('TOTAL', $total.'&nbsp€');
    }

    return $retour;
}

function orderDetailsConclusion($title, $value) {
    $retour = '';
    $retour .= '<table border="0" cellpadding="0" cellspacing="0"';
    $retour .= '    align="center" width="100%" role="module"';
    $retour .= '    data-type="columns" style="padding:0px 0px 0px 0px;"';
    $retour .= '    bgcolor="#0b1a25" data-distribution="1,1,1,1">';
    $retour .= '    <tbody>';
    $retour .= '        <tr role="module-content">';
    $retour .= '            <td height="100%" valign="top">';
    $retour .= column_details_conclusion();
    $retour .= column_details_conclusion();
    $retour .= column_details_conclusion($title);
    $retour .= column_details_conclusion($value);
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderTVAIntra($pays, $tva_intra) {
    $retour = '';
    $retour .= '<table class="module" role="module" data-type="text"';
    $retour .= '    border="0" cellpadding="0" cellspacing="0" width="100%"';
    $retour .= '    style="table-layout: fixed;"';
    $retour .= '    data-muid="1a987f62-dfa4-4b77-b531-7b4882447373"';
    $retour .= '    data-mc-module-version="2019-10-22">';
    $retour .= '    <tbody>';
    $retour .= '        <tr>';
    $retour .= '            <td style="padding:20px 0px 20px 0px; line-height:12px; text-align:inherit;"';
    $retour .= '                height="100%" valign="top" bgcolor=""';
    $retour .= '                role="module-content">';
    $retour .= '                <div>';
    $retour .= '                    <div';
    $retour .= '                        style="font-family: inherit; text-align: inherit">';
    $retour .= '                        <span style="font-size: 12px">';
    if(tva_intra($pays))
    {
        $retour .= '                            Exonération TVA, article 262 ter I du Code général des impôts<br/>';
        $retour .= '                            TVA intracommunautaire :'.$tva_intra;
    }
    else
    {
        $retour .= '                            Application de la TVA, article 258-I-a du Code général des impôts';

    }
    $retour .= '                        </span></div>';
    $retour .= '                    <div></div>';
    $retour .= '                </div>';
    $retour .= '            </td>';
    $retour .= '        </tr>';
    $retour .= '    </tbody>';
    $retour .= '</table>';
    return $retour;
}

function orderBilling($facturation) {
    $retour = '';
    $retour = orderTitre("Détails de facturation");
    $retour .= orderDivider();
    $retour .= column_billing_shipping('Facturé à', $facturation['Firstname'].' '.$facturation['Lastname']);
    $retour .= column_billing_shipping('Au', $facturation['Address'].', '.(isset($facturation['Address2']) ? $facturation['Address2'].', ' : '').$facturation['ZIP'].' '.$facturation['City'].', '.$facturation['Country']);
    if($facturation['Society'] != null)
    {
        $retour .= column_billing_shipping('Pour la société', $facturation['Society']);
    }
    $retour .= column_billing_shipping('Mail', $facturation['Mail']);
    $retour .= column_billing_shipping('Téléphone', $facturation['Phone']);
    return $retour;
}

function orderShipping($livraison) {
    $retour = '';
    $retour = orderTitre("Détails de livraison");
    $retour .= orderDivider();
    $retour .= column_billing_shipping('Livré à', $livraison['Firstname'].' '.$livraison['Lastname']);
    $retour .= column_billing_shipping('Au', $livraison['Address'].', '.(isset($livraison['Address2']) ? $livraison['Address2'].', ' : '').$livraison['ZIP'].' '.$livraison['City'].', '.$livraison['Country']);
    if($livraison['Society'] != null)
    {
        $retour .= column_billing_shipping('Pour la société', $livraison['Society']);
    }
    if($livraison['Mail'] != null)
    {
        $retour .= column_billing_shipping('Mail', $livraison['Mail']);
    }
    $retour .= column_billing_shipping('Téléphone', $livraison['Phone']);
    return $retour;
}
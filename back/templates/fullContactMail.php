<html>
    <body>
        <table cellspacing="0" cellpadding="10" border="0">
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>firstname</td>
                            <td><?=$_POST['firstname']?></td>
                        </tr>
                        <tr>
                            <td>lastname</td>
                            <td><?=$_POST['lastname']?></td>
                        </tr>
                        <tr>
                            <td>company</td>
                            <td><?=$_POST['company']?></td>
                        </tr>
                        <tr>
                            <td>speciality</td>
                            <td><?=$_POST['speciality']?></td>
                        </tr>
                        <tr>
                            <td>address</td>
                            <td><?=$_POST['address']?></td>
                        </tr>
                        <tr>
                            <td>phone_number</td>
                            <td><?=$_POST['phone_number']?></td>
                        </tr>
                        <tr>
                            <td>mail</td>
                            <td><?=$_POST['mail']?></td>
                        </tr>
                        <tr>
                            <td>postcode</td>
                            <td><?=$_POST['zip']?></td>
                        </tr>
                        <tr>
                            <td>city</td>
                            <td><?=$_POST['city']?></td>
                        </tr>
                        <tr>
                            <td>country</td>
                            <td><?=$_POST['country']?></td>
                        </tr>
                        <tr>
                            <td>message</td>
                            <td><?=$_POST['message']?></td>
                        </tr>
                        <tr>
                            <td>Interessé par :</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ACCUTITE | PRECISION CONTOURING</td>
                            <td><?=($_POST['ACCUTITE | PRECISION CONTOURING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>BODYFX & MINIFX | NON-INVASIVE BODY TREATMENT</td>
                            <td><?=($_POST['BODYFX & MINIFX | NON-INVASIVE BODY TREATMENT'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>BODYTITE/FACETITE | MINIMALLY INVASIVE PROCEDURES</td>
                            <td><?=($_POST['BODYTITE/FACETITE | MINIMALLY INVASIVE PROCEDURES'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>DIOLAZEXL | HAIR REMOVAL</td>
                            <td><?=($_POST['DIOLAZEXL | HAIR REMOVAL'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>EMBRACERF | FACIAL REFINEMENT</td>
                            <td><?=($_POST['EMBRACERF | FACIAL REFINEMENT'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>EVOKE | HANDS-FREE FACIAL REMODELING</td>
                            <td><?=($_POST['EVOKE | HANDS-FREE FACIAL REMODELING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>EVOLVE | HANDS-FREE SKIN AND BODY REMODELING</td>
                            <td><?=($_POST['EVOLVE | HANDS-FREE SKIN AND BODY REMODELING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>FORMA | SKIN REMODELING</td>
                            <td><?=($_POST['FORMA | SKIN REMODELING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>FRACTORA | FRACTIONAL RESURFACING</td>
                            <td><?=($_POST['FRACTORA | FRACTIONAL RESURFACING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>LUMECCA | PIGMENT & VASCULAR</td>
                            <td><?=($_POST['LUMECCA | PIGMENT & VASCULAR'] == 1 ? 'true' : 'false')?></td>
                        <tr>
                            <td>MORPHEUS8 | FACIAL AND BODY FRACTIONAL REMODELING</td>
                            <td><?=($_POST['MORPHEUS8 | FACIAL AND BODY FRACTIONAL REMODELING'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>PLUS | SKIN REMODELING FOR LARGER AREAS</td>
                            <td><?=($_POST['PLUS | SKIN REMODELING FOR LARGER AREAS'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>TRITON | DUOLIGHT/DUODARK | HAIR REMOVAL</td>
                            <td><?=($_POST['TRITON | DUOLIGHT/DUODARK | HAIR REMOVAL'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                        <tr>
                            <td>VOTIVA | AVIVA | FEMININE WELLNESS</td>
                            <td><?=($_POST['VOTIVA | AVIVA | FEMININE WELLNESS'] == 1 ? 'true' : 'false')?></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
import React from "react";
import { Link } from "gatsby";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll, enableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
import LoadingGIF from "../LoadingGIF";
import { getAllByClass, getById, selectOne } from "../../functions/selectors";
import _fetch, { initWakeup } from "../../functions/fetch";

import { send_form_mini} from "./contact";

const ContactUs = (props:ContactUs) => {

    const images = useImages();

    const [open, setOpen] = React.useState(false);
    const [formOpen, setFormOpen] = React.useState(false);
    const [msgLength, setMsgLength] = React.useState(0);
    const size = useWindowSize();

    const max_length = 300;

    const close_form = () => {
        setFormOpen(false);
        let _choices = getAllByClass('contact-choice');
        _choices && [].forEach.call(_choices, function(elem:HTMLElement) {
            elem.style.width = '250px';
            elem.style.margin = '0px auto';
            elem.style.transitionDelay = '0.4s';
        });
        let _temp:any = getById('contact-form');
        _temp && _temp.classList.remove('custom-scrollbar', 'moz-scrollbar');
        _temp = selectOne('#contact-form .req-return.success');
        if(_temp) {_temp.innerHTML = "";}
        _temp = selectOne('#contact-form .req-return.error');
        if(_temp) {_temp.innerHTML = "";}
    }

    const resolve_click = (e:React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        // WILL OPEN
        !formOpen && resolve_contact(e);
        !formOpen && size.width <= 480 && disableMainScroll();
        !formOpen && initWakeup("mini-contact");
        // WILL CLOSE
        formOpen && close_form();
        formOpen && size.width <= 480 && enableMainScroll();
        setOpen(!open);
        let _temp:any = getById('contact-us');
        _temp && _temp.classList.toggle('opened');
        setFormOpen(!formOpen);
    }

    const resolve_contact = (e:React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        let _choices = getAllByClass('contact-choice');
        _choices && [].forEach.call(_choices, function(elem:HTMLElement) {
            elem.style.setProperty('width', '0px', 'important');
            elem.style.margin = '0px auto';
            elem.style.transitionDelay = '0s';
        });
        let _temp:any = getById('contact-form');
        _temp && _temp.classList.add('custom-scrollbar', 'moz-scrollbar');
        setFormOpen(true);
    }

    const [submitText, setSubmitText] = React.useState('Envoyer');

    return (
        <div id="contact-us" className={`contact-us transition${open ? ' opened' : ''}`}>
            <div className="stamp transition">
                <img
                    id="piece"
                    className="transition user-select-none"
                    // src={images.resolve_img('contactUsPiece')}
                    src={images.resolve_img('contactUsPiece2')}
                    // srcSet={images.resolve_img_set('contactUsPiece')}
                    srcSet={images.resolve_img_set('contactUsPiece2')}
                    alt="contact-us"
                    onClick={(e) => {resolve_click(e)}}
                />
                <div className="content">
                    <div id="close" className="close-contact-us transition user-select-none" onClick={(e) => {resolve_click(e)}}>
                        <img
                            src={images.resolve_img('hexagonalCross')}
                            srcSet={images.resolve_img_set('hexagonalCross')}
                            alt="hexa-close"
                        />
                    </div>
                    <div id="contact-form" className="transition neumorphic custom-scrollbar moz-scrollbar" hidden={!formOpen}>
                        <form id="contact-mini" onSubmit={(e) => {send_form_mini(e, setSubmitText)}} className="custom-scrollbar moz-scrollbar">
                            <input type="text" placeholder="Nom*" name="lastname" required={true}/>
                            <input type="text" placeholder="Prénom*" name="firstname" required={true}/>
                            <select name="subject" required={true}>
                                <option value="" defaultValue="" selected={true} disabled={true} style={{display: 'none'}}>Choisir une spécialité*</option>
                                <option value="plastic-surgeon">Chirurgien plasticien</option>
                                <option value="facial-surgeon">Chirurgien maxillo-facial</option>
                                <option value="dermatologist">Dermatologue</option>
                                <option value="cosmetic-doctor">Médecin esthétique</option>
                                <option value="gynecologist">Gynécologue</option>
                                <option value="customer">Patient</option>
                                <option value="others">Autres</option>
                            </select>
                            <input type="email" placeholder="Adresse mail*" name="mail" spellCheck={false} required={true}/>
                            <input type="phone" placeholder="Téléphone*" name="phone" spellCheck={false} required={true} pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"/>
                            <input type="number" placeholder="Code postal*" name="zip" spellCheck={false} required={true}/>
                            <input type="text" placeholder="Ville*" name="city" spellCheck={false} required={true}/>
                            <textarea
                                id="contact-message-mini"
                                placeholder="Entrez votre message ici*"
                                name="message"
                                maxLength={max_length}
                                rows={5}
                                onKeyUp={(e) => {setMsgLength(e.currentTarget.value.length);}}
                                onKeyDown={(e) => {setMsgLength(e.currentTarget.value.length);}}
                                spellCheck={false}
                                required={true}
                                className="custom-scrollbar moz-scrollbar"
                            ></textarea>
                            <div className="policy" style={{width: '470px', display: 'flex', flexDirection: 'row', columnGap: '8px', alignItems: 'flex-start', marginBottom: '12px', marginTop: '8px'}}>
                                <input type="checkbox" id="policy" name="policy" value="policy" required style={{width: 'auto', height: 'auto', padding: '10px'}}/>
                                <label className="user-select-none" style={{color: 'var(--pure-white)', whiteSpace: 'wrap', marginTop: '0', marginBottom: '0', left: '0'}} htmlFor={"policy"}>En soumettant ce formulaire j'accepte que les informations saisies soient exploitées dans le cadre de ma demande d'informations et de la relation commerciale qui peut en découler. J'ai également pris connaissance de la <Link to="/privacy-policy" target="_blank" style={{color: 'var(--teal)', display: 'inline'}} target="_blank" title="Politique de confidentialité">politique de confidentialité</Link></label>
                            </div>
                            <div className="current-length user-select-none" style={{color: msgLength === max_length ? '#f00' : 'var(--teal)'}}>{`${msgLength} / ${max_length}`}</div>
                            <div className="req-return success" style={{color: 'var(--teal)', fontSize: 15, fontWeight: 400}}></div>
                            <div className="req-return error" style={{color: 'red', fontSize: 15, fontWeight: 400}}></div>
                            {/* Mettre LoadingGIF en attendant le retour du serveur */}
                            <button type="submit" className="submit">
                                {submitText}
                                <LoadingGIF customId="mini-contact-gif" customClass="mini" customStyle={{'display': 'none', 'verticalAlign': 'middle', 'margin': '0', 'left': '15px'}}/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ContactUs {

};

export default ContactUs;
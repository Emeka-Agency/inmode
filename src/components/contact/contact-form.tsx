import React from "react";
import { Link } from "gatsby";
import { useWindowSize } from "../../functions/window-size";
import SelectCountry from "../select-country";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { getById } from "../../functions/selectors";
import _fetch from "../../functions/fetch";
import { send_form_large } from "./contact";

const tech_list = {
    "morpheus8": "MORPHEUS8 | FACIAL AND BODY FRACTIONAL REMODELING",
    "accutite": "ACCUTITE | PRECISION CONTOURING",
    "bodyfx": "BODYFX & MINIFX | NON-INVASIVE BODY TREATMENT",
    "bodytite": "BODYTITE/FACETITE | MINIMALLY INVASIVE PROCEDURES",
    "diolazexl": "DIOLAZEXL | HAIR REMOVAL",
    "embracerf": "EMBRACERF | FACIAL REFINEMENT",
    "evoke": "EVOKE | HANDS-FREE FACIAL REMODELING",
    "evolve": "EVOLVE | HANDS-FREE SKIN AND BODY REMODELING",
    "forma": "FORMA | SKIN REMODELING",
    "fractora": "FRACTORA | FRACTIONAL RESURFACING",
    "lumecca": "LUMECCA | PIGMENT & VASCULAR",
    "plus": "PLUS | SKIN REMODELING FOR LARGER AREAS",
    "triton": "TRITON | DUOLIGHT/DUODARK | HAIR REMOVAL",
    "votiva": "VOTIVA | AVIVA | FEMININE WELLNESS"
};

const ContactForm = ({ from }:ContactForm) => {

    const size = useWindowSize();

    const resize_panel = (panel:Element | null, close:HTMLElement | null) => {
        let closed:boolean = close ? close.classList.contains("opened") : false;
        panel && panel.classList.contains('opened') && closed && panel.classList.remove('opened');
        panel && !panel.classList.contains('opened') && !closed && panel.classList.add('opened');
        if (maxHeight && close) {
            setMaxHeight(0);
        }
        else {
            panel && panel.classList.contains("opened") && setMaxHeight(parseFloat(panel.scrollHeight + "px"));
        }
    }

    React.useEffect(() => {
        resize_panel(
            getById("accordion"),
            getById("title-accordion")
        );
    }, [size.width]);

    const [msgLength, setMsgLength] = React.useState(0);
    const [maxHeight, setMaxHeight] = React.useState(0);

    const [submitText, setSubmitText] = React.useState('Envoyer');

    const resolveClick = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.currentTarget.classList.toggle('opened');
        var panel = e.currentTarget.nextElementSibling;
        resize_panel(panel, e.currentTarget);
    }
    
    const max_length = 800;

    return (
        <form id="full-contact-form" name="contact" onSubmit={(e) => {send_form_large(e, setSubmitText);}} className={`contact-form main-container ${from}`}>
            <div className="mailer-datas">
                <div className="field">
                    <label htmlFor="lastname">Nom*</label>
                    <input type="text" name="lastname" required/>
                </div>
                <div className="field">
                    <label htmlFor="firstname">Prénom*</label>
                    <input type="text" name="firstname" required/>
                </div>
                <div className="field">
                    <label htmlFor="company">Société</label>
                    <input type="text" name="company"/>
                </div>
                <div className="field">
                    <label htmlFor="subject">Choisir une spécialité*</label>
                    <select name="subject" required={true}>
                        <option value="" disabled selected style={{display: 'none'}}>Spécialité</option>
                        <option value="plastic-surgeon">Chirurgien plasticien</option>
                        <option value="facial-surgeon">Chirurgien maxillo-facial</option>
                        <option value="dermatologist">Dermatologue</option>
                        <option value="cosmetic-doctor">Médecin esthétique</option>
                        <option value="gynecologist">Gynécologue</option>
                        <option value="customer">Patient</option>
                        <option value="others">Autres</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="mail">Email*</label>
                    <input spellCheck={false} type="email" name="mail" required/>
                </div>
                <div className="field">
                    <label htmlFor="phone_number">Téléphone*</label>
                    <input spellCheck={false} type="tel" name="phone_number" required pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"/>
                </div>
                <div className="field">
                    <label htmlFor="address">Adresse*</label>
                    <input spellCheck={false} type="text" name="address" required/>
                </div>
                <div className="field">
                    <label htmlFor="zip">Code postal*</label>
                    <input spellCheck={false} type="number" name="zip" required/>
                </div>
                <div className="field">
                    <label htmlFor="city">Ville*</label>
                    <input spellCheck={false} type="text" name="city" required/>
                </div>
                <div className="field">
                    <label htmlFor="country">Pays</label>
                    <SelectCountry/>
                </div>
            </div>
            <div className="message-zone">
                <textarea
                    id="contact-message"
                    placeholder="Entrez votre message ici*"
                    name="message"
                    className="custom-scrollbar"
                    maxLength={max_length}
                    rows={15}
                    onKeyUp={(e) => {setMsgLength(e.currentTarget.value.length);}}
                    onKeyDown={(e) => {setMsgLength(e.currentTarget.value.length);}}
                    spellCheck={false}
                    required
                >
                </textarea>
                <div
                    className="current-length"
                    style={{color: msgLength === max_length ? '#f00' : '#59b7b3'}}
                >
                    {`${msgLength} / ${max_length}`}
                </div>
            </div>
            <div className="tech-list">
                <span
                    id="title-accordion"
                    className="title title-accordion transition"
                    onClick={(e) => {resolveClick(e);}}
                >
                    Quelles technologies vous intéressent ?
                </span>
                <div
                    id="accordion"
                    className="accordion transition"
                    style={{maxHeight: maxHeight}}
                >
                    {Object.keys(tech_list).map((machine:string, key) => {
                        return (
                            <div key={key} className="key-check">
                                <label htmlFor={machine}>
                                    <input type="checkbox" id={machine} name={machine}/>
                                    {tech_list[machine]}
                                </label>
                            </div>
                        );
                    })}
                    <hr/>
                </div>
            </div>
            <div className="policy">
                <input type="checkbox" id="policy" name="policy" value="policy" required/>
                <label htmlFor={"policy"}>J'accepte les <a href="/mentions-legales#cgu" target="_blank" title="Conditions générales d'utilisation">conditions générales d'utilisation</a></label>
            </div>
            <div className="req-return success" style={{color: '#59b7b3', fontSize: 15, fontWeight: 400}}></div>
            <div className="req-return error" style={{color: 'red', fontSize: 15, fontWeight: 400}}></div>
            <button type="submit" className="submit transition">{submitText}</button>
        </form>
    );
};

interface ContactForm {
    from: string;
};

export default ContactForm;
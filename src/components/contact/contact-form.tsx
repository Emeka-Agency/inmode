import React from "react";
import { Link } from "gatsby";
import { useWindowSize } from "../../functions/window-size";
import SelectCountry from "../select-country";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { getById } from "../../functions/selectors";
import LoadingGIF from "../LoadingGIF";

import { send_form_large } from "./contact";
import { _log } from "../../functions/logger";

// DONE - Changer le type du champ de code postal
// DONE - Factoriser les composants du formulaire
// DONE - Tester l'envoi de mails

const tech_list = [
    {name: "morpheus8", label: "MORPHEUS8 | FACIAL AND BODY FRACTIONAL REMODELING",},
    {name: "accutite", label: "ACCUTITE | PRECISION CONTOURING",},
    {name: "bodyfx", label: "BODYFX & MINIFX | NON-INVASIVE BODY TREATMENT",},
    {name: "bodytite", label: "BODYTITE/FACETITE | MINIMALLY INVASIVE PROCEDURES",},
    {name: "diolazexl", label: "DIOLAZEXL | HAIR REMOVAL",},
    {name: "embracerf", label: "EMBRACERF | FACIAL REFINEMENT",},
    {name: "evoke", label: "EVOKE | HANDS-FREE FACIAL REMODELING",},
    {name: "evolve", label: "EVOLVE | HANDS-FREE SKIN AND BODY REMODELING",},
    {name: "forma", label: "FORMA | SKIN REMODELING",},
    {name: "fractora", label: "FRACTORA | FRACTIONAL RESURFACING",},
    {name: "lumecca", label: "LUMECCA | PIGMENT & VASCULAR",},
    {name: "plus", label: "PLUS | SKIN REMODELING FOR LARGER AREAS",},
    {name: "triton", label: "TRITON | DUOLIGHT/DUODARK | HAIR REMOVAL",},
    {name: "votiva", label: "VOTIVA | AVIVA | FEMININE WELLNESS",},
];

const phone_pattern = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";

const form_elems = [
    {"placeholder": "", "validation_message": "Renseignez votre nom", "required": true, "label": "Nom", "name" : "lastname", "type" : "text"},
    {"placeholder": "", "validation_message": "Renseignez votre prénom", "required": true, "label": "Prénom", "name" : "firstname", "type" : "text"},
    {"placeholder": "", "label": "Société", "name" : "company", "type" : "text"},
    {"placeholder": "", "validation_message": "Choisissez une spécialité", "required": true, "label": "Choisir une spécialité", "name" : "subject", "type" : "select", "options": [
        {"value": undefined, "disabled": true, "selected": true, "style": {'display': 'none'}, "label": "Speciality"},
        {"value" : "plastic-surgeon", "label": "Chirurgien plasticien",},
        {"value" : "facial-surgeon", "label": "Chirurgien maxillo-facial",},
        {"value" : "dermatologist", "label": "Dermatologue",},
        {"value" : "cosmetic-doctor", "label": "Médecin esthétique",},
        {"value" : "gynecologist", "label": "Gynécologue",},
        {"value" : "customer", "label": "Patient",},
        {"value" : "others", "label": "Autrzs",}
    ]},
    {"placeholder": "", "validation_message": "Renseignez votre mail", "spellcheck": false, "required": true, "label": "Email", "name" : "mail", "type" : "email"},
    {"placeholder": "", "validation_message": "Renseignez votre téléphone", "spellcheck": false, "required": true, "label": "Téléphone", "name" : "phone_number", "type" : "tel", "pattern": phone_pattern},
    {"placeholder": "", "validation_message": "Renseignez votre addresse", "spellcheck": false, "required": true, "label": "Adresse", "name" : "address", "type" : "text"},
    {"placeholder": "", "validation_message": "Renseignez votre code postal", "spellcheck": false, "required": true, "label": "Code postal", "name" : "zip", "type" : "text"},
    {"placeholder": "", "validation_message": "Renseignez votre commune", "spellcheck": false, "required": true, "label": "Ville", "name" : "city", "type" : "text"},
    {"placeholder": "", "validation_message": "Renseignez votre pays", "spellcheck": false, "required": true, "label": "Pays", "name" : "country", "type" : "select", "options" : <SelectCountry/>},
];

const ContactForm = ({ from }:ContactForm) => {

    const size = useWindowSize();

    const resize_panel = (panel:Element | null, close:HTMLElement | null) => {
        let closed:boolean = close == null ? false : close.classList.contains("opened");
        if(panel && panel.classList.contains('opened') && !closed) {panel.classList.remove('opened');}
        else if(panel && !panel.classList.contains('opened') && closed) {panel.classList.add('opened');}
        if (maxHeight && close) {
            setMaxHeight(0);
        }
        else {
            panel && panel.classList.contains("opened") && setMaxHeight(parseInt(panel.scrollHeight + "px", 10));
        }
    }

    React.useEffect(() => {
        resize_panel(
            getById("accordion"),
            getById("title-accordion")
        );
        // EXPLAIN - Pas de setCustomValidity puisque ça définit l'élément comme étant mal rempli
        // let temp;
        // (form_elems || []).forEach(elem => {
        //     temp = document.querySelector(`#full-contact-form [name="${elem.name}"]`);
        //     if(typeof elem.validation_message == "string" && typeof elem.name == "string" && (temp instanceof HTMLInputElement ||temp instanceof HTMLSelectElement)) {
        //         temp.setCustomValidity(elem.validation_message);
        //     }
        // });
    }, [size.width]);

    const [msgLength, setMsgLength] = React.useState(0);
    const [maxHeight, setMaxHeight] = React.useState(0);

    const [submitText, setSubmitText] = React.useState('Envoyer');

    // CONSOLE TEST
    // function getFormDetails() {
    //     let body = new Object({});
    //     if(document.forms.namedItem("full-contact-form") == null) {
    //         return false;
    //     }
    //     let _form = document.forms.namedItem("full-contact-form")
    //     Array.from(_form ? _form.elements : []).map((elem) => {
    //         body[elem.name] = elem.value ?? elem.checked ?? null;
    //     });
    //     body.action = "full-contact";
    //     return body;
    // }

    const resolveClick = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.currentTarget.classList.toggle('opened');
        var panel = e.currentTarget.nextElementSibling;
        resize_panel(panel, e.currentTarget);
    }

    const get_for_element = (selector:string|null = null):HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null => {
        return selector == null ? null : document.querySelector(selector);
    }

    const verify_form = () => {
        _log("verify_form");
        return (form_elems || []).map(elem => 
            !elem.required || (elem.required == true && get_for_element(`#full-contact-form [name="${(elem.name || "")}"]`)?.checkValidity()) ? true : false
        ).filter(ans => ans).length == form_elems.length;
    }

    const set_saving = () => {
        _log("set_saving");
        (():HTMLElement|null => document?.querySelector('#full-contact-form button.submit .label'))()?.style.setProperty('display', 'none');
        document?.querySelector('#full-contact-form .loading-gif')?.classList.add('active');
        return true;
    }
    const remove_saving = (status = null) => {
        _log("remove_saving", status);
        status == "fail" && setSubmitText("Erreur d'envoi");
        status == "success" && setSubmitText("Envoyé");
        status == "error" && setSubmitText("Erreur à l'envoi");
        (():HTMLElement|null => document?.querySelector('#full-contact-form button.submit .label'))()?.style.removeProperty('display');
        document?.querySelector('#full-contact-form .loading-gif')?.classList.remove('active');
        return true;
    }

    const reset_form = () => {
        let _temp = null;
        _temp = document.querySelector('#full-contact-form .req-return.success');
        if(_temp instanceof HTMLElement) {_temp.innerHTML = "";}
        _temp = document.querySelector('#full-contact-form .req-return.error');
        if(_temp instanceof HTMLElement) {_temp.innerHTML = "";}
        setSubmitText("Envoyer");
        _temp = document?.getElementById("full-contact-form");
        if(_temp instanceof HTMLFormElement) {_temp.reset();}
    }
    
    const max_length = 800;

    return (
        <form
            id="full-contact-form"
            name="contact"
            onSubmit={(e) => {
                e.preventDefault();
                // console.log("Submit with " + (verify_form() ? "Envoyer" : "report validity"));
                verify_form() ? set_saving() && send_form_large(e, setSubmitText, remove_saving, remove_saving) : e.currentTarget.reportValidity();
            }}
            className={`contact-form main-container ${from}`}
            method="POST"
        >
            <div className="mailer-datas">
                {form_elems.map((elem, elem_key) => {
                    if(["email", "tel", "text"].indexOf(elem.type) > -1) {
                        return (
                            <div className="field" key={elem_key}>
                                <label htmlFor={elem.name}>{elem.label}{elem.required ? "*" : ""}</label>
                                <input
                                    id={elem.name}
                                    title={elem.label}
                                    placeholder={elem.placeholder}
                                    spellCheck={elem.spellcheck ? true : false}
                                    type={elem.type}
                                    name={elem.name}
                                    required={elem.required ? false : false}
                                    pattern={elem.pattern ? elem.pattern : undefined}
                                />
                            </div>
                        );
                    }
                    if(elem.type == "select") {
                        return (
                            <div className="field">
                                <label htmlFor={elem.name}>{elem.label}{elem.required ? "*" : ""}</label>
                                {
                                    Array.isArray(elem.options) ? 
                                        <select id={elem.name} name={elem.name} required={elem.required ? false : false}>
                                            {(elem.options || []).map((option, option_key) => 
                                                <option
                                                    value={option.value}
                                                    disabled={option.disabled ? true : false}
                                                    selected={option.selected ? true : false}
                                                    style={option.style || {}}
                                                    key={`option_${option_key}`}
                                                >{option.label}</option>
                                            )}
                                        </select>
                                    :
                                    elem.options
                                }
                            </div>
                        );
                    }
                })}
            </div>
            <div className="message-zone">
                <textarea
                    id="contact-message"
                    placeholder="Entrez votre message ici*"
                    name="message"
                    className="custom-scrollbar moz-scrollbar"
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
                    style={{color: msgLength === max_length ? '#f00' : 'var(--teal)'}}
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
                    {tech_list.map((tech, key) => {
                        return (
                            <div key={key} className="key-check">
                                <label className="user-select-none" htmlFor={tech.name}>
                                    <input type="checkbox" id={tech.name} name={tech.name}/>
                                    {tech.label}
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
            <div className="req-return success" style={{color: 'var(--teal)', fontSize: 15, fontWeight: 400}}></div>
            <div className="req-return error" style={{color: 'red', fontSize: 15, fontWeight: 400}}></div>
            <button type="submit" className="submit transition">
                <div className="label">{submitText}</div>
                {<LoadingGIF/>}
            </button>
            <button
                type="button"
                className="submit transition reset"
                onClick={() => reset_form()}>
                <div className="label">Nouveau message</div>
            </button>
        </form>
    );
};

interface ContactForm {
    from: string;
};

export default ContactForm;
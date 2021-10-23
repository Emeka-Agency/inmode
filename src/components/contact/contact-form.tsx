import React from "react";
import { Link } from "gatsby";
import { useWindowSize } from "../../functions/window-size";
import SelectCountry from "../select-country";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { oneById } from "../../functions/selectors";

import { send_form_large } from "./contact";

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

const ContactForm = ({ from }:ContactForm) => {

    // console.log(process.env.INMODE_BACK);

    const size = useWindowSize();

    const resize_panel = (panel:Element | null, close:HTMLElement | null) => {
        let closed:boolean = close == null ? false : close.classList.contains("opened");
        panel && panel.classList.contains('opened') && closed && panel.classList.remove('opened');
        panel && !panel.classList.contains('opened') && !closed && panel.classList.add('opened');
        if (maxHeight && close) {
            setMaxHeight(0);
        }
        else {
            panel && panel.classList.contains("opened") && setMaxHeight(parseInt(panel.scrollHeight + "px", 10));
        }
    }

    React.useEffect(() => {
        resize_panel(
            oneById("accordion"),
            oneById("title-accordion")
        );
    }, [size.width]);

    const [msgLength, setMsgLength] = React.useState(0);
    const [maxHeight, setMaxHeight] = React.useState(0);

    const [submitText, setSubmitText] = React.useState('Send');

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
    
    const max_length = 800;

    return (
        <form id="full-contact-form" name="contact" onSubmit={(e) => {send_form_large(e);}} className={`contact-form main-container ${from}`}>
            <div className="mailer-datas">
                <div className="field">
                    <label htmlFor="lastname">Last name*</label>
                    <input type="text" name="lastname" required/>
                </div>
                <div className="field">
                    <label htmlFor="firstname">First name*</label>
                    <input type="text" name="firstname" required/>
                </div>
                <div className="field">
                    <label htmlFor="company">Society</label>
                    <input type="text" name="company"/>
                </div>
                <div className="field">
                    <label htmlFor="subject">Choose a speciality*</label>
                    <select name="subject" required={true}>
                        <option value="" disabled selected style={{display: 'none'}}>Speciality</option>
                        <option value="plastic-surgeon">Plastic surgeon</option>
                        <option value="cosmetic-surgeon">Cosmetic surgeon</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="cosmetic-doctor">Cosmetic doctor</option>
                        <option value="gynecologist">Gynecologist</option>
                        <option value="nurse">Nurse</option>
                        <option value="facialist">Facialist / Aesthetician</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="mail">Email*</label>
                    <input spellCheck={false} type="email" name="mail" required/>
                </div>
                <div className="field">
                    <label htmlFor="phone_number">Phone*</label>
                    <input spellCheck={false} type="tel" name="phone_number" required pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"/>
                </div>
                <div className="field">
                    <label htmlFor="address">Address*</label>
                    <input spellCheck={false} type="text" name="address" required/>
                </div>
                <div className="field">
                    <label htmlFor="zip">PostCode*</label>
                    <input spellCheck={false} type="number" name="zip" required/>
                </div>
                <div className="field">
                    <label htmlFor="city">City*</label>
                    <input spellCheck={false} type="text" name="city" required/>
                </div>
                <div className="field">
                    <label htmlFor="country">Country</label>
                    <SelectCountry/>
                </div>
            </div>
            <div className="message-zone">
                <textarea
                    id="contact-message"
                    placeholder="Enter your message here*"
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
                    What technologies are you interested in?
                </span>
                <div
                    id="accordion"
                    className="accordion transition"
                    style={{maxHeight: maxHeight}}
                >
                    {tech_list.map((tech, key) => {
                        return (
                            <div key={key} className="key-check">
                                <label htmlFor={tech.name}>
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
                <label htmlFor={"policy"}>I accept <a href="/mentions-legales#cgu" target="_blank" title="Terms and conditions">T&Cs</a></label>
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
import React from "react";

import "./empower-top.css";
import LoadingGIF from "../LoadingGIF";
import Video from "../Video";
import { send_form_landing_empower } from "../Contact/contact";

const phone_pattern = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";

const form_elems = [
    {"placeholder": "", "validation_message": "Fill in your name", "required": true, "label": "Name", "name" : "Name", "type" : "text"},
    {"placeholder": "", "validation_message": "Fill in your mail", "spellcheck": false, "required": true, "label": "Email", "name" : "Email", "type" : "email"},
    {"placeholder": "", "validation_message": "Fill in your phone", "spellcheck": false, "required": true, "label": "Phone", "name" : "Phone", "type" : "tel", "pattern": phone_pattern},
];

const LandingEmpowerTop = (datas:LandingEmpowerTop) => {

    const [submitText, setSubmitText] = React.useState('Enquire now');

    const get_for_element = (selector:string|null = null):HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null => {
        return selector == null ? null : document.querySelector(selector);
    }

    const verify_form = () => {
        return (form_elems || []).map(elem => 
            !elem.required || (elem.required == true && get_for_element(`#empower-landing-contact-form [name="${(elem.name || "")}"]`)?.checkValidity()) ? true : false
        ).filter(ans => ans).length == form_elems.length;
    }

    const set_saving = () => {
        document?.querySelector('#empower-landing-contact-form .loading-gif')?.classList.add('active');
        setSubmitText("Sending");
        return true;
    }
    const remove_saving = (status = null) => {
        status == "fail" && setSubmitText("Fail to send");
        status == "success" && setSubmitText("Sent");
        status == "error" && setSubmitText("Error on send");
        document?.querySelector('#empower-landing-contact-form .loading-gif')?.classList.remove('active');
        return true;
    }

    return (
        <div id="landing-empower-top">
            <video
                playsInline={false} 
                autoPlay={true}
                loop={true}
                muted={true}
                poster="https://img.youtube.com/vi/QDWqcDwJm_c/maxresdefault.jpg"
            >
                <source
                    src="https://youtu.be/QDWqcDwJm_c"
                    type="video/mp4"
                />
                <track src="" kind="subtitles" srcLang="en" label="English"></track>
            </video>
            <section className="full-form-container contact">
                <form
                    id="empower-landing-contact-form"
                    name="contact"
                    onSubmit={(e) => {
                        e.preventDefault();
                        verify_form() ? set_saving() && send_form_landing_empower(e, setSubmitText, remove_saving, remove_saving) : e.currentTarget.reportValidity();
                    }}
                    className={`contact-form main-container empower-landing`}
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
                        })}
                    </div>
                    <div className="req-return success" style={{color: 'var(--teal)', fontSize: 15, fontWeight: 400}}></div>
                    <div className="req-return error" style={{color: 'red', fontSize: 15, fontWeight: 400}}></div>
                    <button type="submit" className="submit transition">
                        <div className="label">{submitText}</div>
                        {<LoadingGIF/>}
                    </button>
                </form>
            </section>
        </div>
    );
}

interface LandingEmpowerTop {

};

export default LandingEmpowerTop;
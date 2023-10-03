import React from "react";

import "./empower-top.css";
import LoadingGIF from "../LoadingGIF";
import { send_form_landing } from "../Contact/contact";
import { go_to } from "../../functions/tools";

const phone_pattern = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";

const form_elems = [
    {"placeholder": "", "validation_message": "Fill in your name", "required": true, "label": "Name", "name" : "Name", "type" : "text"},
    {"placeholder": "", "validation_message": "Fill in your mail", "spellcheck": false, "required": true, "label": "Email", "name" : "Email", "type" : "email"},
    {"placeholder": "", "validation_message": "Fill in your phone", "spellcheck": false, "required": true, "label": "Phone", "name" : "Phone", "type" : "tel", "pattern": phone_pattern},
    {"placeholder": "", "validation_message": "Fill in your company", "spellcheck": false, "required": true, "label": "Company", "name" : "Company", "type" : "text"},
];

const video_params = {
    autohide: "1",
    autoplay: "1",
    cc_load_policy: "1",
    color: "turquoise",
    controls: "0",
    disablekb: "1",
    enablejsapi: "0",
    fs: "1",
    hd: "1",
    hl: "en",
    html5: "1",
    iv_load_policy: "3",
    loop: "1",
    modestbranding: "1",
    mute: "1",
    rel: "0",
    showinfo: "0",
    version: "3",
    wmode: "transparent",
};

const LandingEmpowerTop = ({  }:LandingEmpowerTop) => {

    const [submitText, setSubmitText] = React.useState('Enquire now');
    const [ratio, setRatio] = React.useState(1);
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(false);
    
    const extractRatio = (url:string) => {
        const img = new Image();
        img.src = url;
        setTimeout(() => {
            if(img.width > 0 && img.height > 0) {
                setRatio(img.width / img.height);
                return;
            }
            extractRatio(url);
        }, 200);
        return;
    }

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
        setLoading(false);
        status == "fail" && setSubmitText("Fail to send");
        status == "success" && setSubmitText("Sent");
        status == "error" && setSubmitText("Error on send");
        document?.querySelector('#empower-landing-contact-form .loading-gif')?.classList.remove('active');
        status == "success" && go_to("/thanks");
        return true;
    }

    React.useEffect(() => {
        extractRatio("https://img.youtube.com/vi/QDWqcDwJm_c/maxresdefault.jpg");
    }, [ratio]);

    return (
        <div id="landing-empower-top">
            <iframe
                src={`https://www.youtube.com/embed/QDWqcDwJm_c?${Object.keys(video_params).map(param => `${param}=${video_params[param]}`).join('&')}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                style={{aspectRatio: ratio}}
            ></iframe>
            {/* <video
                playsInline={false} 
                autoPlay={true}
                loop={true}
                muted={true}
                poster="https://img.youtube.com/vi/QDWqcDwJm_c/maxresdefault.jpg"
            >
                <source
                    src="https://www.youtube.com/watch?v=QDWqcDwJm_c"
                    type="video/mp4"
                />
                <track src="" kind="subtitles" srcLang="en" label="English"></track>
            </video> */}
            <section className="full-form-container contact" style={
                loading ? {display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--pearl-75)"} : {}}>
                {loading && <LoadingGIF />}
                {!loading && (
                    <>
                        <h2>Get in touch</h2>
                        <form
                            id="empower-landing-contact-form"
                            name="contact"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if(verify_form()) {
                                    set_saving();
                                    setLoading(true);
                                    send_form_landing(e, "empower", setSubmitText, remove_saving, remove_saving);
                                }
                                else {
                                    e.currentTarget.reportValidity();
                                }
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
                                <input hidden id="From" value="EmpowerRF" readOnly={true}/>
                            </div>
                            <div className="req-return success" style={{color: 'var(--teal)', fontSize: 15, fontWeight: 400}}></div>
                            <div className="req-return error" style={{color: 'red', fontSize: 15, fontWeight: 400}}></div>
                            <button type="submit" className="submit transition">
                                <div className="label">{submitText}</div>
                                {<LoadingGIF/>}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
}

interface LandingEmpowerTop {
    
};

export default LandingEmpowerTop;
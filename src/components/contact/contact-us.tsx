import React from "react";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll, enableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
import LoadingGIF from "../LoadingGIF";
import { allByClass, getById, selectOne } from "../../functions/selectors";

import { send_form_mini } from "./contact";
import initWakeup from "../../functions/wakeup";

const ContactUs = () => {

    const images = useImages();

    const [open, setOpen] = React.useState(false);
    const [formOpen, setFormOpen] = React.useState(false);
    const [msgLength, setMsgLength] = React.useState(0);
    const size = useWindowSize();

    const max_length = 300;

    const close_form = () => {
        setFormOpen(false);
        let _choices = allByClass('contact-choice');
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
        let _choices = allByClass('contact-choice');
        _choices && [].forEach.call(_choices, function(elem:HTMLElement) {
            elem.style.setProperty('width', '0px', 'important');
            elem.style.margin = '0px auto';
            elem.style.transitionDelay = '0s';
        });
        let _temp:any = getById('contact-form');
        _temp && _temp.classList.add('custom-scrollbar', 'moz-scrollbar');
        setFormOpen(true);
    }

    const [submitText, setSubmitText] = React.useState('Send');

    return (
        <div id="contact-us" className={`contact-us transition${open ? ' opened' : ''}`}>
            <div className="stamp transition">
                <img
                    id="piece"
                    className="transition"
                    src={images.resolve_img('contactUsPiece')}
                    srcSet={images.resolve_img_set('contactUsPiece')}
                    alt="contact-us"
                    onClick={(e) => {resolve_click(e)}}
                />
                <div className="content">
                    <div id="close" className="close-contact-us transition" onClick={(e) => {resolve_click(e)}}>
                        <img
                            src={images.resolve_img('hexagonalCross')}
                            srcSet={images.resolve_img_set('hexagonalCross')}
                            alt="hexa-close"
                        />
                    </div>
                    <div id="contact-form" className="transition neumorphic custom-scrollbar moz-scrollbar" hidden={!formOpen}>
                        <form id="contact-mini" onSubmit={(e) => {send_form_mini(e, setSubmitText)}} className="custom-scrollbar moz-scrollbar">
                            <input type="text" placeholder="Last name*" name="lastname" required={true}/>
                            <input type="text" placeholder="First name*" name="firstname" required={true}/>
                            <select name="subject" required={true}>
                                <option value="" selected disabled style={{display: 'none'}}>Choose a speciality*</option>
                                <option value="plastic-surgeon">Plastic surgeon</option>
                                <option value="cosmetic-surgeon">Cosmetic surgeon</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="cosmetic-doctor">Cosmetic doctor</option>
                                <option value="gynecologist">Gynecologist</option>
                                <option value="nurse">Nurse</option>
                                <option value="facialist">Facialist / Aesthetician</option>
                                <option value="others">Others</option>
                            </select>
                            <input type="email" placeholder="Email*" name="mail" spellCheck={false} required={true}/>
                            <input type="phone" placeholder="Phone*" name="phone" spellCheck={false} required={true} pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"/>
                            <input type="number" placeholder="Postcode*" name="zip" spellCheck={false} required={true}/>
                            <input type="text" placeholder="City*" name="city" spellCheck={false} required={true}/>
                            <textarea
                                id="contact-message-mini"
                                placeholder="Enter your message here*"
                                name="message"
                                maxLength={max_length}
                                rows={5}
                                onKeyUp={(e) => {setMsgLength(e.currentTarget.value.length);}}
                                onKeyDown={(e) => {setMsgLength(e.currentTarget.value.length);}}
                                spellCheck={false}
                                required={true}
                                className="custom-scrollbar moz-scrollbar"
                            ></textarea>
                            <div className="current-length" style={{color: msgLength === max_length ? '#f00' : 'var(--teal)'}}>{`${msgLength} / ${max_length}`}</div>
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
}

ContactUs.propTypes = {

}

ContactUs.defaultProps = {
    
}

export default ContactUs;
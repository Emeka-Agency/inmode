import React from "react";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll, enableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
import LoadingGIF from "../LoadingGIF";
import { allByClass, oneById, oneBySelector } from "../../functions/selectors";

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
        let _temp:any = oneById('contact-form');
        _temp && _temp.classList.remove('custom-scrollbar');
        _temp = oneBySelector('#contact-form .req-return.success');
        if(_temp) {_temp.innerHTML = "";}
        _temp = oneBySelector('#contact-form .req-return.error');
        if(_temp) {_temp.innerHTML = "";}
    }

    const resolve_click = (e:React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        // WILL OPEN
        !formOpen && resolve_contact(e);
        !formOpen && size.width <= 480 && disableMainScroll();
        // WILL CLOSE
        formOpen && close_form();
        formOpen && size.width <= 480 && enableMainScroll();
        setOpen(!open);
        let _temp:any = oneById('contact-us');
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
        let _temp:any = oneById('contact-form');
        _temp && _temp.classList.add('custom-scrollbar');
        setFormOpen(true);
    }

    const [submitText, setSubmitText] = React.useState('Send');

    function send_form ( e:React.FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        let _temp:any = oneBySelector('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', true);
        _temp = oneBySelector('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'inline-block';}
        let body:Object = new Object({});
        let _form = document.forms.namedItem('contact-mini');
        Array.from(_form ? _form.elements : []).forEach((elem) => {
            body[elem.name] = elem.checked || elem.value;
        });
        body.action = "contact-us";
        var myHeaders = new Headers();
        const fetch_post = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        _temp = oneBySelector("#contact-mini .req-return.success");
        if(_temp) {_temp.innerHTML = "";}
        _temp = oneBySelector("#contact-mini .req-return.error");
        if(_temp) {_temp.innerHTML = "";}
        let _request_init:RequestInit = {
            ...fetch_post,
            body: JSON.stringify(body)
        };
        fetch(
            `https://inmodeuk.emeka.fr/back/app.php`,
            _request_init
        )
        .then((promise) => {
            return promise.json();
        })
        .then((response) => {
            let _temp:any = oneBySelector('#mini-contact-gif');
            if(_temp) {_temp.style.display = 'none';}
            if(response.status === 'success' && response.type === 'client') {
                _temp = oneBySelector('#contact-mini .submit');
                _temp.removeAttribute('disabled');
                _temp = oneBySelector('#contact-mini .req-return.success');
                if(_temp) {_temp.innerHTML = response.message;}
                let _form = document.forms.namedItem('contact-mini');
                _form && _form.reset();
            }
            if(response.status === 'fail' && response.type === 'client') {
                setSubmitText(response.message);
                _temp = oneBySelector('#contact-mini .submit');
                _temp.setAttribute('disabled', true);
                _temp = oneBySelector('#contact-mini .req-return.success');
                if(_temp) {_temp.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";}
            }
            if(response.status === 'fail' && response.type === 'server') {
                _temp = oneBySelector('#contact-mini .submit');
                _temp.setAttribute('disabled', true);
                _temp = oneBySelector('#contact-mini .req-return.error');
                if(_temp) {_temp.innerHTML = response.message;}
            }
        })
        .catch(function(error) {
            
        });
    }

    return (
        <div id="contact-us" className={`contact-us transition${open ? ' opened' : ''}`}>
            <div className="stamp transition">
                <img
                    id="piece"
                    className="transition"
                    src={images.getOne('contactUsPiece').childImageSharp.fluid.srcWebp}
                    srcSet={images.getOne('contactUsPiece').childImageSharp.fluid.srcSetWebp}
                    alt="contact-us"
                    onClick={(e) => {resolve_click(e)}}
                />
                <div className="content">
                    <div id="close" className="close-contact-us transition" onClick={(e) => {resolve_click(e)}}>
                        <img
                            src={images.getOne('hexagonalCross').childImageSharp.fluid.srcWebp}
                            srcSet={images.getOne('hexagonalCross').childImageSharp.fluid.srcSetWebp}
                            alt="hexa-close"
                        />
                    </div>
                    <div id="contact-form" className="transition neumorphic custom-scrollbar" hidden={!formOpen}>
                        <form id="contact-mini" onSubmit={(e) => {send_form(e)}} className="custom-scrollbar">
                            <input type="text" placeholder="Lastname*" name="lastname" required={true}/>
                            <input type="text" placeholder="Firstname*" name="firstname" required={true}/>
                            <select name="subject" required={true}>
                                <option value="" selected disabled style={{display: 'none'}}>Choose a speciality*</option>
                                <option value="plastic-surgeon">Plastic surgeon</option>
                                <option value="facial-surgeon">Facial surgeon</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="cosmetic-doctor">Cosmetic doctor</option>
                                <option value="gynecologist">Gynecologist</option>
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
                                className="custom-scrollbar"
                            ></textarea>
                            <div className="current-length" style={{color: msgLength === max_length ? '#f00' : '#59b7b3'}}>{`${msgLength} / ${max_length}`}</div>
                            <div className="req-return success" style={{color: '#59b7b3', fontSize: 15, fontWeight: 400}}></div>
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
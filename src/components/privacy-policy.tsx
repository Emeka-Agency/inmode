import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import { disableMainScroll, enableMainScroll } from "../functions/disable-scroll";
import { useLocalStorage } from "../functions/use-localstorage";
import { useWindowSize } from "../functions/window-size";
import { useImages } from './contexts/images-provider';

const PrivacyPolicy = (props:PrivacyPolicy) => {

    const images = useImages();

    const generalCookies = 'inmodemd-fr-accept-cookies';
    const analyticsCookies = 'inmodemd-fr-accept-analytics-cookies';

    const [open, setOpen] = React.useState(false);
    const [accepted, setAccepted] = React.useState(false);
    const [hasMounted, setHasMounted] = React.useState(false);

    const size = useWindowSize();
    const LocalStorage = useLocalStorage;

    async function process_cookies(e:React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) {
        let temp:HTMLInputElement|null = document.querySelector('#onoffswitch');
        let checked = temp ? temp.checked : false;
        if(open) {
            setAccepted(checked ? true : false);
            LocalStorage.setItem(analyticsCookies, checked ? 'true' : 'false');
            LocalStorage.setItem(generalCookies, 'true');
            enableMainScroll();
            setOpen(false);
        }
        else if(!open) {
            size.width <= 450 && disableMainScroll();
            setOpen(true);
        }
    }

    const isInitialized = () => {
        return LocalStorage.getItem(generalCookies) == 'true';
    }

    React.useEffect(() => {
        setHasMounted(true);
        if(LocalStorage.getItem(generalCookies) == null) {
            LocalStorage.setItem(generalCookies, 'false');
        }
        if(LocalStorage.getItem(analyticsCookies) == null) {
            LocalStorage.setItem(analyticsCookies, 'false');
        }
        isInitialized() && enableMainScroll();
        !isInitialized() && disableMainScroll();
        setOpen(!isInitialized());
        setAccepted(LocalStorage.getItem(analyticsCookies) == 'true');
        // document.querySelector('#onoffswitch').checked = accepted;
    }, []);

    if(!hasMounted) {
        return null;
    }

    return (
        <div className={`privacy-policy transition${open ? ' opened' : ''}`}>
            <button className="open-button" onClick={(e) => {process_cookies(e);}}>
                <img className="main" src={images.getOne('privacyPolicyTriangle').publicURL} alt="privacy-triangle"/>
                <img className="content" src={images.getOne('privacyPolicyC').childImageSharp.fluid.srcWebp} alt="privacy-icon"/>
            </button>
            <div className="panel cookies transition custom-scrollbar">
                <div className="cookies-our-use">
                    <div className="cookies-title">Our use of cookies</div>
                    <div className="cookies-text">We use necessary cookies to make our site work. We'd also like to set optional analytics cookies to help us improve it. We won't set optional cookies unless you enable them. Using this tool will set a cookie on your device to remember your preferences.</div>
                    <div className="cookies-divider"></div>
                </div>
                <div className="cookies-necessaries">
                    <div className="cookies-title">Necessary cookies</div>
                    <div className="cookies-text">Necessary cookies enable core functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions. For more information please see our <AnchorLink to="/mentions-legales#cookies" title="Cookies">cookie policy</AnchorLink>.</div>
                    <div className="cookies-divider"></div>
                </div>
                <div className="cookies-analytics">
                    <div className="cookies-title">Analytics cookies</div>
                    {/* TODO faire un component SWITCH */}
                    <div className="switch-component">
                        <input
                            type="checkbox"
                            name="onoffswitch"
                            className={`switch-checkbox${accepted ? ' checked' : ''}`}
                            id="onoffswitch"
                            defaultChecked={accepted}
                        />
                        <label
                            className="switch"
                            htmlFor="onoffswitch"
                        >
                            <span className="switch-inner"></span>
                            <span className="switch-switch"></span>
                        </label>
                    </div>
                    <div className="cookies-text">We'd like to set Google Analytics cookies to help us to improve our website by collecting and reporting information on how you use it. For more information on how these cookies work please see our <AnchorLink to="/mentions-legales#cookies" title="Cookies">'Cookies page'</AnchorLink>. The cookies collect information in an anonymous form.</div>
                </div>
                <div className="accept-close" onClick={(e) => {process_cookies(e);}}>
                    Accept and close
                </div>
            </div>
        </div>
    );
}

interface PrivacyPolicy {

}

export default PrivacyPolicy;
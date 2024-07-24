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

    async function process_cookies(e:React.MouseEvent, checked:boolean = false) {
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
        <div className={`privacy-policy transition user-select-none${open ? ' opened' : ''}`}>
            <button className="open-button" onClick={(e) => {process_cookies(e);}}>
                <img className="main" src={images.resolve_img('privacyPolicyTriangle')} alt="privacy-triangle"/>
                <img className="content" src={images.resolve_img('privacyPolicyC')} alt="privacy-icon"/>
            </button>
            <div className="panel cookies transition custom-scrollbar moz-scrollbar">
                <div className="cookies-our-use">
                    <div className="cookies-title">Notre usage des cookies</div>
                    <div className="cookies-text">Nous utilisons ceux nécessaires au fonctionnement du site. Nous voudrions aussi en utiliser certains optionnels pour améliorer votre expérience. Nous ne les utiliserons pas si vous ne les activez pas. Ce panneau servira à se souvenir de vos préférences et à les changer.</div>
                    <div className="cookies-divider"></div>
                </div>
                <div className="cookies-necessaries">
                    <div className="cookies-title">Cookies nécessaires</div>
                    <div className="cookies-text">Les cookies fonctionnels permettent d'assurer des fonctionalités de base telles que la sécurité, la gestion réseau et l'accessibilité. Vous pouvez les désactiver en changeant les paramètres de votre navigateur, mais cela pourrait affecter la façon dont le site fonctionne. Pour plus d'informations, vous pouvez consulter notre <AnchorLink to="/mentions-legales#cookies" title="Cookies">politique relative aux cookies</AnchorLink>.</div>
                    <div className="cookies-divider"></div>
                </div>
                <div className="cookies-analytics">
                    <div className="cookies-title">Cookies analytiques</div>
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
                    <div className="cookies-text">Nous aimerions mettre en place des cookies Google Analytics pour nous aider à améliorer l'expérience InMode en ligne en collectant et repotant des informations sur votre usage de ce site. Pour plus d'informations sur la façon dont ces cookies fonctionnent, vous pouvez consulter notre <AnchorLink to="/mentions-legales#cookies" title="Cookies">politique relative aux cookies</AnchorLink>. Les cookies collectent des informations de manière anonyme.</div>
                </div>
                <div className="accept-close" onClick={(e) => {process_cookies(e, (():HTMLInputElement|any => document.querySelector('#onoffswitch'))()?.checked);}}>
                    Accepter et fermer
                </div>
            </div>
        </div>
    );
};

interface PrivacyPolicy {

};

export default PrivacyPolicy;
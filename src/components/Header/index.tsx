import { Link } from "gatsby";
import React from "react";
import HeaderTop from "./header-top";
import HeaderBottom from "./header-bottom";
import HeaderMini from "./header-mini";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';

import { getById } from "../../functions/selectors";
import MenuSingleImage from "../menu/single-image";
import { closeModale, openModale, routeCaseStudy } from "../../functions/modale";
import { strToDom } from "../../functions/tools";
import { _log } from "../../functions/logger";

import "./index.css";

const Header = ({}:Header) => {

    const images = useImages();

    const openMenu = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let _temp:any = getById('header-mini');
        _temp && _temp.classList.add('opened');
        size.width < 1200 && disableMainScroll();
    }

    function insertAfter(newNode: Node, existingNode: Node) {
        existingNode.parentNode?.insertBefore(newNode, existingNode.nextSibling);
    }

    const size = useWindowSize();

    React.useEffect(() => {
        if(typeof document != "undefined") {
            let case_link = document.querySelector('a[href="/case-studies"]');
            if(case_link instanceof Element && window?.localStorage.getItem("case_studies_pass") != "true") {
                // case_link.parentNode.append(strToDom(`<img src="${images.getOne("lock").publicURL}" className="locked-section"/>`));
                case_link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModale(routeCaseStudy({
                        onOpen: () => {
                            // MODALE CONTENT
                            let input = getById('route-case-study-password');
                            let inputStatus = getById('route-case-study-password-status');
                            let button = getById('route-case-study-submit');

                            if(input instanceof HTMLInputElement && inputStatus instanceof HTMLDivElement && button instanceof HTMLButtonElement) {
                                input.focus();
                                
                                // MODALE INPUT
                                input instanceof HTMLInputElement && input.addEventListener('keyup', (e) => {
                                    _log(e);
                                    if(e.key == "Enter") {
                                        _log(1);
                                        if(input instanceof HTMLInputElement && input.value != "" && inputStatus) {
                                            _log(2);
                                            if(!verifyPassword(input.value)) {
                                                _log(3);
                                                inputStatus.innerHTML = "Wrong password";
                                                inputStatus.style.removeProperty('display');
                                            }
                                        }
                                        else if(inputStatus != null) {
                                            _log(4);
                                            inputStatus.innerHTML = "Must enter a value";
                                            inputStatus.style.removeProperty('display');
                                        }
                                    }
                                    else {
                                        if(input instanceof HTMLInputElement && input.value != "") {
                                            button && button.classList.add('able');
                                        }
                                        else {
                                            button && button.classList.remove('able');
                                        }
                                    }
                                });
                                // MODALE BUTTON
                                button && button.addEventListener('click', (e) => {
                                    _log(e);
                                    _log(5);
                                    if(input instanceof HTMLInputElement && input.value != "" && inputStatus) {
                                        _log(6);
                                        if(!verifyPassword(input.value)) {
                                            _log(7);
                                            inputStatus.innerHTML = "Wrong password";
                                            inputStatus.style.removeProperty('display');
                                        }
                                    }
                                    else if(inputStatus != null) {
                                        _log(8);
                                        inputStatus.innerHTML = "Must enter a value";
                                        inputStatus.style.removeProperty('display');
                                    }
                                });
                            }
                            else {
                                return false;
                            }
                        }
                    }))
                })
            }
        }
    });

    const verifyPassword = (pass:string):boolean => {
        _log("verifyPassword");
        if(pass == "InModeUK") {
            _log("Good password");
            // OPEN THR LINK IN ANOTHER TAB
            closeModale();
            if(typeof window != "undefined") {
                _log('Méthode window');
                window?.open("/case-studies", '_self');
                window?.localStorage.setItem("case_studies_pass", 'true');
            }
            else {
                _log('Méthode a virtuel');
                let a:HTMLLinkElement = Object.assign(document.createElement('a'), {
                    id: 'case-studies',
                    target: '_blank',
                    href: "/case-studies",
                }).click();
                a.click();
                a.remove();
            }
            return true;
        }
        _log("Bad password");
        return false;
    }
    
    return (
        <header>
            <div className="header-content container">
                <div className="header-logo background-image" style={{backgroundImage: 'url('+ images.getOne('headerLogo').childImageSharp.fluid.srcWebp +')'}}>
                    <Link to="/" className="zone-link" title="Inmode">
                    </Link>
                </div>
                <div className="header-parts">
                    {size.width > 1199 && <HeaderTop/>}
                    {size.width > 1199 && <HeaderBottom/>}
                    {size.width < 1200 && <HeaderMini/>}
                    {size.width < 1200 && 
                        <div className="mini-home-link">
                            <MenuSingleImage
                                menu={{
                                    title: "Home",
                                    url: "/",
                                    type: "image",
                                    variant: "single",
                                    parent_menu: true,
                                    internal_link: true,
                                    icon: {localFile: useImages().getOne("homeIcon")},
                                    icon_hover: {localFile: useImages().getOne("homeIconHover")}
                                }}
                                prop_key={0}
                            />
                        </div>
                    }
                    <button
                        className="header-mini-menu"
                        onClick={(e)=>{openMenu(e)}}
                    >
                        Menu
                    </button>
                </div>
            </div>
        </header>
    );
};

interface Header {
    siteTitle?: string;
}

export default Header

import React from 'react';
import MenusContext from "../contexts/menus-context";
import { Link } from 'gatsby';
import { useImages } from '../contexts/images-provider';

import './index.css';
import { GatsbyImage_Interface, InmodePanel_Footer_Interface } from '../interfaces';
import { resolveImg } from '../../functions/tools';

const Footer = ({ from }:Footer) => {

    const images = useImages();

    const [footer] = React.useState(React.useContext(MenusContext).footer);

    const icons = (_selector:string | undefined | null):string => {
        if(_selector == undefined || _selector == null) {
            return '';
        }
        switch(_selector) {
            case 'address':
                return images.resolve_img('addressIcon') ?? '';
            case 'phone':
                return images.resolve_img('phoneIcon') ?? '';
            case 'mail':
                return images.resolve_img('mailIcon') ?? '';
            default:
                return '';
        }
    };

    const menus = ['address', 'phone', 'mail'];;

    return (
        <footer className="top-bar-closed">
            <div className="background-hex" style={{backgroundImage: "url(" + images.resolve_img('bgPattern') +")"}}></div>
            <div className="footer-content container">
                <div className="footer-logo-infos-part">
                    <div className="footer-infos logo">
                        <img
                            className="footer-logo background-image"
                            src={images.resolve_img('footerLogo3')}
                            // src={images.resolve_img('headerLogo2')}
                            // src={"https://www.inmodemd.com/wp-content/uploads/2017/08/logo.png"}
                            srcSet={images.resolve_img_set('footerLogo3')}
                            // srcSet={images.resolve_img_set('headerLogo2')}
                            alt="footer-logo"
                        />
                    </div>
                    {menus.map((menu:string, key:number) => {
                        return (
                            <div key={key} className={`footer-infos ${menu}`}>
                                {icons(menu) ? <img
                                    className={`footer-${menu}-ico background-image`}
                                    src={icons(menu)}
                                    srcSet={icons(menu)}
                                    alt={menu}
                                /> : <div className={`footer-${menu}-ico`}></div>}
                                {
                                    menu === "mail" ? 
                                    <a href={`mailto:${footer.mail}`} className="footer-infos-text" title="Contact us by mail">
                                        {from == "empower-rf-device" ? "crystal.silver@inmodemd.com" : footer.mail}
                                    </a>
                                    :
                                    menu == "phone" ?
                                    <a href={`tel:${footer.phone}`} className="footer-infos-text" title="Call us directly">
                                        {footer.phone}
                                    </a>
                                    :
                                    <div className="footer-infos-text">
                                        {footer[menu]}
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="footer-social-part">
                    {footer.social && footer.social.map((menu, key) => {
                        return (
                            <div
                                key={key}
                                className="footer-social-ico background-image"
                                style={{backgroundImage: 'url('+ resolveImg(menu.icon) +')'}}
                            >
                                <a className="zone-link" href={menu.url || '#'} title={menu.name} target="_blank"></a>
                            </div>
                        );
                    })}
                </div>
                <div className="footer-bottom-navigation">
                    <div className="footer-trademark">© {new Date().getUTCFullYear()} INMODE</div>
                    <div className="footer-navigation">
                        {footer.navigation && footer.navigation.map((menu, key) => {
                            return (
                                <span key={key}>
                                    <span className="footer-navigation-separator"></span>
                                    {menu.name == "FR" && <img height={16} style={{display: "inline-block", verticalAlign: "top", marginRight: "5px"}} src={images.resolve_img("footerFR")} title="FR"/>}
                                    {menu.name == "ES" && <img height={16} style={{display: "inline-block", verticalAlign: "top", marginRight: "5px"}} src={images.resolve_img("footerES")} title="ES"/>}
                                    {menu.name == "FR" || menu.name == "ES" ? 
                                        <a href={menu.url || '#'} className="footer-navigation-part" title={menu.name}>
                                            {menu.name}
                                        </a>
                                        :
                                        <Link to={menu.url || '#'} className="footer-navigation-part" title={menu.name}>
                                            {menu.name}
                                        </Link>
                                    }
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

interface Footer {
    from?: string;
};
  
export default Footer;
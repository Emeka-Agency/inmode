import React from 'react';
import MenusContext from "../contexts/menus-context"
import { Link } from 'gatsby';
import { useImages } from '../contexts/images-provider';

import './index.css';
import { GatsbyImage_Interface } from '../interfaces';

const Footer = ({}:Footer) => {

    const images = useImages();

    const [footer] = React.useState(React.useContext(MenusContext).footer);

    const icons = (_selector:string | undefined | null):string => {
        if(_selector == undefined || _selector == null) {
            return '';
        }
        let _temp:GatsbyImage_Interface;
        switch(_selector) {
            case 'address':
                _temp = images.getOne('addressIcon');
                return _temp && _temp.publicURL ? _temp.publicURL : '';
            case 'phone':
                _temp = images.getOne('phoneIcon');
                return _temp && _temp.publicURL ? _temp.publicURL : '';
            case 'mail':
                _temp = images.getOne('mailIcon');
                return _temp && _temp.publicURL ? _temp.publicURL : '';
            default:
                return '';
        }
    };

    const menus = ['address', 'phone', 'mail'];;

    return (
        <footer
            style={{
                backgroundImage: "url(" + images.getOne('bgPattern').childImageSharp.fluid.srcWebp +")"
            }}
        >
            <div className="footer-content container">
                <div className="footer-logo-infos-part">
                    <div className="footer-infos logo">
                        <img
                            className="footer-logo background-image"
                            src={images.getOne('footerLogo').childImageSharp.fluid.srcWebp}
                            srcSet={images.getOne('footerLogo').childImageSharp.fluid.srcSetWebp}
                            alt="footer-logo"
                        />
                    </div>
                    {menus.map((menu:string, key:number) => {
                        return (
                            <div key={key} className={`footer-infos ${menu}`}>
                                <img
                                    className={`footer-${menu}-ico background-image`}
                                    src={icons(menu)}
                                    srcSet={icons(menu)}
                                    alt={menu}
                                />
                                {
                                    menu === "mail" ? 
                                    <a href={`mailto:${footer.mail}`} className="footer-infos-text" title="Contact us by mail">
                                        {footer.mail}
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
                                style={{backgroundImage: 'url('+ (menu.icon ? menu.icon.localFile.publicURL : '') +')'}}
                            >
                                <a className="zone-link" href={menu.url || '#'} title={menu.name} target="_blank"></a>
                            </div>
                        );
                    })}
                </div>
                <div className="footer-bottom-navigation">
                    <div className="footer-trademark">© {new Date().getUTCFullYear()} INMODEMD</div>
                    <div className="footer-navigation">
                        {footer.navigation && footer.navigation.map((menu, key) => {
                            return (
                                <span key={key}>
                                    <span className="footer-navigation-separator"></span>
                                    <Link to={menu.url || '#'} className="footer-navigation-part" title={menu.name}>
                                        {menu.name}
                                    </Link>
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

};
  
export default Footer;
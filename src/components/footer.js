import React from 'react';
import { Link } from "gatsby";
import { get_img_path } from "../functions/get_images";
import { useStaticQuery, graphql } from "gatsby";
import { process_menu_datas } from '../functions/process_menu_datas';
import Menu from './menu';

const Footer = () => {

    const datas = useStaticQuery(graphql`
        {
            allMysqlFooter {
                edges {
                    node {
                        container
                        name
                        position
                        type
                        under
                        url
                        variant
                        mysqlId
                    }
                }
            }
        }
    `).allMysqlFooter.edges;

    const menus = process_menu_datas(datas, 'footer');

    const icos = {
        'location': '073-location2',
        'phone': '067-phone',
        'mail': '391-mail5'
    }

    const [isSvg, setIsSvg] = React.useState(true);

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo-infos-part">
                    <div className="footer-infos logo">
                        <img className="footer-logo background-image" src={get_img_path('/icons/footer-logo.png')}/>
                    </div>
                    {menus.infos.map((menu, key) => {
                        
                        return (
                            <div key={key} className={`footer-infos ${menu.type.replace('footer-', '')}`}>
                                <img
                                    className={`${menu.type}-ico background-image`}
                                    src={get_img_path(`/icons/icomoon/${isSvg? 'svg' : 'png'}/${icos[menu.type.replace('footer-', '')]}.${isSvg ? 'svg' : 'png'}`)}
                                />
                                <div className="footer-infos-text">{menu.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="footer-social-part">
                    {menus['footer-social'].map((menu, key) => {
                        return (
                            <div key={key} className="footer-social-ico background-image" style={{backgroundImage: 'url('+get_img_path(`/icons/icomoon/${isSvg ? 'svg' : 'png'}/social-${menu.name}.${isSvg ? 'svg' : 'png'}`)+')'}}>
                                <a className="zone-link" href={menu.url}></a>
                            </div>
                        );
                    })}
                </div>
                <div className="footer-bottom-navigation">
                    <div className="footer-trademark">© 2020 INMODE</div>
                    <div className="footer-navigation">
                        {menus['footer-navigation'].map((menu, key) => {
                            return (
                                <>
                                    <span className="footer-navigation-separator"></span>
                                    <a key={key} href={menu.url} className="footer-navigation-part">
                                        {menu.name}

                                    </a>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
}

Footer.defaultProps = {
}
  
export default Footer;
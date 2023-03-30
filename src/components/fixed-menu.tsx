import React from "react"
import Menu from "./menu";
import { Link } from "gatsby";
import MenusContext from "./contexts/menus-context"
import { useImages } from './contexts/images-provider';
import MenuSingleText from "./menu/single-text";

const FixedMenu = ({ customClass }:{ customClass?:string }) => {

    const [menus] = React.useState(React.useContext(MenusContext).header_bottom);

    const [ isVisible, setIsVisible ]:[boolean, React.Dispatch<boolean>] = React.useState(Boolean(false));

    React.useEffect(() => {
        const handleScroll = (e:Event) => { 
            if (window?.pageYOffset > 150 && window?.innerWidth > 999) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        };
        window?.addEventListener('scroll', handleScroll)
        return () => {
            window?.removeEventListener('scroll', handleScroll)
        };
    }, []);

    const images = useImages();

    return (
        <div id="fixed-menu" className={`transition${' ' + customClass || ''}`} style={{top: isVisible ? 0 : -55, boxShadow: isVisible ? 'none' : 'unset'}}>
            <div className="fixed-menu-container">
                <div className="fixed-menu-logo">
                    <img
                        src={images.resolve_img('fixedMenuLogo')}
                        srcSet={images.resolve_img('fixedMenuLogo')}
                        alt="header-logo"
                    />
                    <Link to="/" className="zone-link" title="Inmode"></Link>
                </div>
                <div className="fixed-menus">
                    <MenuSingleText
                        menu={{
                            title: "Home",
                            url: "/",
                            type: "text",
                            variant: "single",
                            parent_menu: true,
                            internal_link: true,
                        }}
                        prop_key={0}
                    />
                    {menus && menus.map((menu:any, key:number) => {
                        return (
                            <Menu key={key} prop_key={key} menu={menu} />
                        );
                    })}
                    <Link id="book-a-demo" to="/contact"><span className="label">book a demo</span></Link>
                </div>
            </div>
        </div>
    );
}

export default FixedMenu;
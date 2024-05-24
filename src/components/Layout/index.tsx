import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import Header from "../Header/index";
import Footer from "../Footer";
import ContactUs from "../contact/contact-us";
import PrivacyPolicy from "../privacy-policy";
import FixedMenu from "../fixed-menu";
import MenusProvider from "../contexts/menus-provider";
import ProductsProvider from "../contexts/products-provider";
import Modale from "../Modale";

import "./index.css";
import ImagesProvider from "../contexts/images-provider";

const Layout = ({ children, title, variant = "teal", rest = {} }:Layout) => {

    // TODO régler isMobile pour ouverture cookies
    // const [isMobile, setIsMobile] = React.useState()

    // React.useEffect(() => {
    //   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //     // true for mobile device
    //     document.write("mobile device");
    //   }else{
    //     // false for not mobile device
    //     document.write("not mobile device");
    //   }
    // });

    function searchConsole() {
        if(typeof window == "undefined") {
            return false;
        }
        window.dataLayer = window?.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-3DGHJW8FDS');
    }

    return (
        <ImagesProvider>
            <MenusProvider>
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
                <Header variant={variant}/>
                {/* <!-- Google tag (gtag.js) --> */}
                {/* <Script strategy={ScriptStrategy.postHydrate} src="https://www.googletagmanager.com/gtag/js?id=G-3DGHJW8FDS"></Script> */}
                <script>{searchConsole()}</script>
                <ProductsProvider>
                <main id="main" className={title + '-page'} {...rest}>
                    {children}
                </main>
                </ProductsProvider>
                <FixedMenu/>
                {/* / <PrivacyPolicy /> */}
                <ContactUs/>
                <Footer/>
                <Modale/>
            </MenusProvider>
        </ImagesProvider>
    )
};

interface Layout {
    children: ReactNode;
    title: string;
    variant?: string;
    rest?: Object;
};

export default Layout
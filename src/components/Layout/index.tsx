import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import Header from "../Header/index";
import Footer from "../Footer";
import ContactUs from "../Contact/contact-us";
import PrivacyPolicy from "../privacy-policy";
import FixedMenu from "../Header/fixed-menu";
import Modale from "../Modale";

import "./index.css";

import MenusProvider from "../contexts/menus-provider";
import ProductsProvider from "../contexts/products-provider";
import ImagesProvider from "../contexts/images-provider";
import ArticleProvider from "../contexts/article-provider";
import { resolve_video_click } from "../../functions/video";

const Layout = ({ children, title }:Layout) => {

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
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JFS1WVR7JQ');
    }

    return (
        <ImagesProvider>
            <MenusProvider>
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
                <Header/>
                {/* <!-- Google tag (gtag.js) --> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-JFS1WVR7JQ"></script>
                <script>{searchConsole()}</script>
                <ProductsProvider>
                    <ArticleProvider>
                        <main id="main" className={title + '-page'}>
                            {children}
                        </main>
                    </ArticleProvider>
                </ProductsProvider>
                <FixedMenu/>
                <PrivacyPolicy />
                <ContactUs/>
                <Footer/>
                <Modale/>
                <div id="video-iframe" onClick={(e) => {resolve_video_click(e);}}></div>
            </MenusProvider>
        </ImagesProvider>
    )
}

interface Layout {
    children: ReactNode;
    title: string;
};

export default Layout
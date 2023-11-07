import React, { ReactNode } from "react";

import TopBar from "../TopBar/index";
import Header from "../Header/index";
import Footer from "../Footer";
import ContactUs from "../Contact/contact-us";
import PrivacyPolicy from "../privacy-policy";
import FixedMenu from "../Header/fixed-menu";
import Modale from "../Modale";
import VideoFrame from "../Video/frame";
import MenusProvider from "../contexts/menus-provider";
import ProductsProvider from "../contexts/products-provider";
import ImagesProvider, { useImages } from "../contexts/images-provider";
import ArticleProvider from "../contexts/article-provider";

import "./index.css";
import { selectOne } from "../../functions/selectors";
import { strToDom } from "../../functions/tools";
import { Script } from "gatsby";


const Layout = ({ children, title, classes = [] }:Layout) => {

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
    function meta_pixel(f,b,e,v,n,t,s) {
        if(!f)return;
        if(!b)return;
        if(f.fbq)return;
        n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
    }

    const script_meta_pixel = function() {
        if(typeof window == "undefined") {return;}
        if(typeof document == "undefined") {return;}
        !meta_pixel(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        typeof window?.fbq == "function" && window?.fbq('init', '194476770337529');
        typeof window?.fbq == "function" && window?.fbq('track', 'PageView');
    }

    React.useEffect(() => {
        if(typeof window == "undefined") {return;}
        if(typeof document == "undefined") {return;}
        script_meta_pixel();
    }, []);

    return (
        <ImagesProvider>
            <MenusProvider>
                {/* // <!-- GOOGLE TAG MANAGER (NOSCRIPT) --> */}
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVWLZ2L" height="0" width="0" style={{display: "none", visibility: "hidden"}}>
                    </iframe>
                </noscript>
                {/* // <!-- END GOOGLE TAG MANAGER (NOSCRIPT) --> */}

                {/* <!-- META PIXEL CODE --> */}
                <noscript><img height="1" width="1" style={{"display": "none"}} src="https://www.facebook.com/tr?id=194476770337529&ev=PageView&noscript=1"/></noscript>
                {/* <!-- END META PIXEL CODE --> */}
                
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
                <TopBar/>
                <Header/>
                {/* <!-- Google tag (gtag.js) --> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-JFS1WVR7JQ"></script>
                <script>{searchConsole()}</script>
                {/* <!-- End Google tag (gtag.js) --> */}
                {/* <!-- LEAD FORENSICS --> */}
                <noscript><img alt="" src="https://secure.intelligentdataintuition.com/780395.png" style={{display:"none"}}/></noscript>
                {/* <!-- End LEAD FORENSICS --> */}
                <ProductsProvider>
                    <ArticleProvider>
                        <main id="main" className={[title + '-page', 'top-bar-closed', (classes ?? []).join(' ')].join(' ')}>
                            {children}
                        </main>
                    </ArticleProvider>
                </ProductsProvider>
                <FixedMenu/>
                <PrivacyPolicy />
                <ContactUs/>
                <Footer from={title}/>
                <Modale/>
                <VideoFrame/>
            </MenusProvider>
        </ImagesProvider>
    )
}

interface Layout {
    children: ReactNode;
    title: string;
    classes?: string[];
};

export default Layout
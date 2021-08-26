import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import Header from "../Header/index";
import Footer from "../Footer";
import ContactUs from "../Contact/contact-us";
import PrivacyPolicy from "../privacy-policy";
import FixedMenu from "../fixed-menu";
import Modale from "../Modale";

import "./index.css";

// {/* SWITCH CART */}

// import CartPurchase from "../Cart";
// import PayParams from "../Cart/pay_params";
// import { useCart } from "../contexts/cart-provider";

// {/* SWITCH CART END */}

import MenusProvider from "../contexts/menus-provider";
import ProductsProvider from "../contexts/products-provider";
import ImagesProvider from "../contexts/images-provider";
import ArticleProvider from "../contexts/article-provider";

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

    if(typeof window != "undefined") {
        console.log('C\'est bon');
        // window.onbeforeunload = function(event) {
        //     // console.log('new pathname', location.pathname)
        //     console.log(event);
        //     useCart().close_cart();
        // }
        window.addEventListener('unload', function(event) {
            console.log('test');
            // console.log('new pathname', location.pathname)
            console.log(event);
            useCart().close_cart();
        });
    }

    return (
        <ImagesProvider>
            <MenusProvider>
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />
                <Header/>
                <ProductsProvider>
                    <ArticleProvider>
                        <main id="main" className={title + '-page'}>
                            {children}
                        </main>
                    </ArticleProvider>
                </ProductsProvider>
                <FixedMenu/>
                {/* SWITCH CART */}

                {/* <CartPurchase/>
                <PayParams/> */}

                {/* SWITCH CART END */}
                <PrivacyPolicy />
                <ContactUs/>
                <Footer/>
                <Modale/>
            </MenusProvider>
        </ImagesProvider>
    )
}

interface Layout {
    children: ReactNode;
    title: string;
};

export default Layout
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Sitemap = ({ data }:Sitemap) => {
    
    return (
        <Layout title="sitemap">
            <SEO title="Sitemap"/>
            <div id="sitemap-links" className="container">
                <div className="sitemap-list">
                    <div className="title">LINKS</div>
                    {/* BASE */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/" title="Home">https://inmodemd.co.uk/</a></div>
                    {/* ABOUT */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/about-us/" title="About us">https://inmodemd.co.uk/about-us/</a></div>
                    {/* CONTACT */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/contact/" title="Contact">https://inmodemd.co.uk/contact/</a></div>
                    {/* LEGALS */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/legals/" title="Legals">https://inmodemd.co.uk/legals/</a></div>
                    {/* ARTICLES */}
                    {/* <div className="sitemap-link">- <a className="absolute-link" href="/articles/" title="Articles">https://inmodemd.co.uk/articles/</a></div> */}
                    {/* PRESS-MEDIA */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/press-media/" title="Press & Media">https://inmodemd.co.uk/press-media/</a></div>
                    {/* BLOG */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/blog/" title="Blog">https://inmodemd.co.uk/blog/</a></div>
                    {/* SITEMAP */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/sitemap/" title="Sitemap">https://inmodemd.co.uk/sitemap/</a></div>
                    {/* WORKSTATION */}
                    <div className="sitemap-category">WORKSTATIONS</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/" title="Workstations/">https://inmodemd.co.uk/workstation/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/morpheus-pro" title="Morpheus pro">https://inmodemd.co.uk/workstation/morpheus-pro</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/bodytite" title="Bodytite">https://inmodemd.co.uk/workstation/bodytite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/contoura" title="Contoura">https://inmodemd.co.uk/workstation/contoura</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/evoke" title="Evoke">https://inmodemd.co.uk/workstation/evoke</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/evolve" title="Evolve">https://inmodemd.co.uk/workstation/evolve</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/optimas" title="Optimas">https://inmodemd.co.uk/workstation/optimas</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/triton" title="Triton">https://inmodemd.co.uk/workstation/triton</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/votiva" title="Votiva">https://inmodemd.co.uk/workstation/votiva</a></div>
                    {/* TECHNOLOGY */}
                    <div className="sitemap-category">TECHNOLOGIES</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/morpheus8" title="Morpheus8">https://inmodemd.co.uk/technology/morpheus8</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/accutite" title="Accutite">https://inmodemd.co.uk/technology/accutite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/aviva" title="Aviva">https://inmodemd.co.uk/technology/aviva</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/bodyfx" title="Bodyfx">https://inmodemd.co.uk/technology/bodyfx</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/bodytite" title="Bodytite">https://inmodemd.co.uk/technology/bodytite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/diolazexl" title="Diolazexl">https://inmodemd.co.uk/technology/diolazexl</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/tite" title="Tite">https://inmodemd.co.uk/technology/tite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/tone" title="Tone">https://inmodemd.co.uk/technology/tone</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/trim" title="Trim">https://inmodemd.co.uk/technology/trim</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/facetite" title="Facetite">https://inmodemd.co.uk/technology/facetite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/forma" title="Forma">https://inmodemd.co.uk/technology/forma</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/formav" title="Formav">https://inmodemd.co.uk/technology/formav</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/fractora" title="Fractora">https://inmodemd.co.uk/technology/fractora</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/lumecca" title="Lumecca">https://inmodemd.co.uk/technology/lumecca</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/minifx" title="Minifx">https://inmodemd.co.uk/technology/minifx</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/plus" title="Plus">https://inmodemd.co.uk/technology/plus</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/duo-dark" title="Duo dark">https://inmodemd.co.uk/technology/duo-dark</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/duo-light" title="Duo light">https://inmodemd.co.uk/technology/duo-light</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/vasculaze" title="Vasculaze">https://inmodemd.co.uk/technology/vasculaze</a></div>
                    {/* TREATMENT */}
                    <div className="sitemap-category">TREATMENTS</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/hair-removal" title="Hair removal">https://inmodemd.co.uk/treatment/hair-removal</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/mini-invasive-body-contouring" title="Minimally invasive body contouring">https://inmodemd.co.uk/treatment/mini-invasive-body-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/mini-invasive-face-neck-contouring" title="Minimally invasive face neck contouring">https://inmodemd.co.uk/treatment/mini-invasive-face-neck-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/non-invasive-body-contouring" title="Non invasive body contouring">https://inmodemd.co.uk/treatment/non-invasive-body-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/non-invasive-face-neck-contouring" title="Non invasive face neck contouring">https://inmodemd.co.uk/treatment/non-invasive-face-neck-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/pigmentation" title="Pigmentation">https://inmodemd.co.uk/treatment/pigmentation</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/vascular-lesions" title="Vascular lesions">https://inmodemd.co.uk/treatment/vascular-lesions</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/women-s-wellbeing" title="Women's wellbeing">https://inmodemd.co.uk/treatment/women-s-wellbeing</a></div>
                    {/* EVENTS */}
                    <div className="sitemap-category">EVENTS</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/" title="Events">https://inmodemd.co.uk/events/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/conferences/" title="Conferences">https://inmodemd.co.uk/events/conferences/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/webinars/" title="Webinars">https://inmodemd.co.uk/events/webinars/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/workshops/" title="Workshops">https://inmodemd.co.uk/events/workshops/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/tradeshows/" title="Tradeshows">https://inmodemd.co.uk/events/tradeshows/</a></div>
                </div>
            </div>
        </Layout>
    );
};

interface Sitemap {
    data: {};
};

export default Sitemap;
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/seo";

const Sitemap = ({ data }:Sitemap) => {
    
    return (
        <Layout title="sitemap">
            <SEO lang="fr" title="Sitemap"/>
            <div id="sitemap-links" className="container">
                <div className="sitemap-list">
                    <div className="title">LIENS</div>
                    {/* BASE */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/" title="Home">https://inmodemd.fr/</a></div>
                    {/* SHOP */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/shop/" title="Shop">https://inmodemd.fr/shop/</a></div>
                    {/* ABOUT */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/about-us/" title="About us">https://inmodemd.fr/about-us/</a></div>
                    {/* CONTACT */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/contact/" title="Contact">https://inmodemd.fr/contact/</a></div>
                    {/* LEGALS */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/legals/" title="Legals">https://inmodemd.fr/legals/</a></div>
                    {/* SITEMAP */}
                    <div className="sitemap-link">- <a className="absolute-link" href="/sitemap/" title="Sitemap">https://inmodemd.fr/sitemap/</a></div>
                    {/* WORKSTATION */}
                    <div className="sitemap-category">MACHINES</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/" title="Workstations/">https://inmodemd.fr/workstation/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/morpheus-pro" title="Morpheus pro">https://inmodemd.fr/workstation/morpheus-pro</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/bodytite" title="Bodytite">https://inmodemd.fr/workstation/bodytite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/contoura" title="Contoura">https://inmodemd.fr/workstation/contoura</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/evoke" title="Evoke">https://inmodemd.fr/workstation/evoke</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/evolve" title="Evolve">https://inmodemd.fr/workstation/evolve</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/optimas" title="Optimas">https://inmodemd.fr/workstation/optimas</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/triton" title="Triton">https://inmodemd.fr/workstation/triton</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/workstation/votiva" title="Votiva">https://inmodemd.fr/workstation/votiva</a></div>
                    {/* TECHNOLOGY */}
                    <div className="sitemap-category">TECHNOLOGIES</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/morpheus8" title="Morpheus8">https://inmodemd.fr/technology/morpheus8</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/accutite" title="Accutite">https://inmodemd.fr/technology/accutite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/aviva" title="Aviva">https://inmodemd.fr/technology/aviva</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/bodyfx" title="Bodyfx">https://inmodemd.fr/technology/bodyfx</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/bodytite" title="Bodytite">https://inmodemd.fr/technology/bodytite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/diolazexl" title="Diolazexl">https://inmodemd.fr/technology/diolazexl</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/tite" title="Tite">https://inmodemd.fr/technology/tite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/tone" title="Tone">https://inmodemd.fr/technology/tone</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/trim" title="Trim">https://inmodemd.fr/technology/trim</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/facetite" title="Facetite">https://inmodemd.fr/technology/facetite</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/forma" title="Forma">https://inmodemd.fr/technology/forma</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/formav" title="Formav">https://inmodemd.fr/technology/formav</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/fractora" title="Fractora">https://inmodemd.fr/technology/fractora</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/lumecca" title="Lumecca">https://inmodemd.fr/technology/lumecca</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/minifx" title="Minifx">https://inmodemd.fr/technology/minifx</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/plus" title="Plus">https://inmodemd.fr/technology/plus</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/duo-dark" title="Duo dark">https://inmodemd.fr/technology/duo-dark</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/duo-light" title="Duo light">https://inmodemd.fr/technology/duo-light</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/technology/vasculaze" title="Vasculaze">https://inmodemd.fr/technology/vasculaze</a></div>
                    {/* TREATMENT */}
                    <div className="sitemap-category">TRAITEMENTS</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/hair-removal" title="Hair removal">https://inmodemd.fr/treatment/hair-removal</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/mini-invasive-body-contouring" title="Mini invasive body contouring">https://inmodemd.fr/treatment/mini-invasive-body-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/mini-invasive-face-neck-contouring" title="Mini invasive face neck contouring">https://inmodemd.fr/treatment/mini-invasive-face-neck-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/non-invasive-body-contouring" title="Non invasive body contouring">https://inmodemd.fr/treatment/non-invasive-body-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/non-invasive-face-neck-contouring" title="Non invasive face neck contouring">https://inmodemd.fr/treatment/non-invasive-face-neck-contouring</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/pigmentation" title="Pigmentation">https://inmodemd.fr/treatment/pigmentation</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/vascular-lesions" title="Vascular lesions">https://inmodemd.fr/treatment/vascular-lesions</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/treatment/women-s-health" title="Women's health">https://inmodemd.fr/treatment/women-s-health</a></div>
                    {/* EVENTS */}
                    <div className="sitemap-category">ÉVÉNEMENTS</div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/" title="Events">https://inmodemd.fr/events/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/congress/" title="Congrès">https://inmodemd.fr/events/congress/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/webinars/" title="Webinars">https://inmodemd.fr/events/webinars/</a></div>
                    <div className="sitemap-link">- <a className="absolute-link" href="/events/workshops/" title="Workshops">https://inmodemd.fr/events/workshops/</a></div>
                </div>
            </div>
        </Layout>
    )
};

interface Sitemap {
    data: any;
};

export default Sitemap;
import React from "react";
import ProductView from "./product-view";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";
import Carousel from "../Carousel";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Product_Interface, FlickityOptions_Interface } from "../interfaces";
import { getById } from "../../functions/selectors";
import { resolveImg, resolveImgSet } from "../../functions/tools";

import "./slides.css";

const Slides = ({from}:Slides) => {

    const images = useImages();

    const [current, setCurrent]:[number, React.Dispatch<number>] = React.useState(-1);
    const [open, setOpen]:[Boolean, React.Dispatch<Boolean>] = React.useState(new Boolean(false));

    const [flickityOptions, setFlickityOptions]:[FlickityOptions_Interface, React.Dispatch<FlickityOptions_Interface>] = React.useState({
        initialIndex: current === -1 ? 0 : current,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        // autoPlay: false
    });

    const [slides]:[InmodePanel_Product_Interface[], React.Dispatch<InmodePanel_Product_Interface[]>] = React.useState(React.useContext(ProductsContext).products);

    const view_detail = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, key: number | string) => {
        
    }

    const view_product = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, pos:number) => {
        let _main:any = getById('main');
        e.preventDefault();
        if(_main == null) {
            return false;
        }
        setFlickityOptions({
            initialIndex: pos,
            cellAlign: 'left',
            pageDots: false,
            accessibility: true,
            selectedAttraction: 0.01,
            friction: 0.15,
            percentPosition: false,
            // autoPlay: false
        });
        setCurrent(pos);
        _main.style.zIndex = '4';
        setOpen(true);
    }

    
    const close_view = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, elem:any) => {
        e.preventDefault();
        let _main:any = getById('main');
        if(_main == null) {
            return false;
        }
        if(
            e.target.classList.contains('product-view') ||
            e.target.classList.contains('close') ||
            e.target.classList.contains('close-product-view')
        ) {
            _main.style.zIndex = '0';
            setOpen(false);
        }
    }

    const icons = {
        "BodyTite": 'bodytite_midnight',
        "Optimas": 'optimas_midnight',
        "EvolveX": 'evolve_midnight',
        "Evoke": 'evoke_midnight',
        "Contoura": 'contoura_midnight',
        "Empower RF": 'empowerrf_dusty_rose',
    }

    return (
        <div className={`slides-${from} ${current > -1 && open === true ? 'show' : ''}`}>
            <h2 className="title">Our products</h2>
            <h3 className="subtitle">Aesthetic treatments for the face, body, skin and women's health and well-being.</h3>
            <Carousel
                id={`carousel-${from}`}
                options={flickityOptions}
                classList={'slides-main transition'}
            >
                {slides && slides.map((slide, key) => {
                    return (
                        <div
                            key={key}
                            className={"slide transition gallery-cell" + (current === key && open === true ? ' show' : '')}
                        >
                            <div className="slide-content">
                                <div className="slide-background-ico">
                                    <img
                                        className="slide-bg-img"
                                        src={images.resolve_img(icons[slide.Name])}
                                        srcSet={images.resolve_img_set(icons[slide.Name])}
                                        alt={slide.Name}
                                    />
                                    <div className="slide-txts">
                                        <div className="slide-title">
                                            {slide.Name}
                                        </div>
                                        <div className="slide-short-descr">
                                            {slide.short_descr}
                                        </div>
                                    </div>
                                </div>
                                <div className="slide-background-product">
                                    <img
                                        className="slide-bg-img"
                                        src={resolveImg(slide.ShopPicture)}
                                        srcSet={resolveImgSet(slide.ShopPicture)}
                                        alt='products'
                                    />
                                </div>
                                <div className="slide-view-detail" onClick={(e) => {view_detail(e, key);}}>
                                    Product information
                                    <Link className="zone-link" to={slide.MenuParams.url} title={slide.Name}></Link>
                                </div>
                                {slide.Addons ? <div className="slide-view-product" onClick={(e) => {view_product(e, key);}}>
                                    Workstation addons
                                </div> : null}
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            {current > -1 && slides && slides.map((slide, key) => {
                return (
                    <div
                        className={"product-view" + (current > -1 && current === key && open === true ? " show" : '')}
                        onClick={(e) => {close_view(e, this);}}
                        key={key}
                    >
                        <ProductView datas={{'current': current}}>
                            <div className="close">
                                <img
                                    className="close-product-view"
                                    src={images.resolve_img('closeWhiteIcon')}
                                    alt="close-product-view"
                                />
                            </div>
                        </ProductView>
                    </div>
                );
            })}
        </div>
    );
};

interface Slides {
    from: string;
}

export default Slides;
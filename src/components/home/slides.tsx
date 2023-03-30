import React from "react";
import ProductView from "./product-view";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";
import Carousel from "../Carousel";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Product_Interface, FlickityOptions_Interface } from "../interfaces";
import { getById } from "../../functions/selectors";

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

    return (
        <div className={`slides-${from} ${current > -1 && open === true ? 'show' : ''}`}>
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
                            <div className="slide-title">
                                {slide.short_descr}
                            </div>
                            <div className="slide-content">
                                <div className="slide-background-ico">
                                    <img
                                        className="slide-bg-img"
                                        src={slide.Icon.localFile.childImageSharp.fluid.srcWebp}
                                        srcSet={slide.Icon.localFile.childImageSharp.fluid.srcSetWebp?.replace('\n', '')}
                                        alt={slide.Name}
                                    />
                                </div>
                                <div className="slide-background-product">
                                    <img
                                        className="slide-bg-img"
                                        src={slide.ShopPicture.localFile.childImageSharp.fluid.srcWebp}
                                        srcSet={slide.ShopPicture.localFile.childImageSharp.fluid.srcSetWebp?.replace('\n', '')}
                                        alt='products'
                                    />
                                </div>
                                <div className="slide-short-descr">
                                    {slide.Name}
                                </div>
                                <div className="slide-view-detail" onClick={(e) => {view_detail(e, key);}}>
                                    Product information
                                    <img
                                        className="slide-view-detail-arrow transition"
                                        src={images.resolve_img('arrowRightIcon')}
                                        srcSet={images.resolve_img('arrowRightIcon')}
                                        alt="arrow-right"
                                    />
                                    <Link className="zone-link" to={slide.MenuParams.url} title={slide.Name}></Link>
                                </div>
                                {slide.Addons ? <div className="slide-view-product" onClick={(e) => {view_product(e, key);}}>
                                    Workstation addons
                                    <img
                                        className="slide-view-product-arrow transition"
                                        src={images.resolve_img('arrowRightIcon')}
                                        srcSet={images.resolve_img('arrowRightIcon')}
                                        alt="arrow-left"
                                    />
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
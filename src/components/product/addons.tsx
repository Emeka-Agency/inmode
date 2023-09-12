import { Link } from "gatsby";
import React from "react";
import { color_variant, resolveImg, resolveImgSet } from "../../functions/tools";
import Carousel from "../Carousel";
import { useImages } from "../contexts/images-provider";
import { InmodePanel_Addon_Interface, InmodePanel_Base_Image_Interface } from "../interfaces";
import NoPicture from "../NoPic/no-picture";
import Sensible from "../NoPic/sensible";

const Addons = ({ datas, sensible = false, variant = "teal" }:Addons) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });

    const select_mines = (object:InmodePanel_Base_Image_Interface[] | undefined, id:number):InmodePanel_Base_Image_Interface[] => {
        let temp:InmodePanel_Base_Image_Interface[] = [];
        object && object.map((_let) => {
            if(_let.product && _let.product.id === id) {
                temp.push(_let);
            }
        })
        return temp;
    }

    const images_provider = useImages();

    return (
        <div id="technologies" className="product-addons">
            <div className="section-title">technologies associées</div>
            {datas.addons.map((addon) => {
                return addon.ProductPresentation && addon.ProductPresentation.map((product, key) => {
                    if(product.appears_everywhere || (product.products && (product.products.map(el => el.id)).indexOf(datas.id) > -1)) {
                        let images = select_mines(product.Images, datas.id);
                        // TODO ton on evolve => evolve-tone
                        let product_title = product.title_text ? product.title_text.toLowerCase().replace(' on ', '-').replace(/ /g, '-').replace(/\*/g, '').replace(/#/g, '') : "";
                        return (
                            <div key={key} className="product-addon">
                                <div className="addon-details">
                                    <div className="addon-description">
                                        <div className="addon-img">
                                            <img
                                                src={resolveImg(product.left_image)}
                                                srcSet={resolveImgSet(product.left_image)}
                                                alt={product.title_text}
                                            />
                                        </div>
                                        <div className="addon-title" data-variant={color_variant(product.title_text)}>
                                            {product.title_image && (
                                                <img
                                                    src={resolveImg(product.title_image)}
                                                    srcSet={resolveImgSet(product.title_image)}
                                                    alt={product.title_text}
                                                />
                                            )}
                                            {!product.title_image && product.title_text}
                                            {product.appears_everywhere && <Link className="absolute-link" to={addon.MenuParams.url} title={product.title_text}></Link>}
                                        </div>
                                        {product.AddonProductsDescr && product.AddonProductsDescr.map((descr, key) => {
                                            if(descr.product && descr.product.id === datas.id) {
                                                return (
                                                    <div key={key} className="addon-description">{descr.descr}</div>
                                                );
                                            }
                                            return <></>;
                                        })}
                                        <div className="addon-what-can-i-treat">
                                            {
                                                (product.ProductPresentationTreats ?? []).length > 0 &&
                                                <>
                                                    <div className={`title variant-${variant}`}>
                                                        Que puis-je traiter ?
                                                    </div>
                                                    <ul>
                                                        {(product.ProductPresentationTreats ?? [])?.map((descr, key) => {
                                                            if(descr.product && descr.product.id === datas.id) {
                                                                return (
                                                                    <li key={key} data-variant={variant}>
                                                                        {/* <img src={images_provider.resolve_img(variant == "dusty-rose" ? 'keyBenefitIconRose' : 'keyBenefitIconTeal')} alt="" className="puce" /> */}
                                                                        <span>{descr.treat_short}</span>
                                                                    </li>
                                                                );
                                                            }
                                                        })}
                                                    </ul>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {images.length == 0 ?
                                    addon.sensitivity ?
                                        <Sensible from="product-addons"/>
                                        :
                                        <NoPicture from ="product-addons"/>
                                    :
                                    images.length === 1 ?
                                        <img
                                            className="addon-single"
                                            src={resolveImg(images[0].image)}
                                            srcSet={resolveImgSet(images[0].image)}
                                            alt={`morpheus8-${key + 1}-single`}
                                        />
                                        :
                                        <div className="addon-carousel user-select-none">
                                            <Carousel
                                                id={`carousel-addons-${product_title}`}
                                                options={flickityOptions}
                                                classList={'slide-addons transition'}
                                            >
                                                {images.map((image, key) => {
                                                    return (
                                                        <div className="addon" key={key}>
                                                            <img
                                                                key={key}
                                                                className="addon-img"
                                                                src={resolveImg(image.image)}
                                                                srcSet={resolveImgSet(image.image)}
                                                                alt={`${product_title}-slide-${key}`}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </Carousel>
                                        </div>
                                }
                            </div>
                        );
                    }
                    return <></>;
                });
            })}
        </div>
    );
};

interface Addons {
    datas: {
        addons: InmodePanel_Addon_Interface[];
        id: number;
    };
    sensible?: boolean;
    variant?: string;
    product_name: string;
};

export default Addons;
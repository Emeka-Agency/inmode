import { graphql, useStaticQuery } from "gatsby";
import React from "react"
import Flickity from "react-flickity-component";
import { get_img_path } from "../../functions/get_images";
import ProductsContext from "../contexts/products-context";

const ProductClinicalStudies = ({  }) => {
  
    const addon = React.useContext(ProductsContext).addons[0];

    const img_extensions = ['jpg', 'png', 'svg', 'jpeg', 'webp', 'bmp'];
    const [index, setIndex] = React.useState(0);

    const resolve_image = (name ) => {
        let img = new Image();
        img.src = get_img_path(`${name}.${img_extensions[index]}`);
        img.onerror = function() {
            setIndex(index + 1);
            return resolve_image(name);
        };
    
        return get_img_path(`${name}.${img_extensions[index]}`);
    };
  
    const product = React.useContext(ProductsContext).products[0];

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        autoPlay: 5000,
        wrapAround: true
    });

    return (
        <div className="product-clinical-studies">
            <div className="title">
                études cliniques
            </div>
            <div className="clinical-studies-slider">
                <Flickity
                    id={`carousel-addons-${product.name}`}
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate={true} // default false
                    static // default false
                    className="slide-studies transition"
                >
                    {['1', '2', '3'].map((study, key) => {
                        return (
                            <div key={key} className="study-slide">
                                <div className="study-img">
                                    <img
                                        src={get_img_path('products/clinical-study.png')}
                                        alt="clinical-study"
                                    />
                                </div>
                                <div className="study-text">
                                    <div className="study-name">Magna adipisicing laborum sint dolore.</div>
                                    <div className="study-details">
                                        Veniam ex cupidatat aliquip id non.<br/>
                                        Nisi dolor cupidatat velit eiusmod.<br/>
                                        Nostrud proident enim nisi sunt dolor in commodo.<br/>
                                        Exercitation commodo minim magna ullamco ullamco laboris culpa ullamco dolor incididunt exercitation do laborum.<br/>
                                        Excepteur aute qui labore qui.<br/>
                                    </div>
                                    <div className="study-download">Télécharger</div>
                                </div>
                            </div>
                        );
                    })}
                </Flickity>
            </div>
        </div>
    );
}

ProductClinicalStudies.defaultProps = {

}

ProductClinicalStudies.propTypes = {

}

export default ProductClinicalStudies;
import { graphql } from "gatsby";
import React from "react";
import { InmodePanel_PressMedia_Interface } from "../components/interfaces";

import Layout from "../components/Layout"
import PressMedia from "../components/PressMedia";
import { openModale, pressMedia as pressMediaModale, closeModale } from '../functions/modale';
import SEO from "../components/seo";

const moverClass = "press-media-caroussel-mover";

const PressMediaPage = ({ data }:PressMediaPage_Interface) => {

    const [pressMedia]:[InmodePanel_PressMedia_Interface[], React.Dispatch<InmodePanel_PressMedia_Interface[]>] = React.useState(data.allStrapiPressMedia.nodes);
    const [carouselIndex, setCarouselIndex]:[number, React.Dispatch<number>] = React.useState(0);

    const moveCarousel = (_left:boolean, _right:boolean, _index:number):void => {
        // console.log(_index);
        let directMove = undefined;
        if(_left && _index == 0) {
            /* console.log('Cas left 1'); */
            _index = pressMedia.length - 1;
            directMove = true;
        }
        else if(_right && _index + 1 == pressMedia.length) {
            /* console.log('Cas right 1'); */
            _index = 0;
            directMove = true;
        }
        else {
            _index += _left ? -1 : 1;
        }
        // console.log('directMove = ' + directMove);
        let _temp:any = document.querySelector(`.${moverClass}`);
        if(_temp){
            directMove && _temp.style.setProperty('transition', 'none');
            !directMove && _temp.style.removeProperty('transition');
            _temp.style.marginLeft = `calc(100% * -${_index})`;
        }
        _temp = document.querySelector('.press-media-caroussel-elems');
        _temp && _temp.setAttribute('caroussel-index', _index);
    }

    const processKeyCaroussel = (e:KeyboardEvent) => {
        let _index = document.querySelector('.press-media-caroussel-elems');
        if(_index != null) {
            if(e.key === "ArrowRight") {
                moveCarousel(false, true, parseInt(_index.getAttribute('caroussel-index') || "0", 10));
            }
            if(e.key === "ArrowLeft") {
                moveCarousel(true, false, parseInt(_index.getAttribute('caroussel-index') || "0", 10));
            }
        }
    }

    const openCarousel = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, index:number) => {
        openModale(pressMediaModale(
            {
                onOpen:() => {
                    let elem:any = document.querySelector('.press-media-caroussel-elems .press-media-caroussel-elem');
                    if(elem) {
                        elem.classList.add(moverClass);
                        elem.style.marginLeft = `calc(100% * -${index})`;
                    }
                    else {
                        return false;
                    }
                    let arrows = Array.from(document.querySelectorAll('.press-media-caroussel .press-arrow'));
                    arrows && arrows.forEach(arrow => {
                        arrow.addEventListener('click', () => {
                            let _index = document.querySelector('.press-media-caroussel-elems');
                            if(_index != null) {
                                moveCarousel(arrow.classList.contains('left'), arrow.classList.contains('right'), parseInt(_index.getAttribute('caroussel-index') || "0", 10));
                            }
                        })
                    });
                    document.addEventListener('keyup', processKeyCaroussel);
                    let backs = Array.from(document.querySelectorAll('.press-media-caroussel-elem-back'));
                    backs && backs.forEach(back => {
                        back.addEventListener('click', () => closeModale())
                    })
                },
                onClose:() => {
                    document.removeEventListener('keyup', processKeyCaroussel);
                },
                press: pressMedia,
                index: index
            }
        ));
    }

    return (
      <Layout title="press">
        <SEO title="Press"/>
        <div className="main-container">
            {pressMedia && pressMedia.map((elem, _i) => <PressMedia key={_i} prop_key={_i} openCarousel={openCarousel} datas={elem}/>)}
        </div>
      </Layout>
    );
};

interface PressMediaPage_Interface {
    data: {
        allStrapiPressMedia: {
            nodes: InmodePanel_PressMedia_Interface[];
        }
    };
};

export default PressMediaPage;

export const query = graphql`
{
    allStrapiPressMedia(sort: {fields: published_at, order: DESC}) {
      nodes {
        Picture {
          localFile {
            publicURL
            childImageSharp {
              fluid {
                srcWebp
                srcSetWebp
              }
            }
          }
        }
        Short
        Description
        URL
      }
    }
  }
  
`;
import React from "react";
import { Link } from "gatsby";
import Carousel from "../../../Carousel";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const bas = [
    {doctor: "DR. S. FARHANG", img: "OptimasMax__BeforeAfter_1", alt: "DR. S. FARHANG"},
    {doctor: "INMODE", img: "OptimasMax__BeforeAfter_2", alt: "INMODE"},
    {doctor: "D. SEO, ITEC", img: "OptimasMax__BeforeAfter_3", alt: "D. SEO, ITEC"},
    {doctor: "DR. J. DIAMOND", img: "OptimasMax__BeforeAfter_4", alt: "DR. J. DIAMOND"},
    {doctor: "K. SPECTOR, LME", img: "OptimasMax__BeforeAfter_5", alt: "K. SPECTOR, LME"},
    {doctor: "DR. B. RICHLAND", img: "OptimasMax__BeforeAfter_6", alt: "DR. B. RICHLAND"},
    {doctor: "SPRY SKIN & WELLNESS CENTER", img: "OptimasMax__BeforeAfter_7", alt: "SPRY SKIN & WELLNESS CENTER"},
    {doctor: "DIAMOND ADVANCED AESTHETICS, NYC", img: "OptimasMax__BeforeAfter_8", alt: "DIAMOND ADVANCED AESTHETICS, NYC"},
];

const OptimasMaxBeforeAfter = ({  }:OptimasMaxBeforeAfter) => {

    const images = useImages();
    const [index, setIndex]:[number, React.Dispatch<number>] = React.useState(0);

    ///////////////////////////////

    const [isDragging, setIsDragging] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState(0);
    const [translate, setTranslate] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleDragStart = (e:any) => {
        console.log('handleDragStart');
        setIsDragging(true);
        const initialPosition = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setStartPosition(initialPosition);
    };

    const handleDragMove = (e:any) => {
        console.log('handleDragMove');
        if (!isDragging) return;
        const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentPosition - startPosition;
        setTranslate(diff);
    };

    const handleDragEnd = () => {
        console.log('handleDragEnd');
        setIsDragging(false);
        if (Math.abs(translate) > 50) {
            if (translate < 0 && index < bas.length - 1) {
                optimas_max_next_ba();
            } else if (translate > 0 && index > 0) {
                optimas_max_previous_ba();
            }
        }
        setTranslate(0);
    };

    ///////////////////////////////
    
    function is_first(i:number) {return i == 0;}
    function is_last(i:number) {return i == bas.length - 1;}
    
    function optimas_max_previous_ba() {
        if(is_first(index)) {return false;}
        optimas_max_ba_update_index(index - 1);
    }
    
    function optimas_max_next_ba() {
        if(is_last(index)) {return false;}
        optimas_max_ba_update_index(index + 1);
    }
    
    function optimas_max_ba_update_index(i:number) {
        is_first(i) ? previous_disabled(true) : previous_disabled(false);
        is_last(i) ? next_disabled(true) : next_disabled(false);
        exocovio_bas_positions(i);
        optimas_max_dots_active(i);
        setIndex(i);
    }
    
    function previous_disabled(val:boolean) {
        ((el) => {
            if(el instanceof HTMLButtonElement) {
                el.disabled = val;
            }
        })(containerRef.current?.parentElement?.querySelector('#optimas_max-bas-previous'));
    }
    
    function next_disabled(val:boolean) {
        ((el) => {
            if(el instanceof HTMLButtonElement) {
                el.disabled = val;
            }
        })(containerRef.current?.parentElement?.querySelector('#optimas_max-bas-next'));
    }
    
    function exocovio_bas_positions(i:number) {
        Array.from(containerRef.current?.parentElement?.querySelectorAll('.page_optimas_max-before_after-bas-ba') || [])
        .forEach((ba, vi) => {
            if(ba instanceof HTMLDivElement) {
                ba.style.transform = `translateX(${-i * 100}%)`;
            }
        });
    }

    function optimas_max_dots_active(i:number) {
        Array.from(containerRef.current?.parentElement?.nextElementSibling?.querySelectorAll('#optimas_max-bas-dots li') || [])
        .forEach((dot, doti) => {
            if(dot instanceof HTMLLIElement) {
                dot.classList[doti == i ? 'add' : 'remove']('current');
            }
        });
    }

    function optimas_max_init_dots() {
        Array.from(containerRef.current?.parentElement?.nextElementSibling?.querySelectorAll('#optimas_max-bas-dots li') || [])
        .forEach((dot, doti) => {
            if(dot instanceof HTMLLIElement) {
                dot.addEventListener('click', () => 
                    optimas_max_ba_update_index(
                        ((i) => 
                            typeof i == "number" ? i : 0
                        )(parseInt(dot.getAttribute('data-index') || ""))
                    )
                );
            }
        });
    }

    React.useEffect(() => {
        optimas_max_ba_update_index(0);
        optimas_max_init_dots();
    }, []);

    React.useEffect(() => {
        document.getElementById("page_optimas_max-before_after-bas")?.classList[isDragging == false ? 'remove' : 'add']('dragging');
    }, [isDragging]);

    return (
        <div id="page-optimas_max-ba">
            <h2>AVANT & APRÈS</h2>
            <div id="page-optimas_max-ba-carousel">
                <div id="page_optimas_max-before_after-bas_container">
                    <button id="optimas_max-bas-previous" onClick={() => optimas_max_previous_ba()}>
                        <svg viewBox="0 0 100 100">
                            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
                        </svg>
                    </button>
                    <div
                        id="page_optimas_max-before_after-bas"
                        ref={containerRef}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        {
                            bas.map((ba, i) => 
                                <div
                                    key={"page_optimas_max-before_after-bas-ba-" + i}
                                    className="page_optimas_max-before_after-bas-ba ba-image"
                                    style={{ transform: `translateX(calc(-${index * 100}% + ${translate}px))` }}
                                >
                                    <img src={images.resolve_img(ba.img)} srcSet={images.resolve_img_set(ba.img)} draggable={false} alt={ba.alt}/>
                                    <span className="ba-doctor">{ba.doctor}</span>
                                </div>
                            )
                        }
                    </div>
                    <button id="optimas_max-bas-next" onClick={() => optimas_max_next_ba()}>
                        <svg viewBox="0 0 100 100">
                            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path>
                        </svg>
                    </button>
                </div>
                <ul id="optimas_max-bas-dots">{bas.map((_, i) => (<li data-index={i}></li>))}</ul>
            </div>
        </div>
    );
};

interface OptimasMaxBeforeAfter {

};

export default OptimasMaxBeforeAfter;

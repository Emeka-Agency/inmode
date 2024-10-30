import React from "react";
import PropTypes from "prop-types";
import Flickity from "react-flickity-component";

const DISABLED_OPACITY = 0.3;

const Carousel = ({
    id = '',
    elementType = 'div',
    options = {},
    disableImagesLoaded = false,
    reloadOnUpdate = true,
    isStatic = false,
    classList = '',
    children,
    OnIndexUpdate = null
}:Carousel) => {
    const [flickityInstance, setFlickityInstance]:[any, React.Dispatch<any>] = React.useState(null);
    const [flickityPrev, setFlickityPrev]:[HTMLButtonElement|null, React.Dispatch<any>] = React.useState(null);
    const [flickityNext, setFlickityNext]:[HTMLButtonElement|null, React.Dispatch<any>] = React.useState(null);
    const [flickityLength, setFlickityLength]:[number, React.Dispatch<number>] = React.useState(0);
    // const [currentIndex, setCurrentIndex]:[number, React.Dispatch<number>] = React.useState(0);
    
    React.useEffect(() => {
        // When the flickity instance is available, listen to the change event
        if (flickityInstance) {
            flickityInstance.on('change', (index:number) => {
                console.log(`Index courant ${index} sur ${flickityLength} éléments`); // Logs the current index
                // setCurrentIndex(index); // Update state with the current index
                if(flickityPrev instanceof HTMLButtonElement) {
                    flickityPrev.style.opacity = index == 0 ? DISABLED_OPACITY : 1;
                    flickityPrev.disabled = index == 0 ? true : false;
                }
                if(flickityNext instanceof HTMLButtonElement) {
                    flickityNext.style.opacity = index == flickityLength - 1 ? DISABLED_OPACITY : 1;
                    flickityNext.disabled = index == flickityLength - 1 ? true : false;
                }
                typeof OnIndexUpdate == "function" && OnIndexUpdate(index);
            });
        }
    }, [flickityInstance]);

    return (
        <Flickity
            flickityRef={(c:{
                cells: [],
                nextButton: {element: HTMLButtonElement},
                prevButton: {element: HTMLButtonElement},
                slides: [],
            }) => {
                console.log(c.cells.length);
                console.log(c.slides.length);
                setFlickityInstance(c);
                c.prevButton.element.style.opacity = DISABLED_OPACITY.toString();
                c.prevButton.element.disabled = true;
                setFlickityPrev(c.prevButton.element);
                setFlickityNext(c.nextButton.element);
                setFlickityLength(children.length);
            }}
            id={id}
            elementType={elementType}
            options={options}
            disableImagesLoaded={disableImagesLoaded}
            reloadOnUpdate={reloadOnUpdate}
            static={isStatic}
            className={classList}
        >
            {children}
        </Flickity>
    );
};

interface Carousel {
    id?: string;
    elementType?: string;
    options?: {
        "accessibility"?: boolean,
        "cellAlign"?: "left"|"center"|"right",
        "freeScrollFriction"?: number,
        "friction"?: number,
        "namespaceJQueryEvents"?: boolean,
        "percentPosition"?: boolean,
        "resize"?: boolean,
        "selectedAttraction"?: number,
        "setGallerySize"?: boolean,
        "draggable"?: boolean,
        "dragThreshold"?: number,
        "prevNextButtons"?: boolean,
        "arrowShape"?: {
            "x0": number,
            "x1": number,
            "y1": number,
            "x2": number,
            "y2": number,
            "x3": number
        },
        "pageDots"?: boolean,
        "pauseAutoPlayOnHover"?: boolean,
        "initialIndex"?: number
    };
    disableImagesLoaded?: boolean;
    reloadOnUpdate?: boolean;
    isStatic?: boolean;
    classList?: string;
    children: any;
    OnIndexUpdate: Function|null;
};

export default Carousel;
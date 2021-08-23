import { PressMedia_Interface } from '../components/interfaces';
import { disableMainScroll, enableMainScroll } from './disable-scroll';

function modale():HTMLElement {
    return document.getElementById('modale');
}

function modaleContainer():HTMLElement {
    return document.getElementById('modale-container');
}

function modaleContent():HTMLElement {
    return document.getElementById('modale-content');
}

function modaleClose():HTMLElement {
    return document.getElementById('modale-close');
}

export function openModale(params:params) {
    disableMainScroll();
    modale().classList.add('opened');
    params.modaleClass != undefined && modale().classList.add(params.modaleClass);
    params.containerClass != undefined && modaleContainer().classList.add(params.containerClass);
    params.contentClass != undefined && modaleContent().classList.add(params.contentClass);
    modaleContent().innerHTML = closePart() + params.content;
    params.onOpen && params.onOpen();
    modale().addEventListener('click', function(e:MouseEvent) {
        if(e.target.id == 'modale') {
            closeModale(params.onClose);
        }
    });
    document.addEventListener('keyup', function(e:KeyboardEvent) {
        if(e.keyCode === 27) {
            closeModale(params.onClose);
        }
    });
        modaleClose().addEventListener('click', function(e:MouseEvent) {
        closeModale(params.onClose);
    });
}

export function closeModale(onClose:Function|null = null) {
    modale().classList.remove('opened');
    modaleContainer().classList.remove(...modaleContainer().classList);
    modaleContent().classList.remove(...modaleContent().classList);
    modaleContent().innerHTML = "";
    onClose != null && onClose();
    enableMainScroll();
}

function closePart() {
    return `<span id="modale-close">+</span>`;
}

// Payment SEPA Modale

export function paymentSEPA(datas:paymentSEPA) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        containerClass: 'payment-sepa',
        content: `
            <h2>Order completed</h2>
            <div class="thanks">
                Thanks, your order has been well created. We'll ship it to you as soon as possible
            </div>
            <div class="info">
                Your order reference is <span class="reference">${datas.reference}</span>, think about keeping it somewhere
            </div>
            <div class="post-scriptum">
                PS : all the informations related to your order had been sent to the mail address(es) provided during the purchase
            </div>
        `.trim()
    };
};

// Press media Modale

export function pressMedia(datas:pressMedia) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        containerClass: 'press-media-caroussel',
        content: `
            <div class="press-media-caroussel-elems" caroussel-index="${datas.index}">
                <div class="press-arrow left"><div class="arrow-left"></div></div>
                <div class="press-arrow right"><div class="arrow-right"></div></div>
                ${datas.press && datas.press.map((_press, index) => {
                    return `
                        <div class="press-media-caroussel-elem">
                            <div class="press-media-caroussel-elem-back"></div>
                            ${
                                _press.Picture
                                &&
                                `<img
                                    class="press-media-modale-picture"
                                    src="${_press.Picture && _press.Picture.childImageSharp.fluid.srcWebp}"
                                    srcSet="${_press.Picture && _press.Picture.childImageSharp.fluid.srcSetWebp}"
                                />`
                            }
                            ${
                                _press.Short
                                &&
                                `<div
                                    class="press-media-modale-short"
                                >
                                    ${_press.Short}
                                </div>`
                            }
                            ${
                                _press.Description
                                &&
                                `<div
                                    class="press-media-modale-description"
                                >
                                    ${_press.Description}
                                </div>`
                            }
                            ${
                                _press.URL
                                &&
                                `<a
                                    class="press-media-modale-url"
                                    href="${_press.URL}"
                                    target="_blank"
                                >
                                    Read more
                                </a>`
                            }
                        </div>
                    `;
                }).join('').trim()}
            </div>
        `.trim()
    };
}

export function clinicalStudyPassword(datas:clinicalStudy) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        containerClass: "study-pass-modale-container",
        content: `
            <h2>Study download</h2>
            <div class="clinical-study-download-text">
                Please first enter the password to get the clinical study
            </div>
            <div class="clinical-study-download-input-zone">
                <input type="password" id="clinical-study-download-password" placeholder="Type password here"/>
                <div class="clinical-study-download-input-zone-after"></div>
                <div id="clinical-study-download-password-status" style="display:none;"></div>
            </div>
            <div class="clinical-study-download-submit">
                <button type="submit" id="clinical-study-download-submit">Submit</button>
            </div>
        `.trim()
    };
}

interface paymentSEPA {
    total: string;
    RIB: string;
    BIC: string;
    reference: string;
    onOpen?: Function;
    onClose?: Function;
};

interface pressMedia {
    press: PressMedia_Interface[];
    index: number;
    onOpen?: Function;
    onClose?: Function;
};

interface clinicalStudy {
    onOpen?: Function;
    onClose?: Function;
}

interface params {
    onOpen?: Function,
    onClose?: Function,
    containerClass?: string,
    contentClass?: string,
    modaleClass?: string,
    content: string,
}
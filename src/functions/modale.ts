import { PressMedia_Interface } from '../components/interfaces';
import { disableMainScroll, enableMainScroll } from './disable-scroll';

function modale():HTMLElement|null {
    return document.getElementById('modale');
}

function modaleContainer():HTMLElement|null {
    return document.getElementById('modale-container');
}

function modaleContent():HTMLElement|null {
    return document.getElementById('modale-content');
}

function modaleClose():HTMLElement|null {
    return document.getElementById('modale-close');
}

export function openModale(params:params) {
    disableMainScroll();
    modale()?.classList.add('opened');
    params.modaleClass != undefined && modale()?.classList.add(params.modaleClass);
    params.containerClass != undefined && modaleContainer()?.classList.add(params.containerClass);
    params.contentClass != undefined && modaleContent()?.classList.add(params.contentClass);
    modaleContent().innerHTML = closePart() + params.content;
    params.onOpen && params.onOpen();
    modale()?.addEventListener('click', function(e:MouseEvent) {
        if(e?.target?.id == 'modale') {
            closeModale(params.onClose);
        }
    });
    document.addEventListener('keyup', function(e:KeyboardEvent) {
        if(e.keyCode === 27) {
            closeModale(params.onClose);
        }
    });
        modaleClose()?.addEventListener('click', function(e:MouseEvent) {
        closeModale(params.onClose);
    });
}

export function closeModale(onClose:Function|null = null) {
    modale()?.classList.remove('opened');
    modaleContainer()?.classList.remove(...(modaleContainer()?.classList ?? []));
    modaleContent()?.classList.remove(...(modaleContent()?.classList ?? []));
    modaleContent().innerHTML = "";
    onClose != null && onClose();
    enableMainScroll();
}

function closePart() {
    return `<span id="modale-close">+</span>`;
}

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
                                    src="${_press.Picture && _press.Picture.localFile.childImageSharp.fluid.srcWebp}"
                                    srcSet="${_press.Picture && _press.Picture.localFile.childImageSharp.fluid.srcSetWebp}"
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
                <input type="text" id="clinical-study-download-password" placeholder="Type password here"/>
                <div class="clinical-study-download-input-zone-after"></div>
                <div id="clinical-study-download-password-status" style="display:none;"></div>
            </div>
            <div class="clinical-study-download-submit">
                <button type="submit" id="clinical-study-download-submit">Submit</button>
            </div>
        `.trim()
    };
}

export function routeCaseStudy(datas:routeCaseStudy) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        containerClass: "route-case-study-modale-container",
        content: `
            <h2>Protected area</h2>
            <div class="route-case-study-text">
                Please first enter the password to access the case studies
            </div>
            <div class="route-case-study-input-zone">
                <input type="text" id="route-case-study-password" placeholder="Type password here"/>
                <div class="route-case-study-input-zone-after"></div>
                <div id="route-case-study-password-status" style="display:none;"></div>
            </div>
            <div class="route-case-study-submit">
                <button type="submit" id="route-case-study-submit">Submit</button>
            </div>
            ${datas.exit == true ? '<a id="route-case-study-exit" href="/">Exit</a>' : null}
        `.trim()
    };
}

export function signupEvent(datas:signupEvent) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        containerClass: "event-participate-modale-container",
        content: `
            <h2>Join the event</h2>
            <form id="event-signup">
                <div class="event-participate-input-zone">
                    <input name="salutation" required type="text" id="event-participate-salutation" placeholder="Salutation" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-salutation-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone">
                    <input name="firstname" required type="text" id="event-participate-firstname" placeholder="Firstname" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-firstname-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone">
                    <input name="surname" required type="text" id="event-participate-surname" placeholder="Surname" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-surname-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone">
                    <input name="mail" required type="text" id="event-participate-email" placeholder="Email" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-email-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone">
                    <input name="number" required type="text" id="event-participate-contact-number" placeholder="Contact number" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-contact-number-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone specialist-zone" style="display:none;">
                    <select name="speciality" id="event-participate-speciality" class="form-field">
                        <option value="" selected disabled style="display:none">Choose a speciality*</option>
                        <option value="plastic-surgeon">Plastic surgeon</option>
                        <option value="cosmetic-surgeon">Cosmetic surgeon</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="cosmetic-doctor">Cosmetic doctor</option>
                        <option value="gynecologist">Gynecologist</option>
                        <option value="nurse">Nurse</option>
                        <option value="facialist">Facialist / Aesthetician</option>
                        <option value="others">Others</option>
                    </select>
                    <div id="event-participate-speciality-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone specialist-zone" style="display:none;">
                    <input name="clinic_name" type="text" id="event-participate-clinic-name" placeholder="Clinic name" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-clinic-name-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone specialist-zone" style="display:none;">
                    <input name="clinic_location" type="text" id="event-participate-clinic-location" placeholder="Clinic location" class="form-field"/>
                    <div class="event-participate-input-zone-after"></div>
                    <div id="event-participate-clinic-location-status" style="display:none;"></div>
                </div>
                <div class="event-participate-input-zone neumorphic">
                    <input name="is_practitioner" type="checkbox" id="event-participate-is-doctor" class="form-field"/>
                    <label for="event-participate-is-doctor" class="user-select-none">I am a practitioner</label>
                    <div id="event-participate-is-doctor-status" style="display:none;"></div>
                </div>
                <div class="req-return success" style="color: '#59b7b3', fontSize: 15, fontWeight: 400"></div>
                <div class="req-return error" style="color: 'red', fontSize: 15, fontWeight: 400"></div>
                <input id="event-participate-event-name" value="${datas.event_name}" style="display:none;"/>
                <div class="event-participate-submit">
                    <button type="submit" id="event-participate-submit" class="submit">Submit</button>
                </div>
            </form>
        `.trim()
    };
}

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

interface routeCaseStudy {
    onOpen?: Function;
    onClose?: Function;
    exit?: boolean;
}

interface signupEvent {
    onOpen?: Function;
    onClose?: Function;
    event_name?: string;
}

interface params {
    onOpen?: Function,
    onClose?: Function,
    containerClass?: string,
    contentClass?: string,
    modaleClass?: string,
    content: string,
}
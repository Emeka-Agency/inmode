import { string } from '../../o2switch/unix_modules/strapi/lib/services/entity-validator/validators';
import { Address_Interface, InmodePanel_Order_Interface } from '../components/interfaces';
import { disableMainScroll, enableMainScroll } from './disable-scroll';
import { _log } from './logger';
import { selectOne } from './selectors';

const toBlur = ['header', 'main', '#fixed-menu', '#payment_form', '#privacy-policy', '#contact-us', 'footer'];

function modale():HTMLElement | null {
    return document.getElementById('modale');
}

function modaleContainer():HTMLElement | null {
    return document.getElementById('modale-container');
}

function modaleContent():HTMLElement | null {
    return document.getElementById('modale-content');
}

function modaleClose():HTMLElement | null {
    return document.getElementById('modale-close');
}

export function openModale(params:ModaleParams) {
    disableMainScroll();
    let _temp = modale();
    (params.blur ? params.blur : true) && toBlur.forEach(elem => (():HTMLElement|any => selectOne(elem))()?.style.setProperty('filter', 'blur(2px)'));
    _temp && _temp.classList.add('opened');
    params.modaleClass != undefined && _temp?.classList.add(params.modaleClass);
    _temp = modaleContainer();
    params.contentClass != undefined && _temp?.classList.add(params.contentClass);
    _temp = modaleContent();
    if(_temp) _temp.innerHTML = closePart() + params.content;
    params.onOpen && params.onOpen();
    _temp = modale();
    _temp && _temp.addEventListener('click', function(e:Event | MouseEvent) {
        if(e.target instanceof HTMLElement && e.target.id == 'modale') {
            closeModale(params.onClose);
        }
    });
    _temp = modale();
    _temp && _temp.addEventListener('keyup', function(e:KeyboardEvent) {
        if(e.keyCode === 27) {
            closeModale(params.onClose);
        }
    });
        _temp = modaleClose();
        _temp && _temp.addEventListener('click', function(e:MouseEvent) {
        closeModale(params.onClose);
    });
}

export function closeModale(onClose?:Function) {
    let _temp = modale();
    toBlur.forEach(elem => (():HTMLElement|any => selectOne(elem))()?.style.removeProperty('filter'));
    _temp && _temp?.classList.replace('opened', 'closing');
    setTimeout(function() {
        let _temp = modale();
        _temp?.classList.remove('closing');
        _temp = modaleContainer();
        _temp instanceof HTMLElement && _temp?.classList.forEach(_class => _temp?.classList.remove(_class));
        _temp = modaleContent();
        if(_temp) _temp.innerHTML = "";
        onClose != undefined && onClose();
        enableMainScroll();
    }, 300);
}

function closePart() {
    return `<span id="modale-close">+</span>`;
}

interface ModaleParams {
    onOpen?: Function,
    onClose?: Function,
    contentClass?: string,
    modaleClass?: string,
    content: string,
    blur?: boolean;
};

// ////////////////////////
// SHOP

export function paymentSEPA(datas:paymentSEPA = {
    total: "NaN€",
    RIB: "NaNNaN NaNNaN NaNNaN NaNNaN",
    BIC: "NaNNaNNaNNaN",
    reference: "NaNNaN",
    onOpen: undefined,
    onClose: undefined,
}) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        contentClass: 'payment-sepa',
        content: `
            <h2>Commande validée</h2>
            <div class="thanks">
                Merci, votre commande a bien été prise en compte. Nous l'expédierons dès réception de votre virement de ${datas.total} € sur ce RIB:
            </div>
            <table>
                <tbody class="SEPA">
                    <tr class="RIB"><td>RIB</td><td>${datas.RIB}</td></tr>
                    <tr class="BIC"><td>BIC</td><td>${datas.BIC}</td></tr>
                </tbody>
            </table>
            <div class="info">
                La référence de votre commande est <span class="reference">${datas.reference}</span>. Pensez à indiquer la référence de votre facture dans le libellé de votre virement
            </div>
            <div class="post-scriptum">
                PS : les informations relatives à la commande et son réglement vous ont aussi été envoyées par mail. Vous pourrez y retrouver toutes les informations présentes ici.
            </div>
        `.trim()
    };
};

interface paymentSEPA {
    total: string;
    RIB: string;
    BIC: string;
    reference: string;
    onOpen?: Function;
    onClose?: Function;
};

export function paymentProblems(datas:paymentProblems = {
    order: null,
    onOpen: undefined,
    onClose: undefined,
}) {
    _log(datas);
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        contentClass: 'payment-problems',
        content: `
            <h2>Erreur lors de la commande</h2>
            <div class="apologize">
                Une latence est apparue lors de votre commande. Veuillez recharger la page et reprendre votre commande. Si ce souci persiste, contactez-nous directement.\nCordialement
            </div>
        `.trim()
    };
}

interface paymentProblems {
    order: InmodePanel_Order_Interface|null;
    onOpen?: Function;
    onClose?: Function;
};

export function cartFillDatas(datas:cartFillDatas = {}) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        contentClass: 'cart-fill-datas',
        content: `
            <h2>Commander de nouveau</h2>
            <div class="explain">
                Veuillez entrer le mail de votre dernière commande pour que nous puissions retrouver vos informations
            </div>
            <div class="enter-mail neumorphic">
                <input id="to-search-mail" type="email" class="neumorphic" placeholder="Mail..."/>
                <button id="datas-search" class="disabled">CHERCHER</button>
            </div>
            <div id="results-check">
                <ul id="datas-billing"></ul>
                <ul id="datas-shipping"></ul>
            </div>
            <div class="buttons neumorphic">
                <button id="datas-validate" class="disabled">VALIDER</button>
                <button id="datas-cancel">ANNULER</button>
            </div>
        `.trim()
    };
};


interface cartFillDatas {
    onOpen?: Function;
    onClose?: Function;
};

export function loginModale(datas:loginModale = {}) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        modaleClass: "login-modale",
        contentClass: "login-container",
        content: `
            <h2>S'identifier</h2>
            <form id="login_form">
                <div id="user_section">
                    <label id="user_input_label" for="user_input">Adresse mail</label>
                    <input type="email" name="user_input" id="user_input" placeholder="Mail..." required/>
                    <span id="user_input_result"></span>
                </div>
                <div id="pass_section">
                    <label id="pass_input_label" for="pass_input">Mot de passe</label>
                    <input type="password" name="pass_input" id="pass_input" placeholder="Mot de passe..." required/>
                    <span id="pass_input_result"></span>
                </div>
                <div id="signin_action">Pas encore de compte ?</div>
                <div id="submit_section">
                    <span id="submit_login_result"></span>
                    <button id="submit_login">Connexion</button>
                    <div class="loading-gif mini hidden">
                        <div class="loader-circle"></div>
                        <div class="loader-bar"></div>
                    </div>
                </div>
            </form>
        `.trim()
    };
};

// ////////////////////////
// USER

interface loginModale {
    onOpen?: Function;
    onClose?: Function;
};

export function signinModale(datas:loginModale = {}) {
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        modaleClass: "signin-modale",
        contentClass: "signin-container",
        content: `
            <h2>S'inscrire</h2>
            <form id="signin_form">
                <div id="user_section">
                    <label id="user_input_label" for="user_input">Adresse mail</label>
                    <input type="email" name="user_input" id="user_input" placeholder="Mail..." required/>
                    <span id="user_input_result"></span>
                </div>
                <div id="pass_section">
                    <label id="pass_input_label" for="pass_input">Mot de passe</label>
                    <input type="password" name="pass_input" id="pass_input" placeholder="Mot de passe..." required/>
                    <span id="pass_input_result"></span>
                </div>
                <div id="login_action">Vous avez déjà un compte ?</div>
                <div id="submit_section">
                    <span id="submit_signin_result"></span>
                    <button id="submit_signin">Créer mon compte</button>
                    <div class="loading-gif mini hidden">
                        <div class="loader-circle"></div>
                        <div class="loader-bar"></div>
                    </div>
                </div>
            </form>
        `.trim()
    };
};

interface signinModale {
    onOpen?: Function;
    onClose?: Function;
};

// ////////////////////////
// ADRESSES

export function createAddressModale(datas:createAddressModale = {}) {

    interface Field {
        slug: string;
        type?: string;
        placeholder?: string;
        label?: string;
        options?: any;
    };

    const fields:Field[] = [
        {
            'slug': 'society',
            'placeholder': '',
            'label': 'Société',
        },
        {
            'slug': 'clinic',
            'placeholder': '',
            'label': 'Clinique',
        },
        {
            'slug': 'address_1',
            'placeholder': '',
            'label': 'Adresse 1',
        },
        {
            'slug': 'address_2',
            'placeholder': '',
            'label': 'Adresse 2',
        },
        {
            'slug': 'zip',
            'type': 'number',
            'placeholder': '',
            'label': 'Code postal',
        },
        {
            'slug': 'city',
            'placeholder': '',
            'label': 'Ville',
        },
        {
            'slug': 'country',
            'type': 'select',
            'placeholder': '',
            'label': 'Pays',
            'options': {
                'FR': 'France',
                'BE': 'Belgique',
                'LU': 'Luxembourg',
                'FRDT': 'DOM/TOM',
            }
        },
        {
            'slug': 'label',
            'placeholder': '',
            'label': 'Libellé',
        },
    ];
    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        modaleClass: "create-address-modale",
        contentClass: "create-address-container",
        content: `
            <div id="create-address">
                <h2>Créer une nouvelle adresse</h2>
                <form id="create-address-form">
                    ${
                        fields.map(function(field:Field, key:number) {
                            return `
                                <div id="${field.slug}_section" key="${key}">
                                    <label id="${field.slug}_input_label" for="address_${field.slug}_input">${field?.label}</label>
                                    ${
                                        field.type == "select" ?
                                        `
                                            <select id="address_${field.slug}_input" name="address_${field.slug}_input" required>
                                                ${Object.keys(field.options).map(function(option:string) {return `<option value="${option}">${field.options[option]}</option>`;}).join('')}
                                            </select>
                                        `
                                        :
                                        `<input id="address_${field.slug}_input" name="address_${field.slug}_input" type="${field?.type || "text"}" placeholder="${field?.placeholder}" required/>`
                                    }
                                    <span id="pass_${field.slug}_result"></span>
                                </div>
                            `;
                        }).join('')
                    }
                    <div id="submit_section">
                        <span id="submit_create_address_result"></span>
                        <button id="submit_create_address" type="submit">Créer l'adresse</button>
                        <div class="loading-gif mini hidden">
                            <div class="loader-circle"></div>
                            <div class="loader-bar"></div>
                        </div>
                    </div>
                </form>
            </div>
        `
    };
};

interface createAddressModale {
    onOpen?: Function;
    onClose?: Function;
};

export function selectAddressModale(datas:selectAddressModale = {}) {

    return {
        onOpen: datas.onOpen,
        onClose: datas.onClose,
        modaleClass: "select-address-modale",
        contentClass: "select-address-container",
        content: `
            <div id="select-address">
                <h2>Sélectionner une adresse</h2>
                <div id="addresses-list">
                    ${
                        datas?.addresses?.map(function(address:Address_Interface, key:number) {
                            return `
                                <div class="address-select ellipsis" key={key} data-address="${address.address}">
                                    <div class="address-title">${address.label || `Adresse ${key + 1}`}</div>
                                    <div class="address-detail">
                                        ${
                                            [
                                                [address.nom, address.prenom].filter(el => el).join(' '),
                                                address.clinic,
                                                address.society,
                                                [address.address_1, address.address_2, address.zip, address.city, address.country].filter(el => el).join(', ')
                                            ].filter(el => el).join(' ')
                                        }
                                    </div>
                                </div>
                            `;
                        })
                    }
                </div>
            </div>
        `
    };
};

interface selectAddressModale {
    onOpen?: Function;
    onClose?: Function;
    addresses?: Address_Interface[];
};

// ////////////////////////
// SIGNUP EVENT

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
                <div class="req-return success" style="color: 'var(--teal)', fontSize: 15, fontWeight: 400"></div>
                <div class="req-return error" style="color: 'red', fontSize: 15, fontWeight: 400"></div>
                <input id="event-participate-event-name" value="${datas.event_name}" style="display:none;"/>
                <div class="event-participate-submit">
                    <button type="submit" id="event-participate-submit" class="submit">Submit</button>
                </div>
            </form>
        `.trim()
    };
}

interface signupEvent {
    onOpen?: Function;
    onClose?: Function;
    event_name?: string;
}
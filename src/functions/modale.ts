import { string } from '../../o2switch/unix_modules/strapi/lib/services/entity-validator/validators';
import { Address_Interface, InmodePanel_Order_Interface } from '../components/interfaces';
import { disableMainScroll, enableMainScroll } from './disable-scroll';

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
    _temp && _temp.classList.add('opened');
    _temp = modale();
    params.modaleClass != undefined && _temp && _temp.classList.add(params.modaleClass);
    _temp = modaleContainer();
    params.contentClass != undefined && _temp && _temp.classList.add(params.contentClass);
    _temp = modaleContent();
    if(_temp) _temp.innerHTML = closePart() + params.content;
    params.onOpen && params.onOpen();
    _temp = modale();
    _temp && _temp.addEventListener('click', function(e:Event | MouseEvent) {
        if(e.target && e.target.id == 'modale') {
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
    _temp && _temp?.classList.replace('opened', 'closing');
    setTimeout(function() {
        let _temp = modale();
        _temp?.classList.remove('closing');
        _temp = modaleContainer();
        _temp && _temp?.classList.remove(..._temp.classList);
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
    console.log(datas);
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
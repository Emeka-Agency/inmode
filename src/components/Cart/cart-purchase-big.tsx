import React from "react";
import { useCart } from "../contexts/cart-provider";
import { useImages } from '../contexts/images-provider';
import {
    AddressLine1Field,
    CityField,
    ClinicField,
    CountryField,
    CustomField,
    DeliveryAddressLine1Field,
    DeliveryCityField,
    DeliveryClinicField,
    DeliveryCountryField,
    DeliveryCustomField,
    DeliveryFirstNameField,
    DeliveryLastNameField,
    DeliveryMailField,
    DeliveryPhoneField,
    DeliverySocietyField,
    DeliveryTitleField,
    DeliveryZipField,
    FirstNameField,
    IntraTVAField,
    LastNameField,
    MailField,
    MobilePhoneField,
    SocietyField,
    TitleField,
    ZipField
} from "../PaymentFields";
import LoadingGIF from '../LoadingGIF';

import './big.css';
import { getById } from "../../functions/selectors";
import { useWindowSize } from "../../functions/window-size";
import { cartFillDatas, closeModale, openModale } from "../../functions/modale";
import _fetch from "../../functions/fetch";
import { element } from "prop-types";
import { useUser } from "../contexts/user-provider";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const CartPurchaseBig = ({  }:CartPurchaseBig) => {

    const user = useUser();
    const images = useImages();
    const cart = useCart();
    const size = useWindowSize();

    // console.log("total : " + cart.total());
    // console.log("Livraison : " + (cart.pay_delivery() ? 50 : 0));
    // console.log("TVA : " + cart.total_tva());
    // console.log("TTC : " + (cart.total() + (cart.pay_delivery() ? 50 : 0) + parseFloat(cart.total_tva())).toFixed(2));


    const [formOpened, setFormOpened] = React.useState(false);
    const [otherAddress, setOtherAddress] = React.useState(false);
    const [otherAddressOpened, setOtherAddressOpened] = React.useState(false);
    const [isSubmit, setIsSubmit]:[Boolean | null, React.Dispatch<any>] = React.useState(null);
    const [isCreated, setIsCreated]:[Boolean, React.Dispatch<Boolean>] = React.useState(new Boolean(false));

    const [intraTVA, setIntraTVA]:[string|null, React.Dispatch<string|null>] = React.useState(null);

    const manageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        otherAddress && setOtherAddressOpened(false);
        !otherAddress && setOtherAddressOpened(true);
        setOtherAddress(e.currentTarget.checked);
        cart.hasDifferentShipping(e.currentTarget.checked);
    }

    const manageCheckboxPayment = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(document != undefined) {
            let current:HTMLInputElement = e.currentTarget;
            let other:any = getById(current.id == 'sepa' ? 'soge' : 'sepa');
            other.checked = !current.checked;
            return true;
        }
        return false;
    }

    const sendForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let _temp:any = getById('big-submit');
        if(_temp){ _temp.disabled= true; }
        let _sepa:HTMLInputElement | any = getById('sepa');
        let fields = [...Array.from(document.forms.namedItem("purchase") || []).filter((field:any) => {return field.id.includes('vads_')})];
        setIsSubmit(true);
        document.getElementById('vads_amount').value = cart.total_all_included();
        let res = await cart.redirectPay(fields, _sepa == null ? false : _sepa.checked);
        setIsCreated(res === true ? true : false);
        setIsSubmit(res === true ? false : null);
        res == true && setFormOpened(false);
        res == true && setOtherAddress(false);
        res == true && setOtherAddressOpened(false);
        _temp = getById('big-submit');
        if(_temp) { _temp.disabled= false; }
    }

    const submitClasses = ():string => {
        if(formOpened && !otherAddress) {
            return "cart-validate form-transition";
        }
        if((formOpened && otherAddress && otherAddressOpened) || (formOpened && otherAddress)) {
            return "cart-validate form-transition other-address-transition";
        }
        return `cart-validate${formOpened && otherAddress && otherAddressOpened ? ' other-address-transition' : formOpened ? ' form-transition' : ''}`;
    }

    const buttonText = ():string => {
        if(isSubmit === true && isCreated === true) {
            return "Commande effectuée";
        }
        if(isSubmit === null && isCreated === false) {
            return "Erreur commande";
        }
        if(isSubmit === true) {
            return "En cours ...";
        }
        if(!formOpened) {
            return "Acheter";
        }
        if(!otherAddress || otherAddressOpened) {
            return "Commander";
        }
        return "Continuer";
    }

    React.useEffect(() => {
        if(isSubmit === true) {
            if(isCreated === true) {
                setIsSubmit(false);
                setIsCreated(false);
                setFormOpened(false);
                setOtherAddress(false);
                cart.hasDifferentShipping(false);
                setOtherAddressOpened(false);
                if(typeof document != "undefined") {
                    let _temp = document.forms.namedItem('purchase');
                    _temp && _temp.reset();
                    let _sepa:any = getById('sepa');
                    if(_sepa) {
                        _sepa.checked = _sepa.checked ? true : false;
                    }
                    let _soge:any = getById('soge');
                    if(_soge) {
                        _soge.checked = _soge.checked ? true : false;
                    }
                    let _facture:any = getById('facture');
                    if(_facture) {
                        _facture.checked = false;
                    }
                    let _terms:any = getById('terms');
                    if(_terms) {
                        _terms.checked = false;
                    }
                }
            }
            else {
                setIsSubmit(null)
            }
        }
    }, [isCreated]);

    const countryIndex = function(country:string|null):number
    {
        if(typeof country == "string") {
            switch(country) {
                case "Belgique": return 1;
                case "Luxembourg": return 2;
                case "DOM/TOM": return 3;
                case "France":
                default:
                    return 0;
            }
        }
        return 0;
    }

    const countryValue = function(country:string|null):string
    {
        if(typeof country == "string") {
            switch(country) {
                case "Belgique": return "BE";
                case "Luxembourg": return "LU";
                case "DOM/TOM": return "FRDT";
                case "France":
                default:
                    return "FR";
            }
        }
        return "FR";
    }

    React.useEffect(() => {

    }, [cart, user]);

    return (
        <form
            id="purchase"
            className={!cart.cart_opened ? "all-close" : !formOpened ? 'step-1' : 'step-2-3'}
            onSubmit={sendForm}
        >
            <div id="order-create-waiter" hidden={isSubmit ? false: true}><img src={images.resolve_img('orderCreateSpinner')}/></div>
            <input id="order_user" value={user.get('user')} style={{display: 'none'}}/>
            {/* FIRST PART */}
            <div className={`cart-purchase transition${cart.cart_opened ? ' opened' : ''}`}>
                <div className="cart-close"
                    onClick={(e) => {
                        e.preventDefault();
                        setOtherAddressOpened(false);
                        setFormOpened(false);
                        cart.toggle_open_cart();
                    }}
                >
                    <img
                        src={images.resolve_img('closeWhiteIcon')}
                        srcSet={images.resolve_img_set('closeWhiteIcon')}
                        alt="Close"
                    />
                </div>
                <div className="cart-head">
                    <img
                        src={images.resolve_img('cartBasketIcon')}
                        srcSet={images.resolve_img_set('cartBasketIcon')}
                        alt="Panier"
                    />
                    <span>{`Panier, ${cart.cart.length} article${cart.cart.length > 1 ? 's' : ''}`}</span>
                </div>
                <div className={`cart-content custom-scrollbar moz-scrollbar${formOpened ? ' purchase' : ''}`}>
                    {cart.cart.map((article, key) => {
                        return (
                            <div key={key} className="cart-article transition">
                                <div
                                    className="rmv"
                                    onClick={(e) => {
                                        cart.remove(article.reference, article.quantity);
                                    }}
                                >
                                    <img className="init" src={images.resolve_img('rmvInit')} alt="X"/>
                                    <img className="blue" src={images.resolve_img('rmvHover')} alt="X"/>
                                </div>
                                <div className="addon">
                                    {cart.articles[article.reference].picture && (<img
                                        src={resolveImg(cart.articles[article.reference].picture)}
                                        srcSet={resolveImgSet(cart.articles[article.reference].picture)}
                                        alt=""
                                    />)}
                                </div>
                                <div className="details">
                                    <div className="reference">{article.reference}</div>
                                    <div className="name">{article.name}</div>
                                    <div className="qnts">
                                        <div className="pack">{cart.articles[article.reference].pack_name()}</div>
                                        <div className="manage">
                                            <div
                                                className="minus"
                                                onClick={(e) => {
                                                    cart.remove(article.reference, 1);
                                                }}
                                            >
                                                -
                                            </div>
                                            <div className="qnt">{article.quantity}</div>
                                            <div
                                                className="add"
                                                onClick={(e) => {
                                                    cart.add(article.reference, 1);
                                                }}
                                            >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                     {cart.pay_delivery() && <div className="free-message">Livraison gratuite à partir de 500€</div>}
                </div>
                <div className={`cart-final${formOpened ? ' purchase' : ''}`}>
                    <div className="cart-discount">
                        {/*PAS DE FRAIS DE LIVRAISON*/}
                        {/* <div className="text">Livraison{cart.pay_delivery() && false ? '' : ' gratuite'}</div> */}
                        {/*FRAIS DE LIVRAISON*/}
                        <div className="text">Livraison{cart.pay_delivery() ? '' : ' gratuite'}</div>
                        {cart.pay_delivery() ? <div className="price">
                            {/*PAS DE FRAIS DE LIVRAISON*/}
                            {/* {(cart.delivery_tax() && false) || 0} */}
                            {/*FRAIS DE LIVRAISON*/}
                            {cart.delivery_tax()}
                        </div>: null }
                    </div>
                    <div className="cart-sub-total">
                        <div className="text">sous total (HT)</div>
                        <div className="price">
                            {cart.total_base()}
                        </div>
                    </div>
                    <div className="cart-tva">
                        <div className="text">tva</div>
                        <div className="price">
                            {cart.total_tva()}
                        </div>
                    </div>
                    <div className="cart-total">
                        <div className="text">total ttc</div>
                        <div className="price">
                            {cart.total_all_included()}
                        </div>
                    </div>
                </div>
            </div>
            {/* SECOND PART */}
            <div className={`cart-purchase-form custom-scrollbar moz-scrollbar${cart.cart_opened && formOpened ? ' opened' : ''}${otherAddressOpened ? ' other-opened' : ''}`}>
                <div className={`title transition${formOpened ? ' opened' : ''}`}>
                    <div
                        className="form-close"
                        onClick={(e) => {
                            e.preventDefault();
                            setOtherAddressOpened(false);
                            setFormOpened(false);
                        }}
                    >
                        <img
                            src={images.resolve_img('closeWhiteIcon')}
                            srcSet={images.resolve_img_set('closeWhiteIcon')}
                            alt="Close"
                        />
                    </div>
                    <span className={`${otherAddress ? 'click' : ''}`}>adresse de facturation</span>
                    <hr/>
                </div>
                <div
                    id="purchase-form"
                    className={`neumorphic ${otherAddress && (' other-address' || '')}`}
                >
                    <div id="step-1-part" className="unmorphic custom-scrollbar moz-scrollbar">
                        {
                            <div
                                id="add-address-zone"
                                className="neumorphic"
                                // TODO
                                onClick={function() {
                                    user.logged() ? user.addAddress() : user.login();
                                }}
                            >
                                {user.logged() ? 'Ajouter une adresse' : 'Se connecter'}
                            </div>
                        }
                        {user.hasAddresses() && !otherAddress && <div id="choose-address-zone" className="neumorphic"onClick={function() {user.logged() && user.shopUseAddress(document?.getElementById('step-1-part'));}}>Choisir une adresse</div>}
                        {user.hasAddresses() && otherAddress && <div id="choose-billing-address-zone" className="neumorphic"onClick={function() {user.logged() && user.shopUseAddress(document?.getElementById('step-1-part'));}}>Choisir une adresse de facturation</div>}
                        <input id="cust_address" style={{display: 'none'}}/>
                        <LastNameField classes="required form-field step-1" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                        <FirstNameField classes="required form-field step-1" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                        <TitleField classes="form-field step-1" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}}/>
                        <ClinicField classes="form-field step-1" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}}/>
                        <SocietyField classes="form-field step-1"/>
                        <AddressLine1Field classes="required form-field step-1" required={true}/>
                        <ZipField classes="required form-field step-1" required={true}/>
                        <CityField classes="required form-field step-1" required={true}/>
                        <CountryField classes="required form-field step-1" required={true}/>
                        {
                            cart.differentAddress == false && cart.getTVAIntra() == true && otherAddress == false && <IntraTVAField classes="required form-field step-1" required={true} value={intraTVA ?? null}/>
                        }
                        <MobilePhoneField classes="required form-field step-1" required={true}/>
                        <MailField classes="required form-field step-1" required={true}/>
                        {!otherAddress && <CustomField classes="required form-field step-1" required={false}/>}
                    </div>
                </div>
            </div>
            {/* THIRD PART */}
            <div id="step-3-part" className={`other-address neumorphic${(formOpened && otherAddress && otherAddressOpened) || (formOpened && otherAddress) ? " other-opened" : ''}`}>
                <div className={`title unmorphic${formOpened && otherAddressOpened ? ' opened' : ''}`}>
                    <div
                        className="form-close unmorphic"
                        onClick={(e) => {
                            e.preventDefault();
                            setOtherAddressOpened(false);
                            setOtherAddress(false);
                            cart.hasDifferentShipping(false);
                            let _temp:any = getById('facture');
                            if(_temp) { _temp.checked = false; }
                        }}
                    >
                        <img
                            src={images.resolve_img('closeWhiteIcon')}
                            srcSet={images.resolve_img_set('closeWhiteIcon')}
                            className="unmorphic"
                            alt="Close"
                        />
                    </div>
                    <span className={`unmorphic${otherAddressOpened ? ' click' : ''}`}>informations de livraison</span>
                    <hr className="unmorphic"/>
                </div>
                {otherAddress &&
                        <div className="form custom-scrollbar moz-scrollbar">
                        {
                            <div
                                id="add-address-zone"
                                className="neumorphic"
                                // TODO
                                onClick={function() {
                                    user.logged() ? user.addAddress() : user.login();
                                }}
                            >
                                {user.logged() ? 'Ajouter une adresse' : 'Se connecter'}
                            </div>
                        }
                        {user.hasAddresses() && <div id="choose-shipping-address-zone" className="neumorphic" onClick={function() {user.logged() && user.shopUseAddress(document?.getElementById('step-3-part'));}}>Choisir une adresse de livraison</div>}
                        <input id="ship_address" style={{display: 'none'}}/>
                        <DeliveryLastNameField classes="required form-field step-2" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                        <DeliveryFirstNameField classes="required form-field step-2" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                        <DeliveryTitleField classes="form-field step-2" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}}/>
                        <DeliveryClinicField classes="form-field step-2" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}}/>
                        <DeliverySocietyField classes="form-field step-2"/>
                        <DeliveryAddressLine1Field classes="required form-field step-2" required={true}/>
                        <DeliveryZipField classes="required form-field step-2" required={true}/>
                        <DeliveryCityField classes="required form-field step-2" required={true}/>
                        <DeliveryCountryField classes="required form-field step-2" required={true}/>
                        {
                            cart.differentAddress == true && cart.getTVAIntra() == true && otherAddress == true && <IntraTVAField classes="required form-field step-1" required={true} value={intraTVA ?? null}/>
                        }
                        <DeliveryPhoneField classes="required form-field step-2" required={true}/>
                        <DeliveryMailField classes="form-field step-2" required={false}/>
                        {otherAddress && <CustomField classes="form-field step-2" required={false}/>}
                    </div>
                }
            </div>
            {/* CHECKBOXES */}
            <div className="step-1 sepa soge neumorphic">
                <div className="choice"><input
                    id="sepa"
                    name="sepa"
                    value="sepa"
                    defaultChecked={false}
                    type="checkbox"
                    className="form-field"
                    onChange={(e) => {manageCheckboxPayment(e)}}
                /></div>
                <div className="choice-label"><label htmlFor="sepa">Virement</label></div>
                <div className="choice"><input
                    id="soge"
                    name="soge"
                    value="soge"
                    defaultChecked={true}
                    type="checkbox"
                    className="form-field"
                    onChange={(e) => {manageCheckboxPayment(e)}}
                /></div>
                <div className="choice-label"><label htmlFor="soge">Paiement par carte</label></div>
            </div>
            <div className="step-1 facture neumorphic">
                <input
                    id="facture"
                    name="facture"
                    value="facture"
                    type="checkbox"
                    className="form-field"
                    onChange={(e) => {
                        manageChange(e);
                    }}
                />
                <label htmlFor="facture">
                    Adresse de livraison différente
                </label>
            </div>
            <div className="step-1 cgu neumorphic">
                <input
                    id="terms"
                    name="terms"
                    value="terms"
                    type="checkbox"
                    className="form-field"
                    required
                />
                <label htmlFor="terms">
                    J'accepte les CGV
                </label>
            </div>
            {/* VALIDATE */}
            <button
                disabled={isSubmit == true ? true : false}
                type={!formOpened ? "button" : "submit"}
                id="big-submit"
                className={submitClasses()}
                onClick={(e) => {
                    if(!formOpened){
                        e.preventDefault();
                        setFormOpened(true);
                    }
                    else if(formOpened && otherAddress && !otherAddressOpened){
                        setOtherAddressOpened(true);
                    }
                    else {
                        return;
                    }
                }}
            >
                {buttonText()}
                {isSubmit === true ? <LoadingGIF customClass="payment"/> : null}
            </button>
        </form>
    );
};

interface CartPurchaseBig {

};

export default CartPurchaseBig;
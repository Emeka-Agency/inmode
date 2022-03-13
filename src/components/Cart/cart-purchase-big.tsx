import React from "react";
import { useCart } from "../contexts/cart-provider";
import { useImages } from '../contexts/images-provider';
import {
    AddressLine1Field,
    CityField,
    CountryField,
    DeliveryAddressLine1Field,
    DeliveryCityField,
    DeliveryCountryField,
    DeliveryFirstNameField,
    DeliveryLastNameField,
    DeliveryMailField,
    DeliveryPhoneField,
    DeliverySocietyField,
    DeliveryZipField,
    FirstNameField,
    IntraTVAField,
    LastNameField,
    MailField,
    MobilePhoneField,
    SocietyField,
    ZipField
} from "../PaymentFields";
import LoadingGIF from '../LoadingGIF';

import './big.css';
import { oneById } from "../../functions/selectors";
import { useWindowSize } from "../../functions/window-size";

const CartPurchaseBig = ({  }:CartPurchaseBig) => {

    const images = useImages();

    const cart = useCart();

    // console.log("total : " + cart.total());
    // console.log("Livraison : " + (cart.pay_delivery() ? 50 : 0));
    // console.log("TVA : " + cart.total_tva());
    // console.log("TTC : " + (cart.total() + (cart.pay_delivery() ? 50 : 0) + parseFloat(cart.total_tva())).toFixed(2));

    const size = useWindowSize();

    const [formOpened, setFormOpened] = React.useState(false);
    const [otherAddress, setOtherAddress] = React.useState(false);
    const [otherAddressOpened, setOtherAddressOpened] = React.useState(false);
    const [isSubmit, setIsSubmit]:[Boolean | null, React.Dispatch<any>] = React.useState(null);
    const [isCreated, setIsCreated]:[Boolean, React.Dispatch<Boolean>] = React.useState(new Boolean(false));

    const manageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        otherAddress && setOtherAddressOpened(false);
        !otherAddress && setOtherAddressOpened(true);
        setOtherAddress(e.currentTarget.checked);
        cart.hasDifferentShipping(e.currentTarget.checked);
    }

    const manageCheckboxPayment = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(document != undefined) {
            let current:HTMLInputElement = e.currentTarget;
            let other:any = oneById(current.id == 'sepa' ? 'soge' : 'sepa');
            other.checked = !current.checked;
            return true;
        }
        return false;
    }

    const sendForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let _temp:any = oneById('big-submit');
        if(_temp){ _temp.disabled= true; }
        let _sepa:HTMLInputElement | any = oneById('sepa');
        let fields = [...Array.from(document.forms.namedItem("purchase") || []).filter((field:any) => {return field.id.includes('vads_')})];
        setIsSubmit(true);
        document.getElementById('vads_amount').value = cart.total_all_included();
        setIsCreated(await cart.redirectPay(fields, _sepa == null ? false : _sepa.checked) === true ? true : false);
        _temp = oneById('big-submit');
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
                    let _sepa:any = oneById('sepa');
                    if(_sepa) {
                        _sepa.checked = _sepa.checked ? true : false;
                    }
                    let _soge:any = oneById('soge');
                    if(_soge) {
                        _soge.checked = _soge.checked ? true : false;
                    }
                    let _facture:any = oneById('facture');
                    if(_facture) {
                        _facture.checked = false;
                    }
                    let _terms:any = oneById('terms');
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

    React.useEffect(() => {

    }, [cart]);

    return (
        <form
            id="purchase"
            className={!cart.cart_opened ? "all-close" : !formOpened ? 'step-1' : 'step-2-3'}
            onSubmit={sendForm}
        >
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
                        src={images.getOne('closeWhiteIcon').publicURL}
                        srcSet={images.getOne('closeWhiteIcon').publicURL}
                        alt="Close"
                    />
                </div>
                <div className="cart-head">
                    <img
                        src={images.getOne('cartBasketIcon').publicURL}
                        srcSet={images.getOne('cartBasketIcon').publicURL}
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
                                    <img className="init" src={images.getOne('rmvInit').publicURL} alt="X"/>
                                    <img className="blue" src={images.getOne('rmvHover').publicURL} alt="X"/>
                                </div>
                                <div className="addon">
                                    {cart.articles[article.reference].picture && (<img
                                        src={cart.articles[article.reference].picture.localFile.childImageSharp.fluid.srcWebp}
                                        srcSet={cart.articles[article.reference].picture.localFile.childImageSharp.fluid.srcSetWebp}
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
                            src={images.getOne('closeWhiteIcon').publicURL}
                            srcSet={images.getOne('closeWhiteIcon').publicURL}
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
                        <LastNameField classes="required form-field step-1" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                        <FirstNameField classes="required form-field step-1" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                        <SocietyField classes="form-field step-1"/>
                        <AddressLine1Field classes="required form-field step-1" required={true}/>
                        <ZipField classes="required form-field step-1" required={true}/>
                        <CityField classes="required form-field step-1" required={true}/>
                        <CountryField classes="required form-field step-1" required={true}/>
                        {
                            cart.differentAddress == false && cart.getTVAIntra() == true && otherAddress == false && <IntraTVAField classes="required form-field step-1" required={true}/>
                        }
                        <MobilePhoneField classes="required form-field step-1" required={true}/>
                        <MailField classes="required form-field step-1" required={true}/>
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
                            let _temp:any = oneById('facture');
                            if(_temp) { _temp.checked = false; }
                        }}
                    >
                        <img
                            src={images.getOne('closeWhiteIcon').publicURL}
                            srcSet={images.getOne('closeWhiteIcon').publicURL}
                            className="unmorphic"
                            alt="Close"
                        />
                    </div>
                    <span className={`unmorphic${otherAddressOpened ? ' click' : ''}`}>informations de livraison</span>
                    <hr className="unmorphic"/>
                </div>
                {otherAddress &&
                    <div className="form custom-scrollbar moz-scrollbar">
                        <DeliveryLastNameField classes="required form-field step-2" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                        <DeliveryFirstNameField classes="required form-field step-2" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                        <DeliverySocietyField classes="form-field step-2"/>
                        <DeliveryAddressLine1Field classes="required form-field step-2" required={true}/>
                        <DeliveryZipField classes="required form-field step-2" required={true}/>
                        <DeliveryCityField classes="required form-field step-2" required={true}/>
                        <DeliveryCountryField classes="required form-field step-2" required={true}/>
                        {
                            cart.differentAddress == true && cart.getTVAIntra() == true && otherAddress == true && <IntraTVAField classes="required form-field step-1" required={true}/>
                        }
                        <DeliveryPhoneField classes="required form-field step-2" required={true}/>
                        <DeliveryMailField classes="form-field step-2" required={false}/>
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
import React from "react";
import { useCart } from "../contexts/cart-provider";
import { useImages } from '../contexts/images-provider';
import {
    AddressLine1Field,
    // AddressLine2Field,
    CityField,
    CountryField,
    DeliveryAddressLine1Field,
    // DeliveryAddressLine2Field,
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

import './mini.css';
import { oneById } from "../../functions/selectors";
import { useWindowSize } from "../../functions/window-size";
import { Link } from "gatsby";

const CartPurchaseMini = ({  }:CartPurchaseMini) => {

    const images = useImages();

    const cart = useCart();

    const size = useWindowSize();

    const [formOpened, setFormOpened] = React.useState(false);
    const [otherAddress, setOtherAddress] = React.useState(false);
    const [otherAddressOpened, setOtherAddressOpened] = React.useState(false);
    const [isSubmit, setIsSubmit]:[Boolean | null, React.Dispatch<any>] = React.useState(null);
    const [isCreated, setIsCreated]:[Boolean, React.Dispatch<Boolean>] = React.useState(new Boolean(false));

    const manageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        otherAddress && setOtherAddressOpened(false);
        setOtherAddress(e.currentTarget.checked);
        cart.hasDifferentShipping(e.currentTarget.checked);
    }

    // Tester mails
    // Ajouter logs de partout

    const manageCheckboxPayment = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(document != undefined) {
            let current:HTMLInputElement = e.currentTarget;
            let other:any = oneById(current.id == 'sepa' ? 'soge' : 'sepa');
            other.checked = !current.checked;
            return true;
        }
        return false;
    }

    const sendForm = async(e:React.FormEvent<HTMLFormElement>, same_address:boolean = true) => {
        e.preventDefault();
        return false;
        if(!isSubmit) {
            let _mini1:any = oneById('mini-submit-1');if(_mini1) _mini1.disabled = true;
            let _mini2:any = oneById('mini-submit-2');if(_mini2) _mini2.disabled = true;
            let _mini3:any = oneById('mini-submit-3');if(_mini3) _mini3.disabled = true;
            let _sepa:any = oneById('sepa');
            let fields:HTMLElement[] | any[] = []; 
            if(same_address) {
                let _form2 = document.forms.namedItem('step-2-part');
                fields = [...Array.from(_form2 ? _form2.elements : []).filter((e:HTMLElement | Element | any) => e.id.includes('vads_'))];
            }
            else {
                let _form2 = document.forms.namedItem('step-2-part');
                let _form3 = document.forms.namedItem('step-3-part');
                fields = [...fields, ...Array.from([...Array.from(_form2 ? _form2.elements : []), ...Array.from(_form3 ? _form3.elements : [])]).filter(e => e.id.includes('vads_'))];
            }
            setIsSubmit(true);
            setIsCreated(await cart.redirectPay(fields, _sepa == null ? false : _sepa.checked) === true ? true : false);
            if(_mini1) _mini1.disabled = false;
            if(_mini2) _mini2.disabled = false;
            if(_mini3) _mini3.disabled = false;
        }
    }

    const buttonText = ():string => {
        if(isSubmit === true && isCreated === true) {
            return "Order placed";
        }
        if(isSubmit === null && isCreated === false) {
            return "Order error";
        }
        if(isSubmit === true) {
            return "In progress ...";
        }
        if(!formOpened) {
            return "Purchase";
        }
        if(!otherAddress || otherAddressOpened) {
            return "Order";
        }
        return "Continue";
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
                if(typeof document !== "undefined") {
                    let _temp2 = document.forms.namedItem("step-2-part");
                    _temp2 && _temp2.reset();
                    let _temp3 = document.forms.namedItem("step-3-part");
                    _temp3 && _temp3.reset();
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

    return (
        <div
            id="purchase-mini"
            className={!cart.cart_opened ? "all-close" : !formOpened ? 'step-1' : 'step-2-3'}
        >
            <div className="stepper">
                <div id="step-1" className="step">
                    <div className="num">1</div>
                    <span className="label">Carte</span>
                </div>
                <div id="step-2" className={`step${otherAddress ? ' other-address' : ''}`}>
                    <div className="num">2</div>
                    <span className="label">Bill</span>
                </div>
                <div id="step-3" className={`step${otherAddress ? ' other-address' : ''}`}>
                    <div className="num">3</div>
                    <span className="label">Delivery</span>
                </div>
                <div className={`progress-bar${otherAddress ? ' other-address' : ''}${otherAddress && otherAddressOpened ? ' other-opened' : ''}`}></div>
            </div>
            {/* FIRST PART */}
            <div className={`cart-purchase transition${cart.cart_opened ? ' opened' : ''}`}>
                <div className="cart-close"
                    onClick={(e) => {
                        e.preventDefault();
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
                        alt="Cart"
                    />
                    <span>{`Cart, ${cart.cart.length} object${cart.cart.length > 1 ? 's' : ''}`}</span>
                </div>
                <div className={`cart-content custom-scrollbar${formOpened ? ' purchase' : ''}`}>
                    {cart.cart.map((article, key) => {
                        let _image = undefined;
                        if(Array.isArray(cart.articles[article.reference].pictures)) {
                            _image = cart.articles[article.reference].pictures[0];
                            if(_image.formats && _image.formats.thumbnail) {
                                _image = _image.formats.thumbnail;
                            }
                            else {
                                _image = _image.url || undefined;
                            }
                        }
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
                                    {_image == undefined ?
                                    <></>:typeof _image == "string" ?
                                    <img
                                        src={'https://inmodeuk-content.emeka.fr' + _image}
                                        alt={article.name}
                                    />:
                                    <img
                                        src={_image.localFile.childImageSharp.fluid.srcWebp}
                                        srcSet={_image.localFile.childImageSharp.fluid.srcSetWebp}
                                        alt={article.name}
                                    />}
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
                        <div className="text">subtotal (out of tax)</div>
                        <div className="price">
                            {cart.total_base()}
                        </div>
                    </div>
                    <div className="cart-tva">
                        <div className="text">vat</div>
                        <div className="price">
                            {cart.total_tva()}
                        </div>
                    </div>
                    <div className="cart-total">
                        <div className="text">all included</div>
                        <div className="price">
                            {cart.total_all_included()}
                        </div>
                    </div>
                </div>
            </div>
            {/* SECOND PART */}
            <form
                id="step-2-part"
                className={`cart-purchase-form custom-scrollbar${formOpened ? ' opened' : ''}${otherAddressOpened ? ' other-opened' : ''}`}
                onSubmit={(e) => {
                    e.preventDefault();
                    if(formOpened && otherAddress && !otherAddressOpened){
                        setOtherAddressOpened(true);
                    }
                    else if(formOpened && !otherAddress) {
                        sendForm(e);
                    }
                    else {
                        return false;
                    }
                }}
            >
                <div className={`title transition${formOpened ? ' opened' : ''}`}>
                    <div
                        className="form-close"
                        onClick={(e) => {
                            e.preventDefault();
                            setFormOpened(false);
                        }}
                    >
                        <img
                            src={images.getOne('closeWhiteIcon').publicURL}
                            srcSet={images.getOne('closeWhiteIcon').publicURL}
                            alt="Close"
                        />
                    </div>
                    <span className={`${otherAddress ? 'click' : ''}`}>billing address</span>
                    <hr/>
                </div>
                <div
                    id="purchase-form"
                    className={`neumorphic ${otherAddress && (' other-address' || '')}`}
                >
                    <div id="step-1-part" className="unmorphic custom-scrollbar">
                        <LastNameField classes="required form-field step-1" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                        <FirstNameField classes="required form-field step-1" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                        <SocietyField classes="form-field step-1" />
                        <AddressLine1Field classes="required form-field step-1" required={true}/>
                        <CountryField classes="required form-field step-1"/>
                        {
                            cart.differentAddress == false && cart.getTVAIntra() && otherAddress == false && <IntraTVAField classes="required form-field step-1" required={true}/>
                        }
                        <ZipField classes="required form-field step-1" required={true}/>
                        <CityField classes="required form-field step-1" required={true}/>
                        <MobilePhoneField classes="required form-field step-1" required={true}/>
                        <MailField classes="required form-field step-1" required={true}/>
                    </div>
                </div>
                {(formOpened && (!otherAddress || (otherAddress && !otherAddressOpened))) && <button
                    type="submit"
                    id="mini-submit-1"
                    className={`cart-validate unmorphic${formOpened && otherAddress && otherAddressOpened ? ' other-address-transition' : formOpened ? ' form-transition' : ''}`}
                >
                    {!formOpened ? "Acheter" : !otherAddress || otherAddressOpened ? "Commander" : "Continuer"}
                </button>}
            </form>
            {/* THIRD PART */}
            <form
                id="step-3-part"
                className={`other-address neumorphic${otherAddressOpened ? " other-opened" : ''}`}
                onSubmit={(e) => sendForm(e, false)}
            >
                <div className={`title unmorphic${otherAddressOpened ? ' opened' : ''}`}>
                    <div
                        className="form-close unmorphic"
                        onClick={(e) => {
                            e.preventDefault();
                            setOtherAddressOpened(false);
                        }}
                    >
                        <img
                            src={images.getOne('closeWhiteIcon').publicURL}
                            srcSet={images.getOne('closeWhiteIcon').publicURL}
                            className="unmorphic"
                            alt="Close"
                        />
                    </div>
                    <span className={`unmorphic${otherAddressOpened ? ' click' : ''}`}>delivery information</span>
                    <hr className="unmorphic"/>
                </div>
                <div className="form custom-scrollbar">
                    <DeliveryLastNameField classes="required form-field step-2" style={{width: '43%', margin: `10px 0 20px ${size.width <1200 ? '5%' : '20px'}`, display: 'inline-block'}} required={true}/>
                    <DeliveryFirstNameField classes="required form-field step-2" style={{width: '43%', margin: '10px 0 24px 4%', display: 'inline-block'}} required={true}/>
                    <DeliverySocietyField classes="form-field step-2" />
                    <DeliveryAddressLine1Field classes="required form-field step-2" required={true}/>
                    <DeliveryCountryField classes="required form-field step-2"/>
                    {
                        cart.differentAddress == true && cart.getTVAIntra() && otherAddress == true && <IntraTVAField classes="required form-field step-1" required={true}/>
                    }
                    <DeliveryZipField classes="required form-field step-2" required={true}/>
                    <DeliveryCityField classes="required form-field step-2" required={true}/>
                    <DeliveryPhoneField classes="required form-field step-2" required={true}/>
                    <DeliveryMailField classes="form-field step-2" required={false}/>
                </div>
                {(formOpened && otherAddress && otherAddressOpened) && <button
                    type="submit"
                    id="mini-submit-2"
                    form={formOpened ? otherAddressOpened ? "step-3-part" : "step-2-part" : ''}
                    className={`cart-validate unmorphic${formOpened && otherAddress && otherAddressOpened ? ' other-address-transition' : formOpened ? ' form-transition' : ''}`}
                >
                    {!formOpened ? "Acheter" : !otherAddress || otherAddressOpened ? "Commander" : "Continuer"}
                </button>}
            </form>
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
                <div className="choice-label sepa"><label htmlFor="sepa">Transfer</label></div>
                <div className="choice"><input
                    id="soge"
                    name="soge"
                    value="soge"
                    defaultChecked={true}
                    type="checkbox"
                    className="form-field"
                    onChange={(e) => {manageCheckboxPayment(e)}}
                /></div>
                <div className="choice-label soge"><label htmlFor="soge">Card payment</label></div>
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
                    Different delivery address
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
                    form={formOpened ? otherAddress ? "step-3-part" : "step-2-part" : ''}
                />
                <label htmlFor="terms">
                    I accept the <Link to="/legals" target="_blank">T&Cs</Link>
                </label>
            </div>
            {/* VALIDATE */}
            {!formOpened && <button
                disabled={isSubmit == true ? true : false}
                type="submit"
                id="mini-submit-3"
                form={formOpened ? otherAddressOpened ? "step-3-part" : "step-2-part" : ''}
                className={`cart-validate${formOpened && otherAddress && otherAddressOpened ? ' other-address-transition' : formOpened ? ' form-transition' : ''}`}
                onClick={(e) => {setFormOpened(true)}}
            >
                {buttonText()}
                {isSubmit == true ? <LoadingGIF customClass="payment"/> : null}
            </button>}
        </div>
    );
};

interface CartPurchaseMini {

};

export default CartPurchaseMini;
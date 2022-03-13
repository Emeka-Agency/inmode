import React, { CSSProperties } from "react";

import { useCart } from '../contexts/cart-provider';

// TODO Créer classes Input, Select, etc pour minifier le code des Field

// -----============================--------//
// -----        CHECKING FUNCS      --------//
// -----============================--------//

function isCountry(country:{label:string, code:string}):boolean {
    if(country.label == undefined || country.code == undefined) {
        return false;
    }
    if(typeof country.label != 'string' || typeof country.code != 'string') {
        return false;
    }
    return true;
}

// -----============================--------//
// -----        DEFAULT PARAMS      --------//
// -----============================--------//

const defaultCountries = [
    {label: 'France', code: 'FR'},
    {label: 'Belgique', code: 'BE'},
    {label: 'Luxembourg', code: 'LU'},
];

const defaultParams = {

    ///// USER

    CivilGender: {name: 'vads_cust_title', id: 'vads_cust_title', placeholder: 'Civilité'},
        FullName: {name: 'vads_', id: 'vads_', placeholder: 'Nom - Prénom'},
    FirstName: {name: 'vads_cust_first_name', id: 'vads_cust_first_name', placeholder: 'Prénom'},
    LastName: {name: 'vads_cust_last_name', id: 'vads_cust_last_name', placeholder: 'Nom'},
    Status: {name: 'vads_cust_status', id: 'vads_cust_status', placeholder: 'Statut'},
    Society: {name: 'vads_cust_legal_name', id: 'vads_cust_legal_name', placeholder: 'Société'},
        Address: {name: 'vads_', id: 'vads_', placeholder: 'Adresse'},
    AddressStreetNumber: {name: 'vads_cust_address_number', id: 'vads_cust_address_number', placeholder: 'Numéro de voie'},
    // AddressLine1: {name: 'vads_cust_address', id: 'vads_cust_address', placeholder: 'Adresse ligne 1'},
    AddressLine1: {name: 'vads_cust_address', id: 'vads_cust_address', placeholder: 'Adresse'},
    AddressLine2: {name: 'vads_cust_address2', id: 'vads_cust_address2', placeholder: 'Adresse ligne 2'},
    Zip: {name: 'vads_cust_zip', id: 'vads_cust_zip', placeholder: 'Code Postal'},
    City: {name: 'vads_cust_city', id: 'vads_cust_city', placeholder: 'Ville'},
    State: {name: 'vads_cust_state', id: 'vads_cust_state', placeholder: 'État/région'},
    Country: {name: 'vads_cust_country', id: 'vads_cust_country', placeholder: 'Pays', countries: defaultCountries},
    Intra_TVA: {name: 'intra_tva', id: 'intra_tva', placeholder: 'TVA intracommunautaire'},
        DeliveryAddress: {name: 'vads_ship', id: 'vads_ship', placeholder: 'Adresse'},
    DeliveryAddressStreetNumber: {name: 'vads_ship_to_street_number', id: 'vads_ship_to_street_number', placeholder: 'Numéro de voie'},
    // DeliveryAddressLine1: {name: 'vads_ship_to_street', id: 'vads_ship_to_street', placeholder: 'Adresse ligne 1'},
    DeliveryAddressLine1: {name: 'vads_ship_to_street', id: 'vads_ship_to_street', placeholder: 'Adresse'},
    DeliveryAddressLine2: {name: 'vads_ship_to_street2', id: 'vads_ship_to_street2', placeholder: 'Adresse ligne 2'},
    DeliveryZip: {name: 'vads_ship_to_zip', id: 'vads_ship_to_zip', placeholder: 'Code Postal'},
    DeliveryCity: {name: 'vads_ship_to_city', id: 'vads_ship_to_city', placeholder: 'Ville'},
    DeliveryState: {name: 'vads_ship_to_state', id: 'vads_ship_to_state', placeholder: 'État/région'},
    DeliveryCountry: {name: 'vads_ship_to_country', id: 'vads_ship_to_country', placeholder: 'Pays', countries: defaultCountries},
    DeliveryFirstName: {name: 'vads_ship_to_first_name', id: 'vads_ship_to_first_name', placeholder: 'Prénom'},
    DeliveryLastName: {name: 'vads_ship_to_last_name', id: 'vads_ship_to_last_name', placeholder: 'Nom'},
    DeliveryPhone: {name: 'vads_ship_to_phone_num', id: 'vads_ship_to_phone_num', placeholder: 'Téléphone'},
    DeliveryStatus: {name: 'vads_ship_to_status', id: 'vads_ship_to_status', placeholder: 'Statut'},
    DeliverySociety: {name: 'vads_ship_to_legal_name', id: 'vads_ship_to_legal_name', placeholder: 'Société'},
    DeliveryMail: {name: 'delivery_mail', id: 'delivery_mail', placeholder: 'Mail'},
        Phone: {name: 'vads_', id: 'vads_', placeholder: 'Téléphone'},
    MobilePhone: {name: 'vads_cust_cell_phone', id: 'vads_cust_cell_phone', placeholder: 'Téléphone'},
        FixePhone: {name: 'vads_', id: 'vads_', placeholder: 'Fixe'},
    Mail: {name: 'vads_cust_email', id: 'vads_cust_email', placeholder: 'Mail'},

    ///// CART

    NbProducts: {name: 'vads_nb_products', id: 'vads_nb_products'},
    ProductLabel: {name: 'vads_product_label', id: 'vads_product_label'},
    ProductAmount: {name: 'vads_product_amount', id: 'vads_product_amount'},
    ProductRef: {name: 'vads_product_ref', id: 'vads_product_ref'},
    ProductQty: {name: 'vads_product_qty', id: 'vads_product_qty'},

    ///// BACK

    BackSignature: {name: 'signature', id: 'signature'},
    BackActionMode: {name: 'vads_action_mode', id: 'vads_action_mode'},
    BackCtxMode: {name: 'vads_ctx_mode', id: 'vads_ctx_mode'},
    BackCurrency: {name: 'vads_currency', id: 'vads_currency'},
    BackPageAction: {name: 'vads_page_action', id: 'vads_page_action'},
    BackSiteId: {name: 'vads_site_id', id: 'vads_site_id'},
    BackTransDate: {name: 'vads_trans_date', id: 'vads_trans_date'},
    BackTransId: {name: 'vads_trans_id', id: 'vads_trans_id'},
    BackVersion: {name: 'vads_version', id: 'vads_version'},
    BackReference: {name: 'vads_order_id', id: 'vads_order_id'},
    BackPaymentConfig: {name: 'vads_payment_config', id: 'vads_payment_config'},
    BackAmount: {name: 'vads_amount', id: 'vads_amount'},
};

// -----============================--------//
// -----           IDENTITY         --------//
// -----============================--------//

export const CivilGenderField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <select
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            defaultValue={value || useCart().formSave[defaultParams.CivilGender.name] || ""}
            placeholder={placeholder || `${defaultParams.CivilGender.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.CivilGender.name}
            id={id || defaultParams.CivilGender.id}
            required={required ||false}
        >
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
        </select>
    );
};
export const FullNameField = ({ value, placeholder, name, id, required, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.FullName.name] || ""}
            placeholder={placeholder || `${defaultParams.FullName.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.FullName.name}
            id={id || defaultParams.FullName.id}
            required={required ||false}
        />
    );
};
export const FirstNameField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.FirstName.name] || ""}
            placeholder={placeholder || `${defaultParams.FirstName.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.FirstName.name}
            id={id || defaultParams.FirstName.id}
            required={required ||false}
        />
    );
};
export const LastNameField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.LastName.name] || ""}
            placeholder={placeholder || `${defaultParams.LastName.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.LastName.name}
            id={id || defaultParams.LastName.id}
            required={required ||false}
        />
    );
};
export const StatusField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            hidden
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.Status.name] || ""}
            placeholder={placeholder || `${defaultParams.Status.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Status.name}
            id={id || defaultParams.Status.id}
            required={required ||false}
            // "PRIVATE"
            // "COMPANY"
        />
    );
};

// -----============================--------//
// -----            SOCIETY         --------//
// -----============================--------//

export const SocietyField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.Society.name] || ""}
            placeholder={placeholder || `${defaultParams.Society.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Society.name}
            id={id || defaultParams.Society.id}
            required={required ||false}
        />
    );
};

// -----============================--------//
// -----           ADDRESS          --------//
// -----============================--------//

export const AddressField = ({ value, placeholder, name, id, required, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.Address.name] || ""}
            placeholder={placeholder || `${defaultParams.Address.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Address.name}
            id={id || defaultParams.Address.id}
            required={required ||false}
        />
    );
};
export const AddressStreetNumberField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="number"
            defaultValue={value || useCart().formSave[defaultParams.AddressStreetNumber.name] || ""}
            placeholder={placeholder || `${defaultParams.AddressStreetNumber.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.AddressStreetNumber.name}
            id={id || defaultParams.AddressStreetNumber.id}
            required={required ||false}
        />
    );
};
export const AddressLine1Field = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.AddressLine1.name] || ""}
            placeholder={placeholder || `${defaultParams.AddressLine1.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.AddressLine1.name}
            id={id || defaultParams.AddressLine1.id}
            required={required ||false}
        />
    );
};
export const AddressLine2Field = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.AddressLine2.name] || ""}
            placeholder={placeholder || `${defaultParams.AddressLine2.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.AddressLine2.name}
            id={id || defaultParams.AddressLine2.id}
            required={required ||false}
        />
    );
};
export const ZipField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="number"
            defaultValue={value || useCart().formSave[defaultParams.Zip.name] || ""}
            placeholder={placeholder || `${defaultParams.Zip.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Zip.name}
            id={id || defaultParams.Zip.id}
            required={required ||false}
        />
    );
};
export const CityField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.City.name] || ""}
            placeholder={placeholder || `${defaultParams.City.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.City.name}
            id={id || defaultParams.City.id}
            required={required ||false}
        />
    );
};
export const StateField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.State.name] || ""}
            placeholder={placeholder || `${defaultParams.State.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.State.name}
            id={id || defaultParams.State.id}
            required={required ||false}
        />
    );
};
export const IntraTVAField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.Intra_TVA.name] || ""}
            placeholder={placeholder || `${defaultParams.Intra_TVA.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Intra_TVA.name}
            id={id || defaultParams.Intra_TVA.id}
            required={required ||false}
        />
    );
}
// ISO 3166 alpha-2
export const CountryField = ({ value, placeholder, name, id, required, classes, style, countries }:CountryPayField_Interface) => {
    return (
        <select
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            defaultValue={value || useCart().formSave[defaultParams.Country.name] || "FR"}
            placeholder={placeholder || `${defaultParams.Country.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Country.name}
            id={id || defaultParams.Country.id}
            required={required ||false}
        >
            {
                countries != undefined && Array.isArray(countries) && countries.length > 0 ? countries.map((country, key) => {
                    if(!Array.isArray(country) && typeof country == 'object' && isCountry(country)) {
                        return <option key={key} value={country.code}>{country.label}</option>
                    }
                    return <></>;
                })
                :
                Array.isArray(defaultParams.Country.countries) && defaultParams.Country.countries.length > 0 ? defaultParams.Country.countries.map((country, key) => {
                    if(!Array.isArray(country) && typeof country == 'object' && isCountry(country)) {
                        return <option key={key} value={country.code}>{country.label}</option>
                    }
                    return <></>;
                })
                :
                <></>
            }
        </select>
    );
};

// -----============================--------//
// -----       DELIVERY ADDRESS     --------//
// -----============================--------//

export const DeliveryAddressField = ({ value, placeholder, name, id, required, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryAddress.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryAddress.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryAddress.name}
            id={id || defaultParams.DeliveryAddress.id}
            required={required ||false}
        />
    );
};
export const DeliveryAddressStreetNumberField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="number"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryAddressStreetNumber.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryAddressStreetNumber.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryAddressStreetNumber.name}
            id={id || defaultParams.DeliveryAddressStreetNumber.id}
            required={required ||false}
        />
    );
};
export const DeliveryAddressLine1Field = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryAddressLine1.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryAddressLine1.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryAddressLine1.name}
            id={id || defaultParams.DeliveryAddressLine1.id}
            required={required ||false}
        />
    );
};
export const DeliveryAddressLine2Field = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryAddressLine2.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryAddressLine2.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryAddressLine2.name}
            id={id || defaultParams.DeliveryAddressLine2.id}
            required={required ||false}
        />
    );
};
export const DeliveryZipField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="number"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryZip.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryZip.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryZip.name}
            id={id || defaultParams.DeliveryZip.id}
            required={required ||false}
        />
    );
};
export const DeliveryCityField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryCity.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryCity.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryCity.name}
            id={id || defaultParams.DeliveryCity.id}
            required={required ||false}
        />
    );
};
export const DeliveryStateField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryState.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryState.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryState.name}
            id={id || defaultParams.DeliveryState.id}
            required={required ||false}
        />
    );
};
// ISO 3166 alpha-2
export const DeliveryCountryField = ({ value, placeholder, name, id, required, classes, style, countries }:CountryPayField_Interface) => {
    return (
        <select
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            defaultValue={value || useCart().formSave[defaultParams.DeliveryCountry.name] || "FR"}
            placeholder={placeholder || `${defaultParams.DeliveryCountry.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryCountry.name}
            id={id || defaultParams.DeliveryCountry.id}
            required={required ||false}
        >
            {
                countries != undefined && Array.isArray(countries) && countries.length > 0 ? countries.map((country, key) => {
                    if(!Array.isArray(country) && typeof country == 'object' && isCountry(country)) {
                        return <option key={key} value={country.code}>{country.label}</option>
                    }
                    return <></>;
                })
                :
                Array.isArray(defaultParams.DeliveryCountry.countries) && defaultParams.DeliveryCountry.countries.length > 0 ? defaultParams.DeliveryCountry.countries.map((country, key) => {
                    if(!Array.isArray(country) && typeof country == 'object' && isCountry(country)) {
                        return <option key={key} value={country.code}>{country.label}</option>
                    }
                    return <></>;
                })
                :
                <></>
            }
        </select>
    );
};
export const DeliveryFirstNameField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryFirstName.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryFirstName.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryFirstName.name}
            id={id || defaultParams.DeliveryFirstName.id}
            required={required ||false}
        />
    );
};
export const DeliveryLastNameField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryLastName.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryLastName.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryLastName.name}
            id={id || defaultParams.DeliveryLastName.id}
            required={required ||false}
        />
    );
};
export const DeliveryStatusField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryStatus.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryStatus.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryStatus.name}
            id={id || defaultParams.DeliveryStatus.id}
            required={required ||false}
            // "PRIVATE"
            // "COMPANY"
        />
    );
};
export const DeliveryPhoneField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="tel"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryPhone.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryPhone.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryPhone.name}
            id={id || defaultParams.DeliveryPhone.id}
            required={required ||false}
        />
    );
};
export const DeliverySocietyField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliverySociety.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliverySociety.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliverySociety.name}
            id={id || defaultParams.DeliverySociety.id}
            required={required ||false}
        />
    );
};
export const DeliveryMailField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.DeliveryMail.name] || ""}
            placeholder={placeholder || `${defaultParams.DeliveryMail.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.DeliveryMail.name}
            id={id || defaultParams.DeliveryMail.id}
            required={required ||false}
        />
    );
};

// -----============================--------//
// -----           CONTACT          --------//
// -----============================--------//

export const PhoneField = ({ value, placeholder, name, id, required, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            style={style || undefined}
            type="tel"
            defaultValue={value || useCart().formSave[defaultParams.Phone.name] || ""}
            placeholder={placeholder || `${defaultParams.Phone.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Phone.name}
            id={id || defaultParams.Phone.id}
            required={required ||false}
        />
    );
};
export const MobilePhoneField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="tel"
            defaultValue={value || useCart().formSave[defaultParams.MobilePhone.name] || ""}
            placeholder={placeholder || `${defaultParams.MobilePhone.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.MobilePhone.name}
            id={id || defaultParams.MobilePhone.id}
            required={required ||false}
        />
    );
};
export const FixePhoneField = ({ value, placeholder, name, id, required, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            style={style || undefined}
            type="tel"
            defaultValue={value || useCart().formSave[defaultParams.FixePhone.name] || ""}
            placeholder={placeholder || `${defaultParams.FixePhone.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.FixePhone.name}
            id={id || defaultParams.FixePhone.id}
            required={required ||false}
        />
    );
};
export const MailField = ({ value, placeholder, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            onChange={useCart().updateForm}
            className={classes ||''}
            style={style || undefined}
            type="email"
            defaultValue={value || useCart().formSave[defaultParams.Mail.name] || ""}
            placeholder={placeholder || `${defaultParams.Mail.placeholder}${required ? '*' :''}`}
            name={name || defaultParams.Mail.name}
            id={id || defaultParams.Mail.id}
            required={required ||false}
        />
    );
};

// -----============================--------//
// -----             CART           --------//
// -----============================--------//

export const NbProductsField = ({ value, name, id, required, classes, style }:PayField_Interface) => {
    return (
        <input
            className={classes ||''}
            style={style || undefined}
            hidden
            type="number"
            defaultValue={value || useCart().formSave[defaultParams.NbProducts.name] || 0}
            name={name || defaultParams.NbProducts.name}
            id={id || defaultParams.NbProducts.id}
            required={required || false}
        />
    )
};
export const ProductLabelField = ({ value, name, id, index, required, classes, style }:PayField_Interface) => {
    return (
        <input
            className={classes ||''}
            style={style || undefined}
            hidden
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.ProductLabel.name] || ""}
            name={name || `${defaultParams.ProductLabel.name}${index}`}
            id={id || `${defaultParams.ProductLabel.id}${index}`}
            required={required || false}
        />
    )
};
export const ProductAmountField = ({ value, name, id, index, required, classes, style }:PayField_Interface) => {
    return (
        <input
            className={classes ||''}
            style={style || undefined}
            hidden
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.ProductAmount.name] || ""}
            name={name || `${defaultParams.ProductAmount.name}${index}`}
            id={id || `${defaultParams.ProductAmount.id}${index}`}
            required={required || false}
        />
    )
};
export const ProductRefField = ({ value, name, id, index, required, classes, style }:PayField_Interface) => {
    return (
        <input
            className={classes ||''}
            style={style || undefined}
            hidden
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.ProductRef.name] || ""}
            name={name || `${defaultParams.ProductRef.name}${index}`}
            id={id || `${defaultParams.ProductRef.id}${index}`}
            required={required || false}
        />
    )
};
export const ProductQtyField = ({ value, name, id, index, required, classes, style }:PayField_Interface) => {
    return (
        <input
            className={classes ||''}
            style={style || undefined}
            hidden
            type="text"
            defaultValue={value || useCart().formSave[defaultParams.ProductQty.name] || ""}
            name={name || `${defaultParams.ProductQty.name}${index}`}
            id={id || `${defaultParams.ProductQty.id}${index}`}
            required={required || false}
        />
    )
};

// -----============================--------//
// -----             BACK           --------//
// -----============================--------//

export const BackSignatureField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackSignature.name] || ""}
            name={name || defaultParams.BackSignature.name}
            id={id ||defaultParams.BackSignature.id}
        />
    );
};
export const BackActionModeField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackActionMode.name] || ""}
            name={name || defaultParams.BackActionMode.name}
            id={id ||defaultParams.BackActionMode.id}
        />
    );
};
export const BackCtxModeField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackCtxMode.name] || ""}
            name={name || defaultParams.BackCtxMode.name}
            id={id ||defaultParams.BackCtxMode.id}
        />
    );
};
export const BackCurrencyField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackCurrency.name] || ""}
            name={name || defaultParams.BackCurrency.name}
            id={id ||defaultParams.BackCurrency.id}
        />
    );
};
export const BackPageActionField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackPageAction.name] || ""}
            name={name || defaultParams.BackPageAction.name}
            id={id ||defaultParams.BackPageAction.id}
        />
    );
};
export const BackSiteIdField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackSiteId.name] || ""}
            name={name || defaultParams.BackSiteId.name}
            id={id ||defaultParams.BackSiteId.id}
        />
    );
};
export const BackTransDateField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackTransDate.name] || ""}
            name={name || defaultParams.BackTransDate.name}
            id={id ||defaultParams.BackTransDate.id}
        />
    );
};
export const BackTransIdField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackTransId.name] || ""}
            name={name || defaultParams.BackTransId.name}
            id={id ||defaultParams.BackTransId.id}
        />
    );
};
export const BackVersionField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackVersion.name] || ""}
            name={name || defaultParams.BackVersion.name}
            id={id ||defaultParams.BackVersion.id}
        />
    );
};
export const BackReferenceField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackReference.name] || ""}
            name={name || defaultParams.BackReference.name}
            id={id ||defaultParams.BackReference.id}
        />
    );
};
export const BackPaymentConfigField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={value || useCart().formSave[defaultParams.BackPaymentConfig.name] || "SINGLE"}
            name={name || defaultParams.BackPaymentConfig.name}
            id={name || defaultParams.BackPaymentConfig.id}
        />
    )
}
export const BackAmountField = ({ value, name, id }:PayField_Interface) => {
    return (
        <input
            hidden
            defaultValue={Math.floor(value * 100) || 0}
            name={name || defaultParams.BackAmount.name}
            id={name || defaultParams.BackAmount.id}
        />
    )
}

interface PayField_Interface {
    value?: any,
    placeholder?: string,
    name?:string,
    id?: any,
    index?: string | number, 
    required?: boolean,
    classes?:string,
    style?: CSSProperties,
};

interface CountryPayField_Interface extends PayField_Interface {
    countries?: {label:string, code:string}[];
};
import React from 'react';
import { useImages } from '../../contexts/images-provider';
import { useUser } from '../../contexts/user-provider';
import { Address_Interface } from '../../interfaces';
import LoadingGIF from '../../LoadingGIF';
import { keyboardUsed } from '../../../functions/tools';

import './address.css';

const AddressesTab = ({}:AddressesTab) => {

    const user = useUser();
    const images = useImages();
    
    const fields = {
        "Libellé": "label",
        "Adresse 1": "address_1",
        "Adresse 2": "address_2",
        "Code Postal": "zip",
        "Ville": "city",
        "Pays": "country",
        "Nom": "nom",
        "Prénom": "prenom",
        "Société": "society",
        "Email": "email",
        "Téléphone": "phone",
    };

    const toggleShow = function(_target:EventTarget|null = null, _field = null, _address:Address_Interface|null = null) {
        if(_target instanceof HTMLInputElement) {return false;}
        if(typeof _field != "string") {return false;}
        if(_address == null) {return false;}
        let _elem = document?.querySelector(`.address-field[data-field="${_field}"][data-for="address-${_address.address}"]`);
        // console.log(_elem);
        if(_elem instanceof Element && _elem.classList.contains('edit') && _field) {
            _elem.classList.replace('edit', 'show');
            _elem?.querySelector('input')?.style.removeProperty('border-bottom-color');
            return true;
        }
        if(_elem != null && _elem instanceof Element && _elem.classList.contains('show')) {
            _elem.classList.remove('show');
            _elem.classList.add('edit');
            let _dynamic = _elem.querySelector('input');
            if(_dynamic instanceof Element) {
                _dynamic?.focus();
                _dynamic.value = _address[_field] || '';
                !_dynamic.classList.contains('listened') && _dynamic.addEventListener('keyup', function(e) {
                    _dynamic?.classList.add('listened');
                    if(keyboardUsed('Enter', e) && _elem?.querySelector('.address-field-value')?.innerText != _dynamic?.value) {
                        _dynamic?.style.setProperty('display', 'none');
                        _elem?.querySelector(`#loading-${_field}`)?.style.setProperty('display', 'inline-block');
                        _elem.querySelector('.address-field-change-result').innerText = "";
                        user.updateAddress({..._address, [_field]: _dynamic?.value, retriever: _address.address}, _target);
                    }
                    else if(keyboardUsed('Enter', e) || keyboardUsed('Escape', e)) {
                        _elem.classList.remove('edit');
                        _elem.classList.add('show');
                    }
                });
            }
            return true;
        }
        return true;
    };

    const addAddress = function(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(e.currentTarget);
        user.addAddress();
    };

    React.useEffect(() => {

    }, [user]);

    return (
        <div id="addresses-section">
            {user.get('addresses')?.map(function(address:Address_Interface, index:number) {
                // console.log(address);
                return (
                    <div id={`address-${address.address}`} data-crit={address.address} className="address-section" key={index}>
                        <div className="address-name">{address.label || `Adresse ${index + 1}`}</div>
                        <div className="address-delete switcher" data-crit={address.address} onClick={(e) => user.removeAddress(address.address, document?.getElementById(`address-${address.address}`))}>
                            <img className="init" src={images.getOne('whiteTrash')?.publicURL} title="Supprimer l'adresse"/>
                            <img className="red" src={images.getOne('redTrash')?.publicURL} title="Supprimer l'adresse"/>
                        </div>
                        <div className="address-content">
                            {Object.keys(fields).map((field:string, key:number) => {
                                return (
                                    <div data-for={`address-${address.address}`} className={`address-field ${fields[field] == "country" ? "edit" : "show"}`} key={key} data-field={fields[field]} onClick={(e) => {fields[field] != "country" && toggleShow(e.currentTarget, fields[field], address);}}>
                                        <span className="address-field-label">{field}</span>
                                        {
                                            fields[field] != 'country' &&
                                            <div className="address-field-value">{address[fields[field]]}</div>
                                        }
                                        {fields[field] == "country" ?
                                            <select
                                                onChange={(e) => {
                                                    document.querySelector(`div[data-field="country"][data-for="address-${address.address}"] .address-field-change-result`).innerText = "";
                                                    user.updateAddress(
                                                        {...address, country: user.getCountry(e.currentTarget.value), retriever: address.address},
                                                        document?.querySelector(`div[data-field="country"][data-for="address-${address.address}"]`)
                                                    );
                                                }}
                                                defaultValue={user.getCountry(address.country)}
                                                className="address-field-change"
                                            >
                                                <option value="FR">France</option>
                                                <option value="BE">Belgique</option>
                                                <option value="LU">Luxembourg</option>
                                            </select>
                                            :
                                            <input className="address-field-change"/>
                                        }
                                        <div className="address-field-edit">
                                            <img className={`${fields[field] == "country" ? "edit " : ""}init`} src={images.getOne('whiteEditIcon')?.publicURL}/>
                                            <img className={`${fields[field] == "country" ? "edit " : ""}blue`} src={images.getOne('blueEditIcon')?.publicURL}/>
                                        </div>
                                        <LoadingGIF customId={`loading-${fields[field]}`} customClass="mini" customStyle={{'display': 'none', 'verticalAlign': 'middle', 'margin': '0', 'left': '15px', 'width': '22px', 'height': '22px'}}/>
                                        <span className="address-field-change-result"></span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div id="address-add" onClick={(e) => addAddress(e)}>
                <span>Ajouter une adresse</span>
                <span>+</span>
            </div>
        </div>
    );
};

interface AddressesTab {

};

export default AddressesTab;

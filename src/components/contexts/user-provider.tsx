import React, { useContext } from 'react';

import UserContext from "./user-context";
import {
    AddAddressParams,
    Address_Interface,
    FindAddressParams,
    RemoveAddressParams,
    UpdateAddressParams,
    UserContext_Interface,
    UserSigninParams,
    UserUpdateParams,
    User_Interface,
} from '../interfaces';
import { resolveEntityPath } from '../../functions/tools';
import { getById, selectAll } from '../../functions/selectors';
import _fetch from '../../functions/fetch';
import { openModale, loginModale, signinModale, closeModale, createAddressModale, selectAddressModale } from '../../functions/modale';
import { useCart } from './cart-provider';

export const useUser = ():UserContext_Interface => {
    return useContext(UserContext);
}

const lcst_inu = 'inu';

const UserProvider = ({ requested = "", children }:{ requested?:string, children:any }) => {

    // UTILISATEUR

    const __getUser = function():User_Interface|null {return JSON.parse(typeof window != "undefined" ? window?.localStorage.getItem(lcst_inu) ?? "null" : "null");}
    const __setUser = function(_datas:User_Interface|null = null) {
        window?.localStorage.setItem(lcst_inu, (_datas == null ? "null" : JSON.stringify(_datas)));
        setUser(_datas);
    }
    const __getCountry = function(_retriever:string|null = null) {
        if(_retriever == null) {return 'FR';}
        switch(_retriever) {
            case 'FR': return 'France';
            case 'BE': return 'Belgique';
            case 'LU': return 'Luxembourg';
            case 'FRDT': return 'DOM/TOM';
            case 'France': return 'FR';
            case 'Belgique': return 'BE';
            case 'Luxembourg': return 'LU';
            case 'DOM/TOM': return 'FRDT';
            default: return 'FR';
        }
    }
    const __logged = function() {return __getUser() != null && __getUser() instanceof Object;}
    const __logout = function() {__setUser(null);}
    const __get = function(_crit:string|null = null):any {
        if(_crit == null || typeof _crit != "string") {return null;}
        return resolveEntityPath(__getUser(), _crit);
    }

    const [user, setUser]:[User_Interface|null, React.Dispatch<User_Interface|null>] = React.useState(__getUser());

    const modaleSetSaving = function(_saving = true) {
        if(_saving == true) {
            document?.querySelector('#modale button')?.classList.add('saving', 'hidden');
            document?.querySelector('#modale button')?.classList.replace('visible', 'hidden');
            document?.querySelector('#modale .loading-gif')?.classList.replace('hidden', 'visible');
        }
        else {
            document?.querySelector('#modale button')?.classList.remove('saving');
            document?.querySelector('#modale .loading-gif')?.classList.replace('visible', 'hidden');
            document?.querySelector('#modale button')?.classList.replace('hidden', 'visible');
        }
    }

    const modaleSetSubmit = function(_message:string|null = null) {
        if(typeof _message != "string") {return false;}
        let _span = document.querySelector('#modale #submit_section span');
        if(_span instanceof Element) {
            _span?.classList.add('error');
            _span.innerText = _message;
            return true;
        }
        return false;
    }

    const __login = function() {
        openModale(loginModale({
            onOpen: function() {
                let _save = document?.querySelector('#modale.login-modale #submit_login');
                if(!(_save instanceof Element)) {return false;}
                let _form = document?.querySelector('#modale.login-modale form#login_form');
                if(!(_form instanceof Element)) {return false;}
                let _signin = document?.querySelector('#modale.login-modale #signin_action');
                if(!(_signin instanceof Element)) {return false;}
                document?.querySelector('#modale.login-modale input')?.focus();
                _signin.addEventListener('click', function(e:Event) {
                    __signin();
                });
                _save.addEventListener('click', function(e:Event) {
                    if(_save?.classList.contains('saving') || _form.checkValidity() == false) {
                        return false;
                    }
                    modaleSetSaving(true);
                    __fetch_login(e, _form);
                }, {capture: true});
                _form.addEventListener('submit', function(e:Event) {
                    if(_save?.classList.contains('saving')) {
                        return false;
                    }
                    modaleSetSaving(true);
                    __fetch_login(e, _form);
                }, {capture: true});
            }
        }));
    };

    const __fetch_login = function(e:Event, form:HTMLFormElement|Element|null = null) {
        e.preventDefault();
        let _user_input = document?.querySelector('#modale #user_input');
        let _pass_input = document?.querySelector('#modale #pass_input');
        if(!(_user_input instanceof Element) || !(_pass_input instanceof Element)) {
            return false;
        }
        let _datas = {
            "email": _user_input.value,
            "password": _pass_input.value,
        }
        _fetch(
            `${process.env.INMODE_BACK}/api/user/login`,
            "POST",
            _datas ?? {},
            function(_el:Element|null = null, _res:any) {
                console.log(_res);
                modaleSetSaving(false);
                if(typeof _res.message == "string") {
                    modaleSetSubmit(_res.message);
                }
                if(_res.datas instanceof Object) {
                    __setUser({..._res.datas, user: _res.user});
                    window?.localStorage.setItem(lcst_inu, JSON.stringify({..._res.datas, user: _res.user}));
                    closeModale();
                }
            },
            function(_el:Element|null = null, _err:any) {
                console.log(_err);
            },
        );
    };

    const __signin = function(_datas:UserSigninParams|string|null = null) {
        openModale(signinModale({
            onOpen: function() {
                let _save = document?.querySelector('#modale.signin-modale #submit_signin');
                if(!(_save instanceof Element)) {return false;}
                let _form = document?.querySelector('#modale.signin-modale form#signin_form');
                if(!(_form instanceof Element)) {return false;}
                let _login = document?.querySelector('#modale.signin-modale #login_action');
                if(!(_login instanceof Element)) {return false;}
                document?.querySelector('#modale.signin-modale input')?.focus();
                _login.addEventListener('click', function(e:Event) {
                    __login();
                });
                _save.addEventListener('click', function(e:Event) {
                    if(_save?.classList.contains('saving') || _form.checkValidity() == false) {
                        return false;
                    }
                    modaleSetSaving(true);
                    __fetch_signin(e, _form);
                }, {capture: true});
                _form.addEventListener('submit', function(e:Event) {
                    if(_save?.classList.contains('saving') || _form.checkValidity() == false) {
                        return false;
                    }
                    modaleSetSaving(true);
                    __fetch_signin(e, _form);
                }, {capture: true});
            }
        }));
    };
    
    const __fetch_signin = function(e:Event, form:HTMLFormElement|Element|null = null) {
        e.preventDefault();
        let _user_input:HTMLInputElement|null = document?.querySelector('#modale #user_input');
        let _pass_input:HTMLInputElement|null = document?.querySelector('#modale #pass_input');
        if(!(_user_input instanceof Element) || !(_pass_input instanceof Element)) {
            return false;
        }
        let _datas = {
            "email": _user_input?.value,
            "password": _pass_input?.value,
        }
        _fetch(
            `${process.env.INMODE_BACK}/api/user/signin`,
            "POST",
            {action: 'create', values: _datas} ?? {},
            function(_el:Element|null = null, _res:any) {
                console.log(_res);
                modaleSetSaving(false);
                if(typeof _res.message == "string") {
                    modaleSetSubmit(_res.message);
                }
                else if(_res.status == "success" && _res.saved instanceof Object) {
                    __setUser({..._res?.saved, user: _res?.user});
                    closeModale();
                }
                modaleSetSaving(false);
            },
            function(_el:Element|null = null, _err:any) {
                console.log(_err);
                if(typeof _err.message == "string") {
                    modaleSetSubmit(_err.message);
                }
                modaleSetSaving(false);
            },
        );
    };
    
    const __update = function(_elem:Element|null = null, _datas:Object|null = null) {
        _fetch(
            `${process.env.INMODE_BACK}/api/user/update`,
            "POST",
            {..._datas ?? {}, user: __get('user')},
            function(_el:Element|null = null, _res:any) {
                // console.log(_el);
                // console.log(_res);
                if(_el instanceof Element) {
                    _el.querySelector('.loading-gif')?.style.setProperty('display', 'none');
                    _el.querySelector('input')?.style.removeProperty('display');
                    _el.querySelector('input')?.style.setProperty('border-bottom-color', _res.status == "success" ? "green" : "red");
                    _el.querySelector('.profile-field-change-result')?.style.setProperty('color', _res.status == "success" ? "green" : "red");
                    _el.querySelector('.profile-field-change-result').innerText = _res.status == "success" ? "Valeur mise à jour" : "Erreur de sauvegarde";
                    _el.querySelector('input')?.style.removeProperty('border-bottom-color');
                    _el.classList.remove('edit');
                    _el.classList.add('show');
                }
                __setUser({..._res.saved, user: _res.user});
            },
            function(_el:Element|null = null, _err:any) {
                // console.log(_el);
                // console.log(_err);
                if(_el instanceof Element) {
                    _el.querySelector('.loading-gif')?.style.setProperty('display', 'none');
                    _el.querySelector('input')?.style.removeProperty('display');
                    _el.querySelector('input')?.style.setProperty('border-bottom-color', _err.status == "success" ? "green" : "red");
                    _el.querySelector('.profile-field-change-result')?.style.setProperty('color', _err.status == "success" ? "green" : "red");
                    _el.querySelector('.profile-field-change-result').innerText = _err.status == "success" ? "Valeur mise à jour" : "Erreur de sauvegarde";
                    _el.querySelector('input')?.style.removeProperty('border-bottom-color');
                    _el.classList.remove('edit');
                    _el.classList.add('show');
                }
            },
            _elem
        );
    };

    // ADRESSES

    const __has_addresses = function() {
        return __get('addresses')?.length > 0;
    };

    // TODO - Permet de retrouver une adresse en recherche 
    const __find_address = function(datas:FindAddressParams) {
        let retour = null;

        if(datas.address) {
            retour = (__get('addresses').filter((el:Address_Interface) => el.address == datas.address) || [null])[0];
        }

        return retour;
    };

    const __update_address = function(_datas:UpdateAddressParams|null = null, _elem:Element|null = null) {
        if(!(_datas instanceof Object)) {return false;}
        __address_manage({datas: {..._datas, user: __get('crit')}}, 'update', _elem);
    };

    const __add_address = function() {
        openModale(
            createAddressModale({
                onOpen: function() {
                    let modale = document?.getElementById('create-address');
                    if(modale instanceof Element) {
                        let _label:HTMLInputElement|null = modale.querySelector('#address_label_input');
                        let _clinic:HTMLInputElement|null = modale.querySelector('#address_clinic_input');
                        let _address_1:HTMLInputElement|null = modale.querySelector('#address_address_1_input');
                        let _address_2:HTMLInputElement|null = modale.querySelector('#address_address_2_input');
                        let _zip:HTMLInputElement|null = modale.querySelector('#address_zip_input');
                        let _city:HTMLInputElement|null = modale.querySelector('#address_city_input');
                        let _country:HTMLInputElement|null = modale.querySelector('#address_country_input');
                        let _form:HTMLInputElement|null = modale.querySelector('#create-address-form');
                        let _submit:HTMLInputElement|null = modale.querySelector('button[type="submit"]');
                        // S'il manque des input pour des champs obligatoires
                        if([_label, _clinic, _address_1, _zip, _city, _country, _form, _submit].indexOf(null) > -1) {
                            console.log('test');
                            closeModale();
                            return false;
                        }
                        _address_1?.focus();

                        _submit?.addEventListener('click', function(e:Event) {
                            e.preventDefault();
                            __address_manage(
                                {
                                    "datas": {
                                        "user": __get('user'),
                                        "label": _label?.value,
                                        "clinic": _clinic?.value,
                                        "address_1": _address_1?.value || "NaN",
                                        "address_2": _address_2?.value,
                                        "zip": _zip?.value || "NaN",
                                        "city": _city?.value || "NaN",
                                        "country": _country?.value || "NaN",
                                    }
                                },
                                'create'
                            );
                        });
                        _form?.addEventListener('submit', function(e:Event) {
                            e.preventDefault();
                            __address_manage(
                                {
                                    "datas": {
                                        "user": __get('user'),
                                        "label": _label?.value,
                                        "clinic": _clinic?.value,
                                        "address_1": _address_1?.value || "NaN",
                                        "address_2": _address_2?.value,
                                        "zip": _zip?.value || "NaN",
                                        "city": _city?.value || "NaN",
                                        "country": _country?.value || "NaN",
                                    }
                                },
                                'create'
                            );
                        });
                    }
                    return false;
                },
                onClose: function() {

                },
            })
        );
        return false;
    };

    const __remove_address = function(_datas:string|undefined, _elem:Element|null = null) {
        if(typeof _datas != "string") {return false;}
        __address_manage({datas: {retriever: _datas}}, 'delete', _elem);
    };

    const __address_manage = function(_datas:{datas:Address_Interface|any}, _action:string, _elem:Element|null = null) {
        modaleSetSaving(true);
        // console.log(_datas);
        // console.log(_action);
        // console.log(_elem);
        // return false;
        _fetch(
            `${process.env.INMODE_BACK}/api/address/${_action}`,
            "POST",
            _datas || {},
            function(_el:Element, _res:any) {
                modaleSetSaving(false);
                if(_res.status == 'success') {closeModale();}
                if(_action == 'create') {__manage_add_address(_el, _res);}
                if(_action == 'update') {__manage_update_address(_el, _res);}
                if(_action == 'delete') {__manage_remove_address(_el, _res);}
            },
            function(_el:Element, _err:any) {
                modaleSetSaving(false);
                if(_err.status == 'success') {closeModale();}
                if(_action == 'create') {__manage_add_address(_el, _err);}
                if(_action == 'update') {__manage_update_address(_el, _err);}
                if(_action == 'delete') {__manage_remove_address(_el, _err);}
            },
            _elem
        )
    };

    const __manage_update_address = function(_el:Element|null = null, _res:any) {
        // console.log(_el);
        // console.log(_res);
        if(!(_el instanceof Element) && typeof _res?.saved?.address == "string") {
            _el = document?.getElementById(`address-${_res?.saved?.address}`);
        }
        if(_res.status == 'success' && _el instanceof Element && user != null) {
            __setUser({...user, addresses: user.addresses.map((address:Address_Interface):Address_Interface => {
                return address.address == _res.saved.address ? _res.saved : address;
            })});
            _el.querySelector('.loading-gif')?.style.setProperty('display', 'none');
            _el.querySelector('input')?.style.removeProperty('display');
            _el.querySelector('input')?.style.setProperty('border-bottom-color', _res.status == "success" ? "green" : "red");
            _el.querySelector('.address-field-change-result')?.style.setProperty('color', _res.status == "success" ? "green" : "red");
            _el.querySelector('.address-field-change-result').innerText = _res.status == "success" ? "Valeur mise à jour" : "Erreur de sauvegarde";
            _el.querySelector('input')?.style.removeProperty('border-bottom-color');
            if(_el.getAttribute('data-field') != "country") {
                _el.classList.remove('edit');_el.classList.add('show');
            }
            return true;
        }
        if(_res.status == 'error' && _el instanceof Element) {
            _el.querySelector('.loading-gif')?.style.setProperty('display', 'none');
            _el.querySelector('input')?.style.removeProperty('display');
            _el.querySelector('input')?.style.setProperty('border-bottom-color', _err.status == "success" ? "green" : "red");
            _el.querySelector('.address-field-change-result')?.style.setProperty('color', _err.status == "success" ? "green" : "red");
            _el.querySelector('.address-field-change-result').innerText = _err.status == "success" ? "Valeur mise à jour" : "Erreur de sauvegarde";
            _el.querySelector('input')?.style.removeProperty('border-bottom-color');
            if(_el.getAttribute('data-field') != "country") {
                _el.classList.remove('edit');_el.classList.add('show');
            }
            return true;
        }
        return false;
    };
    
    const __manage_add_address = function(_el:Element|null = null, _res:any) {
        // console.log(_el);
        // console.log(_res);
        if(!(_el instanceof Element) && typeof _res?.saved?.address == "string") {
            _el = document?.getElementById(`address-${_res?.saved?.address}`);
        }
        if(_res.status == 'success' && user instanceof Object && _res.saved instanceof Object) {
            __setUser({...user, addresses: [...user?.addresses || [], _res?.saved]});
            return true;
        }
        if(_res.status == 'error' && _el instanceof Element) {
            return true;
        }
        return false;
    };
    
    const __manage_remove_address = function(_el:Element|null = null, _res:any) {
        // console.log(_el);
        // console.log(_res);
        if(!(_el instanceof Element) && typeof _res?.saved?.address == "string") {
            _el = document?.getElementById(`address-${_res?.saved?.address}`);
        }
        if(_res.status == 'success' && user instanceof Object) {
            // _el?.remove();
            __setUser({...user, addresses: user?.addresses?.map(address => address.address != _el?.getAttribute('data-crit') ? address : null).filter(el => el)});
            return true;
        }
        if(_res.status == 'error' && _el instanceof Element) {
            return true;
        }
        return false;
    };

    const __shop_use_address = function(_elem:Element|null = null) {
        openModale(
            selectAddressModale({
                onOpen: () => {
                    selectAll('#modale .address-select', true).forEach(function(elem:Element) {
                        elem.addEventListener('click', function(e:any) {
                            __fill_address(_elem, __find_address({address: e?.currentTarget?.getAttribute('data-address')}));
                            closeModale();
                        });
                    });
                },
                onClose: () => {

                },
                addresses: __get('addresses')
            })
        );
    };

    const __fill_address = function(_elem:Element|null = null, _address:Address_Interface|null = null) {
        if(_elem == null) {return false;}
        if(_address == null) {return false;}
        try {
            if(_elem instanceof Element) {
                let temp = null;
                console.log(_address);
                if(_elem.id == 'step-1-part') {
                    temp = getById("cust_address"); if(temp instanceof HTMLInputElement) {temp.value = _address.address || "";}
                    temp = getById("ct_society"); if(temp instanceof HTMLInputElement) {temp.value = _address.society || "";}
                    temp = getById("ct_clinic"); if(temp instanceof HTMLInputElement) {temp.value = _address.clinic || "";}
                    temp = getById("vads_cust_last_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.nom || __get('nom') || "";}
                    temp = getById("vads_cust_first_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.prenom || __get('prenom') || "";}
                    temp = getById("vads_cust_legal_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.society || __get('society') || "";}
                    temp = getById("vads_cust_address"); if(temp instanceof HTMLInputElement) {temp.value = _address.address_1 || "";}
                    temp = getById("vads_cust_zip"); if(temp instanceof HTMLInputElement) {temp.value = _address.zip || "";}
                    temp = getById("vads_cust_city"); if(temp instanceof HTMLInputElement) {temp.value = _address.city || "";}
                    temp = getById("vads_cust_country"); if(temp instanceof HTMLSelectElement) {temp.value = __getCountry(_address.country) || "";}
                    temp = getById("vads_cust_cell_phone"); if(temp instanceof HTMLInputElement) {temp.value = _address.phone || "";}
                    temp = getById("vads_cust_email"); if(temp instanceof HTMLInputElement) {temp.value = _address.email || "";}
                    temp = getById("custom"); if(temp instanceof HTMLInputElement) {temp.value = _address.custom || "";}
                }
                if(_elem.id == 'step-3-part') {
                    temp = getById("ship_address"); if(temp instanceof HTMLInputElement) {temp.value = _address.address || "";}
                    temp = getById("sp_society"); if(temp instanceof HTMLInputElement) {temp.value = _address.society || "";}
                    temp = getById("sp_clinic"); if(temp instanceof HTMLInputElement) {temp.value = _address.clinic || "";}
                    temp = getById("vads_ship_to_last_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.nom || __get('nom') || "";}
                    temp = getById("vads_ship_to_first_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.prenom || __get('prenom') || "";}
                    temp = getById("vads_ship_to_legal_name"); if(temp instanceof HTMLInputElement) {temp.value = _address.society || __get('society') || "";}
                    temp = getById("vads_ship_to_street"); if(temp instanceof HTMLInputElement) {temp.value = _address.address_1 || "";}
                    temp = getById("vads_ship_to_zip"); if(temp instanceof HTMLInputElement) {temp.value = _address.zip || "";}
                    temp = getById("vads_ship_to_city"); if(temp instanceof HTMLInputElement) {temp.value = _address.city || "";}
                    temp = getById("vads_ship_to_country"); if(temp instanceof HTMLSelectElement) {temp.value = __getCountry(_address.country) || "";}
                    temp = getById("vads_ship_to_phone_num"); if(temp instanceof HTMLInputElement) {temp.value = _address.phone || "";}
                    temp = getById("delivery_mail"); if(temp instanceof HTMLInputElement) {temp.value = _address.email || "";}
                    temp = getById("delivery_custom"); if(temp instanceof HTMLInputElement) {temp.value = _address.custom || "";}
                }
            }
        }
        catch(err) {
            console.error(err);
        }
    };
    
    return (
        <UserContext.Provider
            value={{
                getMinimals: __getUser,
                get: __get,
                login: __login,
                signin: __signin,
                update: __update,
                logged: __logged,
                logout: __logout,
                getCountry: __getCountry,
                findAddress: __find_address,
                hasAddresses: __has_addresses,
                updateAddress: __update_address,
                addAddress: __add_address,
                removeAddress: __remove_address,
                shopUseAddress: __shop_use_address,
                fillAddress: __fill_address
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
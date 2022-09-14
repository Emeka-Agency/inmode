import React from "react";
import { Tabs } from "../../../../o2switch/unix_modules/original/strapi-admin/admin/src/components/Roles";
import { useUser } from "../../contexts/user-provider";
import { useImages } from "../../contexts/images-provider";
import LoadingGIF from "../../LoadingGIF";
import { keyboardUsed } from "../../../functions/tools";

const OverviewTab = ({}:OverviewTab) => {

    const user = useUser();
    const images = useImages();

    const fields:any = {
        "Nom": "nom",
        "Prénom": "prenom",
        "Mail": "email",
        "Titre": "titre",
        "Mot de passe": "password",
        "Société": "society",
        "Téléphone": "phone"
    };

    const toggleShow = function(_target:EventTarget|null = null, _field = null) {
        if(typeof _field != "string") {return false;}
        if(_target instanceof HTMLInputElement) {return false;}
        let _elem = document?.querySelector(`.profile-field[data-field="${_field}"]`);
        console.log(_elem);
        if(_elem instanceof Element && _elem.classList.contains('edit')) {
            _elem.classList.replace('edit', 'show');
            _elem?.querySelector('input')?.style.removeProperty('border-bottom-color');
            return true;
        }
        if(_elem != null && _elem instanceof Element && _elem.classList.contains('show')) {
            _elem.classList.remove('show');
            _elem.classList.add('edit');
            let _input = _elem.querySelector('input');
            if(_input instanceof Element) {
                _input?.focus();
                _input.value = user.get(_field) || '';
                !_input.classList.contains('listened') && _input.addEventListener('keyup', function(e) {
                    _input?.classList.add('listened');
                    if(keyboardUsed("Enter", e) && _elem?.querySelector('.profile-field-value')?.innerText != _input?.value) {
                        _input?.style.setProperty('display', 'none');
                        document?.querySelector(`#loading-${_field}`)?.style.setProperty('display', 'inline-block');
                        user.update(_elem, {values: {[_field]: _input?.value}});
                    }
                    else if(keyboardUsed("Enter", e) || keyboardUsed("Escape", e)) {
                        _elem.classList.remove('edit');
                        _elem.classList.add('show');
                    }
                });
            }
            return true;
        }
        return true;
    }

    return (
        <div id="overview-section">
            <section id="personnal-datas">
                <h3>Informations personnelles</h3>
                {Object.keys(fields).map((field, key) => {
                    return (
                        <div className="profile-field show" key={key} data-field={fields[field]} onClick={(e) => {toggleShow(e.currentTarget, fields[field]);}}>
                            <span className="profile-field-label">{field}</span>
                            <div className="profile-field-value">
                                {user.get(fields[field])}
                            </div>
                            <input className="profile-field-change"/>
                            <div className="profile-field-edit">
                                <img className="init" src={images.getOne('whiteEditIcon')?.publicURL}/>
                                <img className="blue" src={images.getOne('blueEditIcon')?.publicURL}/>
                            </div>
                            <LoadingGIF customId={`loading-${field}`} customClass="mini" customStyle={{'display': 'none', 'verticalAlign': 'middle', 'margin': '0', 'left': '15px', 'width': '22px', 'height': '22px'}}/>
                            <span className="profile-field-change-result"></span>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

interface OverviewTab {

};

export default OverviewTab;
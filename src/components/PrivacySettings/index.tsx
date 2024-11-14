import React from "react";
import Cookies from 'js-cookie';

import { useImages } from '../contexts/images-provider';
import Toggle from "../Toggler";

import "./index.css";

const __labels = [
    "Nécessaires",
    "Fonctionnels",
    "Analytiques",
    "Performances",
    "Publicitaires"
];

const __names = [
    "imdfr-necessary",
    "imdfr-functionnals",
    "imdfr-analytics",
    "imdfr-performance",
    "imdfr-adds"
];

const __txtx = [

]

const _mandatory = [__labels[0], __names[0]];
const _cookies = [
    {label: __labels[1], name: __names[1]},
    {label: __labels[2], name: __names[2]},
    {label: __labels[3], name: __names[3]},
    {label: __labels[4], name: __names[4]}
];

const PrivacySettings = ({ onClose }:PrivacySettings) => {

    const images = useImages();

    const toggle_selector = (__c:string) => `.toggle-button[data-param="${__c}"]`;

    const cliquer_toggler = (__c:string, __e:React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        __e.preventDefault();
        ((toggler:HTMLButtonElement|null) => toggler && toggler?.click())(document.querySelector(toggle_selector(__c)));
    }

    const tout_accepter = () => {
        __names.slice(1).forEach(__c => (((toggler:HTMLButtonElement|null) => toggler && toggler?.click())(document.querySelector(`${toggle_selector(__c)}[data-toggled="off"]`))))
    }

    const tout_rejeter = () => {
        __names.slice(1).forEach(__c => (((toggler:HTMLButtonElement|null) => toggler && toggler?.click())(document.querySelector(`${toggle_selector(__c)}[data-toggled="on"]`))))
    }

    const confirmer = () => {
        __names.forEach(__c => Cookies.set(__c, document.querySelector(`${toggle_selector(__c)}`)?.getAttribute('data-toggled') == "on" ? "true" : "false"));
        document.getElementById('privacy-settings-close')?.click();
    }

    return (
        <section id="privacy-settings">
            <div id="privacy-settings-mask" onClick={() => onClose()}></div>
            <div id="privacy-settings-content" className="custom-scrollbar">
                <h2>MES CHOIX</h2>
                <p>Ipsum ea culpa consectetur nisi sit eiusmod mollit. Eiusmod labore sunt pariatur nostrud laborum cillum sint anim voluptate duis ad. Exercitation incididunt et qui fugiat irure. Voluptate ipsum esse do aliqua in. Sit anim nostrud adipisicing incididunt consequat ullamco qui irure voluptate aliqua elit officia dolore esse. Ut cupidatat ad velit id.</p>
                <div id="privacy-settings-close" onClick={() => onClose()}>FERMER X</div>
                <button id="privacy-settings-accept-all" onClick={tout_accepter}>Tout accepter</button>
                <table>
                    <tbody>
                        <tr onClick={(e) => cliquer_toggler(__names[0], e)}>
                            <td>
                                <details>
                                    <summary>
                                        <label>{__labels[0]}</label>
                                        <Toggle label="" label_position="left" param={__names[0]} base_toggled={true} togglable={false}></Toggle>
                                    </summary>
                                    <p></p>
                                </details>
                            </td>
                        </tr>
                        {_cookies.map((__c) => (
                            <tr onClick={(e) => cliquer_toggler(__c.name, e)}>
                                <td>
                                    <details>
                                        <summary>
                                            <label>{__c.label}</label>
                                            <Toggle label="" label_position="left" param={__c.name} base_toggled={Cookies.get(__c.name) === "true"}></Toggle>
                                        </summary>
                                        <p></p>
                                    </details>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div id="privacy-settings-buttons">
                    <button id="privacy-settings-reject-all" onClick={tout_rejeter}>Tout rejeter</button>
                    <button id="privacy-settings-confirm-choices" onClick={confirmer}>Confirmer mes choix</button>
                </div>
            </div>
        </section>
    );
};

interface PrivacySettings {
    onClose: Function;
};

export default PrivacySettings;
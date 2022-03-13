/**
 * @file Manage all the fetch operations, callbacks and errors
 */

import { isElement, isFunction, isNull, isObject, isString } from "./is-type";

/**
 * 
 * @param {string} _url - URL to fetch
 * @param {string} _method - Method to use
 * @param {Object|null} _body - Body if needed
 * @param {Function|null} _onSuccess - Function to execute on success of both fetch and returned status
 * @param {Function|null} _onError - Function to execute on wether fetch fail or error returned status
 * @param {Element|null} _elem - Elem attached to that action
 * @param {"json"|"blob"|"text"} _retour_type - Return type of back-office
 * @returns {boolean|Object} Wether the all process worked or not
 */
const _fetch = (
    _url:string = "/",
    _method:string = "GET",
    _body:Object|null = {},
    _onSuccess:Function|null = null,
    _onError:Function|null = null,
    _elem:Element|null = null,
    _retour_type:string = "json",
):boolean|Object => {
    if(
        isString(_url) &&
        isString(_method) &&
        isObject(_body) &&
        (isFunction(_onSuccess) || isNull(_onSuccess)) &&
        (isFunction(_onError) || isNull(_onError)) &&
        (isNull(_elem) || isElement(_elem)) &&
        isString(_retour_type)
    ) {
        let vars:RequestInit = {
            method: _method,
            headers: new Headers({}),
            mode: 'cors',
            cache: 'default',
        };
        if(_method != "GET") {
            vars = {...vars, body: JSON.stringify(_body)};
        }
        fetch(_url, vars)
        .then((res) => {
            if(res.status >= 400) {
                throw new Error("Error " + res.status);
            }
            switch(_retour_type) {
                case 'text':
                    // _log("text");
                    return res.text(); // Au cas où
                case 'blob':
                    // _log("blob");
                    return res.blob(); // TODO - Pour plus tard, upload et download de gros fichiers
                case 'json':
                default:
                    // _log("json");
                    return res.json();
            }
        })
        .then((response) => {
            if(response.status == "error") {
                throw new Error(response.message ?? "Error");
            }
            if(_onSuccess != null) {
                _onSuccess(_elem, response);
                return true;
            }
            return false;
        })
        .catch((err) => {
            console.trace(err);
            console.error(err);
            if(_onError != null) {
                _onError(_elem, err);
            }
            return false;
        })
    }
    else {
        let _retour = {};
        _retour = isString(_url) == true ? _retour : {..._retour, _url: '_url was not from type string'};
        _retour = isString(_method) == true ? _retour : {..._retour, _method: '_method was not from type string'};
        _retour = isObject(_body) == true ? _retour : {..._retour, _body: '_body was not from type object'};
        _retour = (isFunction(_onSuccess) || isNull(_onSuccess)) == true ? _retour : {..._retour, _onSuccess: '_onSuccess was not from type function or null'};
        _retour = (isFunction(_onError) || isNull(_onError)) == true ? _retour : {..._retour, _onError: '_onError was not from type function or null'};
        _retour = isElement(_retour_type) == true || isNull(_elem) ? _retour : {..._retour, _elem: '_elem was not from type Element or null'};
        _retour = isString(_retour_type) == true ? _retour : {..._retour, _retour_type: '_retour_type was not from type string'};
        return _retour;
    }
    return true;
}

export default _fetch;

export const initWakeup = function(from = "unk") {

    if(typeof window == "undefined") {
        return false;
    }

    // console.log(`%cFrom : ${from}`, "color: red; font-size: 16px; font-weight: bold;");

    const request_init:RequestInit = {
        method: 'POST',
        headers: {},
        cache: 'default',
        body: JSON.stringify({"from": from}),
    };

    fetch(
        `${process.env.INMODE_BACK}/api/launch`,
        request_init
    )
    .then(function(res) {
        try {
            return res.json();
        }
        catch(err_json) {
            console.log(err_json);
            try {
                return res.text();
            }
            catch(err_text) {
                console.log(err_text);
                try {
                    return res.blob();
                }
                catch(err_blob) {
                    console.log(err_blob);
                    return null;
                }
            }
        }
    })
    .then((res) => {
        // console.log(res);
    })
    .catch(err => console.log(err));

    return true;
};

// ================================
// IS-TYPE
// ================================

import { External_GatsbyImage_Interface, GatsbyImage_Interface } from "../components/interfaces";
import { _log } from "./logger";
import { err_log } from "./logging";

/**
 * @file All needed generic functions to type-check of passed through elements
 */

 export const isElement = (_element:any) => {
    try {
        return _element instanceof Element || _element instanceof HTMLDocument ? true : false;
    }
    catch(err:any) {
        err_log(err, "functions/tools.ts:isElement catch");
        return false
    }
}

export const areElements = (_elements:any[]) => {{return isArray(_elements) == false ? false : _elements.map(_el => isElement(_el)).filter(res => res).length == _elements.length ? true : false;}}

export const isInput = (element:any) => {return element instanceof HTMLInputElement ? true : false;}
export const isButton = (element:any) => {return element instanceof HTMLButtonElement ? true : false;}
export const isSelect = (element:any) => {return element instanceof HTMLSelectElement ? true : false;}

export const isString = (_value:any) => {return typeof _value == "string" ? true : false;}
export const isBoolean = (_value:any) => {return typeof _value == "boolean" ? true : false;}
export const isObject = (_value:any) => {return typeof _value == "object" && !Array.isArray(_value) ? true : false;}
export const isArray = (_value:any) => {return Array.isArray(_value) ? true : false;}
export const isNumber = (_value:any) => {return typeof _value == "number" ? true : false;}
export const isInt = (_value:any) => {return _value == _value.toFixed(0) ? true : false;}
export const isFloat = (_value:any) => {return _value % 1 != 0 ? true : false;}
export const isEmpty = (_value:any) => {return _value == null || _value == undefined ? true : false;}
export const isUndefined = (_value:any) => {return _value === undefined ? true : false;}
export const isNull = (_value:any) => {return _value === null ? true : false;}
export const isFunction = (_value:any) => {return typeof _value == "function" ? true : false;}

export const areString = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isString(_val)).length == _values.length ? true : false;}
export const areBoolean = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isBoolean(_val)).length == _values.length ? true : false;}
export const areObject = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isObject(_val)).length == _values.length ? true : false;}
export const areArray = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isArray(_val)).length == _values.length ? true : false;}
export const areNumber = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isNumber(_val)).length == _values.length ? true : false;}
export const areFloat = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isFloat(_val)).length == _values.length ? true : false;}
export const areEmpty = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isEmpty(_val)).length == _values.length ? true : false;}
export const areUndefined = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isUndefined(_val)).length == _values.length ? true : false;}
export const areNull = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isNull(_val)).length == _values.length ? true : false;}
export const areFunction = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isFunction(_val)).length == _values.length ? true : false;}

export const isEmptyString = (_value:any) => {return isString(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyObject = (_value:any) => {return isObject(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyArray = (_value:any) => {return isArray(_value) == false ? true : Object.keys(_value).length <= 0 ? true : false;}

export const areEmptyString = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyString(_val)).length == _values.length ? true : false;}
export const areEmptyObject = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyObject(_val)).length == _values.length ? true : false;}
export const areEmptyArray = (_values:any[]) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyArray(_val)).length == _values.length ? true : false;}

// ================================
// TOOLS
// ================================

export const resolveEntityPath = function(_entity:Object|null|any = null, _path:string|null = null) {
    if(typeof _entity != "object" || typeof _path != "string") {return null;}
    let index = 0;
    let path = _path.split('__');
    let retour = _entity;
    while(index < path.length && retour != null) {
        retour = retour[path[index++]] ?? null;
    }
    return retour;
}

/**
 * @file Page informations and useful tools
 */

export const avoirURLBase = () => {
    _log("avoirURLBase");
    return window?.location.origin + (window?.location.host == "localhost" ? '/c7_back' : '');
};

export const avoirRelativeURL = () => {
    _log("avoirRelativeURL");
    return window?.location.pathname;
};

/**
 * 
 * @param {string} _url 
 * @returns boolean|void
 */
export const redirectTo = (_url:string|any) => {
    if(typeof _url != "string") {
        return false;
    }
    if(_url.length == 0) {
        return false;
    }
    window.location.href = _url;
}

export const get_url_params = () => {
    if(typeof window != undefined) {
        return {
            pathname: get_url_pathname(),
            search: get_url_search(true),
            hash: get_url_hash(),
        };
    }
    else {
        return {};
    }
}

// protocol + :// + host + pathname + search + hash
// protocol + :// + hostname + port + pathname + search + hash

export const get_url_port = () => {if(typeof window != undefined) {return window?.location.port;}else {return {};}};
export const get_url_pathname = () => {if(typeof window != undefined) {return window?.location.pathname;}else {return {};}};
export const get_url_search = (as_array = true) => {
    if(typeof window != undefined) {
        return as_array ? Object.fromEntries(window?.location.search.replace('?', '').split('&').map(elem => elem.split('='))) : window?.location.search;
    }
    else {return {};}
};
export const get_url_hash = () => {if(typeof window != undefined) {return window?.location.hash;}else {return {};}};
export const clean_url_search = () => typeof window != undefined && typeof document != undefined && typeof history != undefined && history.pushState('', document.title, window?.location.href.replace(window?.location.search, ''));
export const set_url_search = (_search?:string) => typeof window != undefined && typeof document != undefined && typeof history != undefined && history.pushState('', document.title, window?.location.href + (_search || ''))

export const url_from_params = (_params:Object|any) => {
    if(!isObject(_params)) {
        return '';
    }
    let _retour = window?.location.pathname + (Object.keys(_params).length > 0 ? '?' : '');
    Object.keys(_params).forEach((_param, _i) => {
        if(_params[_param]) {
            _retour += `${_i > 0 ? '&' : ''}${_param}=${_params[_param]}`;
        }
    })
    return _retour;
}

export const indexElement = (_elem:Element|any) => {
    if(isElement(_elem)) {
        let _parent = _elem.parentElement;
        if(isElement(_parent)) {
            let _index = 0;
            while(_parent.children[_index]) {
                if(_parent.children[_index] === _elem) {
                    return _index;
                }
                _index++;
            }
        }
        else {
            return -1;
        }
    }
    return -1;
}

export const randomString = function(length = 10, letters = true, numbers = true)
{
    let characters = "";
    if(letters == true) {
        characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if(numbers == true) {
        characters += "0123456789"
    }
    let charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters[Math.round(Math.random() * charactersLength - 1)];
    }
    return randomString;
}

export const randColor = (rgba = null) => {
    let _1 = Math.floor(Math.random() * 255);
    let _2 = Math.floor(Math.random() * 255);
    let _3 = Math.floor(Math.random() * 255);
    return `#${[_1, _2, _3].map(num => num > 15 ? num.toString(16) : `0${num.toString(16)}`).join('')}${(rgba) ? (rgba * 2.55).toFixed(0).toString() : ''}`;
}

export const preventDefault = (e:Event|any) => e instanceof Event && e.preventDefault();

function strToDom(str:string|any) {
    try {
        return document?.createRange().createContextualFragment(str);
    }
    catch(_err:any) {
        err_log(_err, "functions/tools.ts:preventDefault catch");
        return null;
    }
}

/**
 * @param {string} html representing a single element
 * @return {element}
 */
function htmlToElement(html:string|any) {
    var template = document?.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.append(strToDom(html) ?? '');
    return template.content.firstChild;
}

/**
 * @param {string} html representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html:string|any) {
    var template = document?.createElement('template');
    template.append(strToDom(html) ?? '');
    return template.content.childNodes;
}

var detectOS = getOS() ?? "Unknown OS";

function getOS() {
    if(typeof navigator != "undefined") {
        if (navigator.appVersion.indexOf("Win") != -1) {
            return "Windows";
        }
        if (navigator.appVersion.indexOf("Mac") != -1) {
            return "MacOS";
        }
        if (navigator.appVersion.indexOf("Linux") != -1) {
            return "Linux";
        }
    }
    return undefined;
}

function scrollX(_dx = null, _elems:Array<Element>|null = null) {
    if(_dx == null || _dx == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    (_elems || []).forEach(_elem => {
        _elem.scrollLeft += _dx;
    });
}

function scrollY(_dy = null, _elems:Array<Element>|any = null) {
    if(_dy == null || _dy == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    (_elems || []).forEach(_elem => {
        _elem.scrollTop += _dy;
    });
}

function insertFirst(newNode:any, parent:any) {
    if((newNode instanceof Node || newNode instanceof Element) && parent instanceof Element) {
        if(parent.childElementCount == 0) {insertLast(newNode, parent);}
        else {
            insertBefore(newNode, parent.children[0]);
        }
    }
}
function insertLast(newNode:any, parent:any) {
    if((newNode instanceof Node || newNode instanceof Element) && parent instanceof Element) {
        parent.appendChild(newNode);
    }
}

function insertAfter(newNode:any, existingNode:any) {
    if((newNode instanceof Node || newNode instanceof Element) && existingNode instanceof Element && existingNode.parentElement instanceof Element) {
        existingNode.parentElement.insertBefore(newNode, existingNode.nextSibling);
    }
}

function insertBefore(newNode:any, existingNode:any) {
    if((newNode instanceof Node || newNode instanceof Element) && existingNode instanceof Element && existingNode.parentElement instanceof Element) {
        existingNode.parentElement.insertBefore(newNode, existingNode);
    }
}

function filter_object(obj:any, predicate:Function) {
    return Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res:any, key:any) => (res[key] = obj[key], res), {} );
}

/**
 * @description Remonte les balises jusqu'au critère recherché
 */
function resolveUpUntil(_elem:any, _critere = null, _type = "class")
{
    if(!isElement(_elem)) {return null;}
    if(!isString(_critere) && (_type == "class" || _type == "id" || _type == "name")) {return false;}

    do {
        switch(_type) {
            case "id": if(_elem.id == _critere) {return _elem;}
            case "name": if(_elem.name == _critere) {return _elem;}
            case "class":
            default:
                if(_elem.classList.contains(_critere)) {return _elem;}
        }
        _elem = _elem.parentElement || null;
    } while(_elem.parentElement);
    return _elem;
}

function getFullDate(_timestamp = Date.now(), _need = true) {
    if(!isInt(_timestamp) && _need == false) {return false;}
    if(!isInt(_timestamp)) {_timestamp = Date.now();}
    let _str_date = `${new Date(_timestamp).getFullYear()}-`;
    _str_date += `${new Date(_timestamp).getMonth() + 1 < 10 ? '0' : ''}${new Date(_timestamp).getMonth() + 1}-`;
    _str_date += `${new Date(_timestamp).getDate() < 10 ? '0' : ''}${new Date(_timestamp).getDate()}`;
    return _str_date;
}

function getFullTime(_timestamp:number) {

}

function getFullDateTime(_timestamp:number) {

}

export const keyboardUsed = function(__critere:string|null = null, __event:any = null) {
    if(__critere == null || typeof __critere != "string") {return false;}
    if(__event == null) {return false;}

    switch(__critere) {
        case "Enter":
        case "NumpadEnter":
            return (["Enter", "NumpadEnter"].indexOf(__event.code) >= 0 || __event.code == "Enter" || __event.keyCode == 13);
        case "Escape":
            return (__event.code == "Escape" || __event.code == "Escape" || __event.keyCode == 27);
        default:
            return false;
    }
}

export const sanitize_url = (_url:string|null = null) => {
    if(typeof _url != "string") {return "";}
    try {
        let temp = new URL(_url);
        temp.pathname.replace(/\/\//gi, '/');
        return decodeURI(temp.toLocaleString());
    }
    catch(err) {
        return _url;
    }
}

export const resolveImg = (img?:any) => {
    return typeof img?.localFile == "undefined" ? sanitize_url(resolveExternalImg(img)) : sanitize_url(resolveInternalImg(img));
}
export const resolveImgSet = (img?:any) => {
    return typeof img?.localFile == "undefined" ? sanitize_url(resolveExternalImgSet(img)) : sanitize_url(resolveInternalImgSet(img));
}

export const resolveInternalImg = (img?:External_GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.localFile?.ext == ".svg") || img?.localFile?.extension == "svg") {
        retour = img?.localFile?.publicURL;
    }
    else if((img?.localFile?.childImageSharp?.fluid?.srcWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fluid?.srcWebp?.indexOf('/.') == -1) {
        retour = img?.localFile?.childImageSharp?.fluid?.srcWebp;
    }
    else if((img?.localFile?.childImageSharp?.fixed?.srcWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fixed?.srcWebp?.indexOf('/.') == -1) {
        retour = img?.localFile?.childImageSharp?.fixed?.srcWebp;
    }
    else if((img?.localFile?.url ?? "").length > 0 && img?.localFile?.url?.indexOf('/.') == -1) {
        retour = img?.localFile?.url;
    }
    else if((img?.localFile?.publicURL ?? "").length > 0 && img?.localFile?.publicURL?.indexOf('/.') == -1) {
        retour = img?.localFile?.publicURL;
    }
    else if((img?.localFile?.absolutePath ?? "").length > 0 && img?.localFile?.absolutePath?.indexOf('/.') == -1) {
        retour = img?.localFile?.absolutePath;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    else if(typeof retour == "string" && retour.indexOf("http") == -1) {
        retour = `${window?.location.origin}${retour}`;
    }
    else if(retour == undefined) {
        retour = sanitize_url(resolveExternalImg(img));
    }
    return retour;
}

export const resolveInternalImgSet = (img?:External_GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.localFile?.ext == ".svg") || img?.localFile?.extension == "svg") {
        retour = img?.localFile?.publicURL;
    }
    else if((img?.localFile?.childImageSharp?.fluid?.srcSetWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fluid?.srcSetWebp?.indexOf('/.') == -1) {
        retour = img?.localFile?.childImageSharp?.fluid?.srcSetWebp;
    }
    else if((img?.localFile?.childImageSharp?.fixed?.srcSetWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fixed?.srcSetWebp?.indexOf('/.') == -1) {
        retour = img?.localFile?.childImageSharp?.fixed?.srcSetWebp;
    }
    else if((img?.localFile?.url ?? "").length > 0 && img?.localFile?.url?.indexOf('/.') == -1) {
        retour = img?.localFile?.url;
    }
    else if((img?.localFile?.publicURL ?? "").length > 0 && img?.localFile?.publicURL?.indexOf('/.') == -1) {
        retour = img?.localFile?.publicURL;
    }
    else if((img?.localFile?.absolutePath ?? "").length > 0 && img?.localFile?.absolutePath?.indexOf('/.') == -1) {
        retour = img?.localFile?.absolutePath;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    else if(typeof retour == "string" && retour.indexOf("http") == -1) {
        retour = `${window?.location.origin}${retour}`;
    }
    else if(retour == undefined) {
        retour = sanitize_url(resolveExternalImgSet(img));
    }
    return retour;
}

export const resolveExternalImg = (img?:GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.ext == ".svg") || (img?.extension == "svg")) {
        retour = img?.publicURL;
    }
    else if((img?.childImageSharp?.fluid?.srcWebp ?? "").length > 0 && img?.childImageSharp?.fluid?.srcWebp?.indexOf('/.') == -1) {
        retour = img?.childImageSharp?.fluid?.srcWebp;
    }
    else if((img?.childImageSharp?.fixed?.srcWebp ?? "").length > 0 && img?.childImageSharp?.fixed?.srcWebp?.indexOf('/.') == -1) {
        retour = img?.childImageSharp?.fixed?.srcWebp;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = img?.url;
    }
    else if((img?.publicURL ?? "").length > 0 && img?.publicURL?.indexOf('/.') == -1) {
        retour = img?.publicURL;
    }
    else if((img?.absolutePath ?? "").length > 0 && img?.absolutePath?.indexOf('/.') == -1) {
        retour = img?.absolutePath;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    return retour;
}

export const resolveExternalImgSet = (img?:GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.ext == ".svg") || (img?.extension == "svg")) {
        retour = img?.publicURL;
    }
    else if((img?.childImageSharp?.fluid?.srcSetWebp ?? "").length > 0 && img?.childImageSharp?.fluid?.srcSetWebp?.indexOf('/.') == -1) {
        retour = img?.childImageSharp?.fluid?.srcSetWebp;
    }
    else if((img?.childImageSharp?.fixed?.srcSetWebp ?? "").length > 0 && img?.childImageSharp?.fixed?.srcSetWebp?.indexOf('/.') == -1) {
        retour = img?.childImageSharp?.fixed?.srcSetWebp;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = img?.url;
    }
    else if((img?.publicURL ?? "").length > 0 && img?.publicURL?.indexOf('/.') == -1) {
        retour = img?.publicURL;
    }
    else if((img?.absolutePath ?? "").length > 0 && img?.absolutePath?.indexOf('/.') == -1) {
        retour = img?.absolutePath;
    }
    else if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    return retour;
}

export const resolveImageRatio = (image?:GatsbyImage_Interface):number|undefined => {
    if(!image) {return undefined;}
    if(image && image.childImageSharp?.fluid?.aspectRatio) {
        return image.childImageSharp?.fluid?.aspectRatio;
    }
    if(image && image.childImageSharp?.fixed?.aspectRatio) {
        return image.childImageSharp?.fixed?.aspectRatio;
    }
    if(image && image.childImageSharp?.original) {
        return (image.childImageSharp.original.height ?? 1) / (image.childImageSharp.original.width ?? 1);
    }
    return undefined;
};

export const color_variant = (name:string = "") => {
    switch(name) {
        case "FormaV":
        case "Morpheus8V":
        case "ToneV":
        case "EmpowerRF":
        case "Aviva":
            return "dusty-rose";
        default:
            return "teal";
    }
}

export const handlePromise = (promise:Response, type?:string) => {
    let retour = null;
    type = typeof type == "string" ? type : "json";
    try {
        retour = promise[["json", "text", "blob"].indexOf(type ?? "json") >= 0 ? type : "json"]();
    }
    catch(err_json:any) {
        err_log(err_json, "components/contact.ts:handlePromise catch promise.json() error");
        _log(err_json);
        try {
            retour = promise.text();
        }
        catch(err_text:any) {
            err_log(err_text, "components/contact.ts:handlePromise catch promise.text() error");
            _log(err_text);
            try {
                retour = promise.blob();
            }
            catch(err_blob:any) {
                err_log(err_blob, "components/contact.ts:handlePromise catch promise.blob() error");
                _log(err_blob);
                retour = null;
            }
        }
    }
    return retour;
}
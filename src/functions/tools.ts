/**
 * @file Page informations and useful tools
 */

import { External_GatsbyImage_Interface, GatsbyImage_Interface } from "../components/interfaces";
import { _error, _log } from "./logger";

export function avoirURLBase() {
    _log("avoirURLBase");
    return window?.location.origin + (window?.location.host == "localhost" ? '/c7_back' : '');
};

export function avoirRelativeURL() {
    _log("avoirRelativeURL");
    return window?.location.pathname;
};

export function get_url_params() {
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

export function get_url_port() {if(typeof window != undefined) {return window?.location.port;}else {return {};}};
export function get_url_pathname() {if(typeof window != undefined) {return window?.location.pathname;}else {return {};}};
export function get_url_search(as_array = true) {
    if(typeof window != undefined) {
        return as_array ? Object.fromEntries(window?.location.search.replace('?', '').split('&').map(elem => elem.split('='))) : window?.location.search;
    }
    else {return {};}
};
export function get_url_hash() {if(typeof window != undefined) {return window?.location.hash;}else {return {};}};

export function url_from_params(_params:any) {
    if(!(_params instanceof Object)) {
        return '';
    }
    let _retour = window?.location.pathname + (Object.keys(_params).length > 0 ? '?' : '');
    Object.keys(_params).forEach(function(_param, _i) {
        if(_params[_param]) {
            _retour += `${_i > 0 ? '&' : ''}${_param}=${_params[_param]}`;
        }
    })
    return _retour;
}

export function indexElement(_elem:HTMLElement|null) {
    if(_elem instanceof Element) {
        let _parent = _elem.parentElement;
        if(_parent instanceof Element) {
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

export function randomString(length = 10, letters = true, numbers = true)
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
        randomString += characters[Math.trunc(Math.random() * charactersLength - 1)];
    }
    return randomString;
}

export function randColor() {
    let _1 = Math.floor(Math.random() * 255);
    let _2 = Math.floor(Math.random() * 255);
    let _3 = Math.floor(Math.random() * 255);
    return `#${[_1, _2, _3].map(num => num > 15 ? num.toString(16) : `0${num.toString(16)}`).join('')}`;
}

export function preventDefault(e:Event) {e.preventDefault();}

export function strToDom(str: string) {
    try {
        return document.createRange().createContextualFragment(str);
    }
    catch(err) {
        _error(err);
        return null;
    }
}

export function htmlToElement(html:DocumentFragment|string|null = null) {
    if(html == null) {return "";}
    var template = document.createElement('template');
    html = typeof html == "string" ? html.trim() : html; // Never return a text node of whitespace as the result
    template.append(typeof html == "string" && html != null ? strToDom(html) ?? "" : html != null ? html : "");
    return template.content.firstChild;
}

export function htmlToElements(html:DocumentFragment|string|null = null) {
    if(html == null) {return "";}
    var template = document.createElement('template');
    template.append(typeof html == "string" && html != null ? strToDom(html) ?? "" : html != null ? html : "");
    return template.content.childNodes;
}

var detectOS = getOS() ?? "Unknown OS";

export function getOS() {
    
    if (typeof window != "undefined" && typeof window?.navigator != "undefined" && window?.navigator.appVersion.indexOf("Win") != -1) 
        return "Windows";
    
    if (typeof window != "undefined" && typeof window?.navigator != "undefined" && window?.navigator.appVersion.indexOf("Mac") != -1) 
        return "MacOS";
    
    if (typeof window != "undefined" && typeof window?.navigator != "undefined" && window?.navigator.appVersion.indexOf("Linux") != -1) 
        return "Linux";

    return undefined;
}

export function scrollX(_dx = null, _elems:Array<any>|null = null) {
    if(_dx == null || _dx == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    (_elems ?? []).forEach(_elem => {
        _elem.scrollLeft += _dx;
    });
}

export function scrollY(_dy = null, _elems:Array<any>|null = null) {
    if(_dy == null || _dy == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    (_elems ?? []).forEach(_elem => {
        _elem.scrollTop += _dy;
    });
}

export function insertAfter(newNode:HTMLElement, existingNode:HTMLElement) {
    existingNode.parentNode?.insertBefore(newNode, existingNode.nextSibling);
}

export function insertBefore(newNode:HTMLElement, existingNode:HTMLElement) {
    existingNode.parentNode?.insertBefore(newNode, existingNode);
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
    if((img?.localFile?.ext == ".svg") || img?.localFile?.extension == "svg" && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.publicURL;
    }
    if((img?.localFile?.childImageSharp?.fluid?.srcWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fluid?.srcWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.childImageSharp?.fluid?.srcWebp;
    }
    if(typeof img?.localFile?.childImageSharp?.fluid?.srcWebp == "object") {
        retour = resolveImg(img?.localFile?.childImageSharp?.fluid?.srcWebp);
    }
    if((img?.localFile?.childImageSharp?.fixed?.srcWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fixed?.srcWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.childImageSharp?.fixed?.srcWebp;
    }
    if(typeof img?.localFile?.childImageSharp?.fixed?.srcWebp == "object") {
        retour = resolveImg(img?.localFile?.childImageSharp?.fixed?.srcWebp);
    }
    if((img?.localFile?.url ?? "").length > 0 && img?.localFile?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.url;
    }
    if((img?.localFile?.publicURL ?? "").length > 0 && img?.localFile?.publicURL?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.publicURL;
    }
    if((img?.localFile?.absolutePath ?? "").length > 0 && img?.localFile?.absolutePath?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.absolutePath;
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    if(typeof retour == "string" && retour.indexOf("http") == -1 && typeof window != "undefined" && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${window?.location.origin}${retour}`;
    }
    if(retour == undefined && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = sanitize_url(resolveExternalImg(img));
    }
    return retour;
}

export const resolveInternalImgSet = (img?:External_GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.localFile?.ext == ".svg") || img?.localFile?.extension == "svg" && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.publicURL;
    }
    if((img?.localFile?.childImageSharp?.fluid?.srcSetWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fluid?.srcSetWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.childImageSharp?.fluid?.srcSetWebp;
    }
    if(typeof img?.localFile?.childImageSharp?.fluid?.srcSetWebp == "object") {
        retour = resolveImgSet(img?.localFile?.childImageSharp?.fluid?.srcSetWebp);
    }
    if((img?.localFile?.childImageSharp?.fixed?.srcSetWebp ?? "").length > 0 && img?.localFile?.childImageSharp?.fixed?.srcSetWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.childImageSharp?.fixed?.srcSetWebp;
    }
    if(typeof img?.localFile?.childImageSharp?.fixed?.srcSetWebp == "object") {
        retour = resolveImgSet(img?.localFile?.childImageSharp?.fixed?.srcSetWebp);
    }
    if((img?.localFile?.url ?? "").length > 0 && img?.localFile?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.url;
    }
    if((img?.localFile?.publicURL ?? "").length > 0 && img?.localFile?.publicURL?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.publicURL;
    }
    if((img?.localFile?.absolutePath ?? "").length > 0 && img?.localFile?.absolutePath?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.localFile?.absolutePath;
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    if(typeof retour == "string" && retour.indexOf("http") == -1 && typeof window != "undefined" && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${window?.location.origin}${retour}`;
    }
    if(retour == undefined && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = sanitize_url(resolveExternalImgSet(img));
    }
    return retour;
}

export const resolveExternalImg = (img?:GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.ext == ".svg") || (img?.extension == "svg") && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.publicURL;
    }
    if((img?.childImageSharp?.fluid?.srcWebp ?? "").length > 0 && img?.childImageSharp?.fluid?.srcWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.childImageSharp?.fluid?.srcWebp;
    }
    if(typeof img?.childImageSharp?.fluid?.srcWebp == "object") {
        retour = resolveImg(img?.childImageSharp?.fluid?.srcWebp);
    }
    if((img?.childImageSharp?.fixed?.srcWebp ?? "").length > 0 && img?.childImageSharp?.fixed?.srcWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.childImageSharp?.fixed?.srcWebp;
    }
    if(typeof img?.childImageSharp?.fixed?.srcWebp == "object") {
        retour = resolveImg(img?.childImageSharp?.fixed?.srcWebp);
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.url;
    }
    if((img?.publicURL ?? "").length > 0 && img?.publicURL?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.publicURL;
    }
    if((img?.absolutePath ?? "").length > 0 && img?.absolutePath?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.absolutePath;
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    return retour;
}

export const resolveExternalImgSet = (img?:GatsbyImage_Interface):string|undefined => {
    if(img == null) {return undefined;}
    let retour = undefined;
    if((img?.ext == ".svg") || (img?.extension == "svg") && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.publicURL;
    }
    if((img?.childImageSharp?.fluid?.srcSetWebp ?? "").length > 0 && img?.childImageSharp?.fluid?.srcSetWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.childImageSharp?.fluid?.srcSetWebp;
    }
    if(typeof img?.childImageSharp?.fluid?.srcSetWebp == "object") {
        retour = resolveImgSet(img?.childImageSharp?.fluid?.srcSetWebp);
    }
    if((img?.childImageSharp?.fixed?.srcSetWebp ?? "").length > 0 && img?.childImageSharp?.fixed?.srcSetWebp?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.childImageSharp?.fixed?.srcSetWebp;
    }
    if(typeof img?.childImageSharp?.fixed?.srcSetWebp == "object") {
        retour = resolveImgSet(img?.childImageSharp?.fixed?.srcSetWebp);
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.url;
    }
    if((img?.publicURL ?? "").length > 0 && img?.publicURL?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.publicURL;
    }
    if((img?.absolutePath ?? "").length > 0 && img?.absolutePath?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = img?.absolutePath;
    }
    if((img?.url ?? "").length > 0 && img?.url?.indexOf('/.') == -1 && (!retour || (typeof retour == "string" && retour.includes('src')))) {
        retour = `${process.env.STRAPI_URL}${img?.url}`;
    }
    return retour;
}

export const handlePromise = (promise:Response, type?:string) => {
    let retour = null;
    type = typeof type == "string" ? type : "json";
    try {
        retour = promise[["json", "text", "blob"].indexOf(type ?? "json") >= 0 ? type : "json"]();
    }
    catch(err_json:any) {
        _log(err_json);
        try {
            retour = promise.text();
        }
        catch(err_text:any) {
            _log(err_text);
            try {
                retour = promise.blob();
            }
            catch(err_blob:any) {
                _log(err_blob);
                retour = null;
            }
        }
    }
    return retour;
}

export function go_to(page:string|null = null) {
    console.log("%cgo_to" + page, "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
    if(page == null) {
        console.log("%cgo_to: page is null", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
        return;
    }
    if(typeof window != "undefined") {
        console.log("%cgo_to: window is defined", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
        if(page.indexOf("http") == -1) {
            console.log("%cgo_to: page is not an url", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
            page = `${window.location.origin}${page}`;
        }

        console.log("%cgo_to: page is an url", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");

        let a = Object.assign(document.createElement('a'), {
            id: 'goto-thanks',
            target: '_self',
            href: page,
        });
        document.body.appendChild(a);

        console.log("%cgo_to: a is created", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");

        if(a) {
            console.log("%cgo_to: a is an HTMLLinkElement", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
            a.click();
            a.remove();
        }
        else {
            console.log("%cgo_to: a is not an HTMLLinkElement", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
        }
    }
    else {
        console.log("%cgo_to: window is not defined", "color:orange; font-weight:bold; font-size:1.2em; background-color:black;");
    }
}
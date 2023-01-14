/**
 * @file Page informations and useful tools
 */

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

export function url_from_params(_params) {
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

export function indexElement(_elem) {
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
        randomString += characters[(Math.random() * charactersLength - 1).toFixed(0)];
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

export function htmlToElement(html: string) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.append(strToDom(html));
    return template.content.firstChild;
}

export function htmlToElements(html: string) {
    var template = document.createElement('template');
    template.append(strToDom(html));
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

export function scrollX(_dx = null, _elems = null) {
    if(_dx == null || _dx == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    _elems.forEach(_elem => {
        _elem.scrollLeft += _dx;
    });
}

export function scrollY(_dy = null, _elems = null) {
    if(_dy == null || _dy == 0 || _elems == null || !Array.isArray(_elems) || _elems.length == 0) {
        return false;
    }
    _elems.forEach(_elem => {
        _elem.scrollTop += _dy;
    });
}

export function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

export function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}
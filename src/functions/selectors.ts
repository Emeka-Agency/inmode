function _document():boolean {
    return typeof document == "undefined" ? false : true;
}

export const oneBySelector = (selector:string, callback?:Function):Element | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.querySelectorAll(selector)) : document.querySelector(selector);
}
export const allBySelector = (selector:string, callback?:Function):NodeListOf<Element> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.querySelectorAll(selector)) : document.querySelectorAll(selector);
}

export const oneById = (selector:string):HTMLElement | null => {
    if(!_document()) {
        return null;
    }
    return document.getElementById(selector);
}

export const oneByTag = (selector:string, callback?:Function, index:number = 0):HTMLElement | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByTagName(selector)) : document.getElementsByTagName(selector)[typeof index == "number" && index >=0 ? index : 0];
}
export const allByTag = (selector:string, callback?:Function):HTMLCollectionOf<Element> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByTagName(selector)) : document.getElementsByTagName(selector);
}

export const oneByName = (selector:string, callback?:Function, index:number = 0):HTMLElement | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByName(selector)) : document.getElementsByName(selector)[typeof index == "number" && index >=0 ? index : 0];
}
export const allByName = (selector:string, callback?:Function):HTMLCollectionOf<Element> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByName(selector)) : document.getElementsByName(selector);
}

export const oneByClass = (selector:string, callback?:Function, index:number = 0):HTMLElement | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByClassName(selector)) : document.getElementsByClassName(selector)[typeof index == "number" && index >=0 ? index : 0];
}
export const allByClass = (selector:string, callback?:Function):HTMLCollectionOf<Element> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByClassName(selector)) : document.getElementsByClassName(selector);
}

export const formById = (selector:string) => {
    if(!_document()) {
        return null;
    }
    return oneById(selector);
}
export const formsByIds = (selectors:Array<string>) => {
    if(!_document()) {
        return null;
    }
    return selectors.map(selector => oneById(selector));
}

// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////

/**
 * @file All needed functions to get any DOM element or set with null and [] fallback
 */

// HTML GETTER

// SELECTORS FROM DOCUMENT

export const getById = function(id:string) {
    return typeof document == "undefined" ? null : document.getElementById(id);
};

export const getAllByTag = function(tag:string, asArray = false) {
    return typeof document == "undefined" ? [] : asArray == false ? document.getElementsByTagName(tag) : Array.from(document.getElementsByTagName(tag));
};
export const getOneByTag = function(tag:string, index = null) {
    return typeof document == "undefined" ? null : document.getElementsByTagName(tag)[index == null ? 0 : index];
};

export const getAllByClass = function(classname:string, asArray = false) {
    return typeof document == "undefined" ? [] : asArray == false ? document.getElementsByClassName(classname) : Array.from(document.getElementsByClassName(classname));
};
export const getOneByClass = function(classname:string, index = null) {
    return typeof document == "undefined" ? null : document.getElementsByClassName(classname)[index == null ? 0 : index];
};

export const getAllByName = function(name:string, asArray = false) {
    return typeof document == "undefined" ? [] : asArray == false ? document.getElementsByName(name) : Array.from(document.getElementsByName(name));
};
export const getOneByName = function(name:string, index = null) {
    return typeof document == "undefined" ? null : document.getElementsByName(name)[index == null ? 0 : index];
};

export const selectOne = function(selector:string, index = null) {
    return typeof document == "undefined" ? null : index == null ? document.querySelector(selector) : document.querySelectorAll(selector)[index == null ? 0 : index];
};
export const selectAll = function(selector:string, asArray = false) {
    return typeof document == "undefined" ? [] : asArray == false ? document.querySelectorAll(selector) : Array.from(document.querySelectorAll(selector));
};

// SELECTORS FROM HTML ELEMENT

// UP Créer fonction qui génère le DOM path d'un élément
// Utiliser la structure de indexElement en remontant
// tagName + (id ?? classlist.join('.') + (:nth(x) ?? '')) + >
// ajouter le paramètre id à la fin
// export const getByIdIn = function(id, item) {
//     return typeof document == "undefined" || isElement(item) == false ? null : item.getElementById(id);
// };

export const getAllByTagIn = function(tag:string, item:Element, asArray = false) {
    return typeof document == "undefined" || isElement(item) == false ? [] : asArray == false ? item.getElementsByTagName(tag) : Array.from(item.getElementsByTagName(tag));
};
export const getOneByTagIn = function(tag:string, item:Element, index = null) {
    return typeof document == "undefined" || isElement(item) == false ? null : item.getElementsByTagName(tag)[index == null ? 0 : index];
};

export const getAllByClassIn = function(classname:string, item:Element, asArray = false) {
    return typeof document == "undefined" || isElement(item) == false ? [] : asArray == false ? item.getElementsByClassName(classname) : Array.from(item.getElementsByClassName(classname));
};
export const getOneByClassIn = function(classname:string, item:Element, index = null) {
    return typeof document == "undefined" || isElement(item) == false ? null : item.getElementsByClassName(classname)[index == null ? 0 : index];
};

export const getAllByNameIn = function(name:string, item:Element, asArray = false) {
    return typeof document == "undefined" || isElement(item) == false ? [] : asArray == false ? item.getElementsByTagName(name) : Array.from(item.getElementsByTagName(name));
};
export const getOneByNameIn = function(name:string, item:Element, index = null) {
    return typeof document == "undefined" || isElement(item) == false ? null : item.getElementsByTagName(name)[index == null ? 0 : index];
};

export const selectOneIn = function(selector:string, item:Element, index = null) {
    return typeof document == "undefined" || isElement(item) == false ? null : index == null ? item.querySelector(selector) : item.querySelectorAll(selector)[index == null ? 0 : index];
};
export const selectAllIn = function(selector:string, item:Element, asArray = false) {
    return typeof document == "undefined" || isElement(item) == false ? [] : asArray == false ? item.querySelectorAll(selector) : Array.from(item.querySelectorAll(selector));
};


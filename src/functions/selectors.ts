function _document():boolean {
    return typeof document == "undefined" ? false : true;
}

export const selectOne = (selector:string, callback?:Function):HTMLElement | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.querySelectorAll(selector)) : document.querySelector(selector);
}
export const selectAll = (selector:string, callback?:Function):NodeListOf<HTMLElement> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.querySelectorAll(selector)) : document.querySelectorAll(selector);
}

export const getById = (selector:string):HTMLElement | null => {
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
export const allByTag = (selector:string, callback?:Function):HTMLCollectionOf<HTMLElement> | null => {
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
export const allByName = (selector:string, callback?:Function):HTMLCollectionOf<HTMLElement> | null => {
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
export const allByClass = (selector:string, callback?:Function):HTMLCollectionOf<HTMLElement> | null => {
    if(!_document()) {
        return null;
    }
    return callback != null ? callback(document.getElementsByClassName(selector)) : document.getElementsByClassName(selector);
}

export const formById = (selector:string) => {
    if(!_document()) {
        return null;
    }
    return getById(selector);
}
export const formsByIds = (selectors:Array<string>) => {
    if(!_document()) {
        return null;
    }
    return selectors.map(selector => getById(selector));
}
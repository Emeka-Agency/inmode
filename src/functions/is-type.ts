/**
 * @file All needed generic functions to type-check of passed through elements
 */

export const isElement = (_element) => {
    try {
        return _element instanceof Element || _element instanceof HTMLDocument ? true : false;
    }
    catch(err) {
        _trace(err);
        _error(err);
        return false
    }
}

export const areElements = (_elements) => {{return isArray(_elements) == false ? false : _elements.map(_el => isElement(_el)).filter(elem => elem).length == _elements.length ? true : false;}}

export const isInput = (element) => {return element instanceof HTMLInputElement ? true : false;}
export const isButton = (element) => {return element instanceof HTMLButtonElement ? true : false;}
export const isSelect = (element) => {return element instanceof HTMLSelectElement ? true : false;}

export const isString = (_value) => {return typeof _value == "string" ? true : false;}
export const isBoolean = (_value) => {return typeof _value == "boolean" ? true : false;}
export const isObject = (_value) => {return typeof _value == "object" && !Array.isArray(_value) ? true : false;}
export const isArray = (_value) => {return Array.isArray(_value) ? true : false;}
export const isNumber = (_value) => {return typeof _value == "number" ? true : false;}
export const isFloat = (_value) => {return _value % 1 != 0 ? true : false;}
export const isEmpty = (_value) => {return _value == null || _value == undefined ? true : false;}
export const isUndefined = (_value) => {return _value === undefined ? true : false;}
export const isNull = (_value) => {return _value === null ? true : false;}
export const isFunction = (_value) => {return typeof _value == "function" ? true : false;}

export const areString = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isString(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areBoolean = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isBoolean(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areObject = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isObject(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areArray = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isArray(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areNumber = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isNumber(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areFloat = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isFloat(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areEmpty = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isEmpty(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areUndefined = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isUndefined(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areNull = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isNull(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areFunction = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isFunction(_val)).filter(elem => elem).length == _values.length ? true : false;}

export const isEmptyString = (_value) => {return isString(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyObject = (_value) => {return isObject(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyArray = (_value) => {return isArray(_value) == false ? true : Object.keys(_value).length <= 0 ? true : false;}

export const areEmptyString = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyString(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areEmptyObject = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyObject(_val)).filter(elem => elem).length == _values.length ? true : false;}
export const areEmptyArray = (_values) => {return isArray(_values) == false ? false : _values.map(_val => isEmptyArray(_val)).filter(elem => elem).length == _values.length ? true : false;}
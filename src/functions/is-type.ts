/**
 * @file All needed generic functions to type-check of passed through elements
 */

import { err_log } from "./logging";

export const isElement = (_element:any) => {
    try {
        return _element instanceof Element || _element instanceof HTMLDocument ? true : false;
    }
    catch(err:any) {
        err_log(err, "functions/is-type.ts:isElement catch");
        return false
    }
}

export const areElements = (_elements:any) => {{return isArray(_elements) == false ? false : _elements.map((_el:any) => isElement(_el)).filter((elem:any) => elem).length == _elements.length ? true : false;}}

export const isInput = (element:any) => {return element instanceof HTMLInputElement ? true : false;}
export const isButton = (element:any) => {return element instanceof HTMLButtonElement ? true : false;}
export const isSelect = (element:any) => {return element instanceof HTMLSelectElement ? true : false;}

export const isString = (_value:any) => {return typeof _value == "string" ? true : false;}
export const isBoolean = (_value:any) => {return typeof _value == "boolean" ? true : false;}
export const isObject = (_value:any) => {return typeof _value == "object" && !Array.isArray(_value) ? true : false;}
export const isArray = (_value:any) => {return Array.isArray(_value) ? true : false;}
export const isNumber = (_value:any) => {return typeof _value == "number" ? true : false;}
export const isFloat = (_value:any) => {return _value % 1 != 0 ? true : false;}
export const isEmpty = (_value:any) => {return _value == null || _value == undefined ? true : false;}
export const isUndefined = (_value:any) => {return _value === undefined ? true : false;}
export const isNull = (_value:any) => {return _value === null ? true : false;}
export const isFunction = (_value:any) => {return typeof _value == "function" ? true : false;}

export const areString = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isString(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areBoolean = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isBoolean(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areObject = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isObject(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areArray = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isArray(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areNumber = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isNumber(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areFloat = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isFloat(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areEmpty = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isEmpty(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areUndefined = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isUndefined(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areNull = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isNull(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areFunction = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isFunction(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}

export const isEmptyString = (_value:any) => {return isString(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyObject = (_value:any) => {return isObject(_value) == false ? true : _value.length <= 0 ? true : false;}
export const isEmptyArray = (_value:any) => {return isArray(_value) == false ? true : Object.keys(_value).length <= 0 ? true : false;}

export const areEmptyString = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isEmptyString(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areEmptyObject = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isEmptyObject(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
export const areEmptyArray = (_values:any) => {return isArray(_values) == false ? false : _values.map((_val:any) => isEmptyArray(_val)).filter((elem:any) => elem).length == _values.length ? true : false;}
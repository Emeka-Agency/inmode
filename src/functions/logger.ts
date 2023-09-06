/**
 * @file Describe the basic tools and values needed further
*/

const BUILD = true;

export const DEV_MODE = () => typeof window == "undefined" ? true : window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" ? true : false;
export const STAGE_MODE = () => typeof window == "undefined" ? false : DEV_MODE() == false && window.location.hostname == "inmodeuk.emeka.fr" ? true : false;
export const PROD_MODE = () => typeof window == "undefined" ? false : DEV_MODE() == false && STAGE_MODE() == false ? true : false;
export const current_page = () => typeof document != "undefined" ? document?.querySelector('body')?.getAttribute('data-page') ?? document?.location?.pathname : undefined;
export const locale = () => typeof document != "undefined" ? document?.querySelector('html')?.getAttribute('locale') : "en";

export const _log = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.log(any);
}

export const _warn = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.warn(any);
}

export const _trace = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.trace(any);
}

export const _error = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.error(any);
}

export const _group = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.group(any);
}

export const _groupEnd = function(force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.groupEnd();
}

export const _alert = function(any: any, force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    typeof window != "undefined" && (DEV_MODE() || force || _mode_force(force)) && window.alert(any);
}

export const _slog = function(any: any, style = '', force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.log("%c" + any, style);
}

export const _swarn = function(any: any, style = '', force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.warn("%c" + any, style);
}

export const _strace = function(any: any, style = '', force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.trace("%c" + any, style);
}

export const _serror = function(any: any, style = '', force:string|boolean|null = false) {
    if(BUILD == true) {return false;}
    (DEV_MODE() || force || _mode_force(force)) && console.error("%c" + any, style);
}

export const _mode_force = function(_mode:string|boolean|null = null) {
    if(typeof _mode == "string" && _mode.length > 0) {
        switch(_mode) {
            case "dev": return DEV_MODE() == true;  
            case "stage": return STAGE_MODE() == true;  
            case "prod": return PROD_MODE() == true;  
            default: return false;
        }
    }
    return false;
}

_log("DEV_MODE");
STAGE_MODE() && _log("STAGE_MODE");
PROD_MODE() && _log("PROD_MODE");
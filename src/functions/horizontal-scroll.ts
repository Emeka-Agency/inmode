// CONST

import { err_log } from "./logging";

const initialized_particle = "h-initzd";

// INITS

export const __horizontal_scroll__Init = function(selector?:string, multiple:boolean = false):boolean {

    if(typeof "string" != "string" || typeof multiple != "boolean") {return false;}

    if(multiple) {
        return Array.from(document.querySelectorAll(`${selector ?? ".h-scroll"}:not(.${initialized_particle})`)).map(elem => {
            try {
                return initHorScrollElem(elem);
            }
            catch(err:any) {
                err_log(err, "functions/horizontal-scroll.ts:__horizontal_scroll__Init catch");
                return false;
            }
        }).filter(result => result).length > 0;
    }
    return initHorScrollElem(document.querySelector(selector ?? ".h-scroll"));
}

function initHorScrollElem(elem:Element|null = null):boolean {
    try {
        if(!(elem instanceof Element)) {return false;}
        elem.addEventListener('wheel', (e:any) => {
            e.preventDefault();
            scrollX(e.deltaY != 0 ? e.deltaY : e.deltaX, e.currentTarget);
        });
        return true;
    }
    catch(err:any) {
        err_log(err, "functions/horizontal-scroll.ts:initHorScrollElem catch");
        return false;
    }
}

// TOOLS

function scrollX(_dx = null, _elem:Element|null = null) {
    if(_dx == null || _dx == 0 || _elem == null || !(_elem instanceof Element)) {
        return false;
    }
    _elem.scrollLeft += _dx;
}
function scrollY(_dy = null, _elem:Element|null = null) {
    if(_dy == null || _dy == 0 || _elem == null || !(_elem instanceof Element)) {
        return false;
    }
    _elem.scrollTop += _dy;
}

// scrollY(e.deltaX != 0 ? e.deltaX : e.deltaY, [elem]);
import { capitalize } from "./capitalize";

export const format_string = function (str:string, has_to_be_lower:boolean = false, italic:boolean = false) {
    return str.replace('#', '').replace('|', '').replace('//', '');
    // let a:string = str.split('|')[0].replace('%', ' ');
    // let b:string = str.split('|')[1] && str.split('|')[1].replace('%', ' ');
    // let retour = undefined;
    // if(has_to_be_lower && italic) {
    //     retour = [].push(a.toLowerCase());
    //     if(b){retour.push(b.replace('#', '').toLowerCase());}
    // }
    // else if (has_to_be_lower) {
    //     retour = a.toLowerCase().replace('#', '');
    //     if(b){retour = retour + b.replace('#', '').toLowerCase();}
    // }
    // else if (italic) {
    //     retour = new Array(capitalize(a));
    //     if(b){retour.push(b.indexOf('#') === - 1 ? capitalize(b) : b.toUpperCase());}
    // }
    // else {
    //     retour = capitalize(a).replace('#', '');
    //     if(b){retour = retour + (b.indexOf('#') === - 1 ? capitalize(b) : b.toUpperCase());}
    // }
    // return retour;
}
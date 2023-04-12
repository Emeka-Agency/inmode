// TODO géénraliser la fonction (selector, {classList: action['add', 'remove']})

import { getById } from "./selectors";

export const resolve_mini_menu_opened = () => {
    remove('opened', document?.getElementsByClassName('menu-title'));
    remove('opened', document?.getElementsByClassName('menu-dk-title'));
}

export const resolveOnClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent> | any, is_link:boolean, openOnClick?:boolean) => {
    if(openOnClick === true) {
        !is_link && e.preventDefault();
        if(e.target.parentNode.classList.contains('opened')) {
            e.target.parentNode.classList.remove('opened');
        }
        else {
            e.preventDefault();
            resolve_mini_menu_opened();
            e.target.parentNode.classList.add('opened')
        }
    }
}

export const resolve_tab_link_selected = () => {
    remove('current', document?.getElementsByClassName('tab-link'));
}

const remove = (classname:string = "", elems:HTMLCollectionOf<Element>) => {
    if(!elems) {
        return false;
    }
    for(let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(classname);
    }
}

// const add = (classname = "", elems = []) => {
//     for(let i = 0; i < elems.length; i++) {
//         elems[i].classList.add(classname);
//     }
// }
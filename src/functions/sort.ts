import { SogecommerceOrder } from "../components/interfaces";

export const _sort_html_list = (array:any[], index:string = 'name', way:string = 'up') => {
    if(!array || !Array.isArray(array)) {
        return [];
    }
    if(typeof index !== 'string') {
        return array;
    }
    if(way !== 'up' && way !== 'down') {
        return array;
    }
    if(way === 'up') {
        return array.sort((a, b) => a[index] > b[index] ? 1 : a[index] < b[index] ? -1 : 0)
    }
    return array.sort((a, b) => a[index] < b[index] ? 1 : a[index] > b[index] ? -1 : 0)
}

export const _sort_object = (object:any, way:string = 'up'):SogecommerceOrder | Object | {} => {
    if(!object || typeof object !== 'object' || Array.isArray(object)) {
        return {};
    }
    if(way !== 'up' && way !== 'down') {
        return object;
    }
    if(way == 'up') {
        return Object.keys(object).sort((a, b) => a > b ? 1 : -1).reduce((res:any, key:any) => (res[key] = object[key], res), {} );
    }
    return Object.keys(object).sort((a, b) => a < b ? 1 : -1).reduce((res:any, key:any) => (res[key] = object[key], res), {} );
}
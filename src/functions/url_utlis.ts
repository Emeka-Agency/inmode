export const get_url_params = () => {
    if(typeof window != undefined) {
        return Object.fromEntries(window?.location.search.replace('?', '').split('&').map(elem => elem.split('=')));
    }
    else {
        return {};
    }
}
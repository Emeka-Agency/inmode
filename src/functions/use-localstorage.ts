export const useLocalStorage = ({
    'getItem': (function(key:string) {
        if(typeof window !== `undefined`) {
            return window?.localStorage.getItem(key);
        }
        else {
            return null;
        }
    }),
    'setItem': (function(key:string, val:any) {
        if(typeof window !== `undefined`) {
            return window?.localStorage.setItem(key, val);
        }
        else {
            return null;
        }
    }),
});
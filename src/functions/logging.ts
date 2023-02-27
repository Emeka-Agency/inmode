import { _log, _trace } from "./logger";

export const err_log = function(__err:string|Array<any>|object, __from:string) {
    const body = {
        "error": typeof __err == "string" ? __err : (__err instanceof Array ? Object.fromEntries(__err.map((e, i) => [i, e])) : __err instanceof Object ? __err : __err),
        "from": `${window?.location.href}:::${__from}`
    };
    
    if(window?.location.host != "inmodemd.fr") {
        try {
            _trace(__err);
        }
        catch(err) {
            _trace(err);
        }
    }

    let promise:void | Response;

    let headers = new Headers();
    // console.log(headers.get('content-type'));
    let vars:RequestInit = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    };

    fetch((process.env.INMODE_BACK || "https://inmodemd.fr/admin") + "/api/front-logs", vars)
    .then(res => res.json())
    .then(res => _log(res))
    .catch(err => _log(err));
}
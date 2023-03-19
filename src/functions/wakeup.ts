import { _error, _slog } from "./logger";

const initWakeup = function(from = "unk") {

    if(typeof window == "undefined") {
        return false;
    }

    _slog(`From : ${from}`, "color: red; font-size: 16px; font-weight: bold;");

    const request_init:RequestInit = {
        method: 'POST',
        headers: {},
        cache: 'default',
        body: JSON.stringify({"from": from}),
    };

    fetch(
        `${process.env.INMODE_BACK}/api/launch`,
        request_init
    )
    .then(function(res) {
        try {
            return res.json();
        }
        catch(err_json:any) {
            _error(err_json, "functions/fetch.ts:initWakeup catch promise.json() error");
            try {
                return res.text();
            }
            catch(err_text:any) {
                _error(err_text, "functions/fetch.ts:initWakeup catch promise.text() error");
                try {
                    return res.blob();
                }
                catch(err_blob:any) {
                    _error(err_blob, "functions/fetch.ts:initWakeup catch promise.blob() error");
                    return null;
                }
            }
        }
    })
    .then((res) => {
        // console.log(res);
    })
    .catch(err => _error(err, "functions/fetch.ts:initWakeup main catch"));

    return true;
};

export default initWakeup;
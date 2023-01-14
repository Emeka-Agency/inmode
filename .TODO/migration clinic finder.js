const strapi_url = "https://inmodeuk-content.emeka.fr/clinic-finders";
const airtable_url = "https://api.airtable.com/v0/appLk9xVxYYnTUftG/Clinics";
const airtable_key = "key181wgNDrYM2bms";

function strapi2airtable(results = null) {
    if(results == null || !(results instanceof Array)) {return [];}
    return results.map(el => {
        return {
            "name": el.name || "",
            "address": el.address || "",
            "shire": el.shire || "",
            "city": el.city || "",
            "zip_code": el.zip_code || "",
            "doctor": el.doctor || "",
            "mail": el.mail || "",
            "url": el.url || "",
            "number": el.number || "",
            "treatments": el.treatments instanceof Array && el.treatments.length == 0 ? null : el.treatments.map(t => t.Name)
        };
    })
}

function fillAirtable(datas = null) {
    if(datas == null || !(datas instanceof Array)) {return false;}
    datas.map(el => {
        fetch(
            airtable_url,
            {
                method: "POST",
                headers: new Headers({
                    "Authorization" : `Bearer ${airtable_key}`,
                    "Content-type": "application/json",
                    "accept": "application/json"
                }),
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": el
                        }
                    ]
                })
            }
        )
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
}

function startMigration() {
    fetch("https://inmodeuk-content.emeka.fr/clinic-finders?_limit=500")
    .then(res => res.json())
    .then(res => {
        if(res instanceof Array && res.length > 0) {
            fillAirtable(strapi2airtable(res));
        }
    })
    .catch(err => console.log(err));
}
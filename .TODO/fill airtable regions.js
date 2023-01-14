// GET
// fetch(
//     "https://api.postcodes.io/postcodes?query=OX49 5NU"
// )
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(err => console.log(err))

// POST
// fetch(
//     "https://api.postcodes.io/postcodes",
//     {
//         "method": "POST",
//         "headers": new Headers({
//             "Content-Type": "application/json",
//         }),
//         "body": JSON.stringify({
//             "postcodes" : ["OX49 5NU", "M32 0JG", "NE30 1DP"]
//         })
//     }
// )
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(err => console.log(err))

const airtable_url = "https://api.airtable.com/v0/appLk9xVxYYnTUftG/Clinics";
const airtable_key = "key181wgNDrYM2bms";

let clinics = [];
let regions = [];

function patchClinics() {
    clinics.forEach(clinic => {
        fetch(
            "https://api.airtable.com/v0/appLk9xVxYYnTUftG/Clinics",
            {
                headers: new Headers({
                    "Authorization" : `Bearer ${airtable_key}`,
                    "Content-type": "application/json",
                    "accept": "application/json"
                }),
                "method": "PATCH",
                "body": JSON.stringify({
                    "records": [
                        {
                            "id": clinic.id,
                            "fields": {
                                "region": clinic.region
                            }
                        },
                    ]
                })
            }
        )
    })
}

let i = 0;

function getRegions() {
    clinics.forEach((clinic, index) => {
        fetch(
            `https://api.postcodes.io/postcodes?query=${clinic.zip}`
        )
        .then(res => res.json())
        .then(res => {
            ++i;
            if(res.status == 200 && res.result != null) {
                clinics[index].region = res.result[0].european_electoral_region;
            }
            if(i == clinics.length) {
                clinics = clinics.filter(clinic => clinic.region);
                patchClinics();
            }
        })
        .catch(err => console.log(err))
    });
}

function getClinics(offset = null) {
    fetch(
        `${airtable_url}?${offset == null ? '' : `offset=${offset}&`}filterByFormula=NOT%28%7Bzip_code%7D%20%3D%20%27%27%29`,
        {
            headers: new Headers({
                "Authorization" : `Bearer ${airtable_key}`,
                "Content-type": "application/json",
                "accept": "application/json"
            }),
        }
    )
    .then(res => res.json())
    .then(res => {
        if(res.records) {
            clinics = [...clinics, ...res.records];
        }
        if(res.offset) {
            getClinics(res.offset);
        }
        else {
            clinics = clinics.map(clinic => clinic.fields ? {"zip": clinic.fields.zip_code, "id": clinic.id} : null).filter(el => el);
            getRegions();
        }
    })
    .catch(err => console.log(err));
}

// fetch(
//     airtable_url,
//     {
//         method: "POST",
//         headers: new Headers({
//             "Authorization" : `Bearer ${airtable_key}`,
//             "Content-type": "application/json",
//             "accept": "application/json"
//         }),
//         body: JSON.stringify({
//             "records": [
//                 {
//                     "fields": el
//                 }
//             ]
//         })
//     }
// )
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(err => console.log(err));
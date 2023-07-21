import { Airtable_Clinic_Interface, Geo_Position } from "../interfaces"

const getDistanceOnSphere = (lat1:number, lon1:number, lat2:number, lon2:number):number => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)  // deg2rad below
    const dLon = deg2rad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
}

const deg2rad = (deg:number):number => {
    return deg * (Math.PI / 180)
}

export const address_to_coordinates = async (_address:string):Promise<any> => {
    const url = `https://nominatim.openstreetmap.org/search?q=${_address}&format=json&limit=1`
    const response = await fetch(url);
    const data = await response.json();
    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

export const filterClinics = async (_clinics:Airtable_Clinic_Interface[], _address:string, _distance:number = 10) => {
    const coo = await address_to_coordinates(_address) ?? [0, 0];
    return _clinics.filter(clinic => 
        clinic.coordinates &&
        getDistanceOnSphere(
            clinic.latitude,
            clinic.longitude,
            coo.lat,
            coo.lon
        ) < _distance
    );
}

export const is_in_radius = async (_clinic:Airtable_Clinic_Interface, _address:string, _distance:number = 10) => {
    const coo = await address_to_coordinates(_address) ?? [0, 0];
    return _clinic.coordinates &&
        getDistanceOnSphere(
            _clinic.latitude,
            _clinic.longitude,
            coo.lat,
            coo.lon
        ) < _distance;
}
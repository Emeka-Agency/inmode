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

export const filterClinics = (_clinics:Airtable_Clinic_Interface[], _position:Geo_Position, _distance:number = 10) => {
    return _clinics.filter(clinic => 
        clinic.coordinates &&
        getDistanceOnSphere(
            clinic.coordinates.latitude,
            clinic.coordinates.longitude,
            _position.latitude,
            _position.longitude
        ) < 500
    );
}
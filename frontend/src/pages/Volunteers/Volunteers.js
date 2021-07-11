import React from 'react'
import VolunteerProgress from "../../pages/AdminPanel/VolunteerProgress"

export default function Volunteers() {
    const volunteer_data = [
        {
            "role": 1,
            "status": "Active",
            "verified": 1,
            "requirement": [
                "60e960279df4182296e06aaf"
            ],
            "_id": "60e9b078b98a1c6d4801fde4",
            "name": "Hemant",
            "email": "isha27255@gmail.com",
            "address": "efrgthyju",
            "city": "mumbai",
            "pincode": "400703",
            "interest": "xyz",
            "contact": "952989252",
            "dob": "fgh",
            "blood": "rt",
            "duration": "123",
            "profession": "architect",
            "password": "$2a$10$579w4G4hIIkVF/fpv07VGO17nQcFeSRq0TNnfnNDIPeI9zCCiVwCq",
            "confirmationCode": "TnjGZra7Q2795HNksshZBFK4t",
            "__v": 0
        },
        {
            "role": 1,
            "status": "Active",
            "verified": 1,
            "requirement": [
                "60e960279df4182296e06aaf"
            ],
            "_id": "60e9b078b98a1c6d4801fde4",
            "name": "Isha",
            "email": "isha27255@gmail.com",
            "address": "efrgthyju",
            "city": "delhi",
            "pincode": "400703",
            "interest": "ttr",
            "contact": "952989252",
            "dob": "fgh",
            "blood": "rt",
            "duration": "123",
            "profession": "engineer",
            "password": "$2a$10$579w4G4hIIkVF/fpv07VGO17nQcFeSRq0TNnfnNDIPeI9zCCiVwCq",
            "confirmationCode": "TnjGZra7Q2795HNksshZBFK4t",
            "__v": 0
        },
        {
            "role": 1,
            "status": "Active",
            "verified": 1,
            "requirement": [
                "60e960279df4182296e06aaf"
            ],
            "_id": "60e9b078b98a1c6d4801fde4",
            "name": "Hetul",
            "email": "isha27255@gmail.com",
            "address": "efrgthyju",
            "city": "hyderabad",
            "pincode": "400703",
            "interest": "xyz",
            "contact": "952989252",
            "dob": "fgh",
            "blood": "rt",
            "duration": "123",
            "profession": "doctor",
            "password": "$2a$10$579w4G4hIIkVF/fpv07VGO17nQcFeSRq0TNnfnNDIPeI9zCCiVwCq",
            "confirmationCode": "TnjGZra7Q2795HNksshZBFK4t",
            "__v": 0
        }
    ];
    
    return (
        <div  style={{color:"black"}}>
           <div className="VolunteerProgress">
                <VolunteerProgress volunteers={volunteer_data}/>
            </div>
        </div>
    )
}

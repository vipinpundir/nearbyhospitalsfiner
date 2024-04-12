import React, { useState } from 'react';

function NearPlaces(props) {
    const [nearbyHospitals, setNearbyHospitals] = useState([]);
    const [loading, setLoading] = useState(false);


    const searchNear = async () => {
        setLoading(true)
        const url = `https://maps-data.p.rapidapi.com/nearby.php?query=hospital&lat=${props.lat}&lng=${props.lng}&limit=10&country=india&lang=en&offset=0&zoom=12`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '383e691bb8mshac467d25d022d04p1200cajsn65adf614d0b6',
                'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setNearbyHospitals(result.data);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="searchSection">
            <h2 className="heading">Nearby Hospitals</h2>
            <p><strong>Your current location is: </strong>  {props.address}</p>
            <button className="button" onClick={searchNear}>Search</button>
            </div>
            {loading ? <p>loading...</p>
            : <>
            <div className="card-container">
                {nearbyHospitals.map((hospital, index) => (
                    <div key={index} className="card">
                        <h3>{hospital.name}</h3>
                        <p><strong>Address:</strong> {hospital.full_address}</p>
                        <p><strong>Phone:</strong> {hospital.phone_number}</p>
                        <p><strong>Rating:</strong> {hospital.rating}</p>
                        <p><strong>Reviews:</strong> {hospital.review_count}</p>
                        <p><strong>Website:</strong> {hospital.website}</p>
                        <p><strong>Types:</strong> {hospital.types && hospital.types.join(', ')}</p>
                        <p><strong>City:</strong> {hospital.city}</p>
                        {hospital.photos && (
                            <div className="photos-container">
                                <strong>Photos:</strong>
                                {hospital.photos.map((photo, photoIndex) => (
                                    <img key={photoIndex} src={photo.src} alt='' />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            </>}
        </div>
    );
}

export default NearPlaces;

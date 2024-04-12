
import React from 'react'
import { useEffect, useState } from 'react';
import NearPlaces from './NearPlaces';

function FetchUserLocation() {

    const [userLocation, setUserLocation] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    getAddressFromCoordinates(latitude, longitude)
                    
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const getAddressFromCoordinates = (latitude, longitude) => {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    
        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name;
                setUserAddress(address)
            })
            .catch(error => {
                console.error("Error fetching address:", error);
            });
    };


    useEffect(() => {
        getUserLocation();
    }, []);

    console.log(userLocation, "locationOF USER")
    return (
        <NearPlaces lat={userLocation?.latitude} lng={userLocation?.longitude} address={userAddress} />
    )
}

export default FetchUserLocation


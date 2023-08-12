"use client";

import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Dispatch, SetStateAction, useState } from 'react';
import MapComponent from './map';
import SearchBox from './searchbox';

interface Location {
  lat: number,
  lng: number,
  description: string,
}

const RidePage = () => {
  const [pickupLocation, setPickupLocation] = useState<Location>({lat: 0, lng: 0, description: ""});
  const [destination, setDestination] = useState<Location>({lat: 0, lng: 0, description: ""});
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });
  const markers = [
    { lat: pickupLocation.lat, lng: pickupLocation.lng, label: 'Current Location' },
    { lat: destination.lat, lng: destination.lng, label: 'Destination' },
  ];

  const handlePickupChange = (value: any) => {
    setPickupLocation(value);
  };

  const handleDestinationChange = (value: any) => {
    setDestination(value);
  };

  const handleSelect = (value: string, setter: Dispatch<SetStateAction<Location>>) => {
    // Implement the logic to retrieve latitude and longitude from the selected place
  };

  const handleFindDriver = () => {
    console.log("find driver");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Find a Driver</h1>
      <MapComponent markers={markers} />
      <div className='flex flex-row justify-around mb-4'>
        <div>
          <SearchBox value={pickupLocation.description} onChange={handlePickupChange} onSelect={(value) => handleSelect(value, setPickupLocation)} />
        </div>
        <div>
          <SearchBox value={destination.description} onChange={handleDestinationChange} onSelect={(value) => handleSelect(value, setDestination)} />
        </div>
      </div>
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none w-full"
        onClick={handleFindDriver}
      >
        Find a Driver
      </button>
    </div>
  );
};

export default RidePage;

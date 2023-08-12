import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MarkerType {
  lat: number;
  lng: number;
  label: string;
}

interface MapComponentProps {
  markers: MarkerType[];
}

const MapboxMap: React.FC<MapComponentProps> = ({ markers }) => {
  const mapboxToken = 'pk.eyJ1IjoiYXl1c2gtb2xpIiwiYSI6ImNsbDY0MWZzdTBmNjgzbHM4dGhkeWcxaWQifQ.ggzHGHtCLzraNlyoHBaF4g';
  const mapStyle = { width: '100%', height: '100%' };
  const [viewport, setViewport] = useState({
    latitude: 27.6934249, // Default latitude
    longitude: 85.3364891, // Default longitude
    zoom: 10,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
        }));
        console.log(latitude, longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <main className="w-full h-60">
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={mapStyle}
        {...viewport}
        onViewportChange={(newViewport: any) => setViewport(newViewport)}
        maxZoom={20}
        minZoom={3}
      >
        {markers.map((marker, index) => (
          <Marker key={index} latitude={marker.lat} longitude={marker.lng}>
            <div>{marker.label}</div>
          </Marker>
        ))}
      </Map>
    </main>
  );
};

export default MapboxMap;

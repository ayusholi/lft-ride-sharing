"use client";
import Map, { NavigationControl, GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";

function MapboxMap() {
  const mapboxToken = "pk.eyJ1IjoiYXl1c2gtb2xpIiwiYSI6ImNsbDY0MWZzdTBmNjgzbHM4dGhkeWcxaWQifQ.ggzHGHtCLzraNlyoHBaF4g";
  const mapStyle = {width: "100%", height: "100%" };
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude);
        setLong(longitude);
        console.log(latitude, longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const markers = [{
    lat: 27.6934249,
    long: 85.3364891,
    label: "Kathmandu, Nepal",
  }];

  return (
    <main className="w-full h-60">
      <p>{lat}, {long}</p>
			<Map
				mapboxAccessToken={mapboxToken}
				mapStyle="mapbox://styles/mapbox/streets-v12"
				style={mapStyle}
				initialViewState={{ latitude: lat, longitude: long, zoom: 10 }}
				maxZoom={20}
				minZoom={3}
			>
        {/* <GeolocateControl position="top-left" />
				<NavigationControl position="top-left" /> */}
        {markers.map((marker, index) => (
        <Marker key={index} latitude={marker.lat} longitude={marker.long}>
          <div>{marker.label}</div>
        </Marker>
      ))}
      </Map>
		</main>
  );
}

export default MapboxMap;

import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import ParkData from "./data/park.json";

import { formatRelative } from "date-fns";
import mapstyles from "./components/mapstyles";

const options = {
  styles: mapstyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vh",
  height: "100vh",
};

const center = {
  lat: 36.991421,
  lng: 35.33083,
};

function App() {
  const [mapcoor, setMapcoor] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries,
  });

  useEffect(() => {
    console.log(isLoaded);
  }, []);

  return (
    <div className="w-full h-full min-w-full mx-auto flex flex-col align-middle items-center    justify-center min-h-screen min-w-screen">
      <h1 className="text-4xl font-bold z-10 top-20">Google Maps API - Emin</h1>
      {isLoaded && (
        <GoogleMap
          className="top-0 z-0"
          // bootstrapUrlKeys={GoogleMapConfig}
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          // center={center}

          // defaultZoom={10}
          center={{ lat: 45.4211, lng: -75.6903 }}
          options={options}
          onClick={(e) => {
            setMapcoor((current) => [
              ...current,
              {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
              },
            ]);
          }}
        >
          {mapcoor.map((marker, key) => {
            return (
              <Marker
                key={key}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            );
          })}

          {ParkData.features.map((park, key) => {
            return (
              <Marker
                key={park.geometry.coordinates[1]}
                position={{
                  lat: park.geometry.coordinates[1],
                  lng: park.geometry.coordinates[0],
                }}
              />
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
}

export default App;

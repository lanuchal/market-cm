import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "65%",
  borderRadius: "0.5rem",
};

function MapShow({ m_lat, m_lng }) {
  const [zoom, setZoom] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setZoom(10);
    }, 200);
  }, [m_lat]);

  const center = {
    lat: parseFloat(m_lat),
    lng: parseFloat(m_lng),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCG3JPHnaJdXsArTqD8KSIebk_1B_JMzHg",
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>{<Marker position={center} />}</>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapShow);

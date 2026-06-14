import React, { useState, useRef, useEffect } from "react";

import { Box } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";

import Map from "./components/Map/Map";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import WhyDialog from "./components/WhyDialog";
import LegendDialog from "./components/LegendDialog";

const center = { lat: 39.828175, lng: -98.5795 };

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    document.title = "Military Lodging Map";
  }, []);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [openWhy, setOpenWhy] = useState(false);
  const [openLegend, setOpenLegend] = useState(false);

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleOpenWhy = () => {
    setOpenWhy(true);
  };

  const handleCloseWhy = () => {
    setOpenWhy(false);
  };

  const handleOpenLegend = () => {
    setOpenLegend(true);
  };

  const handleCloseLegend = () => {
    setOpenLegend(false);
  };

  async function calculateRoute() {
    const origin = originRef.current?.value;
    const destination = destinationRef.current?.value;

    if (!origin || !destination) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");

    if (originRef.current) {
      originRef.current.value = "";
    }

    if (destinationRef.current) {
      destinationRef.current.value = "";
    }
  }

  if (!isLoaded) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Map
        center={center}
        selectedMarker={selectedMarker}
        handleMarkerClick={handleMarkerClick}
        handleInfoWindowClose={handleInfoWindowClose}
        directionsResponse={directionsResponse}
      />

      <SearchPanel
        originRef={originRef}
        destinationRef={destinationRef}
        calculateRoute={calculateRoute}
        clearRoute={clearRoute}
        distance={distance}
        duration={duration}
        onOpenLegend={handleOpenLegend}
        onOpenAbout={handleOpenWhy}
      />

      <LegendDialog open={openLegend} onClose={handleCloseLegend} />

      <WhyDialog open={openWhy} onClose={handleCloseWhy} />
    </Box>
  );
};

export default App;
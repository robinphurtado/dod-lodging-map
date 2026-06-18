import React, { useState, useRef, useEffect } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(true);

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

  const toggleSearchPanel = () => {
  setIsSearchPanelOpen((prev) => !prev);
};

  async function calculateRoute() {
    const origin = originRef.current?.value;
    const destination = destinationRef.current?.value;

    console.log("Origin:", origin);
    console.log("Destination:", destination);

    if (!origin || !destination) {
      console.log("Missing origin or destination");
      return;
    }
    
    try{

    const directionsService = new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    console.log("Directions results:", results);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    } catch(error) {
      console.error("Route calculation failed: ", error);
    }
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

  function toggleFilter(value, selectedValues, setSelectedValues) {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
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
        selectedBranches={selectedBranches}
        selectedPropertyTypes={selectedPropertyTypes}
      />

      {isSearchPanelOpen && (
        <SearchPanel
          originRef={originRef}
          destinationRef={destinationRef}
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
          distance={distance}
          duration={duration}
          onOpenLegend={handleOpenLegend}
          onOpenAbout={handleOpenWhy}
          selectedBranches={selectedBranches}
          selectedPropertyTypes={selectedPropertyTypes}
          onToggleBranch={(branch) =>
            toggleFilter(branch, selectedBranches, setSelectedBranches)
          }
          onTogglePropertyType={(type) =>
            toggleFilter(type, selectedPropertyTypes, setSelectedPropertyTypes)
          }
          onClose={toggleSearchPanel}
        />
      )}

      {!isSearchPanelOpen && (
        <Tooltip title="Open search panel">
          <IconButton
            onClick={toggleSearchPanel}
            sx={{
              position: "absolute",
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
              zIndex: 11,
              bgcolor: "background.paper",
              color: "primary.main",
              boxShadow: 4,
              "&:hover": {
                bgcolor: "background.paper",
              },
            }}
            aria-label="Open search panel"
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        )}

      <LegendDialog open={openLegend} onClose={handleCloseLegend} />

      <WhyDialog open={openWhy} onClose={handleCloseWhy} />
    </Box>
  );
};

export default App;
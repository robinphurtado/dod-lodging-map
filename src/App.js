import React, { useState, useRef, useEffect } from "react";

import { Grid, TextField, Typography } from "@mui/material";
import Map from "./components/Map/Map";
import WhyDialog from "./components/WhyDialog";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Input,
} from "@mui/material";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import { DisabledByDefaultTwoTone } from "@mui/icons-material";
import { NearMe } from "@mui/icons-material";

const center = { lat: 39.828175, lng: -98.5795 };

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    document.title = "Military Lodging Map";
  }, []);

  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [openWhy, setOpenWhy] = useState(false);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClickOpenWhy = () => {
    setOpenWhy(true);
  };

  const handleCloseWhy = () => {
    setOpenWhy(false);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  if (!isLoaded) {
    return "Loading....";
  }

  async function calculateRoute() {
    if (
      originRef.current.firstChild.value === "" ||
      destinationRef.current.firstChild.value === ""
    ) {
      return;
    }
    // console.log(originRef);
    // console.log(destinationRef);
    console.log(originRef.current.firstChild.value);
    console.log(destinationRef.current.firstChild.value);

    const directionsService = new google.maps.DirectionsService(); //eslint-disable-line
    const results = await directionsService.route({
      origin: originRef.current.firstChild.value,
      destination: destinationRef.current.firstChild.value,
      travelMode: google.maps.TravelMode.DRIVING, //eslint-disable-line
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.firstChild.value = "";
    destinationRef.current.firstChild.value = "";
  }

  return (
    // this is the main box/ root box
    <Box
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgcolor="blue.200"
      height="100vh"
      width="100vw"
    >
      {/* this is the box the map is in */}
      <Box
        position="absolute"
        left={0}
        top={0} //this number pushes the map away from the top of the screen
        backgroundColor="white"
        h="100%"
        w="100%"
      >
        {/* Google MapBox */}

        <Map
          onLoad={(map) => setMap(map)}
          center={center}
          selectedMarker={selectedMarker}
          handleMarkerClick={handleMarkerClick}
          handleInfoWindowClose={handleInfoWindowClose}
          directionsResponse={directionsResponse}
        />
      </Box>
      {/* end of box containing map */}
      {/* This Container holds the navigation box */}

      {/* playing with a button to move the navigation text to a modal */}
      <Grid
        container
        justifyContent="flex-end"
        alignItems="flex-end"
        position="absolute"
        top={80}
        right={40}
        direction="column"
        spacing={1}
      >
        {/* <Grid item>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Legend
          </Button>
        </Grid> */}
      </Grid>

      <Grid
        container
        justifyContent="flex-end"
        alignItems="flex-end"
        position="absolute"
        bottom={80}
        right={60}
        spacing={1}
      >
        <Grid item>
          <Button variant="contained" onClick={handleClickOpenWhy}>
            WHY?
          </Button>
          <WhyDialog open={openWhy} onClose={handleCloseWhy} />
        </Grid>
      </Grid>

      {/* end of grid and button I am playing with to convert to modal */}

      <Grid container justifyContent="center">
        <Box
          position="absolute"
          style={{ backgroundColor: "white" }}
          maxWidth="md"
          sx={{
            p: 4,
            borderRadius: 6,
            mt: 4,
            backgroundColor: "white",
            disableGutters: "true",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
            // zIndex: "modal",
          }}
        >
          {/* considering changing to text fields
          <TextField helperText="Origin"></TextField>
          <TextField helperText="Destination"></TextField>
          <Button variant="contained" type="submit" onClick={calculateRoute}>
            Calculate Route
          </Button> */}

          {/* MOVING THIS TO ITS OWN COMPONENT************************************/}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>

            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>

            <ButtonGroup>
              <Button
                variant="contained"
                type="submit"
                onClick={calculateRoute}
              >
                Calculate Route
              </Button>
              <IconButton
                aria-label="center back"
                size="small"
                onClick={clearRoute}
              >
                <DisabledByDefaultTwoTone />
              </IconButton>
            </ButtonGroup>
          </Box>
          {/* end og the navigation prompt box */}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Typography>Distance:{distance} </Typography>
            <Typography>Duration: {duration} </Typography>
            <IconButton
              aria-label="center back"
              //onClick={() => map.panTo(center)}
            >
              <NearMe />
            </IconButton>
          </Box>
          {/* MOVING THIS TO ITS OWN COMPONENT************************************/}
        </Box>
      </Grid>
    </Box>
  );
};

export default App;

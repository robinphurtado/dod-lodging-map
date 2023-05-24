import React, { useState, useRef, Component } from "react";

import { /*CssBaseline,*/ Grid, TextField, Typography } from "@mui/material";

// import Header from "./components/Header/Header";
// import Footer from "./Footer";
import properties from "./properties";
import navyhotel from "./images/nhotelsmall.png";
import armyhotel from "./images/armyhotel.png";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Input,
  //   Typography,
} from "@mui/material";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
// import { useRef, useState } from "react";
import {
  FullscreenExit,
  DisabledByDefaultTwoTone,
  EventNote,
  Label,
} from "@mui/icons-material";
import { NearMe } from "@mui/icons-material";

const center = { lat: 39.828175, lng: -98.5795 };

const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
        //position="fixed"
        backgroundColor="white"
        h="100%"
        w="100%"
      >
        {/* Google MapBox */}
        <GoogleMap
          center={center}
          zoom={5}
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          onLoad={(map) => setMap(map)}
        >
          {/* This is just the initial marker at center */}
          {/* <Marker position={center} /> */}
          {/* testing new marker at center */}
          {/* <Marker position={center} icon={{ url: navyhotel }} /> */}
          {/* Display markers or directions */}
          {properties.map((property, index) => (
            <Marker
              key={index}
              position={{ lat: property.lat, lng: property.lon }}
              onClick={() => handleMarkerClick(property)}
              // icon={property.proptype == "Navy Hotel" ? navyhotel : null}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lon }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <Typography variant="subtitle1">
                  {selectedMarker.name}
                </Typography>
                <a
                  href={selectedMarker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </div>
            </InfoWindow>
          )}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      {/* end of box containing map */}

      {/* This Container holds the navigation box */}
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
              onClick={() => map.panTo(center)}
            >
              <NearMe />
            </IconButton>
          </Box>
          {/* end of the distance and durations box */}
        </Box>
        {/* end of container holding the navigation & distance duration */}
      </Grid>
    </Box>
    // end of main box
  );
};

export default App;

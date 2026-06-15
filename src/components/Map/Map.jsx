import React from "react";
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from "@react-google-maps/api";
import { Box, Button, Typography } from "@mui/material";

import properties from "../../properties";
import { getMarkerIcon } from "./markerIcons";

  //v2 v
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};
//v2 ^

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ center, selectedMarker, handleMarkerClick, handleInfoWindowClose, directionsResponse }) => {
    return(
        // v1 v
        <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}  //from v2
        >    
        
            {properties.map((property, index) => (
            <Marker
                //key={index}// v1
                key={`$${property.name}-${index}`}
                position={{ lat: property.lat, lng: property.lon }}
                icon={getMarkerIcon(property)}
                onClick={() => handleMarkerClick(property)}
            />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lon }}
                onCloseClick={handleInfoWindowClose}
              >
                <Box sx={{ maxWidth: 260, p: 1 }}>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {selectedMarker.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedMarker.proptype}
                  </Typography>

                  <Button
                    href={selectedMarker.url || selectedMarker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="contained"
                    fullWidth
                  >
                    Visit Website
                  </Button>
                </Box>
              </InfoWindow>
            // <InfoWindow  v1 
            //     position={{ lat: selectedMarker.lat, lng: selectedMarker.lon }}
            //     onCloseClick={handleInfoWindowClose}
            // >
            //     <div>
            //     <Typography variant="subtitle1">
            //         {selectedMarker.name}
            //     </Typography>
            //     <a
            //         href={selectedMarker.link}
            //         target="_blank"
            //         rel="noopener noreferrer"
            //     >
            //         Visit Website
            //     </a>
            //     </div>
            // </InfoWindow> v1 
            
            )}
            {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
            )}
        </GoogleMap>     
    );
};

export default Map;
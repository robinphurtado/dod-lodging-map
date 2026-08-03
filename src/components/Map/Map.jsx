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
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f3efe7" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#b7d7e8" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#c8c2b5" }],
    },
  ],
};
//v2 ^

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// NEW GETBRANCH FUNCTION
function getBranch(branch = "") {
  if (branch === "navy") return "Navy";
  if (branch === "army") return "Army";
  if (branch === "marine corps") return "Marines";
  if (branch === "coast guard") return "Coast Guard";
  if (branch === "air force") return "Air Force";
}


// OG branch function   function getBranch(proptype = "") {
  // if (proptype.includes("navy")) return "Navy";
  // //thought if (property.branch === "navy") return "Navy";
  // if (proptype.includes("army") || proptype.includes("IHG Army")) return "Army";
  // if (proptype.includes("marine") || proptype.includes("corps")) return "Marines";
  // if (proptype.includes("air force") || proptype.includes("af resort")) {
  //   return "Air Force";
  // }
  // if (proptype.includes("coast guard")) return "Coast Guard";

  // return "Other";
// } end OG branch function 


// OG PROPTYPE FUNCTION  RETURNS A STRING BECAUSE OLD PROPTYPE WAS ONLY ONE VALUE, NEED TO HANDLE ARRAY 
// function getPropertyTypes(proptype = [""]) {

//   if (proptype.includes("rv")) return "RV";

//   //if (proptype.includes("camp") || proptype.includes("rec")) return "Tent Camping";  og, troubleshooting
//   if (proptype.includes("camp")) return "Tent Camping";
//   if (proptype.includes("vacationrental") || proptype.includes("vacation rental")) {
//     return "Vacation Rental";
//   }
//   if (proptype.includes("resort")) return "Resort";
//   if (
//     proptype.includes("hotel") ||
//     proptype.includes("lodge") ||
//     proptype.includes("inns of the corps")
//   ) {
//     return "Hotel";
//   }

//   return "Other";

// }  
// OG PROPTYPE FUNCTION END

function getPropertyTypes(proptypes) {
  if (!Array.isArray(proptypes)) return [];

  return proptypes.map(type => {
    switch (type) {
      case "hotel":
        return "Hotel";
      case "rv":
        return "RV";
      case "camp":
        return "Tent Camping";
      case "vacationrental":
        return "Vacation Rental";
      case "resort":
        return "Resort";
      default:
        return type;
    }
  });
}


const Map = ({ 
  center, 
  selectedMarker, 
  handleMarkerClick, 
  handleInfoWindowClose, 
  directionsResponse,
  selectedBranches = [],
  selectedPropertyTypes = [],
}) => {

console.log(properties.length);
console.log(properties[0]);

  const filteredProperties = properties.filter((property) => {
  const branch = getBranch(property.branch);
  const propertyType = getPropertyTypes(property.proptypes);

  const matchesBranch =
    selectedBranches.length === 0 || selectedBranches.includes(branch);

  
  // OG MATCHESPROPERTYTYPE
  // const matchesPropertyType =
  //   selectedPropertyTypes.length === 0 ||
  //   selectedPropertyTypes.includes(propertyType);
  //   // idk what I was thinking here property.properties.includes(propertyType);
  // END OF OG MATCHESPROPERTYTYPE

const propertyTypes = getPropertyTypes(property.proptypes);

const matchesPropertyType =
  selectedPropertyTypes.length === 0 ||
  propertyTypes.some(type => selectedPropertyTypes.includes(type));
  

  return matchesBranch && matchesPropertyType;
});

    return(
        // v1 v
        <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}  //from v2
        >    
        
            {filteredProperties.map((property, index) => (
            <Marker
                //key={index}// v1
                key={`${property.name}-${index}`}
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
                    {getPropertyTypes(selectedMarker.proptypes).join(", ")}
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
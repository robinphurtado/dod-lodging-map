import React from "react";
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from "@react-google-maps/api";
import properties from "../../properties";
import { Typography } from "@mui/material";

import navyhotel from "../../images/navyhotelsm.png";
import navycamp from "../../images/navycampsm.png";
import navyvacay from "../../images/navyvacaysm.png";
import armyhotel from "../../images/armyhotelsm.png";
import armycamp from "../../images/armycampsm.png";
import armyvacay from "../../images/armyvacaysm.png";
import mchotel from "../../images/mchotelsm.png";
// import mccamp from "../../images/mccampsm.png";
import mcvacay from "../../images/mcvacaysm.png";
import afhotel from "../../images/afhotelsm.png";
// import afcamp from "../../images/afcampsm.png";
// import afvacay from "../../images/afvacaysm.png";
// import cghotel from "../../images/cghotelsm.png";
import cgcamp from "../../images/cgcampsm.png";
import cgvacay from "../../images/cgvacaysm.png";
import afresort from "../../images/resortsm.png";

const getMarkerIcon = (property) => {
    switch (property.proptype) {
      case "Navy Hotel":
        return navyhotel;
      case "Navy RV":
        return navycamp;
      case "Navy VacationRental":
        return navyvacay;
      case "Army Hotel":
        return armyhotel;
      case "IHG Army Hotels":
        return armyhotel;
      case "Army RV":
        return armycamp;
      case "Army VacationRental":
        return armyvacay;
      case "marine lodge":
        return mchotel;
      case "inns of the corps":
        return mchotel;
      case "marine getaways":
        return mcvacay;
      case "Air Force Hotel":
        return afhotel;
      case "coast guard rec":
        return cgcamp;
      case "coast guard vacation rental":
        return cgvacay;
      case "af resort":
        return afresort;
      default:
        return null;
    }
  };

const Map = ({ center, selectedMarker, handleMarkerClick, handleInfoWindowClose, directionsResponse }) => {
    return(

        <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        >
            {properties.map((property, index) => (
            <Marker
                key={index}
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
    );
}
export default Map;
import navyhotel from "../../images/navyhotelsm.png";
import navycamp from "../../images/navycampsm.png";
import navyvacay from "../../images/navyvacaysm.png";

import armyhotel from "../../images/armyhotelsm.png";
import armycamp from "../../images/armycampsm.png";
import armyvacay from "../../images/armyvacaysm.png";

import mchotel from "../../images/mchotelsm.png";
import mccamp from "../../images/mccampsm.png";
import mcvacay from "../../images/mcvacaysm.png";

import afhotel from "../../images/afhotelsm.png";
import cgcamp from "../../images/cgcampsm.png";
import cgvacay from "../../images/cgvacaysm.png";
import afresort from "../../images/resortsm.png";

export function getMarkerIcon(property) {
  switch (property.proptype) {
    case "Navy Hotel":
      return navyhotel;
    case "Navy RV":
      return navycamp;
    case "Navy VacationRental":
      return navyvacay;

    case "Army Hotel":
    case "IHG Army Hotels":
      return armyhotel;
    case "Army RV":
      return armycamp;
    case "Army VacationRental":
      return armyvacay;

    case "marine lodge":
    case "inns of the corps":
      return mchotel;
    case "marine getaways":
      return mcvacay;
    case "marine camp":
      return mccamp;

    case "Air Force Hotel":
      return afhotel;
    case "af resort":
      return afresort;

    case "coast guard rec":
      return cgcamp;
    case "coast guard vacation rental":
      return cgvacay;

    default:
      return null;
  }
}
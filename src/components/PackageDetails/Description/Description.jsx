import "./Description.css";
import { IoWifi } from "react-icons/io5";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdOutlinePool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { MdFreeBreakfast } from "react-icons/md";

const Description = ({ packageData }) => {
  return (
    <div className="DescriptionPackage">
      <div className="TitlePackage">
        <h2>{packageData.title}</h2>
      </div>

      <div className="TitlePackage">
        <p style={{ color: "gray" }}>
          {packageData.numberGuests} hóspedes{" "}
          {packageData.accommodationDetails.numberBaths} cama{" "}
          {packageData.accommodationDetails.numberBeds} banheiro
        </p>
      </div>
      <br></br>
      <div className="Description" style={{ textAlign: "center" }}>
        <p>{packageData.description}</p>
      </div>

      <div className="PackageService">
        <h2>
          <i>Serviços</i>
        </h2>

        <ul style={{ listStyle: "none" }}>
          {packageData.accommodationDetails.hasWifi && (
            <li>
              {" "}
              <IoWifi style={{ marginRight: "5px" }} /> Wi-Fi
            </li>
          )}
          {packageData.accommodationDetails.hasParking && (
            <li>
              <BiSolidCarGarage style={{ marginRight: "5px" }} /> Estacionamento
            </li>
          )}
          {packageData.accommodationDetails.hasPool && (
            <li>
              <MdOutlinePool style={{ marginRight: "5px" }} /> Piscina
            </li>
          )}
          {packageData.accommodationDetails.hasGym && (
            <li>
              <CgGym style={{ marginRight: "5px" }} /> Academia
            </li>
          )}
          {packageData.accommodationDetails.hasRestaurant && (
            <li>
              <IoRestaurant style={{ marginRight: "5px" }} /> Restaurante
            </li>
          )}
          {packageData.accommodationDetails.hasPetFriendly && (
            <li>
              <MdOutlinePets style={{ marginRight: "5px" }} /> Pet
            </li>
          )}
          {packageData.accommodationDetails.hasAirConditioning && (
            <li>
              <AcUnitIcon style={{ fontSize: "16px", marginRight: "5px" }} />{" "}
              Ar-condicionado
            </li>
          )}
          {packageData.accommodationDetails.hasBreakfastIncluded && (
            <li>
              <MdFreeBreakfast style={{ marginRight: "5px" }} /> Café da manhã
              incluso
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Description;

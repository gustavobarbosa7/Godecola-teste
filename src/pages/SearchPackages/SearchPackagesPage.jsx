import "./SearchPackagesPage.css";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import { CustomPriceField } from "../../components/CustomInputs/CustomPriceField";
import { CustomLogicDate } from "../../components/CustomInputs/CustomLogicDate";

export default function SearchPackagesPage() {
  const today = new Date().toISOString().split("T")[0];
  const { form, onChangeForm } = useForm({
    Price: "",
    InicialDate: "",
    FinalDate: "",
  });
  const [destination, setDestination] = useState("");
  const [date] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [budget] = useState("");

  const handleSearch = () => {
    console.log("Filtros selecionados:", {
      destino: destination,
      data: date,
      adultos: adults,
      crianças: children,
      valor: budget,
    });
  };

  return (
    <div className="container-search">
      <Box className="search-container">
        <Typography variant="h6" sx={{ mb: 2 }} className="title-packcage">
          Para onde?
        </Typography>

        <TextField
          label="Buscar destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              color: "var(--primary-text-color)", // cor do texto digitado
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "var(--primary-text-color)" }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              color: "var(--primary-text-color)",
              "&.Mui-focused": {
                color: "var(--orange-avanade)",
              },
            },
          }}
          sx={{
            backgroundColor: "var(--background-color)",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary-text-color)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--orange-avanade)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--orange-avanade)",
              },
            },
          }}
        />

        <CustomLogicDate
          label="Data de início"
          name="InicialDate"
          value={form.InicialDate}
          onChange={onChangeForm}
          minDate={today}
        />

        <CustomLogicDate
          label="Data final"
          name="FinalDate"
          value={form.FinalDate}
          onChange={onChangeForm}
          minDate={form.InicialDate || today}
        />

        <Box
          className="search-input people-selector"
          sx={{
            alignItems: "center",
            padding: "12px 16px",
            border: "1px solid var(--primary-text-color)",
            borderRadius: "8px",
            backgroundColor: "transparent",
            transition: "border-color 0.3s, box-shadow 0.3s",

            "&:hover": {
              borderColor: "var(--orange-avanade)",
            },
            "&:focus-within": {
              borderColor: "var(--orange-avanade)",
              boxShadow: "0 0 0 1px var(--orange-avanade)",
            },
          }}
        >
          <Typography sx={{ color: "var(--primary-text-color)" }}>
            Quem?
          </Typography>

          <Box className="people-group">
            <span className="texts">Adultos</span>
            <div>
              <button
                onClick={() => setAdults(adults - 1)}
                disabled={adults <= 1}
                className="icon-value"
              >
                {" "}
                -{" "}
              </button>
              <span className="texts">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="icon-value"
              >
                {" "}
                +{" "}
              </button>
            </div>
          </Box>
          <Box className="people-group">
            <span className="texts">Crianças</span>
            <div>
              <button
                onClick={() => setChildren(children - 1)}
                disabled={children <= 0}
              >
                -
              </button>
              <span className="texts">{children}</span>
              <button onClick={() => setChildren(children + 1)}>+</button>
            </div>
          </Box>
        </Box>

        <CustomPriceField
          label="Preço"
          name="Price"
          value={form.Price}
          onChange={onChangeForm}
          mask={{
            prefix: "R$ ",
            thousandSeparator: ",",
            decimalSeparator: ".",
            decimalScale: 2,
            fixedDecimalScale: true,
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSearch}
          className="search-button"
        >
          Buscar
        </Button>
      </Box>
    </div>
  );
}

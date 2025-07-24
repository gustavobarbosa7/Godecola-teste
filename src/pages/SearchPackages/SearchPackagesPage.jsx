import "./SearchPackagesPage.css";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Search, CalendarToday, AttachMoney } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchPackagesPage() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState("");

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
    <div className="container">
      <Box className="search-container">
        <Typography variant="h6" sx={{ mb: 2 }} className="title">
          Para onde?
        </Typography>

        <TextField
          label="Buscar destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          Input={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          className="search-input"
          InputLabelProps={{
            sx: { color: "var(--primary-text-color)" },
          }}
        />

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Data"
          customInput={
            <TextField
              label="Data"
              variant="outlined"
              fullWidth
              className="search-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday
                      sx={{ color: "var(--primary-text-color)" }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  color: "var(--primary-text-color)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-text-color)",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "var(--primary-text-color)",
                },
              }}
            />
          }
        />

        <Box className="search-input people-selector">
          <Typography>Quem?</Typography>
          <Box className="people-group">
            <span>Adultos</span>
            <div>
              <button
                onClick={() => setAdults(adults - 1)}
                disabled={adults <= 1}
                className="icon-value"
              >
                {" "}
                -{" "}
              </button>
              <span>{adults}</span>
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
            <span>Crianças</span>
            <div>
              <button
                onClick={() => setChildren(children - 1)}
                disabled={children <= 0}
              >
                -
              </button>
              <span>{children}</span>
              <button onClick={() => setChildren(children + 1)}>+</button>
            </div>
          </Box>
        </Box>

        <TextField
          label="Valor"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          className="search-input"
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

import "./SearchPackagesPage.css";
import packagesData from "../../travels.mock.json";
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
// import axios from "axios";
import { PackageCard } from "../../components/PackageCard/PackageCard";
//import { Link } from "react-router-dom";

export default function SearchPackagesPage() {
  const today = new Date().toISOString().slice(0, 10);
  const { form, onChangeForm } = useForm({
    Price: "",
    InicialDate: "",
    FinalDate: "",
  });
  const [destination, setDestination] = useState("");
  const [date] = useState(null);
  const [adults, setAdults] = useState(1);
  const [budget] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const handleSearch = async () => {
    try {
      // Passo 1: busca todos os pacotes
      const todosPacotes = packagesData;

      // const response = await axios.get(
      //   "http://localhost:5071/api/travel-packages"
      // );
      //busca filtro pela API
      // const todosPacotes = response.data;

      // console.log("Pacotes recebidos da API:", todosPacotes);

      // Passo 2: aplica os filtros no frontend
      const pacotesFiltrados = todosPacotes.filter((pacote) => {
        //teste
        console.log("→ destino:", destination, "vs", pacote.destination);
        console.log("→ adultos:", adults, "vs", pacote.numberGuests);

        const normalize = (str) =>
          str
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const destinoMatch =
          !destination ||
          (pacote.destination &&
            pacote.destination
              .toLowerCase()
              .includes(destination.toLowerCase()));

        const dataInicialMatch =
          form.InicialDate === "" ||
          (pacote.startDate &&
            new Date(pacote.startDate) >= new Date(form.InicialDate));

        const dataFinalMatch =
          form.FinalDate === "" ||
          (pacote.endDate &&
            new Date(pacote.endDate) <= new Date(form.FinalDate));

        const precoMaximoMatch =
          form.Price === "" ||
          (pacote.price &&
            pacote.price <=
              parseFloat(
                form.Price.replace("R$", "")
                  .replace(/\./g, "")
                  .replace(",", ".")
              ));

        const adultosMatch =
          adults === undefined ||
          !pacote.numberGuests ||
          pacote.numberGuests >= adults;

        return (
          destinoMatch &&
          dataInicialMatch &&
          dataFinalMatch &&
          precoMaximoMatch &&
          adultosMatch
        );
      });

      setBuscaRealizada(true);
      setResultados(pacotesFiltrados);

      setResultados(pacotesFiltrados);
      console.log("Pacotes filtrados:", pacotesFiltrados);
    } catch (error) {
      console.error("Erro ao buscar pacotes:", error);
    }
  };

  //   const handleSearch = async () => {
  //     console.log("Filtros selecionados:", {
  //       destino: destination,
  //       data: date,
  //       adultos: adults,
  //       crianças: children,
  //       valor: budget,
  //     });

  //   const response = await axios.get("http://localhost:5071/api/travel-packages"),

  //   setResultados(response.data);
  //     console.log("Pacotes encontrados:", response.data);
  //     catch (error) {
  //     console.error("Erro ao buscar pacotes:", error);
  //   }
  // };

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
            Quantidade:
          </Typography>

          <Box className="people-group">
            <span className="texts">Hóspedes</span>
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

        {buscaRealizada && resultados.length === 0 && (
          <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
            Nenhuma reserva encontrada com os filtros selecionados.
          </Typography>
        )}

        {resultados.length > 0 && (
          <Box
            className="resultados-box-edit"
          >
            {resultados.map((pacote) => (
              <PackageCard
                key={pacote.id}
                id={pacote.id}
                title={pacote.title}
                price={pacote.price}
                rating={pacote.rating}
                imageSrc={pacote.mediasUrl}
              />
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}

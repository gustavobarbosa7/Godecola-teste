import "./SignUpPage.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "auto" } }}
      noValidate
      autoComplete="off"
    >
      <div className="SingUpcontainer">
        <div className="formSing">
          <h2>CADASTRA - SE</h2>
          <div className="formText">
            {/* Campo Nome */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="inputNome"
              label="Nome"
              color="warning"
              variant="standard"
              required
            />

            {/* Campo Sobrenome */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="inputSobrenome"
              label="Sobrenome"
              color="warning"
              variant="standard"
              required
            />

            {/* Campo Email */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="inputEmail"
              label="E-mail"
              color="warning"
              variant="standard"
              required
            />

            {/* Campo SENHA VIZUALIZAÇÃO */}
            <FormControl sx={{ m: 1, width: "auto" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password" color="warning">
                Senha
              </InputLabel>
              <Input
                sx={{ color: "var(--primary-text-color)" }}
                id="standard-adornment-password"
                color="warning"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* Campo Telefone */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="telefone"
              label="Telefone"
              color="warning"
              variant="standard"
              required
            />

            {/* Campo CPF */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="cpf"
              label="CPF"
              color="warning"
              variant="standard"
              inputProps={{ maxLength: 11 }}
              required
            />

            <b>ou</b>

            {/* Campo Passaporte */}
            <TextField
              sx={{ input: { color: "var(--primary-text-color)" } }}
              id="passaport"
              label="Passaporte"
              color="warning"
              variant="standard"
              required
            />

            <div className="Singup-between">
              <Link to="/Login" className="registered">
                Já sou cadastrado
              </Link>

              <button type="submit" className="singup-btn">
                CADASTRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SignUpPage;
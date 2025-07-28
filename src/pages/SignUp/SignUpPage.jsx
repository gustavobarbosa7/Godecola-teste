import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CustomTextfield } from "../../components/CustomInputs/CustomTextfield";
import {useForm} from "../../hooks/useForm";
import  {CustomNumericField} from "../../components/CustomInputs/CustomNumericField";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();


  const { form, onChangeForm, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    passaport: ""
  })

  // onde vai ser a logica de envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    resetForm(); // Reseta o formulário após o envio
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "auto" } }}
      noValidate
      autoComplete="off"
    >
      <div className="SingUpcontainer">
        <div className="formSing">
          <h2>CADASTRA - SE</h2>
          <div className="formText">
            {/* Campo Nome */}
            <CustomTextfield
              value={form.firstName}
              onChange={onChangeForm}
              name="firstName"
              label="Nome"

              required
            />


            {/* Campo Sobrenome */}
            <CustomTextfield
              value={form.lastName}
              onChange={onChangeForm}
              name="lastName"
              label="Sobrenome"

              required
            />

            {/* Campo Email */}
            <CustomTextfield
              value={form.email}
              onChange={onChangeForm}
              name="email"
              label="E-mail"

              required
            />

            {/* Campo SENHA VIZUALIZAÇÃO */}
            <FormControl sx={{ m: 1, width: "auto" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password" color="warning">
                Senha
              </InputLabel>
              <Input
                sx={{ color: "var(--primary-text-color)" }}
                name="password"
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
            <CustomNumericField
              value={form.phone}
              onChange={onChangeForm}
              label="Telefone"
              name="phone"
              mask="(00) 00000-0000"
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
              <div onClick={() => goToLogin(navigate)} className="registered">
                Já sou cadastrado
              </div>

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

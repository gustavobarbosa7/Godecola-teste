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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomTextfield } from "../../components/CustomInputs/CustomTextfield";
import { useForm } from "../../hooks/useForm";
import { CustomNumericField } from "../../components/CustomInputs/CustomNumericField";
import { signup } from "../../services/authService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const { form, onChangeForm, resetForm } = useForm({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    cpf: "",
    rne: "",
    passaport: "",
  });

  // onde vai ser a logica de envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validação básica

      if (
        !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.password ||
        !form.phone
      ) {
        setError("Por favor, preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError("Por favor, insira um email válido.");
        setLoading(false);
        return;
      }

      // Validação de senha (mínimo 6 caracteres, 1 maiúscula, 1 número, 1 caractere especial)
      if (form.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        setLoading(false);
        return;
      }

      const hasUpperCase = /[A-Z]/.test(form.password);
      const hasNumber = /\d/.test(form.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);

      if (!hasUpperCase) {
        setError("A senha deve conter pelo menos uma letra maiúscula.");
        setLoading(false);
        return;
      }

      if (!hasNumber) {
        setError("A senha deve conter pelo menos um número.");
        setLoading(false);
        return;
      }

      if (!hasSpecialChar) {
        setError(
          'A senha deve conter pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>).'
        );
        setLoading(false);
        return;
      }

      if (!form.cpf && !form.rne) {
        setError("Por favor, preencha o CPF ou RNE.");
        setLoading(false);
        return;
      }

      // Validação de CPF (se preenchido)
      if (form.cpf && form.cpf.replace(/\D/g, "").length !== 11) {
        setError("CPF deve ter 11 dígitos.");
        setLoading(false);
        return;
      }

      // Prepara os dados para envio
      const userData = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        password: form.password,
        cpf: form.cpf || null,
        rne: form.rne || null,
        passaport: form.passaport || null,
      };

      // Remove campos vazios
      Object.keys(userData).forEach((key) => {
        if (userData[key] === "" || userData[key] === null) {
          delete userData[key];
        }
      });

      // Chama o serviço de cadastro
      const response = await signup(userData);

      setSuccess(
        "Cadastro realizado com sucesso! Redirecionando para o login..."
      );
      resetForm();

      // Redireciona para login após 2 segundos
      setTimeout(() => {
        goToLogin(navigate);
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao realizar cadastro. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
          <h2>CADASTRE - SE</h2>

          {/* Mensagens de feedback */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <div className="formText">
            {/* Campo Nome */}
            <CustomTextfield
              value={form.firstName}
              onChange={onChangeForm}
              name="firstName"
              label="Nome*"
              required
            />

            {/* Campo Sobrenome */}
            <CustomTextfield
              value={form.lastName}
              onChange={onChangeForm}
              name="lastName"
              label="Sobrenome*"
              required
            />

            {/* Campo Email */}
            <CustomTextfield
              value={form.email}
              onChange={onChangeForm}
              name="email"
              label="E-mail*"
              required
            />

            {/* Campo SENHA VIZUALIZAÇÃO */}
            <FormControl variant="standard" sx={{ width: "100%", m: 1 }}>
              <InputLabel
                htmlFor="password"
                sx={{
                  color: "var(--text-footer)",
                  "&:hover": {
                    color: "var(--icons-login-color)",
                  },
                  "&.Mui-focused": {
                    color: "var(--orange-avanade)",
                  },
                  "&:before": {
                    borderBottomColor: "var(--icons-login-color)",
                  },
                  "&:after": {
                    borderBottomColor: "var(--orange-avanade)",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "var(--orange-avanade)",
                  },
                }}
              >
                Senha *
              </InputLabel>
              <Input
                id="password"
                name="password"
                value={form.password}
                onChange={onChangeForm}
                type={showPassword ? "text" : "password"}
                required
                sx={{
                  color: "var(--text-footer)",
                  "&:hover": {
                    color: "var(--icons-login-color)",
                  },
                  "&.Mui-focused": {
                    color: "var(--orange-avanade)",
                  },
                  "&:before": {
                    borderBottomColor: "var(--icons-login-color)",
                  },
                  "&:after": {
                    borderBottomColor: "var(--orange-avanade)",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "var(--orange-avanade)",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      sx={{ color: "var(--icons-login-color)" }}
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
              label="Telefone*"
              name="phone"
              mask="(00) 00000-0000"
              required
            />

            <br />
            <b className="cpf-passaport-text">
              Preencha pelo menos um dos campos abaixo: CPF ou RNE
            </b>

            {/* Campo CPF */}
            <CustomNumericField
              value={form.cpf}
              onChange={onChangeForm}
              name="cpf"
              label="CPF*"
              mask="000.000.000-00"
              maxLength={11}
              required={!form.passaport} // CPF é obrigatório se Passaporte não for preenchido
            />

            <b style={{ color: "var(--text-footer)" }}>ou</b>

            <CustomTextfield
              value={form.rne}
              onChange={onChangeForm}
              name="rne"
              label="RNE" // RNE é obrigatório se Passaporte não for preenchido
            />

            {/* Campo Passaporte */}
            <CustomTextfield
              value={form.passaport}
              onChange={onChangeForm}
              name="passaport"
              label="Passaporte"
              maxLength={8}
            />

            <div className="Singup-between">
              <div onClick={() => goToLogin(navigate)} className="registered">
                Já sou cadastrado
              </div>

              <button type="submit" className="singup-btn" disabled={loading}>
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    CADASTRANDO...
                  </>
                ) : (
                  "CADASTRAR"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SignUpPage;

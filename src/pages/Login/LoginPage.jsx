import "./LoginPage.css";
import logo from "../../assets/go_decola_logo_01.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToRecPassMail, goToSignUp, goToHome } from "../../routes/coordinator";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { fetchCurrentUser } from '../../store/userActions'
import { login } from "../../services/authService";
import { parseJwt } from "../../utils/jwt";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { form, onChangeForm, resetForm } = useForm({
    email: "",
    password: "",
  });
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email: form.email,
        password: form.password,
      });

      const { token } = response;
      const payload = parseJwt(token);
      const userId = payload?.nameid || payload?.sub || null;

      if (!userId) throw new Error('ID do usuário não encontrado no token');

      dispatch(loginSuccess({ token, userId }));
      dispatch(fetchCurrentUser());
      
      resetForm();
      goToHome(navigate)
    } catch (error) {
      console.error('Erro no login:', error);
      return (
        error.response?.data?.message ||
        'Falha no login. Verifique suas credenciais.'
      );
    }
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  return (
    <div className="Logincontainer">
      {/* lado direito(esquerdo) da tela */}
      <div className="left">
        <img src={logo} alt="Go Decola" className="logo" />
        <h2>GO Decola</h2>
        <p>Sua próxima aventura começa aqui!</p>
        <p>Descubra destinos incríveis com os melhores preços.</p>
        <p>
          Pacotes exclusivos, passagens baratas e experiências inesquecíveis.
        </p>
      </div>
      <div className="divider"></div> {/**barra divisória da página*/}
      {/* lado esquerdo(direito) da tela */}
      <div className="right">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de e-mail com ícone */}
          <Box
            sx={{
              label: { color: "var(--primary-text-color)" },
              display: "flex",
              alignItems: "flex-end",
              width: "94%",
              ml: 1,
              mb: 2,
            }}
          >
            <AccountCircle sx={{ color: "black", mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="input-email">E-mail</InputLabel>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={onChangeForm}
              />
            </FormControl>
          </Box>

          {/* Campo de senha com ícone de visibilidade e ícone do cadeado */}
          <Box
            sx={{
              label: { color: "var(--primary-text-color)" },
              display: "flex",
              alignItems: "flex-end",
              width: "94%",
              ml: 1,
              mb: 2,
            }}
          >
            <LockIcon sx={{ color: "black", mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Senha
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChangeForm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <div onClick={() => goToRecPassMail(navigate)} className="forgot">
            Esqueci minha senha
          </div>
          <div className="login-between">
            <p className="text-end">
              <span className="highlight-orange">
                TA AFIM DE VIAJAR ?<br />
              </span>
              <span className="highlight-orange">
                VEM DE <strong className="highlight-purple"> GO DECOLA </strong>
              </span>
            </p>
            <button type="submit" className="login-btn">
              LOGAR
            </button>
          </div>
          <div onClick={() => goToSignUp(navigate)} className="cadastro">
            Não possui cadastro? Cadastre-se
          </div>
        </form>
      </div>
    </div>
  );
}

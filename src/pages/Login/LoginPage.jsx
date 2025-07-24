import './LoginPage.css';
import logo from "../../assets/go_decola_logo_01.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToRecoveryPassword } from '../../routes/coordinator';
import { goToRecPassMail } from '../../routes/coordinator';
import { goToSignUp } from '../../routes/coordinator';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';


export default function LoginPage() {
  const navigate = useNavigate()
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
        <form>
          {/* Campo de e-mail com ícone */}
          <Box sx={{ label: { color: 'var(--primary-text-color)' }, display: 'flex', alignItems: 'flex-end', width: '94%', ml: 1, mb: 2 }}>
            <AccountCircle sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel htmlFor="input-email">E-mail</InputLabel>
              <Input id="input-email" type="email" />
            </FormControl>
          </Box>

          {/* Campo de senha com ícone de visibilidade e ícone do cadeado */}
          <Box sx={{ label: { color: 'var(--primary-text-color)' }, display: 'flex', alignItems: 'flex-end', width: '94%', ml: 1, mb: 2 }}>
            <LockIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
          <div className='login-between'>
            <p className="text-end">
              <span className="highlight-orange">TA AFIM DE VIAJAR ?<br /></span>
              <span className="highlight-orange">VEM DE <strong className="highlight-purple"> GO DECOLA </strong></span>
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
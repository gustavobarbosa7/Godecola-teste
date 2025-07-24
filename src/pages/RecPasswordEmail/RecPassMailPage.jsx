import './RecPassMailPage.css';
import logo from "../../assets/go_decola_logo_01.png"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';

export default function RecPassMailPage() {
  return (
    <div className="Logincontainer">

      {/* lado esquerdo da tela */}
      <div className="left">
        <img src={logo} alt="Go Decola" className="logo"/>
        <h2>GO Decola</h2>
        <p>Sua próxima aventura começa aqui!</p>
        <p>Descubra destinos incríveis com os melhores preços.</p>
        <p>
          Pacotes exclusivos, passagens baratas e experiências inesquecíveis.
        </p>
      </div>

      <div className="divider"></div>
      
      {/* lado direito da tela */}
      <div className="right">
        <h2>RECUPERE SUA SENHA</h2>
        <form>

          <p className='text-color-edit'>Para que você redefina sua senha, é necessário preencher o campo abaixo.</p>
          
          <Box sx={{ label: { color: 'var(--primary-text-color)' }, display: 'flex', alignItems: 'flex-end', width: '94%', ml: 1, mb: 2 }}>
            <AccountCircle sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel htmlFor="input-email">Digite seu e-mail cadastrado</InputLabel>
              <Input id="input-email" type="email" />
            </FormControl>
          </Box>

          <button type="submit" className="login-btn">
            ENVIAR
          </button>
          
        </form>
      </div>
    </div>
  );
}
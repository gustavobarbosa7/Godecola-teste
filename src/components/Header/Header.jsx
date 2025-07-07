import { useTheme } from '../../context/ThemeContext'
import { Toggle } from '../Toggle/Toggle'
import { useNavigate } from 'react-router-dom';
import { goToHome, goToLogin, goToSignUp } from '../../routes/coordinator';
import './Header.css'
import logo  from '../../assets/go_decola_logo_01_v2.png'

export const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="header">
      <img src={logo} alt="logotipo do Go Decola" className='logo' onClick={() => goToHome(navigate)}/>
            
      <button onClick={() => goToLogin(navigate)}>Login</button>
      <button onClick={() => goToSignUp(navigate)}>Cadastro</button>
      
      <Toggle handleChange={toggleTheme} isChecked={isDark} />
    </header>
  )
}
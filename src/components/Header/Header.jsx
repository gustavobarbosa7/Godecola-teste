import { useTheme } from '../../hooks/useTheme'
import { Toggle } from './Toggle/Toggle'
import { useNavigate } from 'react-router-dom'
import { goToHome } from '../../routes/coordinator'
import './Header.css'
import logoDesktop from '../../assets/go_decola_logo_02_v1.png'
import logoMobile from '../../assets/go_decola_logo_01_v1.png'
import { HeaderLoginButton } from './HeaderLoginButton/HeaderLoginButton'

export const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className='header'>
      <img
        src={logoDesktop}
        alt='logotipo do Go Decola'
        className='logoDesktop'
        onClick={() => goToHome(navigate)}
      />
            <img
        src={logoMobile}
        alt='logotipo do Go Decola'
        className='logoMobile'
        onClick={() => goToHome(navigate)}
      />
      <div className='header-right'>
        <HeaderLoginButton />
        <Toggle handleChange={toggleTheme} isChecked={isDark} />
      </div>
    </header>
  )
}

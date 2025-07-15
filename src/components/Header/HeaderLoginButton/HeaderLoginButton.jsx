import './HeaderLoginButton.css'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { useNavigate } from 'react-router-dom'
import { goToLogin, goToSignUp } from '../../../routes/coordinator'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCircleUser } from 'react-icons/fa6'
import Button from '@mui/material/Button'

export const HeaderLoginButton = () => {
  const navigate = useNavigate()

  return (
    <PopupState variant='popover' popupId='demo-popup-menu'>
      {popupState => (
        <div>
          <Button disableRipple {...bindTrigger(popupState)}>
            <div className='HeaderLoginButtonCss'>
              <FaCircleUser />
              <GiHamburgerMenu />
            </div>
          </Button>

          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                popupState.close()
                goToLogin(navigate)
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                goToSignUp(navigate)
                popupState.close()
              }}
            >
              Cadastrar
            </MenuItem>
          </Menu>
        </div>
      )}
    </PopupState>
  )
}

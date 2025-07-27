import './Toggle.css'
import { FaSun, FaMoon } from 'react-icons/fa'
import Tooltip from '@mui/material/Tooltip'

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div >
      <input
        type='checkbox'
        id='check'
        className='toggle'
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor='check' className='toggle-label'>
        <Tooltip title={isChecked ? 'Dark Mode' : 'Light Mode'} placement='bottom' arrow>
          <span className='toggle-thumb'>
            {isChecked ? <FaMoon /> : <FaSun />}
          </span>
        </Tooltip>
      </label>
    </div>
  )
}

import './RecoveryPasswordPage.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react';
import { colors } from '@mui/joy';


export default function RecoveryPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  return (
    <div className="container-pwd">
      <h2>RECUPERE SUA SENHA</h2>
      <form className="edit-form-password">
        {/* Campo de senha com ícone de visibilidade e ícone do cadeado */}
        <Box sx={{ label: { color: 'var(--primary-text-color)' }, display: 'flex', alignItems: 'flex-end', width: '94%', ml: 1, mb: 2 }}>
          <LockIcon sx={{ color: 'var(--primary-text-color)', mr: 1, my: 0.5 }} />
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password"> Digite sua nova Senha </InputLabel>
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
                    sx={{ color: 'var(--primary-text-color)' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        {/* Campo de confirmar senha com ícone de visibilidade e ícone do cadeado */}
        <Box sx={{ label: { color: 'var(--primary-text-color)' }, display: 'flex', alignItems: 'flex-end', width: '94%', ml: 1, mb: 2 }}>
          <LockIcon sx={{ color: 'var(--primary-text-color)', mr: 1, my: 0.5 }} />
          <FormControl sx={{ width: '100%'}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Repita sua nova senha</InputLabel>
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
                    sx={{ color: 'var(--primary-text-color)'}}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </form>
      <div className='button-wrapper'>
        <button type="submit" className="btn-recovery">
          ENVIAR
        </button>
      </div>
    </div>
  );
}
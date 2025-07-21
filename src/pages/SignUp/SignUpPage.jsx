import './SignUpPage.css';
import { Link, Router } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  
  return (

    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: 'auto' } }}
      noValidate
      autoComplete="off"
      >
 


    <div className="SingUpcontainer">
      <div className="formSing">
        <h2>CADASTRA - SE</h2>
        <form className='formText'>

               {/* Campo Nome */}
              <TextField sx={{
                input: {color: 'var( --primary-text-color)'}}} id="InputName" label="Nome" color="warning" multilinemaxRows={4}variant="standard" required/>


                {/* Campo Email */}
              <TextField sx={{
                input: {color: 'var( --primary-text-color)'}}} id="Inputemail" label="E-mail" color="warning" multilinemaxRows={4}variant="standard" required/>



              {/* Campo SENHA VIZUALIZAÇÃO */}
               <FormControl sx={{ m: 1, width: 'auto' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password" color="warning" >Senha</InputLabel>
          <Input
             sx={{color: 'var( --primary-text-color)'}} id="standard-adornment-password" color="warning" type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
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
              <TextField sx={{
                input: {color: 'var( --primary-text-color)'}}} id="telefone" label="Telefone" color="warning" multilinemaxRows={4}variant="standard" required/>
              <br></br>


               {/* Campo CPF */}
              <TextField sx={{
                input: {color: 'var( --primary-text-color)'}}} id="cpf" label="CPF" color="warning" multilinemaxRows={4}variant="standard" inputProps={{ maxlength: 11}} required />
               <b>ou</b>


                {/* Campo Passaporte */}
              <TextField sx={{
                input: {color: 'var( --primary-text-color)'}}} id="passaport" label="Passaporte" color="warning" multilinemaxRows={4}variant="standard" required/>

          <div className="Singup-between">
            <Link to="/Login" className="registered">
            Já sou cadastrado
          </Link>

            <button type="submit" className="singup-btn">
              CADASTRAR
            </button>
          </div>
           
        </form>
      </div>
    </div>
       </Box>
  );
};

export default SignUpPage;
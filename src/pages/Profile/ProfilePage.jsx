import './ProfilePage.css';
import React, { useState } from "react";
import { Box, Avatar, Button } from "@mui/material";

const ProfilePage = () => {
   const [selectedImage, setSelectedImage] = useState(null);

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  return (
    <div className='container-profile'>  
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>    
      <h1 className='title-profile'>SEU PERFIL</h1>  
    <label htmlFor="upload-photo">
       <Avatar
        src={selectedImage}
        alt="Foto de perfil"
        sx={{ width: 120, height: 120, cursor:"pointer" }}
      />
    </label>
      <input
        type="file"
        accept="image/*"
        id="upload-photo"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-photo">
        <Button variant="contained" component="span" sx={{ backgroundColor: 'var(--orange-avanade)' }}>
          Escolher foto
        </Button>
      </label>
    </Box>

    <div className='container-profile'>
      <div className='edit-subtitle'>
    <h2 className='subtitle-edit'>Dados pessoais</h2>
      </div>
    </div>

    <div className='edit-label'>
      <label htmlFor="username">Nome</label>
    </div>

    <div className='edit-label'>
      <label htmlFor="email">E-mail</label>
    </div>

    <div className='edit-label'>
      <label htmlFor="password">Senha</label>
    </div>

    <div className='edit-label'>
      <label htmlFor="cellphone">Telefone</label>
    </div>

    <div className='edit-label'>
      <label htmlFor="cpf">CPF</label>
    </div>

    <div className='edit-label'>
      <label htmlFor="passport">Passaporte</label>
    </div>

    </div>
    
  )
}

export default ProfilePage;
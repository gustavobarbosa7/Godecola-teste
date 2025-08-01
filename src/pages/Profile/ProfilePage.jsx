import "./ProfilePage.css";
import React, { useState, useRef } from "react";
import {
  Box,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const EditableField = ({
  label,
  initialValue = "",
  type = "text",
  alwaysDisabled = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null);

  const toggleEdit = () => {
    if (alwaysDisabled) return;
    setEditable((prev) => !prev);
    if (!editable) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <TextField
      fullWidth
      type={type}
      variant="outlined"
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={!editable}
      inputRef={inputRef}
      InputProps={{
        endAdornment: !alwaysDisabled && (
          <InputAdornment position="end">
            <IconButton onClick={toggleEdit} edge="end">
              {editable ? <CloseIcon /> : <EditIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: "white",
        borderRadius: "30px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
          paddingRight: "15px",
          color: "var(--background-text-color)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FF5800",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FF5800",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FF5800", // borda quando clicado
        },

        "& label": {
          color: "#FF5800",
        },
        "&:hover label": {
          color: "#FF5800",
        },
        "&.Mui-focused label": {
          color: "#FF5800",
        },
      }}
    />
  );
};

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
    <div className="container-profile">
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <h1 className="title-profile">SEU PERFIL</h1>
        <label htmlFor="upload-photo">
          <Avatar
            src={selectedImage}
            alt="Foto de perfil"
            sx={{ width: 120, height: 120, cursor: "pointer" }}
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
          <Button
            variant="contained"
            component="span"
            sx={{ backgroundColor: "var(--orange-avanade)" }}
          >
            Escolher foto
          </Button>
        </label>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }} className="subtitle-edit">
          Dados Pessoais
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <EditableField label="Nome" alwaysDisabled />
          <EditableField label="E‑mail" type="email" />
          <EditableField label="Senha" type="password" encrypt alwaysDisabled />
          <EditableField label="Telefone" />
          <EditableField label="CPF" alwaysDisabled />
          <EditableField label="Passaporte" />
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;

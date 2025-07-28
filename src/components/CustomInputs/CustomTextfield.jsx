import TextField from "@mui/material/TextField";
export const CustomTextfield = ({ label, name, value, onChange }) => {
  return (
    <TextField
      label={label}
      name={name}
      variant="standard"
      value={value}
      onChange={onChange}
      required
      sx={{
        width: '100%',
        input: {
          color: "var(--text-footer)",
        },
        "&:hover input": {
          color: "var(--icons-login-color)",
        },
        "&:hover .MuiInputLabel-root": {
          color: "var(--icons-login-color)",
        },
        "& .MuiInputLabel-root": {
          color: "var(--icons-login-color)",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "var(--icons-login-color)",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "var(--orange-avanade)",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "var(--orange-avanade)",
        },
        "& .MuiInputBase-root.Mui-focused": {
          color: "var(--orange-avanade)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--orange-avanade)",
        },
      }}
    />
  );
};

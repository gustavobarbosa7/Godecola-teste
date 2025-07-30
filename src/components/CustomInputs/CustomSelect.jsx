import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) => (
  <FormControl
    required={required}
    sx={{
      width: "100%",
      "& .MuiInputLabel-root": {
        color: "var(--icons-login-color)",
      },
      "&:hover .MuiInputLabel-root": {
        color: "var(--icons-login-color)",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--orange-avanade)",
      },
    }}
  >
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      sx={{
        color: "var(--text-footer)",
        input: {
          color: "var(--text-footer)",
        },
        "&:hover input": {
          color: "var(--icons-login-color)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--icons-login-color)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-avanade)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-avanade)",
        },
        "& .MuiSelect-icon": {
          color: "var(--icons-login-color)",
        },
        "&:hover .MuiSelect-icon": {
          color: "var(--orange-avanade)",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "var(--orange-avanade)",
              color: "white",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "var(--orange-avanade)",
            },
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

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
    sx={{
      width: "100%",
    }}
  >
    <InputLabel
      sx={{
        color: "var(--no-active-tab)",
        "&.Mui-focused": {
          color: "var(--no-active-tab)",
        },
      }}
    >
      {label}
    </InputLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      label={label}
      sx={{
        color: "var(--text-footer)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--no-active-tab)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-avanade)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-avanade)",
        },
        "& .MuiSelect-icon": {
          color: "var(--no-active-tab)",
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

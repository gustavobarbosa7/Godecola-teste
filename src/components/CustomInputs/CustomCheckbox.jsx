import { FormControlLabel, Checkbox } from "@mui/material";

export const CustomCheckbox = ({ label, name, checked, onChange }) => {
  const handleChange = (event) => {
    onChange({
      target: {
        name,
        value: event.target.checked,
      },
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          sx={{
            color: "var(--text-footer)",
            "&.Mui-checked": {
              color: "var(--orange-avanade)",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      }
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          color: checked ? "var(--orange-avanade)" : "var(--text-footer)",
        },
      }}
    />
  );
};

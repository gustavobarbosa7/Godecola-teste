import { FormControlLabel, Checkbox } from "@mui/material";

export const CustomCheckbox = ({ label, name, value, onChange }) => {
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
          checked={value}
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
        color: "var(--text-footer)",
      }}
    />
  );
};

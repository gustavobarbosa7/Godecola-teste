import { TextField } from "@mui/material";

import React from "react";
import { IMaskInput } from "react-imask";

export const MaskedInput = React.forwardRef(function MaskedInput(props, ref) {
  const { onChange, name, mask, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({
          target: {
            name,
            value,
          },
        })
      }
      overwrite
    />
  );
});

export const CustomNumericField = ({
  label,
  name,
  value,
  onChange,
  mask,
  required = true,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="standard"
      required={required}
      slotProps={{
        input: {
          inputComponent: MaskedInput,
          inputProps: {
            name,
            onChange,
            mask,
          },
        },
      }}
      sx={{
        width: '100%',
        input: { color: "var(--text-footer)" },
        "&:hover input": { color: "var(--icons-login-color)" },
        "&:hover .MuiInputLabel-root": { color: "var(--icons-login-color)" },
        "& .MuiInputLabel-root": { color: "var(--icons-login-color)" },
        "& .MuiInput-underline:before": {
          borderBottomColor: "var(--icons-login-color)",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "var(--orange-avanade)",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "var(--orange-avanade)",
        },
        "& .MuiInputBase-root.Mui-focused": { color: "var(--orange-avanade)" },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--orange-avanade)",
        },
      }}
    />
  );
};

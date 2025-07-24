import "./PackageRegistration.css";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { CustomTextfield } from "../../../CustomInputs/CustomTextfield";
import { CustomCheckbox } from "../../../CustomInputs/CustomCheckbox";
import { CustomNumericField } from "../../../CustomInputs/CustomNumericField";
import { CustomPriceField } from "../../../CustomInputs/CustomPriceField";
import { useForm } from "../../../../hooks/useForm";

export const PackageRegistration = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  const { form, onChangeForm, resetForm } = useForm({
    title: "",
    description: "",
    price: "",
    phone: "",
    cpf: "",
    destination: "",
    isActive: false,
    isPromo: false,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <CustomTextfield
        label="Título"
        name="title"
        value={form.title}
        onChange={onChangeForm}
      />

      <CustomTextfield
        label="Descrição"
        name="description"
        value={form.description}
        onChange={onChangeForm}
      />

      <CustomPriceField
        label="Preço"
        name="price"
        value={form.price}
        onChange={onChangeForm}
        mask={{
          prefix: "R$ ",
          thousandSeparator: ",",
          decimalSeparator: ".",
          decimalScale: 2,
          fixedDecimalScale: true,
        }}
      />

      <CustomTextfield
        label="Destino"
        name="destination"
        value={form.destination}
        onChange={onChangeForm}
      />

      <CustomCheckbox
        label="Está ativo"
        name="isActive"
        value={form.isActive}
        onChange={onChangeForm}
      />

      <CustomCheckbox
        label="Promoção"
        name="isPromo"
        value={form.isPromo}
        onChange={onChangeForm}
      />

      <Button type="submit" variant="contained" color="warning">
        Cadastrar
      </Button>
      <Button onClick={resetForm} variant="outlined" color="warning">
        Resetar
      </Button>
    </Box>
  );
};

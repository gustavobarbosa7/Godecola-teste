import "./PackageRegistration.css";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Divider,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { CustomTextfield } from "../../../CustomInputs/CustomTextfield";
import { CustomCheckbox } from "../../../CustomInputs/CustomCheckbox";
import { CustomNumericField } from "../../../CustomInputs/CustomNumericField";
import { CustomPriceField } from "../../../CustomInputs/CustomPriceField";
import { useForm } from "../../../../hooks/useForm";
import { CustomDateField } from "../../../CustomInputs/CustomDateField";
import { CustomSelect } from "../../../CustomInputs/CustomSelect";
import { createTravelPackage } from "../../../../store/actions/travelPackagesActions";
import useIsMobile from "../../../../hooks/useIsMobile";
import { fetchAddressByZipCode } from "../../../../services/addressService";

export const PackageRegistration = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { loading, error } = useSelector((state) => state.travelPackages);
  const [formError, setFormError] = useState(null);
  const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);

  const initialState = {
    title: "",
    description: "",
    price: "",
    destination: "",
    startDate: "",
    endDate: "",
    numberGuests: "",
    accommodationDetails: {
      numberBaths: "",
      numberBeds: "",
      hasWifi: false,
      hasParking: false,
      hasPool: false,
      hasGym: false,
      hasRestaurant: false,
      hasPetFriendly: false,
      hasAirConditioning: false,
      hasBreakfastIncluded: false,
      address: {
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
        country: "",
        state: "",
        city: "",
        neighborhood: "",
        latitude: "",
        longitude: "",
      },
    },
    mediasUrl: [{ mediaUrl: "", mediaType: 0 }],
    isActive: false,
    isPromo: false,
    discountPercentage: "",
    promotionStartDate: "",
    promotionEndDate: "",
    packageType: 0,
  };

  const { form, setForm, onChangeForm, onChangeNestedForm, resetForm } =
    useForm(initialState);

  const isInternational = useMemo(
    () => parseInt(form.packageType, 10) === 1,
    [form.packageType]
  );

  const handleAddMedia = () => {
    setForm({
      ...form,
      mediasUrl: [...form.mediasUrl, { mediaUrl: "", mediaType: 0 }],
    });
  };

  const handleRemoveMedia = (index) => {
    setForm({
      ...form,
      mediasUrl: form.mediasUrl.filter((_, i) => i !== index),
    });
  };

  const handleZipCodeChange = async (e) => {
    const { value } = e.target;
    onChangeNestedForm(e);
    setFormError(null);

    if (isInternational) {
      // Para pacotes internacionais, apenas atualiza o zipCode sem requisição
      setForm((prev) => ({
        ...prev,
        accommodationDetails: {
          ...prev.accommodationDetails,
          address: {
            ...prev.accommodationDetails.address,
            zipCode: value,
          },
        },
      }));
    } else {
      // Para pacotes nacionais, faz a requisição à API
      setIsLoadingZipCode(true);
      try {
        const addressData = await fetchAddressByZipCode(value);

        setForm((prev) => {
          const newForm = {
            ...prev,
            accommodationDetails: {
              ...prev.accommodationDetails,
              address: {
                ...prev.accommodationDetails.address,
                ...addressData,
              },
            },
          };   
          return newForm;
        });
      } catch (err) {
        setFormError(err.message);
        console.log("Erro ao consultar CEP:", err.message);
      } finally {
        setIsLoadingZipCode(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validação
    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.destination ||
      !form.startDate ||
      !form.endDate ||
      !form.numberGuests
    ) {
      setFormError("Campos gerais obrigatórios do formulário");
      return;
    }
    if (
      !form.accommodationDetails.numberBaths ||
      !form.accommodationDetails.numberBeds ||
      !form.accommodationDetails.address.addressLine1 ||
      !form.accommodationDetails.address.zipCode ||
      !form.accommodationDetails.address.country ||
      !form.accommodationDetails.address.state ||
      !form.accommodationDetails.address.city ||
      !form.accommodationDetails.address.neighborhood
    ) {
      setFormError(
        "Campos de acomodação e endereço obrigatórios não preenchidos"
      );
      return;
    }
    if (
      isInternational &&
      (!form.accommodationDetails.address.latitude ||
        !form.accommodationDetails.address.longitude)
    ) {
      setFormError(
        "Latitude e longitude são obrigatórios para pacotes internacionais"
      );
      return;
    }
    if (
      (form.accommodationDetails.address.latitude &&
        isNaN(parseFloat(form.accommodationDetails.address.latitude))) ||
      (form.accommodationDetails.address.longitude &&
        isNaN(parseFloat(form.accommodationDetails.address.longitude)))
    ) {
      setFormError("Latitude e longitude devem ser valores numéricos válidos");
      return;
    }
    if (form.mediasUrl.some((media) => !media.mediaUrl)) {
      setFormError("Todas as URLs de mídia devem ser preenchidas");
      return;
    }
    if (
      form.isPromo &&
      (!form.discountPercentage ||
        !form.promotionStartDate ||
        !form.promotionEndDate)
    ) {
      setFormError("Campos de promoção obrigatórios não preenchidos");
      return;
    }

    // Validar preço
    const cleanedPrice = form.price.replace(/[^0-9,.]/g, "").replace(",", ".");
    if (isNaN(parseFloat(cleanedPrice))) {
      setFormError("Preço inválido");
      return;
    }

    // Validar CEP
    if (
      isInternational &&
      form.accommodationDetails.address.zipCode.length < 3
    ) {
      setFormError("CEP internacional muito curto");
      return;
    }

    // Formatar payload
    const payload = {
      title: form.title,
      description: form.description,
      price: Math.floor(parseFloat(cleanedPrice) * 100),
      destination: form.destination,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      numberGuests: parseInt(form.numberGuests, 10),
      accommodationDetails: {
        numberBaths: parseInt(form.accommodationDetails.numberBaths, 10),
        numberBeds: parseInt(form.accommodationDetails.numberBeds, 10),
        hasWifi: form.accommodationDetails.hasWifi,
        hasParking: form.accommodationDetails.hasParking,
        hasPool: form.accommodationDetails.hasPool,
        hasGym: form.accommodationDetails.hasGym,
        hasRestaurant: form.accommodationDetails.hasRestaurant,
        hasPetFriendly: form.accommodationDetails.hasPetFriendly,
        hasAirConditioning: form.accommodationDetails.hasAirConditioning,
        hasBreakfastIncluded: form.accommodationDetails.hasBreakfastIncluded,
        address: {
          addressLine1: form.accommodationDetails.address.addressLine1,
          addressLine2: form.accommodationDetails.address.addressLine2 || null,
          zipCode: form.accommodationDetails.address.zipCode,
          country: form.accommodationDetails.address.country,
          state: form.accommodationDetails.address.state,
          city: form.accommodationDetails.address.city,
          neighborhood: form.accommodationDetails.address.neighborhood,
          latitude: form.accommodationDetails.address.latitude,
          longitude: form.accommodationDetails.address.longitude,
        },
      },
      mediasUrl: form.mediasUrl.map((media) => ({
        mediaUrl: media.mediaUrl,
        mediaType: parseInt(media.mediaType, 10),
      })),
      isActive: form.isActive,
      isCurrentylOnPromotion: form.isPromo,
      discountPercentage: form.isPromo
        ? parseFloat(form.discountPercentage)
        : null,
      promotionStartDate: form.isPromo
        ? new Date(form.promotionStartDate).toISOString()
        : null,
      promotionEndDate: form.isPromo
        ? new Date(form.promotionEndDate).toISOString()
        : null,
      packageType: parseInt(form.packageType, 10),
    };

    try {
      await dispatch(createTravelPackage(payload)).unwrap(); 
      resetForm();    
    } catch (err) {
      setFormError(err.message || "Erro ao cadastrar pacote");
    }
  };

  const handlePackageTypeChange = (e) => {
    onChangeForm(e);
    setForm((prev) => ({
      ...prev,
      accommodationDetails: {
        ...prev.accommodationDetails,
        address: {
          addressLine1: "",
          addressLine2: "",
          zipCode: "",
          country: "",
          state: "",
          city: "",
          neighborhood: "",
          latitude: "",
          longitude: "",
        },
      },
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" color="var(--primary-text-color)">
        Cadastrar Pacote
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
      >
        <Typography variant="subtitle1">Dados Gerais</Typography>
        <CustomTextfield
          label="Título"
          name="title"
          value={form.title}
          onChange={onChangeForm}
          required
        />
        <CustomTextfield
          label="Descrição"
          name="description"
          value={form.description}
          onChange={onChangeForm}
          required
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomTextfield
            label="Destino"
            name="destination"
            value={form.destination}
            onChange={onChangeForm}
            required
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
            required
          />
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomDateField
            label="Data de Início"
            name="startDate"
            value={form.startDate}
            onChange={onChangeForm}
            max={form.endDate}
            required
          />
          <CustomDateField
            label="Data de Término"
            name="endDate"
            value={form.endDate}
            onChange={onChangeForm}
            min={form.startDate}
            required
          />
          <CustomNumericField
            label="Nº max de Hóspedes"
            name="numberGuests"
            value={form.numberGuests}
            onChange={onChangeForm}
            mask="0000"
            required
          />
          <CustomSelect
            label="Tipo de Pacote"
            name="packageType"
            value={form.packageType}
            onChange={handlePackageTypeChange}
            options={[
              { value: 0, label: "Nacional" },
              { value: 1, label: "Internacional" },
            ]}
            required
          />
        </Box>

        <CustomCheckbox
          label="Está Ativo"
          name="isActive"
          checked={form.isActive}
          onChange={onChangeForm}
        />
        <CustomCheckbox
          label="Em Promoção"
          name="isPromo"
          checked={form.isPromo}
          onChange={onChangeForm}
        />

        {form.isPromo && (
          <>
            <Divider
              sx={{
                my: 2,
                borderColor: form.isPromo
                  ? "var(--orange-avanade)"
                  : "var(--no-active-tab)",
              }}
            />
            <Typography variant="subtitle1">Promoção</Typography>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                gap: 2,
                width: "100%",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <CustomNumericField
                label="Percentual de Desconto (%)"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={onChangeForm}
                mask="00"
                required
              />
              <CustomDateField
                label="Início da Promoção"
                name="promotionStartDate"
                value={form.promotionStartDate}
                onChange={onChangeForm}
                max={form.promotionEndDate}
                required
              />
              <CustomDateField
                label="Fim da Promoção"
                name="promotionEndDate"
                value={form.promotionEndDate}
                onChange={onChangeForm}
                min={form.promotionStartDate}
                required
              />
            </Box>
          </>
        )}

        <Divider
          sx={{
            my: 2,
            borderColor: form.isPromo
              ? "var(--orange-avanade)"
              : "var(--no-active-tab)",
          }}
        />
        <Typography variant="subtitle1">Detalhes da Acomodação</Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomNumericField
            label="Número de Banheiros"
            name="accommodationDetails.numberBaths"
            value={form.accommodationDetails.numberBaths}
            onChange={onChangeNestedForm}
            mask="00"
            required
          />
          <CustomNumericField
            label="Número de Camas"
            name="accommodationDetails.numberBeds"
            value={form.accommodationDetails.numberBeds}
            onChange={onChangeNestedForm}
            mask="000"
            required
          />
        </Box>
        <CustomCheckbox
          label="Wi-Fi"
          name="accommodationDetails.hasWifi"
          checked={form.accommodationDetails.hasWifi}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Estacionamento"
          name="accommodationDetails.hasParking"
          checked={form.accommodationDetails.hasParking}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Piscina"
          name="accommodationDetails.hasPool"
          checked={form.accommodationDetails.hasPool}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Academia"
          name="accommodationDetails.hasGym"
          checked={form.accommodationDetails.hasGym}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Restaurante"
          name="accommodationDetails.hasRestaurant"
          checked={form.accommodationDetails.hasRestaurant}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Pet Friendly"
          name="accommodationDetails.hasPetFriendly"
          checked={form.accommodationDetails.hasPetFriendly}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Ar-Condicionado"
          name="accommodationDetails.hasAirConditioning"
          checked={form.accommodationDetails.hasAirConditioning}
          onChange={onChangeNestedForm}
        />
        <CustomCheckbox
          label="Café da Manhã Incluso"
          name="accommodationDetails.hasBreakfastIncluded"
          checked={form.accommodationDetails.hasBreakfastIncluded}
          onChange={onChangeNestedForm}
        />

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Endereço</Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomTextfield
            label="Logradouro"
            name="accommodationDetails.address.addressLine1"
            value={form.accommodationDetails.address.addressLine1}
            onChange={onChangeNestedForm}
            required
          />

          {isInternational ? (
            <CustomTextfield
              label="Complemento"
              name="accommodationDetails.address.addressLine2"
              value={form.accommodationDetails.address.addressLine2}
              onChange={onChangeNestedForm}
              disabled={
                isLoadingZipCode || !form.accommodationDetails.address.country
              }
            />
          ) : (
            <CustomNumericField
              label="Número"
              name="accommodationDetails.address.addressLine2"
              value={form.accommodationDetails.address.addressLine2}
              onChange={onChangeNestedForm}
              mask="000000"
            />
          )}

          {isInternational ? (
            <CustomTextfield
              label="ZIP CODE"
              name="accommodationDetails.address.zipCode"
              value={form.accommodationDetails.address.zipCode}
              onChange={handleZipCodeChange}
              required
              disabled={
                isLoadingZipCode || !form.accommodationDetails.address.country
              }
            />
          ) : (
            <CustomNumericField
              label="CEP"
              name="accommodationDetails.address.zipCode"
              value={form.accommodationDetails.address.zipCode}
              onChange={handleZipCodeChange}
              required
              disabled={isLoadingZipCode}
              mask="00000-000"
            />
          )}
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomTextfield
            label="País"
            name="accommodationDetails.address.country"
            value={form.accommodationDetails.address.country}
            onChange={onChangeNestedForm}
            required
          />
          <CustomTextfield
            label="Estado"
            name="accommodationDetails.address.state"
            value={form.accommodationDetails.address.state}
            onChange={onChangeNestedForm}
            required
          />
          <CustomTextfield
            label="Cidade"
            name="accommodationDetails.address.city"
            value={form.accommodationDetails.address.city}
            onChange={onChangeNestedForm}
            required
          />
          <CustomTextfield
            label="Bairro"
            name="accommodationDetails.address.neighborhood"
            value={form.accommodationDetails.address.neighborhood}
            onChange={onChangeNestedForm}
            required
          />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <CustomNumericField
            label="Latitude"
            name="accommodationDetails.address.latitude"
            value={form.accommodationDetails.address.latitude}
            onChange={onChangeNestedForm}
          />
          <CustomNumericField
            label="Longitude"
            name="accommodationDetails.address.longitude"
            value={form.accommodationDetails.address.longitude}
            onChange={onChangeNestedForm}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">
          Mídias
          <IconButton onClick={handleAddMedia} aria-label="Adicionar mídia">
            <Add />
          </IconButton>
        </Typography>
        {form.mediasUrl.map((media, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <CustomTextfield
              label={`URL da Mídia ${index + 1}`}
              name={`mediasUrl[${index}].mediaUrl`}
              value={media.mediaUrl}
              onChange={onChangeNestedForm}
              required
            />
            <CustomSelect
              label={`Tipo da Mídia ${index + 1}`}
              name={`mediasUrl[${index}].mediaType`}
              value={media.mediaType}
              onChange={onChangeNestedForm}
              options={[
                { value: 0, label: "Imagem" },
                { value: 1, label: "Vídeo" },
              ]}
              required
            />
            {form.mediasUrl.length > 1 && (
              <IconButton
                onClick={() => handleRemoveMedia(index)}
                aria-label="Remover mídia"
              >
                <Remove />
              </IconButton>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "var(--orange-avanade)", color: "white" }}
            disabled={loading}
          >
            Cadastrar
          </Button>
          <Button
            onClick={resetForm}
            variant="outlined"
            sx={{
              borderColor: "var(--orange-avanade)",
              color: "var(--orange-avanade)",
            }}
          >
            Resetar
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={!!formError || !!error}
        autoHideDuration={6000}
        onClose={() => setFormError(null)}
      >
        <Alert severity="error" onClose={() => setFormError(null)}>
          {formError || error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PackageRegistration;

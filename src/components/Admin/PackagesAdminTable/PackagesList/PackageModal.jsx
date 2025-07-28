import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
} from "@mui/material";

const PackageModal = ({
  open,
  onClose,
  selectedPackage,
  handleCloseDetails,
  packageTypeMap,
  mediaTypeMap,
  formatCurrency
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalhes do Pacote</DialogTitle>
      <DialogContent>
        {selectedPackage && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1">
              <strong>Título:</strong> {selectedPackage.title}
            </Typography>
            <Typography variant="body2">
              <strong>Descrição:</strong> {selectedPackage.description}
            </Typography>
            <Typography variant="body2">
               <strong>Preço:</strong> {formatCurrency(selectedPackage.price)}
            </Typography>
            <Typography variant="body2">
              <strong>Destino:</strong> {selectedPackage.destination}
            </Typography>
            <Typography variant="body2">
              <strong>Data de Início:</strong>{" "}
              {new Date(selectedPackage.startDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Typography>
            <Typography variant="body2">
              <strong>Data de Término:</strong>{" "}
              {new Date(selectedPackage.endDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Typography>
            <Typography variant="body2">
              <strong>Ativo:</strong> {selectedPackage.isActive ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Número de Hóspedes:</strong>{" "}
              {selectedPackage.numberGuests}
            </Typography>
            <Typography variant="body2">
              <strong>Tipo:</strong>{" "}
              {packageTypeMap[selectedPackage.packageType ?? 0] || "Nacional"}
            </Typography>
            <Typography variant="body2">
              <strong>Em Promoção:</strong>{" "}
              {selectedPackage.isCurrentylOnPromotion ? "Sim" : "Não"}
            </Typography>
            {selectedPackage.isCurrentylOnPromotion && (
              <>
                <Typography variant="body2">
                  <strong>Percentual de Desconto:</strong>{" "}
                  {selectedPackage.discountPercentage
                    ? `${selectedPackage.discountPercentage}%`
                    : "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Início da Promoção:</strong>{" "}
                  {selectedPackage.promotionStartDate
                    ? new Date(
                        selectedPackage.promotionStartDate
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Fim da Promoção:</strong>{" "}
                  {selectedPackage.promotionEndDate
                    ? new Date(
                        selectedPackage.promotionEndDate
                      ).toLocaleDateString("pt-BR")
                    : "N/A"}
                </Typography>
              </>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Mídias</Typography>
            {selectedPackage.mediasUrl &&
            selectedPackage.mediasUrl.length > 0 ? (
              selectedPackage.mediasUrl.map((media, index) => (
                <Typography key={index} variant="body2">
                  <strong>Mídia {index + 1}:</strong> {media.MediaUrl} (
                  {mediaTypeMap[media.MediaType ?? 0] || "Imagem"})
                </Typography>
              ))
            ) : (
              <Typography variant="body2">Nenhuma mídia disponível.</Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Detalhes da Acomodação</Typography>
            <Typography variant="body2">
              <strong>Número de Banheiros:</strong>{" "}
              {selectedPackage.accommodationDetails.numberBaths}
            </Typography>
            <Typography variant="body2">
              <strong>Número de Camas:</strong>{" "}
              {selectedPackage.accommodationDetails.numberBeds}
            </Typography>
            <Typography variant="body2">
              <strong>Wi-Fi:</strong>{" "}
              {selectedPackage.accommodationDetails.hasWifi ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Estacionamento:</strong>{" "}
              {selectedPackage.accommodationDetails.hasParking ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Piscina:</strong>{" "}
              {selectedPackage.accommodationDetails.hasPool ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Academia:</strong>{" "}
              {selectedPackage.accommodationDetails.hasGym ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Restaurante:</strong>{" "}
              {selectedPackage.accommodationDetails.hasRestaurant
                ? "Sim"
                : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Pet Friendly:</strong>{" "}
              {selectedPackage.accommodationDetails.hasPetFriendly
                ? "Sim"
                : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Ar-Condicionado:</strong>{" "}
              {selectedPackage.accommodationDetails.hasAirConditioning
                ? "Sim"
                : "Não"}
            </Typography>
            <Typography variant="body2">
              <strong>Café da Manhã Incluso:</strong>{" "}
              {selectedPackage.accommodationDetails.hasBreakfastIncluded
                ? "Sim"
                : "Não"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Endereço</Typography>
            <Typography variant="body2">
              <strong>Logradouro:</strong>{" "}
              {selectedPackage.accommodationDetails.address.addressLine1}
            </Typography>
            {selectedPackage.accommodationDetails.address.addressLine2 && (
              <Typography variant="body2">
                <strong>Complemento:</strong>{" "}
                {selectedPackage.accommodationDetails.address.addressLine2}
              </Typography>
            )}
            <Typography variant="body2">
              <strong>CEP:</strong>{" "}
              {selectedPackage.accommodationDetails.address.zipCode}
            </Typography>
            <Typography variant="body2">
              <strong>Cidade:</strong>{" "}
              {selectedPackage.accommodationDetails.address.city}
            </Typography>
            <Typography variant="body2">
              <strong>Estado:</strong>{" "}
              {selectedPackage.accommodationDetails.address.state}
            </Typography>
            <Typography variant="body2">
              <strong>País:</strong>{" "}
              {selectedPackage.accommodationDetails.address.country}
            </Typography>
            <Typography variant="body2">
              <strong>Bairro:</strong>{" "}
              {selectedPackage.accommodationDetails.address.neighborhood}
            </Typography>
            <Typography variant="body2">
              <strong>Latitude:</strong>{" "}
              {selectedPackage.accommodationDetails.address.latitude}
            </Typography>
            <Typography variant="body2">
              <strong>Longitude:</strong>{" "}
              {selectedPackage.accommodationDetails.address.longitude}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDetails}
          variant="contained"
          sx={{ backgroundColor: "var(--orange-avanade)", color: "white" }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageModal;

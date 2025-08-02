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
import { baseURLMedias } from "../../../../utils/baseURL";

const PackageModal = ({
  open,
  onClose,
  selectedPackage,
  handleCloseDetails,
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
              <strong>Preço:</strong> {`R$ ${selectedPackage.price}`}
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
              <strong>Tipo:</strong> {selectedPackage.packageType}
            </Typography>
            <Typography variant="body2">
              <strong>Em Promoção:</strong>{" "}
              {selectedPackage.isCurrentlyOnPromotion ? "Sim" : "Não"}
            </Typography>
            {selectedPackage.isCurrentlyOnPromotion && (
              <>
                <Typography variant="body2">
                  <strong>Percentual de Desconto:</strong>{" "}
                  {selectedPackage.discountPercentage
                    ? `${selectedPackage.discountPercentage * 100}%`
                    : "N/A"}
                </Typography>

                <Typography variant="body2">
                  <strong>Preço com desconto:</strong>{" "}
                  {selectedPackage.discountPercentage
                    ? `R$ ${
                        selectedPackage.price -
                        selectedPackage.discountPercentage *
                          selectedPackage.price
                      }`
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
                <Box key={media.id || index} sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Mídia {index + 1}:
                  </Typography>
                  <Typography variant="body2">
                    URL:{" "}
                    <a
                      href={`${baseURLMedias}${media.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {baseURLMedias}
                      {media.filePath}
                    </a>
                  </Typography>
                  <Typography variant="body2">
                    Tipo: {media.mediaType}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", color: "text.secondary" }}
              >
                Nenhuma mídia disponível para este pacote.
              </Typography>
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

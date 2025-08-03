import "./BookButton.css";
import { useNavigate } from "react-router-dom";
import { goToBookings } from "../../../routes/coordinator";
import { Box, Button, Typography } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";

export const BookButton = ({ packageData }) => {
  const navigate = useNavigate();

  const calculateDiscountedPrice = (price, discountPercentage) =>
    price * (1 - discountPercentage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--background-color-invert)",
        transition: "background-color 0.25s ease-in-out",
        px: { xs: 2, sm: 3, md: 5 },
        height: { xs: 60, sm: 70, md: 80 },
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1500,
        color: "var(--secondary-text-color)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {packageData.isCurrentlyOnPromotion ? (
            <>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "var(--secondary-text-color)",
                  fontSize: { xs: "1.0rem", sm: "1.3rem", md: "1.7rem" },
                }}
              >
                R$ {packageData.price}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--orange-avanade)",
                  fontWeight: "bold",
                  fontSize: { xs: "1.3rem", sm: "1.7rem", md: "2.1rem" },
                  ml: -1,
                }}
              >
                R${" "}
                {calculateDiscountedPrice(
                  packageData.price,
                  packageData.discountPercentage
                ).toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: "var(--secondary-text-color)",
                fontWeight: "bold",
                fontSize: { xs: "1.3rem", sm: "1.7rem", md: "2.1rem" },
              }}
            >
              R$ {packageData.price}
            </Typography>
          )}
        </Box>
        {packageData.isCurrentlyOnPromotion && (
          <Typography
            variant="body2"
            sx={{
              color: "var(--secondary-text-color)",
              mt: { xs: "-21px", md: "0px" },
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
            }}
          >
            • Promoção: {formatDate(packageData.promotionStartDate)} à{" "}
            {formatDate(packageData.promotionEndDate)}
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={() => goToBookings(navigate, packageData)}
        sx={{
          textTransform: "none",
          color: "white",
          background: "var(--orange-avanade-invert)",
          borderRadius: "15px",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
          fontWeight: "bold",
          py: { xs: 0.5, sm: 1 },
          px: { xs: 2, sm: 3, md: 4 },
          fontFamily:
            '"Segoe UI", OpenSans, Roboto, Arial, Tahoma, Helvetica, sans-serif',
          "&:hover": {
            background: "var(--orange-avanade)",
          },
        }}
      >
        Reservar
      </Button>
    </Box>
  );
};

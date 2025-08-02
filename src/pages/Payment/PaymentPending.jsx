
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
 
export default function PaymentPending() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
 
  const handleGoToReservations = () => {
    navigate("/history"); // Rota correta para histórico/reservas
  };

  const handleGoHome = () => {
    navigate("/");
  };
 
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" color="warning.main" gutterBottom>
          Pagamento em Processamento
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Não se preocupe, em até 2 dias úteis, vamos te avisar por e-mail se o pagamento foi aprovado.
        </Typography>
      </Box>
      
      {/* Status do Pagamento */}
      <Box 
        sx={{ 
          textAlign: 'center',
          p: 3,
          backgroundColor: 'warning.light',
          borderRadius: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'warning.main'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <AccessTime sx={{ color: 'warning.main', mr: 1, fontSize: 28 }} />
          <Typography variant="h6" color="warning.main">
            Estamos processando seu pagamento
          </Typography>
        </Box>
        <CircularProgress 
          sx={{ 
            color: 'warning.main',
            mb: 2
          }} 
          size={32}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ID do Pagamento: {paymentId}
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          Você receberá uma confirmação por e-mail assim que o pagamento for processado.
        </Alert>
      </Box>
      
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleGoToReservations}
          size="large"
          sx={{ mr: 2 }}
        >
          Ver minhas reservas
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoHome}
          size="large"
        >
          Voltar à loja
        </Button>
      </Box>
    </Container>
  );
}

import React from "react";
// import { PaymentStatusBrick } from "../../components/Payment";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import { CheckCircle, History, Home } from '@mui/icons-material';
 
export default function PaymentSuccess() {
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
        <Typography variant="h4" component="h1" color="success.main" gutterBottom>
          Seu pagamento foi aprovado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Parabéns! Seu pagamento foi processado com sucesso e sua reserva foi confirmada.
        </Typography>
      </Box>
      
      {/* Status do Pagamento */}
      <Box 
        sx={{ 
          textAlign: 'center',
          p: 3,
          backgroundColor: 'success.light',
          borderRadius: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'success.main'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 28 }} />
          <Typography variant="h6" color="success.main">
            Pagamento Aprovado
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ID do Pagamento: {paymentId}
        </Typography>
        <Alert severity="success" sx={{ mt: 2 }}>
          Você receberá um e-mail com os detalhes da sua reserva em breve.
        </Alert>
      </Box>

      {/* Próximos passos */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          Próximos passos:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            ✅ Verifique seu e-mail para detalhes da reserva
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            ✅ Guarde o comprovante de pagamento
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            ✅ Acompanhe sua viagem no histórico de reservas
          </Typography>
        </Box>
      </Box>
      
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoToReservations}
          size="large"
          startIcon={<History />}
          sx={{ mr: 2 }}
        >
          Ver minhas reservas
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleGoHome}
          size="large"
          startIcon={<Home />}
        >
          Voltar à loja
        </Button>
      </Box>
    </Container>
  );
}
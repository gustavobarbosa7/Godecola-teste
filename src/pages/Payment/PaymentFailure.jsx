
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import { Error, CreditCard, Home } from '@mui/icons-material';
 
export default function PaymentFailure() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
 
  const handleTryAgain = () => {
    navigate("/payment"); // Volta para a tela de pagamento
  };

  const handleGoHome = () => {
    navigate("/");
  };
 
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" color="error.main" gutterBottom>
          Não foi possível processar seu pagamento
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Houve um problema ao processar seu pagamento. Tente novamente ou escolha outro meio de pagamento.
        </Typography>
      </Box>
      
      {/* Status do Pagamento */}
      <Box 
        sx={{ 
          textAlign: 'center',
          p: 3,
          backgroundColor: 'error.light',
          borderRadius: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'error.main'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Error sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
          <Typography variant="h6" color="error.main">
            Pagamento Rejeitado
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ID do Pagamento: {paymentId}
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          Verifique os dados do cartão ou tente outro meio de pagamento.
        </Alert>
      </Box>

      {/* Informações adicionais */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          O que pode ter acontecido?
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Dados do cartão incorretos
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Cartão sem limite disponível
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Problema com a operadora do cartão
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Cartão vencido ou bloqueado
          </Typography>
        </Box>
      </Box>
      
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleTryAgain}
          size="large"
          startIcon={<CreditCard />}
          sx={{ mr: 2 }}
        >
          Escolher outro meio de pagamento
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
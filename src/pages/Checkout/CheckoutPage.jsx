import React, { useEffect, useState } from "react";
import { createPreference } from "../../services/paymentService";
import PaymentForm from "../Payment/PaymentForm";
import DebugInfo from "../../components/DebugInfo";
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

// Dados do pagador movidos para fora do componente para evitar re-criação

export default function CheckoutPage() {
  const [preference, setPreference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initPreference = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tentar criar preferência real primeiro
      const preferenceData = await createPreference(1, 100.0, "Reserva Exemplo");
      setPreference(preferenceData);
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      setError(error);
      
      // Fallback: usar dados mockados para desenvolvimento
      console.log("Usando dados mockados para desenvolvimento");
      setPreference({
        preferenceId: "mock_preference_" + Date.now(),
        amount: 100.0,
        description: "Reserva Exemplo (Modo Desenvolvimento)"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initPreference();
  }, []);

  const handleRetry = () => {
    initPreference();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando checkout...
        </Typography>
      </Container>
    );
  }


  

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Checkout - Finalizar Compra
      </Typography>
      
      {/* Componente de Debug - remover em produção */}
      {/* <DebugInfo /> */}
      
      {/* {error && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry} startIcon={<Refresh />}>
              Tentar Novamente
            </Button>
          }
        >
          <Typography variant="body2">
            <strong>Aviso:</strong> Não foi possível conectar com o servidor de pagamentos. 
            Usando modo de desenvolvimento para demonstração.
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Erro: {error.message || 'Conexão recusada com o backend'}
          </Typography>
        </Alert>
      )} */}
      
      {preference ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Detalhes da Compra:
          </Typography>
          <Box sx={{ mb: 3, p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
            <Typography variant="body1">
              <strong>Valor:</strong> R$ {preference.amount?.toFixed(2) || '100,00'}
            </Typography>
            <Typography variant="body1">
              <strong>Descrição:</strong> {preference.description || 'Pacote de Viagem'}
            </Typography>
            {error && (
              <Typography variant="body2" color="warning.main">
                <strong>Modo:</strong> Desenvolvimento (Simulação)
              </Typography>
            )}
          </Box>
          
          <PaymentForm 
          />
        </Box>
      ) : (
       <Alert severity="error">
          <Typography variant="body1">
            Erro ao carregar dados do pagamento. Tente recarregar a página.
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ mt: 1 }}
            onClick={handleRetry}
            startIcon={<Refresh />}
          >
            Recarregar
          </Button>
        </Alert>
      )}
    </Container>
  );
}
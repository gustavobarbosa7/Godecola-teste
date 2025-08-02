# 🔗 Guia de Integração com Backend

## Status da Integração
✅ **PRONTO PARA CONECTAR COM BACKEND**

## Endpoints Necessários no Backend

### 1. **Criar Preferência de Pagamento**
```http
POST /api/payments/create-preference
Content-Type: application/json
Authorization: Bearer {token}

{
  "reservationId": 1,
  "amount": 100.0,
  "description": "Reserva Exemplo"
}
```

**Resposta esperada:**
```json
{
  "preferenceId": "1234567890-abc123",
  "amount": 100.0,
  "description": "Reserva Exemplo",
  "status": "created"
}
```

### 2. **Processar Pagamento**
```http
POST /api/payments/process
Content-Type: application/json
Authorization: Bearer {token}

{
  "paymentData": { /* dados do Mercado Pago */ },
  "amount": 100.0,
  "preferenceId": "1234567890-abc123",
  "payer": {
    "firstName": "João",
    "lastName": "Silva", 
    "email": "joao@email.com"
  }
}
```

**Resposta esperada:**
```json
{
  "payment_id": "pay_123456789",
  "status": "approved", // ou "pending" ou "rejected"
  "amount": 100.0,
  "payment_method": "credit_card",
  "created_at": "2025-01-01T10:00:00Z"
}
```

### 3. **Verificar Status do Pagamento**
```http
GET /api/payments/{paymentId}/status
Authorization: Bearer {token}
```

**Resposta esperada:**
```json
{
  "payment_id": "pay_123456789",
  "status": "approved",
  "amount": 100.0,
  "updated_at": "2025-01-01T10:00:00Z"
}
```

### 4. **Webhook do Mercado Pago**
```http
POST /api/payments/webhook
Content-Type: application/json

{
  "action": "payment.updated",
  "api_version": "v1",
  "data": {
    "id": "payment_id"
  },
  "date_created": "2025-01-01T10:00:00Z",
  "id": 123456,
  "live_mode": false,
  "type": "payment",
  "user_id": "user_id"
}
```

### 5. **Health Check**
```http
GET /api/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T10:00:00Z"
}
```

## Configuração das Variáveis de Ambiente

### No Frontend (.env)
```env
VITE_API_URL=http://localhost:7109/api
VITE_MERCADO_PAGO_PUBLIC_KEY=TEST-d9688230-b4e5-44fc-b5f4-3dcdaa1fbbe2
NODE_ENV=development
```

### No Backend
```env
MERCADOPAGO_ACCESS_TOKEN=TEST-6354929885643163-080116-770d68f2b23dc022952fee1257c64276-1028576512
MERCADOPAGO_PUBLIC_KEY=TEST-d9688230-b4e5-44fc-b5f4-3dcdaa1fbbe2
DATABASE_URL=seu_banco_de_dados
JWT_SECRET=seu_jwt_secret
```

## Fluxo de Integração

### 1. **Checkout Page**
- ✅ Tenta conectar com o backend
- ✅ Se falhar, usa modo de desenvolvimento
- ✅ Chama `createPreference()` do paymentService

### 2. **Payment Form**
- ✅ Carrega SDK do Mercado Pago
- ✅ Previne duplicação de formulários
- ✅ Tenta processar pagamento real via `processPayment()`
- ✅ Se falhar, usa simulação
- ✅ Navega para páginas de resultado

### 3. **Payment Result Pages**
- ✅ PaymentSuccess (verde)
- ✅ PaymentPending (laranja)
- ✅ PaymentFailure (vermelho)

## Status dos Componentes

| Componente | Status | Integração Backend |
|------------|--------|-------------------|
| CheckoutPage | ✅ Pronto | ✅ Configurado |
| PaymentForm | ✅ Pronto | ✅ Configurado |
| PaymentSuccess | ✅ Pronto | ✅ Configurado |
| PaymentPending | ✅ Pronto | ✅ Configurado |
| PaymentFailure | ✅ Pronto | ✅ Configurado |
| PaymentService | ✅ Pronto | ✅ Configurado |
| API Service | ✅ Pronto | ✅ Configurado |

## Como Testar

### 1. **Com Backend Online**
```bash
# Inicie o backend na porta 7109
# Inicie o frontend
npm run dev

# Acesse: http://localhost:5174/checkout
# O sistema tentará conectar com o backend real
```

### 2. **Sem Backend (Modo Desenvolvimento)**
```bash
# Apenas inicie o frontend
npm run dev

# Acesse: http://localhost:5174/checkout
# O sistema entrará em modo de simulação
```

## URLs de Webhook para Configurar no Mercado Pago

### Desenvolvimento
```
http://localhost:7109/api/payments/webhook
```

### Produção
```
https://seudominio.com/api/payments/webhook
```

## Próximos Passos

1. ✅ **Frontend configurado e pronto**
2. 🔄 **Implementar endpoints no backend**
3. 🔄 **Configurar webhooks no Mercado Pago**
4. 🔄 **Testar fluxo completo**
5. 🔄 **Deploy em produção**

---

## 🚀 **O frontend está 100% pronto para conectar com o backend!**

Quando o backend estiver implementado e rodando na porta 7109, o sistema automaticamente detectará e usará as APIs reais ao invés da simulação.

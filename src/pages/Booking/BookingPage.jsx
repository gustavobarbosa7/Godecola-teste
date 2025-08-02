
import { useState } from 'react'
import './BookingPage.css'

const BookingPage = () => {
  const [amount, setAmount] = useState(10000) // valor em centavos
  const [preferenceId, setPreferenceId] = useState(null)

  const handlePaymentSubmit = (result) => {
    console.log('Pagamento processado:', result)
    // Aqui você pode redirecionar para uma página de sucesso
    // ou mostrar uma mensagem de confirmação
  }

  const handlePaymentReady = () => {
    console.log('Payment Brick carregado e pronto')
  }

  const handlePaymentError = (error) => {
    console.error('Erro no pagamento:', error)
    // Aqui você pode mostrar uma mensagem de erro para o usuário
  }

  return (
    <div className='BookingPageContainer'>      
      <h1 className='title'>Página de Reservas</h1>  
      
      <div className="payment-section">
        <button className="payment-btn" onClick={() => goToBookings(navigate)}>Ir para o pagamento</button>
      </div>
    </div>
    
  )
}

export default BookingPage;
import './LoginPage.css';
import logo from "../../assets/go_decola_logo_01.png"
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="Logincontainer">

      {/* lado direito da tela */}
      <div className="left">
        <img src={logo} alt="Go Decola" className="logo"/>
        <h2>GO Decola</h2>
        <p>Sua próxima aventura começa aqui!</p>
        <p>Descubra destinos incríveis com os melhores preços.</p>
        <p>
          Pacotes exclusivos, passagens baratas e experiências inesquecíveis.
        </p>
      </div>

      <div className="divider"></div>
      
      {/* lado esquerdo da tela */}
      <div className="right">
        <h2>LOGIN</h2>
        <form>
          <label className="input-group">
            <FaUser className="icon" />
            <div className="input-wrapper">
            <span>E-MAIL</span>
            <input type="email" placeholder="Digite seu e-mail" />
            </div>
          </label>

          <label className="input-group">
            <FaLock className="icon" />
            <div className="input-wrapper">
            <span>SENHA</span>
            <input type="password" placeholder="Digite sua senha" />
            </div>
          </label>

          <Link to="/recoverypassword" className="forgot">
            Esqueci minha senha
          </Link>

          <div className='login-between'>
          <p className="cta">
            <span className="highlight-orange">TA AFIM DE VIAJAR ?<br /></span>
            <span className="highlight-orange">VEM DE <strong className="highlight-purple">GO DECOLA</strong></span>
          </p>

          <button type="submit" className="login-btn">
            LOGAR
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
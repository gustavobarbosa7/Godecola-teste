import './SignUpPage.css';
import { Link, Router } from 'react-router-dom';

const SignUpPage = () => {
  

  return (
    <div className="SingUpcontainer">
      <div className="formSing">
        <h2>CADASTRAR</h2>
        <form className='formText'>
          <label className="input-group">
            <div className="input-wrapper">
              <span>NOME</span>
              <input type="text" placeholder="Nome" required/>
            </div>
          </label>

          <label className="input-group">
            <div className="input-wrapper">
              <span>E-MAIL</span>
              <input type="email" placeholder="E-mail" required/>
            </div>
          </label>

          <label className="input-group">
            <div className="input-wrapper">
              <span>SENHA</span>
              <input type="password" placeholder="Digite sua senha" required/>
            </div>
          </label>

          <label className="input-group">
            <div className="input-wrapper">
              <span>TELEFONE</span>
              <input type="text" placeholder="(xx) xxxxx-xxxx" required/>
            </div>
          </label>

          <label className="input-group">
            <div className="input-wrapper">
              <span>CPF</span>
              <input type="text" placeholder="CPF" maxLength={11} required/>
              
            </div>
          </label>
          <b>ou</b>
          <label className="input-group">
            <div className="input-wrapper">
              <span>PASSAPORTE</span>
              <input type="text" placeholder="Passaporte" maxLength={9} required/>
            </div>
          </label>

           

          <div className="Singup-between">
            <Link to="/Login" className="registered">
            Já sou cadastrado
          </Link>

            <button type="submit" className="singup-btn">
              CADASTRAR
            </button>
          </div>
           
            
          
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
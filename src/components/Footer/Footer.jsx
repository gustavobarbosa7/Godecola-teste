import './Footer.css'
import { FaGithub } from 'react-icons/fa'
import { FaReact } from 'react-icons/fa'
import { TbBrandCSharp } from 'react-icons/tb'
import logoIco from '../../assets/go_decola_logo_01_v4.png'
import logoAvanade from '../../assets/AvanadeLogo.png'
import logoImpacta from '../../assets/impacta_logo.png'
import useIsOnRoute from '../../hooks/useIsOnRoute'

export const Footer = () => {
  const isOnPackageDetailsPage = useIsOnRoute('/package-details/:id');

  return (
    <div className='footerDesktop' style={{
      display: isOnPackageDetailsPage ? 'none' : 'flex'
    }}>
      <div className='groupLink'>
        <div className='groupIco'>
          <img src={logoIco} alt='logotipo do Go Decola' className='logoIco' />
          <p>equipe Go Decola</p>
        </div>

        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/EvelynCunha' target='blank'>
            Evelyn Lopes da Cunha
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/GabrielQuinteiro' target='blank'>
            Gabriel de Carvalho Barros
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/gustavobarbosa7' target='blank'>
            Gustavo Nascimento Barbosa
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/lavih2048' target='blank'>
            Lavínia de Souza Freitas
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/lettymoon' target='blank'>
            Letícia Helena Candido
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <a href='https://github.com/RinoaYK' target='blank'>
            Lidia Yamamura
          </a>
        </div>
      </div>
      <hr />
      <div className='groupLink'>
        <p>Para mais detalhes, acesse nosso projeto:</p>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <FaReact className='iconGithub' />
          <a href='https://github.com/GoDecola/GoDecola-UI' target='blank'>
            Front-end
          </a>
        </div>
        <div className='groupNames'>
          <FaGithub className='iconGithub' />
          <TbBrandCSharp className='iconGithub' />
          <a href='https://github.com/GoDecola/GoDecola-API' target='blank'>
            Back-end
          </a>
        </div>
        <p style={{ marginTop: '20px' }}>Decola Tech 2025</p>
        <img
          src={logoAvanade}
          alt='logotipo do Go Decola'
          className='logoIco2'
        />
        <img
          src={logoImpacta}
          alt='logotipo do Go Decola'
          className='logoIco3'
        />
      </div>
    </div>
  )
}

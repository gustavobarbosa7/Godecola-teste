import './PackageCard.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { IoStar } from 'react-icons/io5'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { goPackageDetails } from '../../routes/coordinator'

export const PackageCard = ({ title, price, rating, imageSrc }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const navigate = useNavigate()

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <Card
      sx={{ width: 300, borderRadius: '16px', position: 'relative', backgroundColor: 'var(--footer-bg)' }}
      className='packageCard'
      onClick={() => goPackageDetails(navigate)}
    >
      <div
        onClick={e => {
          e.stopPropagation()
          toggleFavorite()
        }}
        style={{ cursor: 'pointer' }}
      >
        {isFavorited ? (
          <FaHeart className='hearthIcon' />
        ) : (
          <FaRegHeart className='hearthIcon2' />
        )}
      </div>

      <CardMedia sx={{ height: 140 }} image={imageSrc} title={title} />

      <CardContent>
        <Typography gutterBottom variant='h6' component='div'
          sx={{ color: 'var(--primary-text-color)' }}
        >
          {title}
        </Typography>
        <div className='package-info'>
          <Typography variant='body2' sx={{ color: 'var(--text-card-package)' }}>
            {price}
          </Typography>
          <IoStar className='starIcon' />
          <Typography variant='body2' sx={{ color: 'var(--text-card-package)' }}>
            {rating}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

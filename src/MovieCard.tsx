import React from 'react'
import Typography from '@mui/material/Typography'
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';

interface props {
    img: {
        alt : string,
        src: string,
    }
    title: string,
    score: number
}

const MovieCard:React.FC<props> = ({img, title, score}) => {
  return (
    <a href='' className='movieCard' >
        <img
        src={img.src}
        alt={img.alt}
        className='imgCard'

        />
        <Typography variant="body1" align='right' color="initial" sx={{pr:1}}>{title}</Typography>
        <Typography variant="inherit" align='right' color="initial" sx={{pr:1}}>
            {score}
            <StarPurple500SharpIcon sx={{color: '#FDCC0D'}} />
        </Typography>
    </a>
  )
}

export default MovieCard
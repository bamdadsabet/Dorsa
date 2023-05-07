import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import {sortByFrom} from './styles.js'
import './index.css'

interface props {
  sort: 'view' | 'rate' | 'newest',
  sortBy: React.Dispatch<React.SetStateAction<'view' | 'rate' | 'newest'>>
}

const SortByForm:React.FC<props> = ({sortBy, sort}) => {
  return (
    <FormControl dir="rtl" className='sortForm' sx={sortByFrom}>
    <FormLabel id="demo-controlled-radio-buttons-group" sx={{mx:3}}>
      <Typography variant="h6" color="initial">مرتب سازی بر اساس:</Typography>
    </FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={sortBy}
      onChange={sort}
    >
      <FormControlLabel value="rate" control={<Radio color="success" />}  label="بیشترین امتیاز" />
      <FormControlLabel value="view" control={<Radio color="success" />}  label="بیشترین بازدید" />
      <FormControlLabel value="newest" control={<Radio color="success" />} label="جدیدترین" />
    </RadioGroup>
  </FormControl>
  )
}

export default SortByForm
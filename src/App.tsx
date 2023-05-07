import React, { useState, useRef, useCallback } from "react"
import useMovieLoad from "./hooks/useMovieLoad"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import MovieCard from "./MovieCard"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp';
import { Backdrop, Box, CircularProgress, LinearProgress } from "@mui/material"
import SortByForm from "./SortByForm"
import './index.css'

type sortTypes = 'view' | 'rate' | 'newest';

const App:React.FC = () =>{
  const observer = useRef<HTMLElement| null>()
  const [isSortBtnClicked, setIsSortBtnClicked] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<sortTypes>('rate');
  const [page, setPage] = useState<number>(1);
  const {isLoading, moviesList, hasMore} = useMovieLoad(sortBy, page); 
  const sort = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const sortValue = (event.target as HTMLInputElement).value;
    console.log('sorted')
    setSortBy(sortValue);
    setPage(1);
  }
  const lastRenderedMovie = useCallback(node => {
    if(isLoading) 
      return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore)
        setPage(perPage => perPage + 1)
        
    });
    if(node) observer.current.observe(node)
  }, [isLoading]);
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSortBtnClicked}
        onClick={()=>setIsSortBtnClicked(false)}
      />
      {
        isSortBtnClicked 
        ? 
        <SortByForm sortBy={sortBy} sort={sort} />
        :
        null
      }
      <Container 
        sx={{textAlign: "right", px: 1, pt: 1, minHeight: '101vh'}}
      >
        <a 
          href="" 
        >
          <Typography 
            variant="h6" 
            color="textSecondary"
            sx={{mb:1, verticalAlign: 'middle', display: 'inline-flex'}}
          >
            بازگشت
            <ArrowForwardIcon sx={{paddingTop: '5px'}}  />
          </Typography>
        </a>
      <Typography 
        variant="h6" 
        sx={{mb:2}}
      >
        چیا رو ببینم ؟
      </Typography>
      <Grid container justifyContent={"space-between"}  spacing={1}>
        <Typography 
          variant="subtitle2" 
          color="textSecondary"
          sx={{cursor: 'pointer', verticalAlign: 'middle', display: 'inline-flex'}}
          onClick={()=>{setIsSortBtnClicked(!isSortBtnClicked)}}
        >
          مرتب ساز
          <FilterListSharpIcon sx={{ml:1}} />
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary"
        >
          مناسب برای ۳ تا ۷ سال
        </Typography>
      </Grid>
      <Grid container spacing={3}  sx={{display: "flex", justifyContent: "center", pt:5}}>
        {
          isLoading && page === 1
          ? 
          <Box sx={{ width: '80%', mt: 6, mx: 'auto' }}>
            <LinearProgress color="success" />
          </Box>
          :
          moviesList.map((movie, index) => 
            moviesList.length === index + 1
            ?
            <Grid ref={lastRenderedMovie} item key={movie.id} lg={3}  md={4} xs={6} sx={{mt:5, display: 'flex', justifyContent: 'center'}}>
            <MovieCard
              img={{
                alt: movie.reviewsTitle,
                src: movie.reviewsThumbnailUrl
              }} 
              title={movie.reviewsTitle}
              score={movie.reviewsRate}  
            />
          </Grid>
            :
          <Grid item key={movie.id} lg={3} md={4} xs={6} sx={{mt:5, display: 'flex', justifyContent: 'center'}}>
            <MovieCard
              img={{
                alt: movie.reviewsTitle,
                src: movie.reviewsThumbnailUrl
              }} 
              title={movie.reviewsTitle}
              score={movie.reviewsRate}  
            />
          </Grid>
          )
        }
        {
          isLoading && page > 1
          ?
          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}} >
            <Box>
              <CircularProgress color="success" />
            </Box>
          </Grid>
          :
          null
        }
      </Grid>
      </Container>
    </>
  )
}

export default App

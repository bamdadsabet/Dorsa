import { useEffect, useState } from 'react'
import { getAnimationsList } from "../services"


const useMovieLoad = (sortBy: string, pageNumber: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [moviesList, setMovieList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        setMovieList([]);
    }, [sortBy]);
    useEffect(() => {
        setIsLoading(true);
        getAnimationsList(pageNumber, sortBy)
        .then(res => {
            setMovieList((pervMoviesList: []) => {
                console.log('perv', pervMoviesList, pageNumber);
                console.log('new', res.data.data, pageNumber);
                const movieList = [...pervMoviesList, ...res.data.data].map(JSON.stringify);
                setHasMore(res.data['max_num_pages'] > pageNumber)
                return [...new Set(movieList)].map(JSON.parse);
            });
            setIsLoading(false);
            console.log('is fetching data', sortBy)
            console.log(sortBy)
        });
    }, [pageNumber, sortBy]);
    return {isLoading, moviesList, hasMore}
}

export default useMovieLoad
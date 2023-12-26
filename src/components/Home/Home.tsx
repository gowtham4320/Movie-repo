import * as React from 'react'
import './Home.styl'
import { Button, Card, InputAdornment, TextField, Grid, Backdrop, Rating } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import office from '../../assets/images/Infosys_office.jpg'
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Hooks';
import axios from 'axios';
import Store from '../../Redux/Store/Store';
import { popularList, searchMovie } from '../../Redux/Actions/movies/moviesAction';

export default function Home() {
    const [searchText, setSearchText] = React.useState<string>("")
    const [searched, setSearched] = React.useState<boolean>(true)
    const [searchFocus, setSearchFocus] = React.useState<boolean>(false)
    const { movieList } = useAppSelector((state) => state.movies)
    const dispatch=useAppDispatch()



    React.useEffect(() => {
        if (searchText.length !== 0) {
            setSearched(true)
            const delayDebounceFn = setTimeout(async () => {
            dispatch(searchMovie(searchText))
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        } else {
            dispatch(popularList())
            setSearched(false)
        }

    }, [searchText])
    return (
        <div className='outerBody'>
            <div className={!searchFocus ? "searchDiv searchedDiv" : 'searchDiv'}>
                <TextField
                    placeholder='Search for movies'
                    className="search"
                    // onFocus={() => { setSearchFocus(true) }}
                    // onBlur={() => { setSearchFocus(false) }}
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value) }}
                    sx={{ color: "white" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon className='inputAdorements' />
                            </InputAdornment>
                        ),
                        // endAdornment: (
                        //     <InputAdornment position='end'>
                        //         <Button color='success' variant='contained' className='searchButton' onClick={() => { setSearched(!searched) }}><SearchRoundedIcon /></Button>
                        //     </InputAdornment>
                        // )
                    }}
                />
            </div>
            <div className={!searchFocus ? "innerBody afterSearch" : 'innerBody beforeSearch'}>
                <div className={searched?"searchTitle":'bodyTitle'}>{searched ? "SEARCH RESULT FOR: " + searchText : "POPULAR MOVIES"}</div>
                <Grid container className='movies'>
                    {
                        movieList?.results?.map((movie: { [key: string]: string }) => (
                            <Grid item lg={4} md={4} sm={6} xs={12} key={movie.id}>
                                <Card className='movieCard'>
                                    {/* <CardContent> */}
                                    <div className='movieInfo'>
                                        {/* <Backdrop className='movieInfo' open={true}> */}
                                        <div className="movieInfoText"> {movie.overview}</div>
                                        <Rating value={movie.vote_average / 2} size="large" precision={0.1} readOnly />
                                        {/* </Backdrop> */}
                                    </div>
                                    {movie.poster_path === null ? <div className='movieTitle'>{movie.title}</div> : <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} title={movie.title} loading='lazy' width={"100%"} height={"100%"} />}
                                    {/* </CardContent> */}
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>

            </div>
        </div>
    )
}
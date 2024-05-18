import "./Home.styl";
import {
  Card,
  InputAdornment,
  TextField,
  Grid,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Hooks";
import {
  popularList,
  searchMovie,
} from "../../Redux/Actions/movies/moviesAction";
import { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { getMovieTrailer } from "../../Redux/Actions/trailer/trailer.action";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(true);
  const [searchFocus] = useState<boolean>(false);
  const { movieList }: any = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  const handleTrailerButtonClick = (movieId:string,language:string,type:string) => {
    dispatch(getMovieTrailer(movieId,language,type));
  }

  useEffect(() => {
    if (searchText.length !== 0) {
      setSearched(true);
      const delayDebounceFn = setTimeout(async () => {
        dispatch(searchMovie(searchText));
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(popularList());
      setSearched(false);
    }
  }, [searchText]);
  return (
    <>
      <div className="outerBody">
        <div className={!searchFocus ? "searchDiv searchedDiv" : "searchDiv"}>
          <TextField
            placeholder="Search for movies"
            className="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            sx={{ color: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon className="inputAdorements" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div
          className={
            !searchFocus ? "innerBody afterSearch" : "innerBody beforeSearch"
          }
        >
          <div className={searched ? "searchTitle" : "bodyTitle"}>
            {searched ? "SEARCH RESULT FOR: " + searchText : "TRENDING"}
          </div>
          <Grid container className="movies">
            {movieList?.results?.map((movie: any) => (
              <Grid item lg={4} md={6} sm={8} xs={12} key={movie.id}>
                <Card className="movieCard">
                  <div className="movieInfo">
                    <div className="movieTitle">
                      {movie.title || movie.name}
                    </div>
                    <div className="movieInfoText"> {movie.overview}</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Rating
                        value={movie.vote_average / 2}
                        size="large"
                        precision={0.1}
                        readOnly
                        sx={{ flexGrow: 1 }}
                      />
                      <Tooltip title="Watch Trailer" placement="top" arrow>
                        <IconButton className="trailerButton" onClick={()=>{handleTrailerButtonClick(movie.id,movie.original_language,movie.media_type)}}>
                          <PlayCircleIcon className="trailerButtonIcon" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  {movie.poster_path === null ? (
                    <div className="movieTitle">
                      {movie.title || movie.name}
                    </div>
                  ) : (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + movie.poster_path
                      }
                      title={movie.title || movie.name}
                      loading="lazy"
                      width={"100%"}
                      height={"100%"}
                      alt={movie.title || movie.name}
                      sizes="(max-width: 600px) 200px, 50vw"
                    />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

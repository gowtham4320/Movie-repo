import { clearWatchList } from "../../Redux/Actions/watch/watch.action";
import { connect } from 'react-redux';
import WatchMovieComponent from "./watch.component";

const mapStateToProps = (state:any) =>{

    const movieExternalID = state.watch.imdb_id

    return {
        open : Boolean(movieExternalID.length),
        imdbId : movieExternalID
    }
}

const mapDispatchToProps = (dispatch:any) => {

    return {
        clearWatchList: () => dispatch(clearWatchList())
    }
}

export const WatchMovie = connect(mapStateToProps,mapDispatchToProps)(WatchMovieComponent);
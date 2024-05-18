import { clearTrailer } from "../../Redux/Actions/trailer/trailer.action";
import TrailerViewComponent from "./trailer.component";
import { connect } from 'react-redux';

const mapStateToProps = (state:any) =>{

    const trailer = state.trailers.trailerList.filter((trailers:any)=> trailers.name === "Official Trailer" || trailers.type === "Trailer")

    return {
        open : Boolean(trailer.length),
        trailerKey : trailer[trailer.length-1]?.key ?? ""
    }
}

const mapDispatchToProps = (dispatch:any) => {

    return {
        clearTrailers: () => dispatch(clearTrailer())
    }
}

export const TrailerView = connect(mapStateToProps,mapDispatchToProps)(TrailerViewComponent);
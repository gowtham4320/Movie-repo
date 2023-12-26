import { from, of } from 'rxjs';
import axios from 'axios';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from "rxjs/operators";
import Store from '../Redux/Store/Store';

async function submitToServer(searchQuery:string) {
    try {
        const options = {
            method: 'GET',
            url: 'http://api.themoviedb.org/3/search/movie',
            params: { query:searchQuery, include_adult: 'false', language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmQ2NTA2NzVlY2QzYmE2NjU2ZDA2YTQ5ZTVmY2M2ZCIsInN1YiI6IjY1MWUzY2Y1NzQ1MDdkMDBjNTdhMDEzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDsjRWcqppVw5wc_7FtAmDM4l5_G3kZzDV06oN0S3nc'
            }
        };
      const response= axios.request(options)
        return await response
    } catch (error: any) {
        throw new Error(error)
    }
}

const movieSearchedEpic = (action$: any, { getState, dispatch }: any) =>
    action$.pipe(
        ofType('SEARCH_MOVIE'),
        mergeMap((action: any) =>
            from(submitToServer(action.payload)).pipe(
                map((res: any) => {
                    return {
                        type: "MOVIE_LIST",
                        payload: res.data
                    }
                }),
                catchError(error => of(error).pipe(
                    map((res: any) => {
                        console.log(res)
                        return {
                            type: "MOVIE_SEARCHED_FAILURE",
                            payload: error.message,
                            error: true
                        }
                    })
                )
                )
            )
        )
    );

export default movieSearchedEpic

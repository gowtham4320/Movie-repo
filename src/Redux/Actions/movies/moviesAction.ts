
export const popularList = () => {
    return {
        type: "POPULAR_MOVIES"
    }
};

export const searchMovie = (searchQuery:string) => {
    return {
        type: "SEARCH_MOVIE",
        payload:searchQuery
    }
};

const initialState = {
    snackBarText:""
};

export const snackBarReducer = (state = initialState, { type, payload }: any) => {

    switch (type) {

        case "Success":
            return { ...state,snackBarText:payload??"" };
        case "Failure":
            return { ...state, snackBarText: payload??"" };
        default:
            return state
    }
}
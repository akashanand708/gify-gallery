import { FETCH_TRENDING_GIFS } from "../constants/action-types";
import * as session from '../endpoints';
import { ERROR } from "../constants/message";

export function getTrendingGifs(params) {
    return (dispatch) => {
        dispatch({ type: FETCH_TRENDING_GIFS.PENDING });
        return session.fetchTrendingGifs(params)
            .then((response) => {
                dispatch({ type: FETCH_TRENDING_GIFS.SUCCESS, payload: response });
                return response;
            })
            .catch((error) => {
                dispatch({ type: FETCH_TRENDING_GIFS.ERROR, payload: ERROR.FETCH_GIF_ERROR_MESSAGE });
                return error;
            });
    }
}
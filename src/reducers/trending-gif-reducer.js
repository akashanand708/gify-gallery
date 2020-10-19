import { handleActions } from 'redux-actions';
import { FETCH_TRENDING_GIFS } from '../constants/action-types';

var trendingGifReducer = handleActions({
    [FETCH_TRENDING_GIFS.PENDING]: (state) => {
        return {
            ...state,
            awitingData: true
        };
    },
    [FETCH_TRENDING_GIFS.SUCCESS]: (state, action) => {
        return {
            ...state,
            awitingData: false,
            trendingGifs: action.payload
        };
    },
    [FETCH_TRENDING_GIFS.ERROR]: (state,action) => {
        return {
            ...state,
            awitingData: false,
            error: action.payload
        };
    }
}, {
        awitingData: false,
        trendingGifs: {data:[],meta:{}},
        error:''
    });

export {
    trendingGifReducer
}

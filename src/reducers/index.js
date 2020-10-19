
import { combineReducers } from 'redux';
import { trendingGifReducer } from './trending-gif-reducer';

const rootReducer = combineReducers({
  trendingGifReducer,
});

export {
  rootReducer
}

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'; 
import userReducer from './user';
import generalReducer from './general';
import storyReducer from './story';

export default function rootReducer(history){
  return combineReducers({
    user: userReducer,
    story: storyReducer,
    general: generalReducer,
    router: connectRouter(history)
  });
}
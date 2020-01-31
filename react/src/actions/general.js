import axios from 'axios';
import * as c from '../constants';

const actions = {
  openMenu(value){
    return {
      value,
      type: c.HEADER_MENU_OPEN,
    }
  },
  closeMenu(){
    return {
      type: c.HEADER_MENU_CLOSE,
    }
  },
  fetchArticles(categoryId = null){
    return async ( dispatch, getStore ) => {
      const { user } = getStore();
      let userId = null;
      if( user.userId ) userId = user.userId;
      if(categoryId !== null){
        try {
          const result = await axios.get(`http://localhost:5000/stories/${categoryId}`,
          {
            params: {
              userId: userId
            }
          });
          dispatch({
            stories: result.data,
            type: c.STORY_GET_BY_CATEGORY_SUCCESS
          });
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.STORY_GET_BY_CATEGORY_FAILED
          });
        };
      } else {
        try {
          const result = await axios.get('http://localhost:5000/stories',{
            params: {
              userId: userId
            }
          });
          dispatch({
            categoryId: categoryId,
            stories: result.data,
            type: c.STORY_GET_ALL_SUCCESS
          });
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.STORY_GET_ALL_FAILED
          });
        };
      };
    };
  },
  closeSnack(){
    return dispatch => {
      dispatch({
        type: c.GENERAL_CLOSE_SNACK
      })
    }
  }
}

export default actions
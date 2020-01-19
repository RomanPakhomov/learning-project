import * as c from '../constants';

const initialState = {
  anchorEl: null,
  open: false,
  isLoading: true,
  error: '',
  success: '',
}

export default function generalReducer(state = initialState, action){
  switch(action.type){
    case c.HEADER_MENU_OPEN:
      return{
        ...state,
        anchorEl: action.value,
        open: true,
      }
    case c.HEADER_MENU_CLOSE:
      return{
        ...state,
        open: false,
      }
    case c.STORY_GET_ALL_SUCCESS:
      return{
        ...state,
        stories: action.stories,
        likes: action.likes,
        isLoading: false
      }
    case c.STORY_GET_ALL_FAILED:
      return{
        ...state,
        isLoading: false,
        error: action.errorMessage
      }
    case c.STORY_GET_BY_CATEGORY_FAILED:
      return{
        ...state,
        error: action.errorMessage
      }
    case c.STORY_GET_BY_CATEGORY_SUCCESS:
      return{
        ...state,
        stories: action.stories,
        likes: action.likes,
        isLoading: false
      }
    case c.GENERAL_CLOSE_SNACK:
      return{
        ...state,
        error: '',
        success: ''
      }
    default: 
      return state
  }
}
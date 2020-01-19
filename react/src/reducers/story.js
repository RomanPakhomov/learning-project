import * as c from '../constants';

const initialState = {
  public: false,
  category: '',
  categories: [],
  stories: [],
  modalDelete: false,
  title: '',
  content: '',
  error: '',
  success: ''
}

export default function storyReducer(state = initialState, action){
  switch(action.type){
    case c.STORY_INPUT_TITLE_CHANGED:
      return {
        ...state,
        title: action.value
      }
    case c.STORY_GET_CATEGORIES_SUCCESSFULL:
      return {
        ...state,
        categories: action.categories
      }
    case c.STORY_GET_CATEGORIES_FAILED: 
      return {
        ...state,
        error: action.errorMessage
      }
    case c.STORY_SELECT_CATEGORY_CHANGED:
      return {
        ...state,
        category: action.value
      }
    case c.STORY_INPUT_CONTENT_CHANGED:
      return {
        ...state,
        content: action.value
      }
    case c.STORY_CHECKBOX_PUBLIC_CHANGED:
      return {
        ...state,
        public: !state.public
      }
    case c.STORY_CREATE_FAILED:
      return {
        ...state,
        error: action.errorMessage
      }
    case c.STORY_CREATE_SUCCESSFULL:
      return{
        ...state,
        title: '',
        content: '',
        category: '',
        createResult: true,
        success: action.successMessage
      }
    case c.STORY_GET_BY_AUTHOR_FAILED:
      return {
        ...state,
        error: action.errorMessage
      }
    case c.STORY_GET_BY_AUTHOR_SUCCESSFULL:
      return {
        ...state,
        stories: action.stories.data,
        updateResult: false,
        createResult: false,
      }
    case c.STORY_CHANGE_PUBLIC_STATUS:
      return {
        ...state,
        stories: action.stories
      }
    case c.STORY_CHANGE_PUBLIC_STATUS_FAILED:
      return {
        ...state,
        error: action.errorMessage
      }
    case c.STORY_PREPARE_TO_CHANGING:
      return {
        ...state,
        id: action.story.storyId,
        title: action.story.title,
        category: action.story.category,
        content: action.story.content,
        public: action.story.public
      }
    case c.STORY_CHANGE_TITLE:
      return {
        ...state,
        title: action.value
      }
    case c.STORY_CHANGE_CATEGORY:
      return {
        ...state,
        category: action.value
      }
    case c.STORY_CHANGE_CONTENT:
      return {
        ...state,
        content: action.value
      }
    case c.STORY_CHANGE_STATUS:
      return {
        ...state,
        public: !state.public
      }
    case c.STORY_UPDATE_SUCCESSFULL:
      return {
        ...state,
        updateResult: true,
        success: action.successMessage
      }
    case c.STORY_UPDATE_FAILED:
      return{
        ...state,
        updateResult: false,
        error: action.errorMessage
      }
    case c.STORY_MODAL_DELETE_OPEN:
      return{
        ...state,
        storyDeletedId: action.storyId,
        modalDelete: true,
      }
    case c.STORY_MODAL_DELETE_CLOSE:
      return{
        ...state,
        StoryDeletedId: null,
        modalDelete: false,
      }
    case c.STORY_DELETE_FAILED:
      return{
        ...state
      }
    case c.STORY_DELETE_SUCCESSFUL:
      return{
        ...state,
        stories: action.newStories,
      }
    case c.STORY_INPUT_VALIDATE:
      return{
        ...state,
        [action.field]: action.value,
      }
    case c.GENERAL_CLOSE_SNACK:
      return{
        ...state,
        error: '',
        success: ''
      }
    default:
      return {
        ...state
      }
  }
}
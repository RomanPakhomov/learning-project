import axios from 'axios';
import * as c from '../constants';

const actions = {
  saveStoryTitleValue(value){
    return {
      value,
      type: c.STORY_INPUT_TITLE_CHANGED
    }
  },
  getCategories(){ 
    return async dispatch => {
      try{
        const categories = await axios.get('http://localhost:5000/stories/categories');
        dispatch({
          categories: categories.data,
          type: c.STORY_GET_CATEGORIES_SUCCESSFULL
        })
      } catch(e) {
        dispatch({
          errorMessage: e.response.data.message,
          type: c.STORY_GET_CATEGORIES_FAILED
        })
      } 
    }
  },
  saveStoryCategoryValue(value){
    return dispatch => {
      dispatch({
        value,
        type: c.STORY_SELECT_CATEGORY_CHANGED
      })
    }
  },
  saveStoryContentValue(value){
    return {
      value,
      type: c.STORY_INPUT_CONTENT_CHANGED
    }
  },
  saveStoryPublic(){
    return {
      type: c.STORY_CHECKBOX_PUBLIC_CHANGED
    }
  },
  createStory(){
    return async (dispatch, getStore) => {
      const { story } = getStore();
      const token = sessionStorage.getItem('token');
      if( story.title && story.category && story.content ) {
        try {
          const res = await axios.post('http://localhost:5000/user/create-story',
          {
            title: story.title,
            content: story.content,
            category: story.category,
            mainImage: 'main-image',
            images: 'main-images',
            public: story.public
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          dispatch({
            successMessage: res.data,
            type: c.STORY_CREATE_SUCCESSFULL
          })
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.STORY_CREATE_FAILED
          })
        };
      };
    };
  },
  changeStory(){
    return async (dispatch, getStore) => {
      const { story } = getStore();
      const token = sessionStorage.getItem('token');
      if( story.title && story.category && story.title){
        try {
          const res = await axios.post('http://localhost:5000/user/update-story',
          {
            storyId: story.id,
            title: story.title,
            content: story.content,
            category: story.category,
            mainImage: 'main-image',
            images: 'main-images',
            public: story.public
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          dispatch({
            successMessage: res.data,
            type: c.STORY_UPDATE_SUCCESSFULL
          });
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.STORY_UPDATE_FAILED
          });
        };
      };
    };
  },
  deleteStory(storyId){
    return async (dispatch, getStore) => {
      const token = sessionStorage.getItem('token');
      try {
        const res = await axios.post('http://localhost:5000/story/delete',
        {
          storyId: storyId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { story } = getStore();
        const storyIndex = story.stories.findIndex( item => item.storyId === storyId);
        let newStories = story.stories.slice();
        newStories.splice(storyIndex, 1);
        dispatch({
          successMessage: res.data,
          newStories: newStories,
          type: c.STORY_DELETE_SUCCESSFUL
        })
      } catch(e) {
        dispatch({
          errorMessage: e.response.data.message,
          type: c.STORY_DELETE_FAILED
        })
      }
    }
  },
  getUserStories(){
    return async (dispatch, getStore) => {
      const { user } = getStore();
      try {
        const stories = await axios.get('http://localhost:5000/stories/user/',
        {
          params: {
            userId: user.userId
          }
        });
        dispatch({
          stories,
          type: c.STORY_GET_BY_AUTHOR_SUCCESSFULL
        })
      } catch(e) {
        dispatch({
          errorMessage: e.response.data.message,
          type: c.STORY_GET_BY_AUTHOR_FAILED
        })
      }
    }
  },
  changeStoryStatus(storyId, publicStatus){
    return async (dispatch, getStore) => { 
      const { story } = getStore();
      const token = sessionStorage.getItem('token');
      story.stories.find(item => {
        if(item.storyId == storyId) item.public = !publicStatus;
      }) 
      try {
        const result = await axios.get('http://localhost:5000/story/public',
        {
          params: {
            storyId: storyId,
            status: !publicStatus
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        dispatch({
          stories: story.stories,
          type: c.STORY_CHANGE_PUBLIC_STATUS
        })
      } catch(e) {
        dispatch({
          errorMessage: e.response.data.message,
          type: c.STORY_CHANGE_PUBLIC_STATUS_FAILED
        })
      }
    }
  },
  prepareChangeStory(id){
    return (dispatch, getStore) => {
      const { story } = getStore();
      dispatch({
        story: story.stories[id],
        type: c.STORY_PREPARE_TO_CHANGING
      })
    }
  },
  changeStoryTitleValue(value, id){
    return {
      id,
      value,
      type: c.STORY_CHANGE_TITLE
    }
  },
  changeStoryCategoryValue(value){
    return dispatch => {
      dispatch({
        value,
        type: c.STORY_CHANGE_CATEGORY
      })
    }
  },
  changeStoryContentValue(value){
    return {
      value,
      type: c.STORY_CHANGE_CONTENT
    }
  },
  changeStoryPublic(){
    return {
      type: c.STORY_CHANGE_STATUS
    }
  },
  validate(value, field){
    return dispatch => {
      if(value === ''){
        dispatch({
          field: field,
          value: true,
          type: c.STORY_INPUT_VALIDATE
        })
      } else {
        dispatch({
          field: field,
          value: false,
          type: c.STORY_INPUT_VALIDATE
        })
      }
    }
  },
  validateFinal(fields){
    return (dispatch, getStore) => {
      const { story } = getStore();
      fields.forEach( field => {
        if(story[field] === undefined){
          dispatch({
            field: field,
            value: true,
            type: c.STORY_INPUT_VALIDATE
          })
        }
      })
    }
  },
  modalDeleteOpen(storyId){
    return{
      storyId,
      type: c.STORY_MODAL_DELETE_OPEN
    }
  },
  modalDeleteClose(){
    return{
      type: c.STORY_MODAL_DELETE_CLOSE
    }
  }
}

export default actions
import axios from 'axios';
import * as c from '../constants';

const actions = {
  saveUserRegNameValue(value){
    return {
      value,
      type: c.USER_INPUT_REG_NAME_CHANGED,
    }
  },
  saveUserRegSurnameValue(value){
    return {
      value,
      type: c.USER_INPUT_REG_SURNAME_CHANGED,
    }
  },
  saveUserRegBirthDateValue(value){
    return {
      value,
      type: c.USER_INPUT_REG_BIRTHDATE_CHANGED,
    }
  },
  saveUserRegLoginValue(value){
    return {
      value,
      type: c.USER_INPUT_REG_LOGIN_CHANGED,
    }
  },
  saveUserRegPasswordValue(value){
    return {
      value,
      type: c.USER_INPUT_REG_PASSWORD_CHANGED,
    }
  },
  saveUserRegPassword2Value(value){
    return {
      value,
      type: c.USER_INPUT_REG_PASSWORD2_CHANGED,
    }
  },
  registration(){
    return async (dispatch, getStore) => {
      const { user } = getStore();
      if( user.userName && user.userLogin && user.userRegPassword && user.userRegPassword2 ){
        try{
          const res = await axios.post('http://localhost:5000/user/register',{
            name: user.userName,
            surname: user.userSurname,
            birthDate: user.userBirthDate,
            login: user.userLogin,
            password: user.userRegPassword,
            password2: user.userRegPassword2
          });
          dispatch({
            successMessage: res.data,
            type: c.USER_REGISTRATION_SUCCESS
          });
        } catch(e) {
          dispatch({
            type: c.USER_REGISTRATION_FAILED,
            errorMessage: e.response.data.message,
          });
        };
      };
    };
  },
  returnRegister(){
    return {
      type: c.USER_RETURN_REGISTER
    }
  },
  saveUserAuthLoginValue(value){
    return {
      value,
      type: c.USER_INPUT_AUTH_LOGIN_CHANGED
    }
  },
  saveUserAuthPasswordValue(value){
    return {
      value,
      type: c.USER_INPUT_AUTH_PASSWORD_CHANGED,
    }
  },
  saveUserAuth(){
    return {
      type: c.USER_SAVE_AUTH,
    }
  },
  authorization(){
    return async (dispatch, getStore) => {
      const { user } = getStore();
      if( user.userLogin && user.userPassword ) {
        try {
          const response = await axios.post('http://localhost:5000/user/login',{
            login: user.userLogin,
            password: user.userPassword
          });
          sessionStorage.setItem('token', response.data.user.token);
          if(user.userSave){
            try{
              localStorage.setItem('token', response.data.user.token);
              dispatch({
                type: c.USER_SAVE_AUTH
              });
            } catch(e) {
              console.log(e);
            };
          };
          dispatch({
            user: response.data.user,
            type: c.USER_AUTH_SUCCESS
          });
        } catch(e) {
          dispatch({
            type: c.USER_AUTH_FAILED,
            errorMessage: e.response.data.message
          })
        };
      };
    };
  },
  getUserProfile(){
    return async (dispatch) => {
      let token = localStorage.getItem('token');
      if(!token){
        token = sessionStorage.getItem('token');
      }
      if(token){
        try{
          const user = await axios.get('http://localhost:5000/user/profile', {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          sessionStorage.setItem('token', token);
          dispatch({
            user: user.data,
            type: c.USER_AUTH_TOKEN_SUCCESS,
          });
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.USER_AUTH_TOKEN_FAILED, 
          });
        };
      } else {
        dispatch({
          errorMessage: '',
          type: c.USER_AUTH_TOKEN_FAILED
        });
      };
    };
  },
  saveUserNewNameValue(value){
    return {
      value,
      type: c.USER_INFO_NAME_CHANGED
    }
  },
  saveUserNewSurnameValue(value){
    return {
      value,
      type: c.USER_INFO_SURNAME_CHANGED
    }
  },
  saveUserNewBirthDateValue(value){
    return {
      value,
      type: c.USER_INFO_BIRTDATE_CHANGED
    }
  },
  saveUserNewPasswordOldValue(value){
    return {
      value,
      type: c.USER_INFO_PASSWORD_OLD_CHANGED
    }
  },
  saveUserNewPasswordValue(value){
    return {
      value,
      type: c.USER_INFO_PASSWORD_CHANGED
    }
  },
  saveUserNewPassword2Value(value){
    return {
      value,
      type: c.USER_INFO_PASSWORD2_CHANGED
    }
  },
  updateUserInfo(){
    return async (dispatch, getSrote) => {
      const { user } = getSrote();
      if( user.newUserName && user.newUserSurname ) {
        try{
          const token = sessionStorage.getItem('token');
          const res = await axios.post('http://localhost:5000/user/change',
          {
            name: user.newUserName,
            surname: user.newUserSurname,
            birthDate: user.newUserBirthDate
          },
          {  
            headers:{
            'Authorization': `Bearer ${token}`
            }
          });
          dispatch({
            successMessage: res.data.result,
            type: c.USER_INFO_CHANGED_SUCCESS
          });
        } catch(e) {
          dispatch({
            errorMessage: e.response.data.message,
            type: c.USER_INFO_CHANGED_FAILED
          });
        };
      }; 
    };
  },
  updatePassword(){
    return async (dispatch, getStore)=> {
      const { user } = getStore();
      if( user.userOldPassword && user.userNewPassword && userNewPassword2 ){
        try{
          const token = sessionStorage.getItem('token');
          const res = await axios.post('http://localhost:5000/user/change-password',
            {
              passwordOld: user.userOldPassword,
              password: user.userNewPassword,
              password2: user.userNewPassword2
            },
            {
              headers:{
                'Authorization': `Bearer ${token}`
              }
            });
          dispatch({
            successMessage: res.data,
            type: c.USER_PASSWORD_CHANGED_SUCCESS
          });
        } catch(e) {
          dispatch({
            type: c.USER_PASSWORD_CHANGED_FAILED,
            errorMessage: e.response.data.message
          });
        };
      };
    };
  },
  userLogout(){
    return dispatch => {
      localStorage.setItem('token', '');
      sessionStorage.setItem('token', '');
      dispatch({
        type: c.USER_LOGOUT
      })
    }
  },
  like(storyId){
    return async dispatch => {
      const token = sessionStorage.getItem('token');
      try {
        await axios.post('http://localhost:5000/user/like/',
        {
          storyId: storyId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        dispatch({
          type: c.USER_LIKE_SUCCESS
        })
      } catch(e) {
        dispatch({
          errorMessage: e.response.data.message,
          type: c.USER_LIKE_FAILED
        })
      }
    }
  },
  validate(value, field){
    return dispatch => {
      if(value === ''){
        dispatch({
          field: field,
          value: true,
          type: c.USER_INPUT_VALIDATE
        })
      } else {
        dispatch({
          field: field,
          value: false,
          type: c.USER_INPUT_VALIDATE
        })
      }
    }
  },
  validateFinal(fields){
    return (dispatch, getStore) => {
      const { user } = getStore();
      fields.forEach( field => {
        if(user[field] === undefined){
          dispatch({
            field: field,
            value: true,
            type: c.USER_INPUT_VALIDATE
          })
        }
      })
    }
  },
  modalExitOpen(){
    return{
      type: c.USER_MODAL_EXIT_OPEN
    }
  },
  modalExitClose(){
    return{
      type: c.USER_MODAL_EXIT_CLOSE
    }
  }
}

export default actions
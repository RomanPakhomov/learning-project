import * as c from '../constants';

const initialState = {
  userAuth: false,
  userTryToAuth: false,
  userLogout: false,
  modalExit: false,
  _nameNewError: false,
  _surnameNewError: false,
  userLogin: '',
  userName: '',
  userSurname: '',
  userLogin: '',
  userPassword: '',
  userRegPassword: '',
  userRegPassword2: '',
  userOldPassword: '',
  userNewPassword: '',
  userNewPassword2: '',
  error: '',
  success: '',
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case c.USER_INPUT_REG_NAME_CHANGED:
      return{
        ...state,
        userName: action.value,
      }
    case c.USER_INPUT_REG_SURNAME_CHANGED:
      return{
        ...state,
        userSurname: action.value,
      }
    case c.USER_INPUT_REG_BIRTHDATE_CHANGED:
      return{
        ...state,
        userBirthDate: action.value,
      }
    case c.USER_INPUT_REG_LOGIN_CHANGED:
      return{
        ...state,
        userLogin: action.value,
      }
    case c.USER_INPUT_REG_PASSWORD_CHANGED:
      return{
        ...state,
        userRegPassword: action.value,
      }
    case c.USER_INPUT_REG_PASSWORD2_CHANGED:
      return{
        ...state,
        userRegPassword2: action.value,
      }
    case c.USER_REGISTRATION_FAILED:
      return{
        ...state,
        error: action.errorMessage
      }
    case c.USER_REGISTRATION_SUCCESS:
      return{
        ...state,
        userReg: true,
        userLogin: '',
        userName: '',
        userSurname: '',
        userRegPassword: '',
        userRegPassword2: '',
        success: action.successMessage
      }
    case c.USER_RETURN_REGISTER:
      return{
        ...state,
        userReg: false
      }
    case c.USER_INPUT_AUTH_LOGIN_CHANGED:
      return{
        ...state,
        userLogin: action.value
      }
    case c.USER_INPUT_AUTH_PASSWORD_CHANGED:
      return{
        ...state,
        userPassword: action.value
      }
    case c.USER_AUTH_FAILED:
      return{
        ...state,
        userTryToAuth: true,
        userLogout: false,
        error: action.errorMessage
      }
    case c.USER_AUTH_SUCCESS:
      return{
        ...state,
        userAuth: true,
        userTryToAuth: true,
        userLogout: false,
        userName: action.user.name,
        userSurname: action.user.surname,
        userBirthDate: action.user.birthDate,
        userId: action.user.userId,
        newUserName: action.user.name,
        newUserSurname: action.user.surname,
        newUserBirthDate: action.user.birthDate,
      }
    case c.USER_SAVE_AUTH:
      return{
        ...state,
        userSave: !state.userSave
      }
    case c.USER_AUTH_TOKEN_FAILED:
      return{
        ...state,
        userTryToAuth: true,
        userLogout: false,
        error: action.errorMessage
      }
    case c.USER_AUTH_TOKEN_SUCCESS:
      return{
        ...state,
        userAuth: true,
        userTryToAuth: true,
        userLogout: false,
        userName: action.user.name,
        userSurname: action.user.surname,
        userBirthDate: action.user.birthDate,
        userId: action.user.userId,
        newUserName: action.user.name,
        newUserSurname: action.user.surname,
        newUserBirthDate: action.user.birthDate,
      }
    case c.USER_LOGOUT:
      return{
        userAuth: false,
        userLogout: true,
        modalExit: false,
        modalDelete: false
      }
    case c.USER_INFO_NAME_CHANGED:
      return{
        ...state,
        newUserName: action.value
      }
    case c.USER_INFO_SURNAME_CHANGED:
      return{
        ...state,
        newUserSurname: action.value
      }
    case c.USER_INFO_BIRTDATE_CHANGED:
      return{
        ...state,
        newUserBirthDate: action.value
      }
    case c.USER_INFO_PASSWORD_OLD_CHANGED:
      return{
        ...state,
        userOldPassword: action.value
      }
    case c.USER_INFO_PASSWORD_CHANGED:
      return{
        ...state,
        userNewPassword: action.value
      }
    case c.USER_INFO_PASSWORD2_CHANGED:
      return{
        ...state,
        userNewPassword2: action.value
      }
    case c.USER_INFO_CHANGED_FAILED:
      return{
        ...state,
        error: action.errorMessage
      }
    case c.USER_INFO_CHANGED_SUCCESS:
      return{
        ...state,
        userName: state.newUserName,
        userSurname: state.newUserSurname,
        userBirthDate: state.newUserBirthDate,
        success: action.successMessage
      }
    case c.USER_PASSWORD_CHANGED_FAILED:
      return{
        ...state,
        error: action.errorMessage
      }
    case c.USER_PASSWORD_CHANGED_SUCCESS:
      return{
        ...state,
        success: action.successMessage
      }
    case c.USER_LIKE_SUCCESS: 
      return{
        ...state
      }
    case c.USER_LIKE_FAILED:
      return{
        ...state,
        error: action.errorMessage
      }
    case c.USER_MODAL_EXIT_OPEN:
      return{
        ...state,
        modalExit: true
      }
    case c.USER_MODAL_EXIT_CLOSE:
      return{
        ...state,
        modalExit: false,
      }
    case c.USER_INPUT_VALIDATE:
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
      return state
  }
}
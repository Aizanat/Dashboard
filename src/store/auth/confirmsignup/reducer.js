import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESSFUL,
  CONFIRM_EMAIL_FAILED,
  RESET_CONFIRMEMAIL_FLAG,
} from './actionTypes'

const initialState = {
  confirmEmailError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
}

const ConfirmEmail = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_EMAIL:
      state = {
        ...state,
        loading: true,
        confirmEmailError: null,
      }
      break
    case CONFIRM_EMAIL_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
        confirmEmailError: null,
      }
      break
    case CONFIRM_EMAIL_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        confirmEmailError: action.payload,
        error: true,
      }
      break
    case RESET_CONFIRMEMAIL_FLAG:
      state = {
        ...state,
        success: false,
        error: false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default ConfirmEmail

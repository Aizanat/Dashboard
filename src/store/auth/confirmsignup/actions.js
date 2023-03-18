import {
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESSFUL,
  CONFIRM_EMAIL_FAILED,
  RESET_CONFIRMEMAIL_FLAG,
} from './actionTypes'

export const confirmEmail = (email) => {
  return {
    type: CONFIRM_EMAIL,
    payload: { email },
  }
}

export const confirmEmailSuccessful = (email) => {
  return {
    type: CONFIRM_EMAIL_SUCCESSFUL,
    payload: email,
  }
}

export const confirmEmailFailed = (email) => {
  return {
    type: CONFIRM_EMAIL_FAILED,
    payload: email,
  }
}

export const resetConfirmEmailFlag = () => {
  return {
    type: RESET_CONFIRMEMAIL_FLAG,
  }
}

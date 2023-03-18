import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

//Account Redux states
import { CONFIRM_EMAIL } from './actionTypes'
import { confirmEmailSuccessful, confirmEmailFailed } from './actions'

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper'
import {
  postFakeRegister,
  postJwtRegister,
} from '../../../helpers/fakebackend_helper'

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* confirmEmail({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
      const response = yield call(
        fireBaseBackend.confirmEmail,
        user.email,
        user.password
      )
      yield put(confirmEmailSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
      const response = yield call(postJwtRegister, '/post-jwt-register', user)
      yield put(confirmEmailSuccessful(response))
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeRegister, user)
      if (response.message === 'success') {
        yield put(confirmEmailSuccessful(response))
      } else {
        yield put(confirmEmailFailed(response))
      }
    }
  } catch (error) {
    yield put(confirmEmailFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(CONFIRM_EMAIL, confirmEmail)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga

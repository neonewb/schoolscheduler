import { SET_CURRENT_USER, CLEAR_CURRENT_USER, SIGN_UP_USER_SUCCESS, SIGN_UP_USER_FAILED, LOG_OUT_USER_FAILED, LOG_IN_USER_SUCCESS } from './auth.actions'

const initialState = {
  currentUser: {
    email: null
  }
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case SET_CURRENT_USER:
    case SIGN_UP_USER_FAILED:
    case SIGN_UP_USER_SUCCESS:
    case LOG_OUT_USER_FAILED:
    case LOG_IN_USER_SUCCESS:
      return { ...state, ...payload }

    case CLEAR_CURRENT_USER:
      return { ...state, currentUser: { email: null} }

    default:
      return state
  }
}

export default authReducer

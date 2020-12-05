import { InferActionsTypes } from './../redux.store'
import * as AuthActions from './auth.actions'

type AuthActionsTypes = InferActionsTypes<typeof AuthActions>

const initialState = {
  currentUser: {
    email: null as null | string,
    uid: null as null | string,
    displayName: null as null | string,
    photoURL: null as null | string,
  },
}

type initialStateT = typeof initialState

const authReducer = (
  state = initialState,
  action: AuthActionsTypes
): initialStateT => {
  switch (action.type) {

    case 'SET_CURRENT_USER':
    case 'SIGN_UP_USER_SUCCESS':
    case 'LOG_IN_USER_SUCCESS': {
      const { email, uid, displayName, photoURL } = action.payload.currentUser

      return {
        ...state,
        currentUser: {
          email,
          uid,
          displayName,
          photoURL,
        },
      }
    }

    case 'CLEAR_CURRENT_USER':
      return {
        ...state,
        currentUser: {
          email: null,
          uid: null,
          displayName: null,
          photoURL: null,
        },
      }
    
    case 'LOG_IN_USER_FAILED':
    case 'LOG_OUT_USER_FAILED':
    case 'SIGN_UP_USER_FAILED':
      console.error(action.error)
      return state

    default:
      return state
  }
}

export default authReducer

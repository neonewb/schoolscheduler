import { FirebaseError } from "firebase"

export type CurrentUserT = {
  email: null | string
  uid: null | string
  displayName: null | string
  photoURL: null | string
}

export const setCurrentUserAC = (currentUser: firebase.User) =>
  ({
    type: 'SET_CURRENT_USER',
    payload: {
      currentUser,
    },
  } as const)

export const clearCurrentUserAC = () =>
  ({
    type: 'CLEAR_CURRENT_USER',
  } as const)

export type SignUpUserT = ReturnType<typeof signUpUserAC>
export const signUpUserAC = (email: string, password: string) =>
  ({
    type: 'SIGN_UP_USER',
    payload: {
      email,
      password,
    },
  } as const)

export const signUpUserFailedAC = (error: FirebaseError) =>
  ({
    type: 'SIGN_UP_USER_FAILED',
    error,
  } as const)

export const signUpUserSuccessAC = (currentUser: firebase.User) =>
  ({
    type: 'SIGN_UP_USER_SUCCESS',
    payload: {
      currentUser,
    },
  } as const)

export const logOutAC = () =>
  ({
    type: 'LOG_OUT_USER',
  } as const)

export const logOutUserFailedAC = (error: FirebaseError) =>
  ({
    type: 'LOG_OUT_USER_FAILED',
    error,
  } as const)

export type LogInUserT = ReturnType<typeof logInUserAC>
export const logInUserAC = (email: string, password: string) =>
  ({
    type: 'LOG_IN_USER',
    payload: {
      email,
      password,
    },
  } as const)

export const logInUserFailedAC = (error: FirebaseError) =>
  ({
    type: 'LOG_IN_USER_FAILED',
    error,
  } as const)

export const logInUserSuccessAC = (currentUser: firebase.User) =>
  ({
    type: 'LOG_IN_USER_SUCCESS',
    payload: {
      currentUser,
    },
  } as const)

export const logInWithGoogleAC = () =>
  ({
    type: 'LOG_IN_WITH_GOOGLE',
  } as const)

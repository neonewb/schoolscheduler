type CurrentUserT = {
  email: null | string
  uid: null | string
  displayName: null | string
  photoURL: null | string
}

export const setCurrentUserAC = (currentUser: CurrentUserT) =>
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

export const signUpUserAC = (email: string, password: string) =>
  ({
    type: 'SIGN_UP_USER',
    payload: {
      email,
      password,
    },
  } as const)

export const signUpUserFailedAC = (error: string) =>
  ({
    type: 'SIGN_UP_USER_FAILED',
    error,
  } as const)

export const signUpUserSuccessAC = (currentUser: CurrentUserT) =>
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

export const logOutUserFailedAC = (error: string) =>
  ({
    type: 'LOG_OUT_USER_FAILED',
    error,
  } as const)

export const logInUserAC = (email: string, password: string) =>
  ({
    type: 'LOG_IN_USER',
    payload: {
      email,
      password,
    },
  } as const)

export const logInUserFailedAC = (error: string) =>
  ({
    type: 'LOG_IN_USER_FAILED',
    error,
  } as const)

export const logInUserSuccessAC = (currentUser: CurrentUserT) =>
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

export const SET_CURRENT_USER = 'app/auth/SET_CURRENT_USER'
export const CLEAR_CURRENT_USER = 'app/auth/CLEAR_CURRENT_USER'
export const SIGN_UP_USER = 'app/auth/SIGN_UP_USER'
export const SIGN_UP_USER_FAILED = 'app/auth/SIGN_UP_USER_FAILED'
export const SIGN_UP_USER_SUCCESS = 'app/auth/SIGN_UP_USER_SUCCESS'
export const LOG_OUT_USER = 'app/auth/LOG_OUT_USER'
export const LOG_OUT_USER_FAILED = 'app/auth/LOG_OUT_USER_FAILED'
export const LOG_IN_USER = 'app/auth/LOG_IN_USER'
export const LOG_IN_USER_FAILED = 'app/auth/LOG_IN_USER_FAILED'
export const LOG_IN_USER_SUCCESS = 'app/auth/LOG_IN_USER_SUCCESS'
export const LOG_IN_WITH_GOOGLE = 'app/auth/LOG_IN_WITH_GOOGLE'


export const setCurrentUserAC = (currentUser) => ({
  type: SET_CURRENT_USER,
  payload: {
    currentUser,
  },
})

export const clearCurrentUserAC = () => ({
  type: CLEAR_CURRENT_USER,
})


export const signUpUserAC = (email, password) => ({
  type: SIGN_UP_USER,
  payload: {
    email,
    password,
  },
})

export const signUpUserFailedAC = (error) => ({
  type: SIGN_UP_USER_FAILED,
  payload: {
    error,
  },
})

export const signUpUserSuccessAC = (response) => ({
  type: SIGN_UP_USER_SUCCESS,
  payload: {
    currentUser: response.user,
  },
})

export const logOutAC = () => ({
  type: LOG_OUT_USER,
})

export const logOutUserFailedAC = (error) => ({
  type: LOG_OUT_USER_FAILED,
  payload: {
    error,
  },
})

export const logInUserAC = (email, password) => ({
  type: LOG_IN_USER,
  payload: {
    email,
    password,
  },
})

export const logInUserFailedAC = (error) => ({
  type: LOG_IN_USER_FAILED,
  payload: {
    error,
  },
})


export const logInUserSuccessAC = (response) => ({
  type: LOG_IN_USER_SUCCESS,
  payload: {
    currentUser: response.user,
  },
})

export const logInWithGoogleAC = () => ({
  type: LOG_IN_WITH_GOOGLE,
})

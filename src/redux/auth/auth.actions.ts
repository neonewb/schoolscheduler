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

export type AuthActionsTypes =
  | SetCurrentUserACT
  | ClearCurrentUserACT
  | signUpUserACT
  | SignUpUserFailedACT
  | SignUpUserSuccessACT
  | LogOutACT
  | LogOutUserFailedACT
  | LogInUserACT
  | LogInUserFailedACT
  | LogInUserSuccessACT
  | LogInWithGoogleACT

type CurrentUserT = {
  email: null | string
  uid: null | string
  displayName: null | string
  photoURL: null | string
}

type SetCurrentUserACT = {
  type: typeof SET_CURRENT_USER
  payload: {
    currentUser: CurrentUserT
  }
}

export const setCurrentUserAC = (currentUser: any): SetCurrentUserACT => ({
  type: SET_CURRENT_USER,
  payload: {
    currentUser,
  },
})

type ClearCurrentUserACT = {
  type: typeof CLEAR_CURRENT_USER
}

export const clearCurrentUserAC = (): ClearCurrentUserACT => ({
  type: CLEAR_CURRENT_USER,
})

type signUpUserACT = {
  type: typeof SIGN_UP_USER
  payload: {
    email: string
    password: string
  }
}

export const signUpUserAC = (
  email: string,
  password: string
): signUpUserACT => ({
  type: SIGN_UP_USER,
  payload: {
    email,
    password,
  },
})

type SignUpUserFailedACT = {
  type: typeof SIGN_UP_USER_FAILED
  payload: {
    error: any
  }
}

export const signUpUserFailedAC = (error: any): SignUpUserFailedACT => ({
  type: SIGN_UP_USER_FAILED,
  payload: {
    error,
  },
})

type SignUpUserSuccessACT = {
  type: typeof SIGN_UP_USER_SUCCESS
  payload: {
    currentUser: CurrentUserT
  }
}

export const signUpUserSuccessAC = (response: any): SignUpUserSuccessACT => ({
  type: SIGN_UP_USER_SUCCESS,
  payload: {
    currentUser: response.user,
  },
})

type LogOutACT = {
  type: typeof LOG_OUT_USER
}

export const logOutAC = (): LogOutACT => ({
  type: LOG_OUT_USER,
})

type LogOutUserFailedACT = {
  type: typeof LOG_OUT_USER_FAILED
  payload: {
    error: any
  }
}

export const logOutUserFailedAC = (error: any): LogOutUserFailedACT => ({
  type: LOG_OUT_USER_FAILED,
  payload: {
    error,
  },
})

type LogInUserACT = {
  type: typeof LOG_IN_USER
  payload: {
    email: string
    password: string
  }
}

export const logInUserAC = (email: string, password: string): LogInUserACT => ({
  type: LOG_IN_USER,
  payload: {
    email,
    password,
  },
})

type LogInUserFailedACT = {
  type: typeof LOG_IN_USER_FAILED
  payload: {
    error: any
  }
}

export const logInUserFailedAC = (error: any): LogInUserFailedACT => ({
  type: LOG_IN_USER_FAILED,
  payload: {
    error,
  },
})

type LogInUserSuccessACT = {
  type: typeof LOG_IN_USER_SUCCESS
  payload: {
    currentUser: CurrentUserT
  }
}

export const logInUserSuccessAC = (response: any): LogInUserSuccessACT => ({
  type: LOG_IN_USER_SUCCESS,
  payload: {
    currentUser: response.user,
  },
})

type LogInWithGoogleACT = {
  type: typeof LOG_IN_WITH_GOOGLE
}

export const logInWithGoogleAC = (): LogInWithGoogleACT => ({
  type: LOG_IN_WITH_GOOGLE,
})

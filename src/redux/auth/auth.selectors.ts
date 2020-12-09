import { AppStateType } from './../redux.store'

export const getUserS = (state: AppStateType) => state.auth.currentUser

import { AppStateType } from '../rootReducer'

export const getUserS = (state: AppStateType) => state.auth.currentUser

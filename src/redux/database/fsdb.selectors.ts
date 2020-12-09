import { AppStateType } from '../redux.store'

export const getSchedulesS = (state: AppStateType) => state.fsdb.schedules

export const getIsLoadingS = (state: AppStateType) => state.fsdb.isLoading

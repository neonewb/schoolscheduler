import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import authReducer from './auth/auth.reducer'
import createSagaMiddleware from 'redux-saga'
import firestoreReducer from './database/firestore.reducer'
import TTReducer from './timetable/tt.reducer'
import rootSaga from './rootSaga'

const saga = createSagaMiddleware()

const middlewares = [logger, saga]

const rootReducer = combineReducers({
  timetable: TTReducer,
  fsdb: firestoreReducer,
  auth: authReducer,
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<InferValueTypes<T>>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

saga.run(rootSaga)

export default store

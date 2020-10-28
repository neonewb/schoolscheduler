import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import authReducer from './auth/auth.reducer'
import createSagaMiddleware from 'redux-saga'
import { mySaga } from './../saga/sagas'

const saga = createSagaMiddleware()

const middlewares = [logger, saga]

const combiner = combineReducers({
  auth: authReducer,
})

let store = createStore(
  combiner,
  composeWithDevTools(applyMiddleware(...middlewares))
)

saga.run(mySaga)

export default store
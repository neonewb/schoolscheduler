import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
import rootSaga from './rootSaga'

const saga = createSagaMiddleware()

const middlewares = [logger, saga]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

saga.run(rootSaga)

export default store

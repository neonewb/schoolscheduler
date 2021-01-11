import { combineReducers } from 'redux'
import authReducer from './auth/auth.reducer'
import schedReducer from './schedules/sched.reducer'
import TTReducer from './timetable/tt.reducer'
import TTReducerDemo from './timetableDemo/tt.demo.reducer'

export const rootReducer = combineReducers({
  timetable: TTReducer,
  timetableDemo: TTReducerDemo,
  sched: schedReducer,
  auth: authReducer,
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// Type, that helps identify the values of types in objects, example with action creators:
//
// import * as ActionCreators from 'actionCreators'
// type ActionCreatorsTypes = ReturnType<InferValueTypes<typeof ActionCreators>>;
//
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

// Type, that helps identify actions creators types and collects them in a union, example:
//
// import * as ActionCreators from 'actionCreators'
// type ActionCreatorsTypes = InferActionsTypes<typeof ActionCreators>
//
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<InferValueTypes<T>>

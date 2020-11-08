import {
  ADD_DOC_TO_COLLECTION_FAILED,
  ADD_DOC_TO_COLLECTION_SUCCESS,
  SET_DOC_TO_RX_STATE,
  DEL_DOC_FROM_COLLECTION_FAILED,
  DEL_DOC_FROM_RX_STATE,
  CLEAR_RX_STATE,
  CHOOSE_SCHEDULE,
  SET_IS_LOADING_TRUE,
  SET_IS_LOADING_FALSE,
  SET_SCHED_TITLE,
  UPDATE_SCHEDULE_FAILED,
  CHANGE_NUMBER_OF_DAYS,
  CHANGE_MAX_LESSONS_PER_DAY,
  UPDATE_FIELD,
} from './firestore.actions'

const initialState = {
  schedules: [],
  isLoading: false,
  error: null,
}

const firestoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOC_TO_COLLECTION_SUCCESS:
      return { ...state, schedules: [...state.schedules, { ...payload }] }

    case SET_DOC_TO_RX_STATE:
      if (state.schedules.some((e) => e.id === payload.id)) {
        return state
      }
      return {
        ...state,
        schedules: [
          ...state.schedules,
          {
            id: payload.id,
            ...payload,
            isChoosen: false,
          },
        ],
      }

    case DEL_DOC_FROM_RX_STATE:
      return {
        ...state,
        schedules: [...state.schedules.filter((i) => i.id !== payload.docID)],
      }

    case ADD_DOC_TO_COLLECTION_FAILED:
    case DEL_DOC_FROM_COLLECTION_FAILED:
    case UPDATE_SCHEDULE_FAILED:
      return { ...state, error: [payload] }

    case CHOOSE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map((schedule, index) => {
          if (index !== payload.docIndex) {
            return schedule
          }
          return {
            ...schedule,
            isChoosen: !schedule.isChoosen,
          }
        }),
      }

    case CLEAR_RX_STATE:
      return { schedules: [], error: null }

    case SET_IS_LOADING_TRUE:
      return { ...state, isLoading: true }

    case SET_IS_LOADING_FALSE:
      return { ...state, isLoading: false }

    case UPDATE_FIELD:
    case SET_SCHED_TITLE:
    case CHANGE_NUMBER_OF_DAYS:
    case CHANGE_MAX_LESSONS_PER_DAY:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.schedID) {
            return schedule
          }
          return {
            ...schedule,
            [payload.field]: payload.content,
          }
        }),
      }

    default:
      return state
  }
}

export default firestoreReducer

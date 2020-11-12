import { alphabet } from '../../utils/alphabet'
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
  UPDATE_SCHEDULE_FAILED,
  UPDATE_FIELD,
  SET_CHECKED,
  CLEAR_CHECKED_AND_CLASSES,
  SET_CLASS,
  CHOOSE_SINGLE_SCHEDULE,
  ALL_CHECK,
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
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.docID) {
            return schedule
          }
          return {
            ...schedule,
            isChoosen: !schedule.isChoosen,
          }
        }),
      }

    case CHOOSE_SINGLE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.schedID) {
            return { ...schedule, isChoosen: false }
          }
          return {
            ...schedule,
            isChoosen: true,
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

    case SET_CHECKED:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.schedID) {
            return schedule
          }
          return {
            ...schedule,
            checked: schedule.checked.includes(payload.name)
              ? schedule.checked.filter((name) => name !== payload.name)
              : [...(schedule.checked ?? []), payload.name],
          }
        }),
      }

    case SET_CLASS:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.schedID) {
            return schedule
          }
          return {
            ...schedule,
            classes: schedule.classes.includes(payload.className)
              ? schedule.classes.filter((name) => name !== payload.className)
              : [...(schedule.classes ?? []), payload.className],
          }
        }),
      }

    case CLEAR_CHECKED_AND_CLASSES:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== payload.schedID) {
            return schedule
          }
          return {
            ...schedule,
            checked: [],
            classes: [],
          }
        }),
      }

    case ALL_CHECK:
      const schedule = state.schedules.find((e) => e.isChoosen)

      let checked = []
      let classes = []

      if (!schedule.checked.includes('All')) {
        checked.push('All')

        for (let i = 1; i < 12; i++) {
          checked.push(i + '')

          const numCol = schedule.numberOfColumns

          if (i - 1 < numCol) {
            checked.push(alphabet[i - 1])
          }

          for (let j = 0; j < numCol; j++) {
            classes.push(`${i} ${alphabet[j]}`)
          }
        }
      }

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          else {
            return {
              ...schedule,
              checked: checked,
              classes: classes,
            }
          }
        }),
      }

    default:
      return state
  }
}

export default firestoreReducer

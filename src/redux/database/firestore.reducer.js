import { alphabet } from '../../utils/alphabet'
import { isANumber } from '../../utils/funcs'
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
  CLEAR_CHECKED_AND_CLASSES,
  SET_CLASS,
  CHOOSE_SINGLE_SCHEDULE,
  ALL_CHECK,
  SET_CHECK,
  ADD_COLUMN,
  SUBTRACT_COLUMN,
  OPEN_CUSTOM_CLASS_NAMES,
  SET_CUSTOM_CLASS,
  DELETE_CUSTOM_CLASS,
  SET_SUBJECT,
  DELETE_SUBJECT,
  SET_TEACHER,
  DELETE_TEACHER,
  SET_LOAD,
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

    case SET_SUBJECT:
      if (payload.subject) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              subjects: schedule.subjects.includes(payload.subject)
                ? schedule.subjects
                : [...(schedule.subjects ?? []), payload.subject],
            }
          }),
        }
      }
      return state

    case DELETE_SUBJECT:
      if (payload.subject) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              subjects: [
                ...schedule.subjects.filter((e) => e !== payload.subject),
              ],
            }
          }),
        }
      }
      return state

    case SET_TEACHER:
      if (payload.teacher) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              teachers: schedule.teachers.includes(payload.teacher)
                ? schedule.teachers
                : [...(schedule.teachers ?? []), payload.teacher],
            }
          }),
        }
      }
      return state

    case DELETE_TEACHER:
      if (payload.teacher) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              teachers: [
                ...schedule.teachers.filter((e) => e !== payload.teacher),
              ],
            }
          }),
        }
      }
      return state

    case SET_LOAD:
      let {
        teacher,
        subject,
        classes,
        'lessons/week': numLessons,
      } = payload.newLoad
      if (teacher && subject && classes && numLessons) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              load: [...(schedule.load ?? []), payload.newLoad],
              // schedule.load.includes(payload.teacher)
              // ? schedule.load
              // : [...(schedule.load ?? []), payload.teacher],
            }
          }),
        }
      }
      return state

    case SET_CUSTOM_CLASS:
      if (payload.className) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              classes: schedule.classes.includes(payload.className)
                ? schedule.classes
                : [...(schedule.classes ?? []), payload.className],
            }
          }),
        }
      }
      return state

    case DELETE_CUSTOM_CLASS:
      if (payload.className) {
        return {
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (!schedule.isChoosen) return schedule
            return {
              ...schedule,
              classes: [
                ...schedule.classes.filter((e) => e !== payload.className),
              ],
            }
          }),
        }
      }
      return state

    case SET_CLASS: {
      const { num, char } = payload
      const className = num + ' ' + char
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            checked:
              schedule.checked.filter((e) => {
                if (e === 'All' || e === num || e === char) return false
                else return e
              }) ?? [],
            classes: schedule.classes.includes(className)
              ? schedule.classes.filter((name) => name !== className)
              : [...(schedule.classes ?? []), className],
          }
        }),
      }
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

    case ALL_CHECK: {
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
    }

    case SET_CHECK: {
      let { checked, classes, numberOfColumns } = state.schedules.find(
        (e) => e.isChoosen
      )

      checked = checked.filter((e) => e !== 'All')

      const check = payload.check

      if (!checked.includes(check)) {
        checked.push(check)

        if (isANumber(check)) {
          for (let i = 0; i < numberOfColumns; i++) {
            if (!classes.includes(`${check} ${alphabet[i]}`)) {
              classes.push(`${check} ${alphabet[i]}`)
            }
          }
        } else {
          for (let i = 1; i < 12; i++) {
            if (!classes.includes(`${i} ${check}`)) {
              classes.push(`${i} ${check}`)
            }
          }
        }
      } else {
        checked = checked.filter((e) => e !== check)

        if (isANumber(check)) {
          for (let i = 0; i < numberOfColumns; i++) {
            if (!checked.includes(alphabet[i])) {
              classes = classes.filter((e) => e !== `${check} ${alphabet[i]}`)
            }
          }
        } else {
          for (let i = 1; i < 12; i++) {
            if (!checked.includes(i + '')) {
              classes = classes.filter((e) => e !== `${i} ${check}`)
            }
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
    }

    case ADD_COLUMN: {
      let {
        checked,
        classes,
        numberOfColumns: numOfCol,
      } = state.schedules.find((e) => e.isChoosen)

      if (checked.includes('All')) {
        checked.push(alphabet[numOfCol])

        for (let i = 1; i < 12; i++) {
          classes.push(`${i} ${alphabet[numOfCol]}`)
        }
      } else {
        for (let i = 1; i < 12; i++) {
          if (checked.includes(i + '')) {
            classes.push(`${i} ${alphabet[numOfCol]}`)
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
              numberOfColumns: numOfCol + 1,
              checked: checked,
              classes: classes,
            }
          }
        }),
      }
    }

    case SUBTRACT_COLUMN: {
      let {
        checked,
        classes,
        numberOfColumns: numOfCol,
      } = state.schedules.find((e) => e.isChoosen)

      checked = checked.filter((e) => e !== alphabet[numOfCol - 1])

      for (let i = 1; i < 12; i++) {
        classes = classes.filter((e) => e !== `${i} ${alphabet[numOfCol - 1]}`)
      }

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          else {
            return {
              ...schedule,
              numberOfColumns: numOfCol - 1,
              checked: checked,
              classes: classes,
            }
          }
        }),
      }
    }

    case OPEN_CUSTOM_CLASS_NAMES: {
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          else {
            return {
              ...schedule,
              isOpenCustomClassNames: !schedule.isOpenCustomClassNames,
            }
          }
        }),
      }
    }

    default:
      return state
  }
}

export default firestoreReducer

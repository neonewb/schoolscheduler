import { alphabet } from '../../utils/alphabet'
import {
  getChoosenSchedule,
  isANumber,
  isLoadIncludesItem,
} from '../../utils/funcs'
import { nanoid } from 'nanoid'
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
  CANCEL_CHOICE,
  DELETE_LOAD,
  MANUALLY_CREATE_SCHEDULE,
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

    case CANCEL_CHOICE:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          return {
            ...schedule,
            isChoosen: false,
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
      if (!payload.subject) return state

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

    case DELETE_SUBJECT:
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

    case SET_TEACHER:
      if (!payload.teacher) return state

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

    case DELETE_TEACHER:
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

    case SET_LOAD: {
      const { teacher, subject, classes, lessons } = payload.newLoad
      if (!(teacher && subject && classes && lessons)) return state

      const schedule = getChoosenSchedule(state)

      let loadArray = classes.map((className) => {
        return {
          teacher,
          subject,
          className,
          lessons,
          id: nanoid(),
        }
      })

      loadArray = loadArray.filter((item) => {
        if (isLoadIncludesItem(item, schedule)) return false
        return item
      })

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            load: [...(schedule.load ?? []), ...loadArray],
          }
        }),
      }
    }

    case DELETE_LOAD:
      let { load: newLoad } = getChoosenSchedule(state)

      payload.id.forEach((element) => {
        newLoad = newLoad.filter((e) => e.id !== element)
      })

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            load: [...newLoad],
          }
        }),
      }

    case SET_CUSTOM_CLASS:
      if (!payload.className) return state

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

    case DELETE_CUSTOM_CLASS:
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
      const schedule = getChoosenSchedule(state)

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
          return {
            ...schedule,
            checked: checked,
            classes: classes,
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
          return {
            ...schedule,
            checked: checked,
            classes: classes,
          }
        }),
      }
    }

    case ADD_COLUMN: {
      let { checked, classes, numberOfColumns: numOfCol } = getChoosenSchedule(
        state
      )

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
          return {
            ...schedule,
            numberOfColumns: numOfCol + 1,
            checked: checked,
            classes: classes,
          }
        }),
      }
    }

    case SUBTRACT_COLUMN: {
      let { checked, classes, numberOfColumns: numOfCol } = getChoosenSchedule(
        state
      )

      checked = checked.filter((e) => e !== alphabet[numOfCol - 1])

      for (let i = 1; i < 12; i++) {
        classes = classes.filter((e) => e !== `${i} ${alphabet[numOfCol - 1]}`)
      }

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            numberOfColumns: numOfCol - 1,
            checked: checked,
            classes: classes,
          }
        }),
      }
    }

    case OPEN_CUSTOM_CLASS_NAMES:
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            isOpenCustomClassNames: !schedule.isOpenCustomClassNames,
          }
        }),
      }

    case MANUALLY_CREATE_SCHEDULE: {
      let { classes, teachers } = getChoosenSchedule(state)

      classes = classes.map((e) => {
        return {
          name: e,
          lessons: []
        }
      })

      teachers = teachers.map((e) => {
        return {
          name: e,
          lessons: []
        }
      })

      let newTimeTable = {
        classes: [...classes],
        techers: [...teachers],
      }

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            timeTable: newTimeTable
          }
        }),
      }
    }

    default:
      return state
  }
}

export default firestoreReducer

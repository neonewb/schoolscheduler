import { alphabet } from '../../utils/alphabet'
import { isANumber, isLoadIncludesItem } from '../../utils/funcs'
import { nanoid } from 'nanoid'
import * as SchedActions from './sched.actions'
import { ScheduleT, LoadT } from './sched.actions'
import { Reducer } from 'redux'
import { getChoosenSchedID, getChoosenScheduleS } from './sched.selectors'
import { InferActionsTypes } from '../rootReducer'
import { showSnack } from '../../components/Notifier'

type SchedActionsTypes = InferActionsTypes<typeof SchedActions>

const initialState = {
  schedules: [] as Array<ScheduleT>,
  isLoading: false as boolean,
  error: null as null | string,
} as const

export type SchedInitialStateT = typeof initialState

const schedReducer: Reducer<SchedInitialStateT, SchedActionsTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'ADD_DOC_TO_COLLECTION_SUCCESS':
      showSnack('New schedule created', 'success')
      return {
        ...state,
        schedules: [...state.schedules, { ...action.payload }],
      }

    case 'SET_DOC_TO_SCHED_STATE':
      if (state.schedules.some((e) => e.id === action.payload.schedule.id)) {
        return state
      }
      return {
        ...state,
        schedules: [
          ...state.schedules,
          {
            ...action.payload.schedule,
            isChoosen: false,
          },
        ],
      }

    case 'DEL_DOCS_FROM_RX_STATE':
      return {
        ...state,
        schedules: [...state.schedules.filter((i) => !i.isChoosen)],
      }

    case 'ADD_DOC_TO_COLLECTION_FAILED':
    case 'DEL_DOC_FROM_COLLECTION_FAILED':
    case 'UPDATE_SCHEDULE_FAILED':
      console.error(action.error.name)
      console.error(action.error.code)
      console.error(action.error.message)
      showSnack(`Error: ${action.error.message}`, 'error')
      return state

    case 'CHOOSE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== action.payload.docID) {
            return schedule
          }
          return {
            ...schedule,
            isChoosen: !schedule.isChoosen,
          }
        }),
      }

    case 'CANCEL_CHOICE':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          return {
            ...schedule,
            isChoosen: false,
          }
        }),
      }

    case 'CHOOSE_SINGLE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== action.payload.schedID) {
            return { ...schedule, isChoosen: false }
          }
          return {
            ...schedule,
            isChoosen: true,
          }
        }),
      }

    case 'CLEAR_RX_STATE':
      return { schedules: [], isLoading: false, error: null }

    case 'SET_IS_LOADING_TRUE':
      return { ...state, isLoading: true }

    case 'SET_IS_LOADING_FALSE':
      return { ...state, isLoading: false }

    case 'UPDATE_FIELD':
      const id = getChoosenSchedID(state)
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== id) {
            return schedule
          }
          return {
            ...schedule,
            [action.payload.field]: action.payload.content,
          }
        }),
      }

    case 'SET_SUBJECT':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            subjects: schedule.subjects.includes(action.payload.subject!)
              ? schedule.subjects
              : [...(schedule.subjects ?? []), action.payload.subject],
          }
        }),
      }

    case 'DELETE_SUBJECT':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            subjects: [
              ...schedule.subjects.filter((e) => e !== action.payload.subject),
            ],
          }
        }),
      }

    case 'SET_TEACHER':
      if (!action.payload.teacher) return state

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            teachers: schedule.teachers.includes(action.payload.teacher)
              ? schedule.teachers
              : [...(schedule.teachers ?? []), action.payload.teacher],
          }
        }),
      }

    case 'DELETE_TEACHER':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            teachers: [
              ...schedule.teachers.filter((e) => e !== action.payload.teacher),
            ],
          }
        }),
      }

    case 'SET_LOAD': {
      const { teacher, subject, classes, lessons } = action.payload.newLoad
      if (!(teacher && subject && classes && lessons)) return state

      const schedule = getChoosenScheduleS(state)

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

    case 'DELETE_LOAD':
      let newLoad: Array<LoadT> = getChoosenScheduleS(state).load

      action.payload.ids.forEach((element) => {
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

    case 'SET_CUSTOM_CLASS':
      if (!action.payload.className) return state

      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            classes: schedule.classes.includes(action.payload.className)
              ? schedule.classes
              : [...(schedule.classes ?? []), action.payload.className],
          }
        }),
      }

    case 'DELETE_CUSTOM_CLASS':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (!schedule.isChoosen) return schedule
          return {
            ...schedule,
            classes: [
              ...schedule.classes.filter((e) => e !== action.payload.className),
            ],
          }
        }),
      }

    case 'SET_CLASS': {
      const { num, char } = action.payload
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

    case 'CLEAR_CHECKED_AND_CLASSES':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== action.payload.schedID) {
            return schedule
          }
          return {
            ...schedule,
            checked: [],
            classes: [],
          }
        }),
      }

    case 'ALL_CHECK': {
      const schedule = getChoosenScheduleS(state)

      let checked: Array<string> = []
      let classes: Array<string> = []

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

    case 'SET_CHECK': {
      let { checked, classes, numberOfColumns } = getChoosenScheduleS(state)

      checked = checked.filter((e: string) => e !== 'All')

      const check = action.payload.check

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
        checked = checked.filter((e: string) => e !== check)

        if (isANumber(check)) {
          for (let i = 0; i < numberOfColumns; i++) {
            if (!checked.includes(alphabet[i])) {
              classes = classes.filter(
                (e: string) => e !== `${check} ${alphabet[i]}`
              )
            }
          }
        } else {
          for (let i = 1; i < 12; i++) {
            if (!checked.includes(i + '')) {
              classes = classes.filter((e: string) => e !== `${i} ${check}`)
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

    case 'ADD_COLUMN': {
      let { checked, classes, numberOfColumns: numOfCol } = getChoosenScheduleS(
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

    case 'SUBTRACT_COLUMN': {
      let { checked, classes, numberOfColumns: numOfCol } = getChoosenScheduleS(
        state
      )

      checked = checked.filter((e: string) => e !== alphabet[numOfCol - 1])

      for (let i = 1; i < 12; i++) {
        classes = classes.filter(
          (e: string) => e !== `${i} ${alphabet[numOfCol - 1]}`
        )
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

    case 'OPEN_CUSTOM_CLASS_NAMES':
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

    case 'SET_HAS_TIMETABLE':
      return {
        ...state,
        schedules: state.schedules.map((schedule) => {
          if (schedule.id !== action.payload.id) {
            return schedule
          }
          return {
            ...schedule,
            hasTimeTable: true,
          }
        }),
      }
    default:
      return state
  }
}

export default schedReducer

import produce, { Draft } from 'immer'
import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
import { daysOfTheWeek } from '../../utils/daysOfTheWeek'
import { InferActionsTypes } from '../rootReducer'
import { ClassT, TeacherT, LessonT } from './timetable'
import { TtAcTypes } from './timetable.d'
import * as TTActions from './tt.actions'

const TTinitialState = {
  classesTT: [] as ClassT[],
  teachersTT: [] as TeacherT[],
  lessonsTT: [] as LessonT[],
} as const

export type TTInitialStateT = typeof TTinitialState

type TTActionsTypes = InferActionsTypes<typeof TTActions>

const TTReducer: Reducer<TTInitialStateT, TTActionsTypes> = produce(
  (draft: Draft<TTInitialStateT>, action: TTActionsTypes) => {
    switch (action.type) {
      case TtAcTypes.MANUALLY_CREATE_SCHEDULE: {
        const { classes, teachers, load: loads } = action.payload.schedule

        draft.classesTT = classes.map((className) => ({
          name: className,
          lessons: [],
        }))

        draft.teachersTT = teachers.map((teacher) => ({
          name: teacher,
          lessons: [],
        }))

        loads.forEach((load) => {
          draft.lessonsTT.push({
            id: nanoid(),
            subject: load.subject,
            teacher: load.teacher,
            classTitle: load.className,
            numOfLessons: load.lessons,
          })
        })
        break
      }

      case TtAcTypes.CLEAR_TIMETABLE:
        draft.classesTT = []
        draft.teachersTT = []
        draft.lessonsTT = []
        break

      case TtAcTypes.SET_TIMETABLE:
        draft.classesTT = action.payload.timetable.classesTT
        draft.teachersTT = action.payload.timetable.teachersTT
        draft.lessonsTT = action.payload.timetable.lessonsTT
        break

      case TtAcTypes.DROP_LESSON: {
        const { lesson, dropResult } = action.payload

        draft.classesTT = draft.classesTT.map((clas) => {
          if (clas.name !== dropResult.classTitle) {
            return clas
          } else {
            return {
              ...clas,
              lessons: [
                ...clas.lessons,
                {
                  ...lesson,
                  classTitle: dropResult.classTitle,
                  dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                  period: dropResult.period,
                },
              ],
            }
          }
        })
        break
      }

      default:
        break
    }
  },
  TTinitialState
)

export default TTReducer

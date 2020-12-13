import produce, { Draft } from 'immer'
import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
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
          if (load.lessons === '1') {
            draft.lessonsTT.push({
              id: nanoid(),
              subject: load.subject,
              teacher: load.teacher,
            })
          } else {
            for (let i = 0; i < Number(load.lessons); i++) {
              draft.lessonsTT.push({
                id: nanoid(),
                subject: load.subject,
                teacher: load.teacher,
              })
            }
          }
        })
        break
      }

      case TtAcTypes.CLEAR_TIMETABLE:
        draft.classesTT = []
        draft.teachersTT = []
        draft.lessonsTT = []
        break

      default:
        break
    }
  },
  TTinitialState
)

export default TTReducer

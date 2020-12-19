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
            numOfLessons: Number(load.lessons),
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
        const { lesson, dropResult, source } = action.payload

        draft.classesTT = draft.classesTT.map((clas) => {
          if (clas.name !== dropResult.classTitle) {
            return clas
          } else {
            if (source === 'footer') {
              return {
                ...clas,
                lessons: [
                  ...clas.lessons,
                  // Create new lesson
                  {
                    subject: lesson.subject,
                    teacher: lesson.teacher,
                    classTitle: lesson.classTitle,
                    numOfLessons: lesson.numOfLessons,
                    id: dropResult.id,
                    dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                    period: dropResult.period,
                  },
                ],
              }
            } else {
              return {
                ...clas,
                lessons: clas.lessons.map((lessn) => {
                  if (
                    lessn.dayOfTheWeek === lesson.dayOfTheWeek &&
                    lessn.period === lesson.period
                  ) {
                    return {
                      // Edit exist lesson
                      ...lessn,
                      id: dropResult.id,
                      numOfLessons: lesson.numOfLessons,
                      dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                      period: dropResult.period,
                    }
                  } else {
                    return lessn
                  }
                }),
              }
            }
          }
        })

        // Edit number of lessons
        draft.lessonsTT = draft.lessonsTT.map((el) => {
          if (el.id !== lesson.id) {
            return el
          } else if (el.numOfLessons <= 1) {
            return {
              ...el,
              numOfLessons: 0,
            }
          } else {
            return {
              ...el,
              numOfLessons: el.numOfLessons - 1,
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

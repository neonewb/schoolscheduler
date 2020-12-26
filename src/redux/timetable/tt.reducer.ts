import produce, { Draft } from 'immer'
import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
import { daysOfTheWeek } from '../../utils/daysOfTheWeek'
import { DropResultT } from '../../utils/DragDropTypes'
import { InferActionsTypes } from '../rootReducer'
import { ClassT, TeacherT, LessonT } from './timetable'
import { TtAcTypes } from './timetable.d'
import * as TTActions from './tt.actions'

const TTinitialState = {
  classesTT: [] as ClassT[],
  teachersTT: [] as TeacherT[],
  lessonsTT: [] as LessonT[],
  conflict: {
    isOpenModal: false as boolean,
    lesson: null as LessonT | null,
    dropResult: null as DropResultT | null,
    conflictClassLesson: null as LessonT | null,
    conflictTeacherLesson: null as LessonT | null,
  },
} as const

export type TTInitialStateT = typeof TTinitialState

type TTActionsTypes = InferActionsTypes<typeof TTActions>

const TTReducer: Reducer<TTInitialStateT, TTActionsTypes> = produce(
  (draft: Draft<TTInitialStateT>, action: TTActionsTypes) => {
    switch (action.type) {
      case TtAcTypes.MANUALLY_CREATE_SCHEDULE: {
        const { classes, teachers, load: loads } = action.payload.schedule

        draft.classesTT = classes.map((className) => ({
          title: className,
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
            currentLessons: Number(load.lessons),
            maxLessons: Number(load.lessons),
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

        // Check drop conflict
        const classLessons = draft.classesTT.find(
          (c) => c.title === lesson.classTitle
        )?.lessons
        const teacherLessons = draft.teachersTT.find(
          (t) => t.name === lesson.teacher
        )?.lessons

        let isConflict = false

        if (!(classLessons?.length === 0 && teacherLessons?.length === 0)) {
          const conflictClassLesson = classLessons?.find(
            (les) =>
              les.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
              les.period === dropResult.period
          )
          const conflictTeacherLesson = teacherLessons?.find(
            (les) =>
              les.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
              les.period === dropResult.period
          )
          if (conflictClassLesson || conflictTeacherLesson) {
            isConflict = true
            draft.conflict = {
              isOpenModal: true,
              lesson: lesson,
              dropResult: dropResult,
              conflictClassLesson: conflictClassLesson || null,
              conflictTeacherLesson: conflictTeacherLesson || null,
            }
          }
        }

        if (isConflict) {
          break
        }

        draft.classesTT = draft.classesTT.map((clas) => {
          if (clas.title !== dropResult.classTitle) {
            return clas
          } else {
            if (dropResult.target === 'timetable' && source === 'timetable') {
              return {
                ...clas,
                lessons: clas.lessons.map((lessn) => {
                  if (lessn.id === lesson.id) {
                    return {
                      // Edit exist lesson
                      ...lessn,
                      id: dropResult.id,
                      maxLessons: lesson.maxLessons,
                      dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                      period: dropResult.period,
                    }
                  } else {
                    return lessn
                  }
                }),
              }
            } else {
              return {
                ...clas,
                lessons: [
                  ...clas.lessons,
                  // Create new lesson
                  {
                    subject: lesson.subject,
                    teacher: lesson.teacher,
                    classTitle: lesson.classTitle,
                    maxLessons: lesson.maxLessons,
                    id: dropResult.id,
                    dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                    period: dropResult.period,
                  },
                ],
              }
            }
          }
        })

        draft.teachersTT = draft.teachersTT.map((teacher) => {
          if (teacher.name !== lesson.teacher) {
            return teacher
          } else {
            if (dropResult.target === 'timetable' && source === 'timetable') {
              return {
                ...teacher,
                lessons: teacher.lessons.map((lessn) => {
                  if (lessn.id === lesson.id) {
                    return {
                      // Edit exist lesson
                      ...lessn,
                      id: dropResult.id,
                      maxLessons: lesson.maxLessons,
                      dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                      period: dropResult.period,
                    }
                  } else {
                    return lessn
                  }
                }),
              }
            } else {
              return {
                ...teacher,
                lessons: [
                  ...teacher.lessons,
                  // Create new lesson
                  {
                    subject: lesson.subject,
                    teacher: lesson.teacher,
                    classTitle: lesson.classTitle,
                    maxLessons: lesson.maxLessons,
                    id: dropResult.id,
                    dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
                    period: dropResult.period,
                  },
                ],
              }
            }
          }
        })

        // Edit number of lessons
        draft.lessonsTT = draft.lessonsTT.map((lessn) => {
          if (lessn.id !== lesson.id) {
            return lessn
          } else if (lessn.currentLessons! <= 1) {
            return {
              ...lessn,
              currentLessons: 0,
            }
          } else {
            return {
              ...lessn,
              currentLessons: lessn.currentLessons! - 1,
            }
          }
        })

        break
      }

      case TtAcTypes.RESOLVE_CONFLICT:
        const { answer } = action.payload
        console.log(answer)

        if (answer) {
          draft.conflict = {
            isOpenModal: false,
            lesson: null,
            dropResult: null,
            conflictClassLesson: null,
            conflictTeacherLesson: null,
          }
        } else {
          draft.conflict = {
            isOpenModal: false,
            lesson: null,
            dropResult: null,
            conflictClassLesson: null,
            conflictTeacherLesson: null,
          }
        }
        break

      default:
        break
    }
  },
  TTinitialState
)

export default TTReducer

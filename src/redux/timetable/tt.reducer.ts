import {
  addLesson,
  checkDropConflict,
  editLessonIn,
  filterLesson,
  filterLessonIn,
  minus1Lesson,
  plus1Lesson,
  resetAllConflict,
  resetHalfConflict,
} from './../../utils/funcs'
import produce, { Draft } from 'immer'
import { nanoid } from 'nanoid'
import { Reducer } from 'redux'
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
    source: null as 'footer' | 'timetable' | null,
    lesson: null as LessonT | null,
    dropResult: null as DropResultT | null,
    conflictClassLesson: null as LessonT | null,
    conflictTeacherLesson: null as LessonT | null,
    isConflictResolved: null as boolean | null,
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

        if (!draft.conflict.isConflictResolved) {
          const classLessons = draft.classesTT.find(
            (c) => c.title === lesson.classTitle
          )?.lessons
          const teacherLessons = draft.teachersTT.find(
            (t) => t.name === lesson.teacher
          )?.lessons

          draft.conflict = checkDropConflict(
            classLessons,
            teacherLessons,
            dropResult,
            source,
            lesson
          )

          if (draft.conflict.isConflictResolved === false) {
            break
          }
        }

        const { target } = dropResult

        draft.classesTT = draft.classesTT.map((clas) => {
          if (clas.title !== lesson.classTitle) {
            return clas
          } else {
            if (target === 'timetable' && source === 'timetable') {
              return editLessonIn(clas, lesson.id, dropResult)
            } else if (target === 'timetable' && source === 'footer') {
              return addLesson(clas, lesson, dropResult)
            } else if (target === 'footer' && source === 'timetable') {
              return filterLesson(clas, lesson)
            } else return clas
          }
        })

        draft.teachersTT = draft.teachersTT.map((teacher) => {
          if (teacher.name !== lesson.teacher) {
            return teacher
          } else {
            if (target === 'timetable' && source === 'timetable') {
              return editLessonIn(teacher, lesson.id, dropResult)
            } else if (target === 'timetable' && source === 'footer') {
              return addLesson(teacher, lesson, dropResult)
            } else if (target === 'footer' && source === 'timetable') {
              return filterLesson(teacher, lesson)
            } else return teacher
          }
        })

        if (target === 'footer' && source === 'timetable') {
          draft.lessonsTT = plus1Lesson(lesson, draft.lessonsTT)
        } else if (target === 'timetable' && source === 'footer') {
          draft.lessonsTT = minus1Lesson(lesson, draft.lessonsTT)
        }

        draft.conflict = resetAllConflict

        break
      }

      case TtAcTypes.RESOLVE_CONFLICT: {
        const { answer } = action.payload

        if (answer) {
          const { conflictClassLesson, conflictTeacherLesson } = draft.conflict

          if (conflictClassLesson) {
            draft.classesTT = filterLessonIn(
              conflictClassLesson,
              draft.classesTT
            )
            draft.teachersTT = filterLessonIn(
              conflictClassLesson,
              draft.teachersTT
            )
            draft.lessonsTT = plus1Lesson(conflictClassLesson, draft.lessonsTT)
          }

          if (conflictTeacherLesson) {
            draft.classesTT = filterLessonIn(
              conflictTeacherLesson,
              draft.classesTT
            )
            draft.teachersTT = filterLessonIn(
              conflictTeacherLesson,
              draft.teachersTT
            )
            if (conflictClassLesson) {
              if (
                JSON.stringify(conflictClassLesson) !==
                JSON.stringify(conflictTeacherLesson)
              ) {
                draft.lessonsTT = plus1Lesson(
                  conflictTeacherLesson,
                  draft.lessonsTT
                )
              }
            } else {
              draft.lessonsTT = plus1Lesson(
                conflictTeacherLesson,
                draft.lessonsTT
              )
            }
          }
          draft.conflict = { ...draft.conflict, ...resetHalfConflict }
        } else {
          draft.conflict = resetAllConflict
        }

        break
      }

      default:
        break
    }
  },
  TTinitialState
)

export default TTReducer

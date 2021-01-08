import {
  addLesson,
  bSearchClass,
  bSearchTeacher,
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
  isLoading: false as boolean,
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

        draft.lessonsTT = loads.map((load) => ({
          id: nanoid(),
          subject: load.subject,
          teacher: load.teacher,
          classTitle: load.className,
          currentLessons: Number(load.lessons),
          maxLessons: Number(load.lessons),
        }))

        break
      }

      case TtAcTypes.SET_TT_IS_LOADING_TRUE:
        draft.isLoading = true
        break

      case TtAcTypes.SET_TT_IS_LOADING_FALSE:
        draft.isLoading = false
        break

      case TtAcTypes.CLEAR_TIMETABLE:
        draft.classesTT = []
        draft.teachersTT = []
        draft.lessonsTT = []
        draft.isLoading = false
        break

      case TtAcTypes.SET_TIMETABLE:
        draft.classesTT = action.payload.timetable.classesTT
        draft.teachersTT = action.payload.timetable.teachersTT
        draft.lessonsTT = action.payload.timetable.lessonsTT
        break

      case TtAcTypes.DROP_LESSON: {
        const { lesson, dropResult, source } = action.payload
        const classIdx = bSearchClass(draft.classesTT, lesson.classTitle)
        const teacherIdx = bSearchTeacher(draft.teachersTT, lesson.teacher)

        if (!draft.conflict.isConflictResolved) {
          const classLessons = draft.classesTT[classIdx]?.lessons

          const teacherLessons = draft.teachersTT[teacherIdx]?.lessons

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

        if (target === 'timetable' && source === 'timetable') {
          draft.classesTT[classIdx] = editLessonIn(draft.classesTT[classIdx], lesson.id, dropResult)
          draft.teachersTT[teacherIdx] = editLessonIn(draft.teachersTT[teacherIdx], lesson.id, dropResult)
        } else if (target === 'timetable' && source === 'footer') {
          draft.classesTT[classIdx] = addLesson(draft.classesTT[classIdx], lesson, dropResult)
          draft.teachersTT[teacherIdx] = addLesson(draft.teachersTT[teacherIdx], lesson, dropResult)
          draft.lessonsTT = minus1Lesson(lesson, draft.lessonsTT)
        } else if (target === 'footer' && source === 'timetable') {
          draft.classesTT[classIdx] = filterLesson(draft.classesTT[classIdx], lesson)
          draft.teachersTT[teacherIdx] = filterLesson(draft.teachersTT[teacherIdx], lesson)
          draft.lessonsTT = plus1Lesson(lesson, draft.lessonsTT)
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

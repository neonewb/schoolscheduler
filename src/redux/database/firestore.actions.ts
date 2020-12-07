import { DaysOfTheWeekT } from '../../utils/daysOfTheWeek'
import { SubjectT } from '../../utils/subjects'

export type AddDocToCollectionT = ReturnType<typeof addDocToCollectionAC>
export const addDocToCollectionAC = (email: string, userID: string) =>
  ({
    type: 'ADD_DOC_TO_COLLECTION',
    payload: {
      email,
      userID,
    },
  } as const)

export type LoadT = {
  className: string
  id: string
  lessons: string
  subject: SubjectT
  teacher: string
}

type LessonT = {
  subject: SubjectT
  teacher: string
  daysOfTheWeek: DaysOfTheWeekT
  lessonNumber: number
}

type ClassT = {
  lessons: Array<LessonT>
  name: string
}

type TeacherT = {
  lessons: Array<LessonT>
  name: string
}

export type TimeTableT = {
  classesTT?: Array<ClassT>
  teachersTT?: Array<TeacherT>
}

export type ScheduleT = {
  id: string
  email: string
  userid: string
  title: string
  numberOfDays: number
  maxLessonsPerDay: number
  numberOfColumns: number
  isOpenCustomClassNames: boolean
  checked: Array<string>
  classes: Array<string>
  subjects: Array<SubjectT>
  teachers: Array<string>
  load: Array<LoadT>
  timeTable?: TimeTableT
  isChoosen: boolean
}

export const addDocToCollectionSuccessAC = (
  docID: string,
  email: string,
  userid: string,
  title: string,
  numberOfDays: number,
  maxLessonsPerDay: number,
  numberOfColumns: number,
  isOpenCustomClassNames: boolean,
  checked: Array<string>,
  classes: Array<string>,
  subjects: Array<SubjectT>,
  teachers: Array<string>,
  load: Array<LoadT>,
  timeTable: TimeTableT
) =>
  ({
    type: 'ADD_DOC_TO_COLLECTION_SUCCESS',
    payload: {
      id: docID,
      email,
      userid,
      title,
      numberOfDays,
      maxLessonsPerDay,
      numberOfColumns,
      isOpenCustomClassNames,
      checked,
      classes,
      subjects,
      teachers,
      load,
      timeTable,
    } as ScheduleT,
  } as const)

export const addDocToCollectionFailedAC = (error: string) =>
  ({
    type: 'ADD_DOC_TO_COLLECTION_FAILED',
    error,
  } as const)

export type GetDocFromDBT = ReturnType<typeof getDocFromDBAC>
export const getDocFromDBAC = (email: string, docID: string) =>
  ({
    type: 'GET_DOC_FROM_DB',
    payload: {
      email,
      docID,
    },
  } as const)

export type GetDocsFromDBT = ReturnType<typeof getDocsFromDBAC>
export const getDocsFromDBAC = (email: string, userID: string) =>
  ({
    type: 'GET_DOCS_FROM_DB',
    payload: {
      email,
      userID,
    },
  } as const)

export const setDocToRxStateAC = (schedule: ScheduleT) =>
  ({
    type: 'SET_DOC_TO_RX_STATE',
    payload: { schedule },
  } as const)

export type DeleteDocFromCollectionT = ReturnType<typeof deleteDocFromCollectionAC>
export const deleteDocFromCollectionAC = (docID: string) =>
  ({
    type: 'DEL_DOC_FROM_COLLECTION',
    payload: {
      docID,
    },
  } as const)

export const delDocFromCollFailedAC = (error: string) =>
  ({
    type: 'DEL_DOC_FROM_COLLECTION_FAILED',
    error,
  } as const)

export const delDocFromRxStateAC = (docID: string) =>
  ({
    type: 'DEL_DOC_FROM_RX_STATE',
    payload: {
      docID,
    },
  } as const)

export const clearRxStateAC = () =>
  ({
    type: 'CLEAR_RX_STATE',
  } as const)

export const chooseScheduleAC = (docID: string) =>
  ({
    type: 'CHOOSE_SCHEDULE',
    payload: {
      docID,
    },
  } as const)

export const cancelСhoiceAC = () =>
  ({
    type: 'CANCEL_CHOICE',
  } as const)

export const chooseSingleAC = (schedID: string) =>
  ({
    type: 'CHOOSE_SINGLE_SCHEDULE',
    payload: {
      schedID,
    },
  } as const)

export const setIsLoadingTrue = () =>
  ({
    type: 'SET_IS_LOADING_TRUE',
  } as const)

export const setIsLoadingFalse = () =>
  ({
    type: 'SET_IS_LOADING_FALSE',
  } as const)

export type UpdateFieldT = ReturnType<typeof updateFieldAC>
export const updateFieldAC = (
  schedID: string,
  field: string,
  content: string
) =>
  ({
    type: 'UPDATE_FIELD',
    payload: {
      schedID,
      field,
      content,
    },
  } as const)

export const updateFailedAC = (error: string) =>
  ({
    type: 'UPDATE_SCHEDULE_FAILED',
    error,
  } as const)

export const setCheckAC = (check: string) =>
  ({
    type: 'SET_CHECK',
    payload: {
      check,
    },
  } as const)

export const setCustomClassAC = (className: string) =>
  ({
    type: 'SET_CUSTOM_CLASS',
    payload: {
      className,
    },
  } as const)

export const deleteCustomClassAC = (className: string) =>
  ({
    type: 'DELETE_CUSTOM_CLASS',
    payload: {
      className,
    },
  } as const)

export const setClassAC = (num: string, char: string) =>
  ({
    type: 'SET_CLASS',
    payload: {
      num,
      char,
    },
  } as const)

export const clearCheckClassAC = (schedID: string) =>
  ({
    type: 'CLEAR_CHECKED_AND_CLASSES',
    payload: { schedID },
  } as const)

export const allCheckAC = () =>
  ({
    type: 'ALL_CHECK',
  } as const)

export const addColumnAC = () =>
  ({
    type: 'ADD_COLUMN',
  } as const)

export const subtractColumnAC = () =>
  ({
    type: 'SUBTRACT_COLUMN',
  } as const)

export const openCustomClassNamesAC = () =>
  ({
    type: 'OPEN_CUSTOM_CLASS_NAMES',
  } as const)

export const setSubjectAC = (subject: SubjectT) =>
  ({
    type: 'SET_SUBJECT',
    payload: {
      subject,
    },
  } as const)

export const deleteSubjectAC = (subject: SubjectT) =>
  ({
    type: 'DELETE_SUBJECT',
    payload: {
      subject,
    },
  } as const)

export const setTeacherAC = (teacher: string) =>
  ({
    type: 'SET_TEACHER',
    payload: {
      teacher,
    },
  } as const)

export const deleteTeacherAC = (teacher: string) =>
  ({
    type: 'DELETE_TEACHER',
    payload: {
      teacher,
    },
  } as const)

type NewLoadT = {
  classes: Array<string>
  lessons: string
  subject: SubjectT
  teacher: string
}

export const setLoadAC = (newLoad: NewLoadT) =>
  ({
    type: 'SET_LOAD',
    payload: {
      newLoad,
    },
  } as const)

export const deleteLoadAC = (ids: Array<string>) =>
  ({
    type: 'DELETE_LOAD',
    payload: {
      ids,
    },
  } as const)

export const manuallyCreateScheduleAC = () =>
  ({
    type: 'MANUALLY_CREATE_SCHEDULE',
  } as const)

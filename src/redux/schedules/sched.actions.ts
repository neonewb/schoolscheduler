import { FirebaseError } from 'firebase'

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
  subject: string
  teacher: string
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
  hasTimeTable: boolean
  checked: Array<string>
  classes: Array<string>
  subjects: Array<string>
  teachers: Array<string>
  load: Array<LoadT>
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
  hasTimeTable: boolean,
  checked: Array<string>,
  classes: Array<string>,
  subjects: Array<string>,
  teachers: Array<string>,
  load: Array<LoadT>
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
      hasTimeTable,
      checked,
      classes,
      subjects,
      teachers,
      load,
    } as ScheduleT,
  } as const)

export const addDocToCollectionFailedAC = (error: FirebaseError) =>
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

export const setDocToSchedStateAC = (schedule: ScheduleT) =>
  ({
    type: 'SET_DOC_TO_SCHED_STATE',
    payload: { schedule },
  } as const)

export const deleteDocsFromCollectionAC = () =>
  ({
    type: 'DEL_DOCS_FROM_COLLECTION',
  } as const)

export const delDocFromCollFailedAC = (error: FirebaseError) =>
  ({
    type: 'DEL_DOC_FROM_COLLECTION_FAILED',
    error,
  } as const)

export const delDocsFromRxStateAC = () =>
  ({
    type: 'DEL_DOCS_FROM_RX_STATE',
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
export const updateFieldAC = (field: string, content: string | number) =>
  ({
    type: 'UPDATE_FIELD',
    payload: {
      field,
      content,
    },
  } as const)

export const updateFailedAC = (error: FirebaseError) =>
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

export const setSubjectAC = (subject: string) =>
  ({
    type: 'SET_SUBJECT',
    payload: {
      subject,
    },
  } as const)

export const deleteSubjectAC = (subject: string) =>
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

export type NewLoadT = {
  classes: Array<string>
  lessons: string
  subject: string
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

export const setHasTimeTableAC = (id: string) =>
  ({
    type: 'SET_HAS_TIMETABLE',
    payload: {
      id,
    },
  } as const)

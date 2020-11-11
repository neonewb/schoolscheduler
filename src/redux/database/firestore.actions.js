export const ADD_DOC_TO_COLLECTION = 'app/db/ADD_DOC_TO_COLLECTION'
export const ADD_DOC_TO_COLLECTION_SUCCESS =
  'app/db/ADD_DOC_TO_COLLECTION_SUCCESS'
export const ADD_DOC_TO_COLLECTION_FAILED =
  'app/db/ADD_DOC_TO_COLLECTION_FAILED'
export const GET_DOC_FROM_DB = 'app/db/GET_DOC_FROM_DB'
export const GET_DOCS_FROM_DB = 'app/db/GET_DOCS_FROM_DB'
export const SET_DOC_TO_RX_STATE = 'app/db/SET_DOC_TO_RX_STATE'
export const DEL_DOC_FROM_COLLECTION = 'app/db/DEL_DOC_FROM_COLLECTION'
export const DEL_DOC_FROM_COLLECTION_FAILED =
  'app/db/DEL_DOC_FROM_COLLECTION_FAILED'
export const DEL_DOC_FROM_RX_STATE = 'app/db/DEL_DOC_FROM_RX_STATE'
export const CLEAR_RX_STATE = 'app/db/CLEAR_RX_STATE'
export const SET_IS_LOADING_TRUE = 'app/db/SET_IS_LOADING_TRUE'
export const SET_IS_LOADING_FALSE = 'app/db/SET_IS_LOADING_FALSE'
export const CHOOSE_SCHEDULE = 'app/db/CHOOSE_SCHEDULE'
export const UPDATE_SCHEDULE_FAILED = 'app/db/UPDATE_SCHEDULE_FAILED'
export const UPDATE_FIELD = 'app/db/UPDATE_FIELD'
export const SET_CHECKED = 'app/db/SET_CHECKED'
export const CLEAR_CHECKED = 'app/db/CLEAR_CHECKED'
export const SET_CLASS = 'app/db/SET_CLASS'
export const CLEAR_CLASS = 'app/db/CLEAR_CLASS'
export const CHECKED_CLASSES_TO_FSDB = 'app/db/CHECKED_CLASSES_TO_FSDB'

export const addDocToCollectionAC = (email, userID) => ({
  type: ADD_DOC_TO_COLLECTION,
  email,
  userID,
})

export const addDocToCollectionSuccessAC = (
  docID,
  email,
  userid,
  title,
  numberOfDays,
  maxLessonsPerDay,
  numberOfColumns,
  checked,
  classes,
  subjects,
  teachers,
  load
) => ({
  type: ADD_DOC_TO_COLLECTION_SUCCESS,
  payload: {
    id: docID,
    email,
    userid,
    title,
    numberOfDays,
    maxLessonsPerDay,
    numberOfColumns,
    checked,
    classes,
    subjects,
    teachers,
    load,
  },
})

export const addDocToCollectionFailedAC = (payload) => ({
  type: ADD_DOC_TO_COLLECTION_FAILED,
  payload,
})

export const getDocFromDBAC = (email, userID, docID) => ({
  type: GET_DOC_FROM_DB,
  email,
  userID,
  docID,
})

export const getDocsFromDBAC = (email, userID) => ({
  type: GET_DOCS_FROM_DB,
  email,
  userID,
})

export const setDocToRxStateAC = (payload) => ({
  type: SET_DOC_TO_RX_STATE,
  payload,
})

export const deleteDocFromCollectionAC = (email, userID, docID) => ({
  type: DEL_DOC_FROM_COLLECTION,
  email,
  userID,
  docID,
})

export const delDocFromCollFailedAC = (payload) => ({
  type: DEL_DOC_FROM_COLLECTION_FAILED,
  payload,
})

export const delDocFromRxStateAC = (docID) => ({
  type: DEL_DOC_FROM_RX_STATE,
  payload: {
    docID,
  },
})

export const clearRxStateAC = () => ({
  type: CLEAR_RX_STATE,
})

export const chooseScheduleAC = (docIndex) => ({
  type: CHOOSE_SCHEDULE,
  payload: {
    docIndex,
  },
})

export const setIsLoadingTrue = () => ({
  type: SET_IS_LOADING_TRUE,
})

export const setIsLoadingFalse = () => ({
  type: SET_IS_LOADING_FALSE,
})

export const updateFieldAC = (schedID, field, content) => ({
  type: UPDATE_FIELD,
  payload: {
    schedID,
    field,
    content,
  },
})

export const updateFailedAC = (payload) => ({
  type: UPDATE_SCHEDULE_FAILED,
  payload,
})

export const setCheckedAC = (schedID, name) => ({
  type: SET_CHECKED,
  payload: {
    schedID,
    name,
  },
})

export const setClassAC = (schedID, className) => ({
  type: SET_CLASS,
  payload: {
    schedID,
    className,
  },
})

export const checkClassToFsdbAC = (schedID) => ({
  type: CHECKED_CLASSES_TO_FSDB,
  schedID,
})

export const clearCheckedAC = (schedID) => ({
  type: CLEAR_CHECKED,
  payload: { schedID },
})

export const clearClassesAC = (schedID) => ({
  type: CLEAR_CLASS,
  payload: { schedID },
})

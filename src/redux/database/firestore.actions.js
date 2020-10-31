export const ADD_DOC_TO_COLLECTION = 'app/db/ADD_DOC_TO_COLLECTION'
export const ADD_DOC_TO_COLLECTION_SUCCESS = 'app/db/ADD_DOC_TO_COLLECTION_SUCCESS'
export const ADD_DOC_TO_COLLECTION_FAILED = 'app/db/ADD_DOC_TO_COLLECTION_FAILED'
export const GET_DOCS_FROM_DB = 'app/db/GET_DOCS_FROM_DB'
export const SET_DOCS_TO_RX_STATE = 'app/db/SET_DOCS_TO_RX_STATE'
export const DEL_DOC_FROM_COLLECTION = 'app/db/DEL_DOC_FROM_COLLECTION'
export const DEL_DOC_FROM_COLLECTION_FAILED = 'app/db/DEL_DOC_FROM_COLLECTION_FAILED'
export const DEL_DOC_FROM_RX_STATE = 'app/db/DEL_DOC_FROM_RX_STATE'
export const CLEAR_RX_STATE = 'app/db/CLEAR_RX_STATE'

export const addDocToCollectionAC = (email, date) => ({
  type: ADD_DOC_TO_COLLECTION,
  email,
  date
})

export const addDocToCollectionSuccessAC = (payload) => ({
  type: ADD_DOC_TO_COLLECTION_SUCCESS,
  payload
})

export const addDocToCollectionFailedAC = (payload) => ({
  type: ADD_DOC_TO_COLLECTION_FAILED,
  payload
})


export const getDoscFromDBAC = (email) => ({
  type: GET_DOCS_FROM_DB,
  email
})

export const setDocsToRxStateAC = (payload) => ({
  type: SET_DOCS_TO_RX_STATE,
  payload
})

export const deleteDocFromCollectionAC = (email, docId) => ({
  type: DEL_DOC_FROM_COLLECTION,
  email,
  docId
})

export const delDocFromCollFailedAC = (payload) => ({
  type: DEL_DOC_FROM_COLLECTION_FAILED,
  payload
})

export const delDocFromRxStateAC = (docId) => ({
  type: DEL_DOC_FROM_RX_STATE,
  payload: {
    docId
  }
})

export const clearRxStateAC = () => ({
  type: CLEAR_RX_STATE,
})

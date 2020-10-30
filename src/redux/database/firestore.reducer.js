import {
  ADD_DOC_TO_COLLECTION_FAILED,
  ADD_DOC_TO_COLLECTION_SUCCESS,
  SET_DOCS_TO_RX_STATE,
  DEL_DOC_FROM_COLLECTION_FAILED,
  DEL_DOC_FROM_RX_STATE,
  CLEAR_RX_STATE,
} from './firestore.actions'

const initialState = {
  schedules: [],
  error: null,
}

const firestoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOC_TO_COLLECTION_SUCCESS:
      return { ...state, schedules: [...state.schedules, { id: payload }] }

    case SET_DOCS_TO_RX_STATE:
      if (state.schedules.some((e) => e.id === payload.id)) {
        return state
      }
      return {
        ...state,
        schedules: [
          ...state.schedules,
          {
            id: payload.id,
            ...payload,
          },
        ],
      }

    case DEL_DOC_FROM_RX_STATE:
      return {
        ...state,
        schedules: [...state.schedules.filter((i) => i.id !== payload.docId)],
      }

    case ADD_DOC_TO_COLLECTION_FAILED:
    case DEL_DOC_FROM_COLLECTION_FAILED:
      return { ...state, error: [payload] }

    case CLEAR_RX_STATE:
      return { schedules: [], error: null }

    default:
      return state
  }
}

export default firestoreReducer

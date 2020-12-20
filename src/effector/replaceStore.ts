import { createStore, createEvent } from 'effector'

export const openReplaceConfirm = createEvent()
export const closeReplaceConfirm = createEvent()

export const isOpenReplace = createStore(false)
  .on(openReplaceConfirm, () => true)
  .on(closeReplaceConfirm, () => false)

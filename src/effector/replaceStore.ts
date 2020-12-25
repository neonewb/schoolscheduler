import { createStore, createEvent } from 'effector'
import { LessonT } from '../redux/timetable/timetable'
import { DropResultT } from '../utils/DragDropTypes'

export const openReplaceConfirm = createEvent()
export const closeReplaceConfirm = createEvent()

export const isOpenReplace = createStore(false)
  .on(openReplaceConfirm, () => true)
  .on(closeReplaceConfirm, () => false)

export const setReplaceStore = createEvent()
export const resetReplaceStore = createEvent()
  
type ReplaceStore = {
  lesson: LessonT | null
  dropResult: DropResultT | null
  source: "footer" | "timetable" | null
}

export const replaceStore = createStore<ReplaceStore>({lesson: null, dropResult: null, source: null})
  //@ts-ignore
  .on(setReplaceStore, (state, payload: ReplaceStore) => ({...state, ...payload}))
  .reset(resetReplaceStore)
  
replaceStore.watch(console.log)
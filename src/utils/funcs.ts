import { LoadT, ScheduleT } from "../redux/database/firestore.actions"
import { FsdbInitialStateT } from "../redux/database/firestore.reducer"


export const isANumber = (str: number | string): boolean => {
  return !!Number(str)
}

export const getNumbersArray = (num: number): Array<string> => {
  return [...Array(num + 1).keys()].map(String).slice(1)
}

export function getChoosenSchedule(state: FsdbInitialStateT): ScheduleT {
  return state.schedules.find((e) => e.isChoosen)!
}

export const isLoadIncludesItem = (item: LoadT, schedule: ScheduleT) => {
  let result = false
  schedule.load.forEach((e) => {
    if (
      e.teacher === item.teacher &&
      e.subject === item.subject &&
      e.className === item.className
    )
      result = true
  })
  return result
}
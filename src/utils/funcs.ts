import { LoadT, ScheduleT } from "../redux/schedules/sched.actions"

export const isANumber = (str: number | string): boolean => {
  return !!Number(str)
}

export const getNumbersArray = (num: number): Array<string> => {
  return [...Array(num + 1).keys()].map(String).slice(1)
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
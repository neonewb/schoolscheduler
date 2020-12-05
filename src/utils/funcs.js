export const isANumber = (str) => {
  return Boolean(Number(str))
}

export const getNumbersArray = (num) => {
  return [...Array(num + 1).keys()].map(String).slice(1)
}

export const getChoosenSchedule = (state) => {
  return state.schedules.find((e) => e.isChoosen)
}

export const isLoadIncludesItem = (item, schedule) => {
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
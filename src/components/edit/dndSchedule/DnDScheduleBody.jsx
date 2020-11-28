import React from 'react'
import { daysOfTheWeek } from '../../../utils/daysOfTheWeek'

const DnDScheduleBody = ({mySchedule}) => {
  let {numberOfDays} = mySchedule

  let daysArr = []

  for (let i = 0; i < numberOfDays; i++) {
    daysArr.push(daysOfTheWeek[i])
  }

  return (
    <div>
      {daysArr}
    </div>
  )
}

export default DnDScheduleBody

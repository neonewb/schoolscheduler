import React from 'react'
import DnDScheduleBody from './DnDScheduleBody'
import DnDScheduleFooter from './DnDScheduleFooter'

const DnDSchedule = ({ mySchedule }) => {
  return (
    <div>
      {mySchedule && <DnDScheduleBody mySchedule={mySchedule} />}
      {mySchedule && <DnDScheduleFooter mySchedule={mySchedule} />}
    </div>
  )
}

export default DnDSchedule

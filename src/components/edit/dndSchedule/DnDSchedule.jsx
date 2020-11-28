import React from 'react'
import DnDScheduleBody from './DnDScheduleBody'
import DnDScheduleFooter from './DnDScheduleFooter'

const DnDSchedule = ({mySchedule}) => {
  return (
    <>
    {mySchedule && <DnDScheduleBody mySchedule={mySchedule}/>}
    {mySchedule && <DnDScheduleFooter mySchedule={mySchedule}/>}
    </>
  )
}

export default DnDSchedule

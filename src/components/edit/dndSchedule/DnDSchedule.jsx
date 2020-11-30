import React, { useCallback } from 'react'
import DnDScheduleBody from './DnDScheduleBody'
import DnDScheduleFooter from './DnDScheduleFooter'
import { DragDropContext } from 'react-beautiful-dnd'

const DnDSchedule = ({ mySchedule }) => {

  const onDragEnd = useCallback((result, provided) => {
    console.log('onDragEnd')
    console.log(result)
    console.log(provided)
  }, [])

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {mySchedule && <DnDScheduleBody mySchedule={mySchedule} />}
        {mySchedule && <DnDScheduleFooter mySchedule={mySchedule} />}
      </DragDropContext>
    </div>
  )
}

export default DnDSchedule

import React, { useCallback } from 'react'
import DnDScheduleBody from './DnDScheduleBody'
import DnDScheduleFooter from './DnDScheduleFooter'
import { DragDropContext } from 'react-beautiful-dnd'

const DnDSchedule = ({ mySchedule }) => {
  const onDragEnd = useCallback((result, provided) => {
    const { source, destination } = result
    console.log(result)

    // dropped outside the list
    if (!destination) {
      return
    }



  }, [])

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {mySchedule && <DnDScheduleBody mySchedule={mySchedule} />}
      </div>
        {mySchedule && <DnDScheduleFooter mySchedule={mySchedule} />}
      </DragDropContext>
    </div>
  )
}

export default React.memo(DnDSchedule)

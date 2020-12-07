import React from 'react'
import DnDScheduleBody from './dndScheduleBody/DnDScheduleBody'
import DnDScheduleFooter from './dndScheduleFooter/DnDScheduleFooter'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  DnDScheduleDiv: {
    height: '400px',
    maxHeight: '40vh'
  },
})

const DnDSchedule = ({ mySchedule }) => {
  const styles = useStyles()

  return (
    <div className={styles.DnDScheduleDiv}>
      <DndProvider backend={HTML5Backend}>
        <div >{mySchedule && <DnDScheduleBody mySchedule={mySchedule} />}</div>

        {mySchedule && <DnDScheduleFooter mySchedule={mySchedule} />}
      </DndProvider>
    </div>
  )
}

export default React.memo(DnDSchedule)

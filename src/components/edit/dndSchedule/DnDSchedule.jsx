import React from 'react'
import DnDScheduleBody from './dndScheduleBody/DnDScheduleBody'
import DnDScheduleFooter from './dndScheduleFooter/DnDScheduleFooter'
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
        <div >{mySchedule && <DnDScheduleBody mySchedule={mySchedule} />}</div>

        {mySchedule && <DnDScheduleFooter mySchedule={mySchedule} />}
    </div>
  )
}

export default React.memo(DnDSchedule)

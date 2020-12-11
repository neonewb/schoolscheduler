import React, { FC } from 'react'
import DnDScheduleBody from './dndScheduleBody/DnDScheduleBody'
import DnDScheduleFooter from './dndScheduleFooter/DnDScheduleFooter'
import { makeStyles, Typography } from '@material-ui/core'
import { ScheduleT } from '../../../redux/database/firestore.actions'

const useStyles = makeStyles({
  DnDScheduleDiv: {
    height: '400px',
    maxHeight: '40vh',
  },
  text: {
    margin: 8
  }
})

type DnDScheduleProps = {
  mySchedule: ScheduleT
}

const DnDSchedule: FC<DnDScheduleProps> = ({ mySchedule }) => {
  const styles = useStyles()

  if (Object.keys(mySchedule.timeTable).length > 0) {
    return (
      <div className={styles.DnDScheduleDiv}>
        <DnDScheduleBody mySchedule={mySchedule} />
        <DnDScheduleFooter mySchedule={mySchedule} />
      </div>
    )
  } else {
    return (
      <Typography className={styles.text}>There is no timetable yet. Go to settings for create schedule automatically or manually</Typography>
    )
  }
}

export default React.memo(DnDSchedule)

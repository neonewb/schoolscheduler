import React, { FC } from 'react'
import DnDScheduleBody from './dndScheduleBody/DnDScheduleBody'
import DnDScheduleFooter from './dndScheduleFooter/DnDScheduleFooter'
import { makeStyles, Typography } from '@material-ui/core'
import { ScheduleT } from '../../../redux/schedules/sched.actions'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/rootReducer'
import { getLessonsS } from '../../../redux/timetable/tt.selectors'
import { LessonT } from '../../../redux/timetable/timetable'

const useStyles = makeStyles({
  DnDScheduleDiv: {
    height: '400px',
    maxHeight: '40vh',
  },
  text: {
    margin: 8,
  },
})

type DnDScheduleProps = {
  mySchedule: ScheduleT
}

const DnDSchedule: FC<DnDScheduleProps> = ({ mySchedule }) => {
  const styles = useStyles()
  const lessons = useSelector<AppStateType, LessonT[]>(getLessonsS)

  if (lessons.length > 0){
    return (
      <div className={styles.DnDScheduleDiv}>
        <DnDScheduleBody mySchedule={mySchedule} />
        <DnDScheduleFooter lessons={lessons} />
      </div>
    )
  } else {
    return (
      <Typography className={styles.text}>
        There is no timetable yet. Go to settings for create schedule
        automatically or manually
      </Typography>
    )
  }
}

export default React.memo(DnDSchedule)

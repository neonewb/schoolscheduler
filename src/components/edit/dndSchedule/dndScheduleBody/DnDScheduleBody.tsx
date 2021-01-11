import { makeStyles } from '@material-ui/core'
import { nanoid } from 'nanoid'
import React, { FC } from 'react'
import { ScheduleT } from '../../../../redux/schedules/sched.actions'
import DayScheduleTable from './DayScheduleTable'
import DnDScheduleHead from './DnDScheduleHead'

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    maxWidth: '100%',
    minWidth: 600,
    overflow: 'auto',
    height: '75vh',
  },
  days: {
    display: 'flex',
  },
})

type DnDScheduleBodyPropsT = {
  mySchedule: ScheduleT
}
const DnDScheduleBody: FC<DnDScheduleBodyPropsT> = ({ mySchedule }) => {
  let { numberOfDays } = mySchedule
  const styles = useStyles()

  let daysArr: JSX.Element[] = []

  for (let dayNum = 0; dayNum < numberOfDays; dayNum++) {
    const key = nanoid()
    daysArr.push(
      <DayScheduleTable
        key={key}
        dayNum={dayNum}
        maxLessonsPerDay={mySchedule.maxLessonsPerDay}
        classes={mySchedule.classes}
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <DnDScheduleHead
        numberOfDays={mySchedule.numberOfDays}
        maxLessonsPerDay={mySchedule.maxLessonsPerDay}
      />
      <div className={styles.days}>{daysArr}</div>
    </div>
  )
}

export default DnDScheduleBody

import { makeStyles } from '@material-ui/core'
import { nanoid } from 'nanoid'
import React, { FC } from 'react'
import { ScheduleT } from '../../../../redux/schedules/sched.actions'
import DayScheduleTable from './DayScheduleTable'

const useStyles = makeStyles({
  days: {
    width: '100%',
    minWidth: 600,
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    height: '75vh',
  },
})

type DnDScheduleBodyPropsT = {
  mySchedule: ScheduleT
}
const DnDScheduleBody: FC<DnDScheduleBodyPropsT> = ({ mySchedule }) => {
  let { numberOfDays } = mySchedule
  const styles = useStyles()

  let daysArr = []

  for (let i = 0; i < numberOfDays; i++) {
    const key = nanoid()
    daysArr.push(
      <DayScheduleTable key={key} dayNum={i} mySchedule={mySchedule} />
    )
  }

  return <div className={styles.days}>{daysArr}</div>
}

export default DnDScheduleBody

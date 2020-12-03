import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DayScheduleTable from './DayScheduleTable'

const useStyles = makeStyles({
  days: {
    width: '100%',
    minWidth: 600,
    display: 'flex',
    overflow: 'auto',
  },
})

const DnDScheduleBody = ({ mySchedule }) => {
  let { numberOfDays } = mySchedule
  const styles = useStyles()

  let daysArr = []

  for (let i = 0; i < numberOfDays; i++) {
    daysArr.push(
      <DayScheduleTable key={i + 'day'} dayNum={i} mySchedule={mySchedule} />
    )
  }

  return <div className={styles.days}>{daysArr}</div>
}

export default DnDScheduleBody

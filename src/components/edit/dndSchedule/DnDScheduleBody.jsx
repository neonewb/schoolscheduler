import { makeStyles } from '@material-ui/core'
import React from 'react'
import DayScheduleTable from './DayScheduleTable'
import { ScrollSync } from 'react-scroll-sync'

const useStyles = makeStyles({
  days: {
    width: '99vw',
    display: 'flex',
    overflow: 'auto',
    marginLeft: 8,
    marginRigth: 8,
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

  return (
    <ScrollSync>
      <div className={styles.days}>{daysArr}</div>
    </ScrollSync>
  )
}

export default DnDScheduleBody

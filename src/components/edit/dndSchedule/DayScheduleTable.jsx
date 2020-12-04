import {
  makeStyles,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { daysOfTheWeek } from '../../../utils/daysOfTheWeek'
import { getNumbersArray } from '../../../utils/funcs'
import { nanoid } from 'nanoid'
import DroppableComponent from './DroppableComponent'

const useStyles = makeStyles({
  table: {
    width: '100%',
    margin: 8,
    textAlign: 'center',
  },
  contain: {
    // maxHeight: '60vh',
  },
  classesNames: {
    width: 50,
    height: 50,
  },
  rowDivs: {
    display: 'flex',
  },
  droppableDiv: {
    width: 50,
    height: 50,
    background: 'red',
    margin: 1,
  },
})

const DayScheduleTable = ({ dayNum, mySchedule }) => {
  let { maxLessonsPerDay, classes, timeTable } = mySchedule
  let { classes: classesLessons, teacher } = timeTable

  const styles = useStyles()

  let headSchedule = getNumbersArray(maxLessonsPerDay)
  headSchedule.unshift('class')

  let rows = []

  for (let i = 0; i < classes.length; i++) {
    let row = []

    // Class names
    row.push(
      <div className={styles.classesNames} key={classes[i] + i}>
        {classes[i]}
      </div>
    )

    // Lessons
    for (let j = 0; j < maxLessonsPerDay; j++) {
      const id = nanoid()
      row.push(<DroppableComponent key={id} id={id} />)
    }
    rows.push(row)
  }

  const id = nanoid()

  return (
    <div className={styles.table}>
      <Typography>{daysOfTheWeek[dayNum]}</Typography>

      <TableContainer>
        <Table stickyHeader size='small' aria-label='Day table'>
          <TableHead>
            <TableRow>
              {headSchedule.map((number) => {
                return <TableCell key={number + 'head'}>{number}</TableCell>
              })}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <div className={styles.contain}>
        {rows.map((row) => {
          const cellId = nanoid()
          return (
            <div className={styles.rowDivs} key={cellId}>
              {row}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayScheduleTable

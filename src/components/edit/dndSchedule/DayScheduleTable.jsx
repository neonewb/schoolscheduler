import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { daysOfTheWeek } from '../../../utils/daysOfTheWeek'
import { getNumbersArray } from '../../../utils/funcs'
import { ScrollSyncPane } from 'react-scroll-sync'
import { Droppable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
  table: {
    width: '100%',
    margin: 8,
    textAlign: 'center',
  },
  container: {
    maxHeight: '70vh',
  },
  cell: {
    width: 50,
    maxWidth: 50,
    minWidth: 50,
    height: 50,
  },
})

const DayScheduleTable = ({ dayNum, mySchedule }) => {
  let { maxLessonsPerDay, classes } = mySchedule
  const styles = useStyles()

  let headSchedule = getNumbersArray(maxLessonsPerDay)
  headSchedule.unshift('class')

  let rows = []

  for (let i = 0; i < classes.length; i++) {
    let row = []

    // Class names
    row.push(<TableCell key={classes[i] + i}>{classes[i]}</TableCell>)

    // Lessons
    for (let j = 0; j < maxLessonsPerDay; j++) {
      row.push(
        <Droppable key={j + 123 * 100 + classes[i]} droppableId='lesson'>
          {(provided, snapshot) => (
            <TableCell
              ref={provided.innerRef}
              className={styles.cell}></TableCell>
          )}
        </Droppable>
      )
    }
    rows.push(row)
  }

  return (
    <div className={styles.table}>
      <Typography>{daysOfTheWeek[dayNum]}</Typography>
      <ScrollSyncPane>
        <TableContainer className={styles.container}>
          <Table stickyHeader size='small' aria-label='Day table'>
            <TableHead>
              <TableRow>
                {headSchedule.map((number) => {
                  return <TableCell key={number + 'head'}>{number}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index + 123 * 123}>{row}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollSyncPane>
    </div>
  )
}

export default DayScheduleTable

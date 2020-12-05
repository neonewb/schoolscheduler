import {
  makeStyles,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core'
import MuiTableCell from '@material-ui/core/TableCell'
import React from 'react'
import { daysOfTheWeek } from '../../../utils/daysOfTheWeek'
import { getNumbersArray } from '../../../utils/funcs'
import { nanoid } from 'nanoid'
import DroppableComponent from './DroppableComponent'

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell)

const useStyles = makeStyles({
  table: {
    width: '100%',
    padding: 8,
    textAlign: 'center',
  },
  contain: {
    marginTop: 8,
    height: '60vh',
    maxHeight: '60vh',
  },
  classesNames: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDivs: {
    display: 'flex',
    alignItems: 'center',
  },
  droppableDiv: {
    width: 50,
    height: 50,
    margin: 1,
  },
  tableHeader: {
    padding: 4,
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 2,
    borderBottom: 'none',
  },
  tableHeadCell: {
    width: 50,
    maxWidth: 50,
    minWidth: 50,
    '&:first-child': {
      paddingLeft: 0
    },
  },
})

const DayScheduleTable = ({ dayNum, mySchedule }) => {
  let { 
    maxLessonsPerDay, 
    classes, 
    // timeTable 
  } = mySchedule
  // let { classes: classesLessons, teacher } = timeTable

  const styles = useStyles()

  let headSchedule = getNumbersArray(maxLessonsPerDay)
  headSchedule.unshift('Class')

  let rows = []

  for (let i = 0; i < classes.length; i++) {
    let row = []

    // Class names
    row.push(
      <div className={styles.classesNames} key={classes[i] + i}>
        <Typography align='center'>{classes[i]}</Typography>
      </div>
    )

    // Lessons
    for (let j = 0; j < maxLessonsPerDay; j++) {
      const id = nanoid()
      row.push(<DroppableComponent key={id} id={id} />)
    }
    rows.push(row)
  }

  return (
    <div className={styles.table}>
      <Paper elevation={2} className={styles.tableHeader}>
        <Typography>{daysOfTheWeek[dayNum]}</Typography>

        <TableContainer>
          <Table stickyHeader size='small' aria-label='Day table'>
            <TableHead>
              <TableRow>
                {headSchedule.map((number) => {
                  return (
                    <TableCell
                      align='center'
                      className={styles.tableHeadCell}
                      key={number + 'head'}>
                      <Typography>{number}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>

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

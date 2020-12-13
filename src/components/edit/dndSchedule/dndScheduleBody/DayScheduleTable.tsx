import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'
import { getNumbersArray } from '../../../../utils/funcs'
import { nanoid } from 'nanoid'
import DroppableComponent from './DroppableComponent'
import { ScheduleT } from '../../../../redux/schedules/sched.actions'
import { grey, teal } from '@material-ui/core/colors'

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
  rowDivs: {
    display: 'flex',
    '&:hover $classesNames': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
  classesNames: {
    margin: '1px 1px',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    paddingTop: 8,
  },
  tableHeadCell: {
    height: 50,
    width: 50,
    maxWidth: 50,
    minWidth: 50,
    margin: '0px 1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
  droppableDiv: {
    width: 50,
    height: 50,
    margin: 1,
    border: '1px solid ' + grey[300],
    borderRadius: 2,
    '&:hover': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
})

type DayScheduleTablePropsT = {
  dayNum: number
  mySchedule: ScheduleT
}

const DayScheduleTable: FC<DayScheduleTablePropsT> = ({
  dayNum,
  mySchedule,
}) => {
  let { maxLessonsPerDay, classes } = mySchedule

  const styles = useStyles()

  let headSchedule = getNumbersArray(maxLessonsPerDay)
  headSchedule.unshift('Class')

  let rows = []

  // Create row
  for (let i = 0; i < classes.length; i++) {
    let row = []

    // Add class names
    let className = classes[i]
    if (className.length > 3) {
      className = className.substring(0, 4)
    }
    const key = nanoid()
    row.push(
      <div className={styles.classesNames} key={key}>
        <Typography>{className}</Typography>
      </div>
    )

    // Add lessons drop components
    for (let j = 0; j < maxLessonsPerDay; j++) {
      const id = nanoid()
      row.push(
        <DroppableComponent style={styles.droppableDiv} key={id} id={id} />
      )
    }
    rows.push(row)
  }

  return (
    <div className={styles.table}>
      <Paper elevation={2} className={styles.tableHeader}>
        <Typography>{daysOfTheWeek[dayNum]}</Typography>
        <div className={styles.rowDivs}>
          {headSchedule.map((number) => {
            return (
              <Box className={styles.tableHeadCell} key={number + ' head cell'}>
                <Typography>{number}</Typography>
              </Box>
            )
          })}
        </div>
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

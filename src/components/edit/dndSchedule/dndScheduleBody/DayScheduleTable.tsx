import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { nanoid } from 'nanoid'
import DroppableComponent from './DroppableComponent'
import { ScheduleT } from '../../../../redux/schedules/sched.actions'
import { grey, teal } from '@material-ui/core/colors'

const useStyles = makeStyles({
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
  droppableDiv: {
    width: 50,
    height: 50,
    margin: 1,
    border: '1px solid ' + grey[300],
    borderRadius: 4,
    '&:hover': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 4,
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
  const { maxLessonsPerDay, classes } = mySchedule
  const styles = useStyles()

  let rows = []

  // Create row
  for (let classNum = 0; classNum < classes.length; classNum++) {
    let row = []

    // Add class names
    let classTitle = classes[classNum]
    let classTitleShort: string = classTitle.substring(0, 4)

    const key = nanoid()
    row.push(
      <div className={styles.classesNames} key={key}>
        <Typography>{classTitleShort}</Typography>
      </div>
    )

    // Add drop components and lessons if they are
    for (let period = 0; period < maxLessonsPerDay; period++) {
      const id = nanoid()
      row.push(
        <DroppableComponent
          style={styles.droppableDiv}
          classTitle={classTitle}
          dayNum={dayNum}
          period={period}
          key={id}
          id={id}>
        </DroppableComponent>
      )
    }
    rows.push(row)
  }

  return (
    <Box p={1}>
      {rows.map((row) => {
        const cellId = nanoid()
        return (
          <div className={styles.rowDivs} key={cellId}>
            {row}
          </div>
        )
      })}
    </Box>
  )
}

export default DayScheduleTable

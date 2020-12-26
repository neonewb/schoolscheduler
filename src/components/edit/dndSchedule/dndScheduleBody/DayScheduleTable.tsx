import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { nanoid } from 'nanoid'
import DroppableComponent from './DroppableComponent'
import { ScheduleT } from '../../../../redux/schedules/sched.actions'
import { grey, teal } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'
import { getClasses } from '../../../../redux/timetable/tt.selectors'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'
import DraggableLesson from '../dndScheduleFooter/DraggableLesson'

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
  let { maxLessonsPerDay, classes } = mySchedule
  const clsses = useSelector(getClasses)
  const styles = useStyles()

  let rows = []

  // Create row
  for (let classNum = 0; classNum < classes.length; classNum++) {
    let row = []

    // Add class names
    let classTitle = classes[classNum]
    if (classTitle.length > 3) {
      classTitle = classTitle.substring(0, 4)
    }
    const key = nanoid()
    row.push(
      <div className={styles.classesNames} key={key}>
        <Typography>{classTitle}</Typography>
      </div>
    )

    const myClass = clsses.find((e) => e.title === classTitle)

    // Add drop components and lessons if they are
    for (let period = 0; period < maxLessonsPerDay; period++) {
      const renderLesson = () => {
        if (!myClass || myClass?.lessons.length === 0) return null

        const lesson = myClass.lessons.find(
          (i) => i.dayOfTheWeek === daysOfTheWeek[dayNum] && i.period === period
        )

        return lesson ? (
          <DraggableLesson lesson={lesson} source={'timetable'} />
        ) : null
      }

      const id = nanoid()
      row.push(
        <DroppableComponent
          style={styles.droppableDiv}
          classTitle={classTitle}
          dayNum={dayNum}
          period={period}
          key={id}
          myClass={myClass}
          id={id}>
          {renderLesson()}
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

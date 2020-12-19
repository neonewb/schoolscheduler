import { Box, makeStyles, Paper, Popover, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { openReplaceConfirm } from '../../../../effector/replaceStore'
import { LessonT } from '../../../../redux/timetable/timetable'
import { dropLesson } from '../../../../redux/timetable/tt.actions'
import { getClassLessons } from '../../../../redux/timetable/tt.selectors'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'
import { DragItemTypes, DropResultT } from '../../../../utils/DragDropTypes'
import { getConfirmReplace } from '../dndScheduleBody/ReplaceConfirm'

const useStyles = makeStyles({
  lessonPaper: {
    width: 48,
    minWidth: 48,
    maxWidth: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: teal[50],
      cursor: 'grab',
    },
  },
})

type DraggableLessonPropsT = {
  lesson: LessonT
  source: 'footer' | 'timetable'
}

const DraggableLesson: FC<DraggableLessonPropsT> = ({ lesson, source }) => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const lessons = useSelector(getClassLessons(lesson.classTitle))

  const [{ isDragging }, drag] = useDrag({
    item: {
      source,
      sbuject: lesson.subject,
      teacher: lesson.teacher,
      classTitle: lesson.classTitle,
      type: DragItemTypes.LESSON,
      id: lesson.id,
    },
    end: async (item, monitor) => {
      const dropResult: DropResultT = monitor.getDropResult()
      if (item && dropResult) {
        if (
          !(
            // Check lesson didn't drop on itself
            (
              lesson.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
              lesson.period === dropResult.period
            )
          )
        ) {
          if (!lessons) {
            dispatch(dropLesson(lesson, dropResult, item.source))
          } else if (lessons.length > 0) {
            const isMatch = lessons.some(
              (les) =>
                les.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
                les.period === dropResult.period
            )
            if (isMatch) {
              openReplaceConfirm()
              const confirm = await getConfirmReplace()
              console.log(confirm)
            } else {
              dispatch(dropLesson(lesson, dropResult, item.source))
            }
          } else {
            dispatch(dropLesson(lesson, dropResult, item.source))
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Paper
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup='true'
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      ref={drag}
      style={{ opacity: opacity }}
      className={styles.lessonPaper}>
      <Typography align={'center'}>{lesson.subject.substring(0, 4)}</Typography>

      <Popover
        id='mouse-over-popover'
        style={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Box p={1}>
          <Typography>{lesson.subject}</Typography>
          <Typography>{lesson.teacher}</Typography>
          <Typography>{lesson.classTitle}</Typography>
        </Box>
      </Popover>
    </Paper>
  )
}

export default DraggableLesson

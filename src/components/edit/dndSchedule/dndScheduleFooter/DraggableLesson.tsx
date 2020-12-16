import { Box, makeStyles, Paper, Popover, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { LessonT } from '../../../../redux/timetable/timetable'
import { dropLesson } from '../../../../redux/timetable/tt.actions'
import { DragItemTypes, DropResultT } from '../../../../utils/DragDropTypes'

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
}

const DraggableLesson: FC<DraggableLessonPropsT> = ({ lesson }) => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: {
      sbuject: lesson.subject,
      teacher: lesson.teacher,
      classTitle: lesson.classTitle,
      type: DragItemTypes.LESSON,
      id: lesson.id,
    },
    end: (item, monitor) => {
      const dropResult: DropResultT = monitor.getDropResult()
      if (item && dropResult) {
        dispatch(dropLesson(lesson, dropResult))
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

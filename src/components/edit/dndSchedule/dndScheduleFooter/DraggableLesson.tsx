import { Box, Paper, Popover, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { LessonT } from '../../../../redux/timetable/timetable'
import { DragItemTypes } from '../../../../utils/DragItemsTypes'

type DraggableLessonPropsT = {
  lesson: LessonT
  style: string
}

const DraggableLesson: FC<DraggableLessonPropsT> = ({ style, lesson }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: lesson.id, type: DragItemTypes.LESSON },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`)
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
      className={style}>
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
          <Typography>{lesson.className} ({lesson.numOfLessons})</Typography>
        </Box>
      </Popover>
    </Paper>
  )
}

export default DraggableLesson

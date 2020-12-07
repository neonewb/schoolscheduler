import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '../../../../utils/DragItemsTypes'

const DraggableLesson = ({ style, lesson }) => {
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
  return (
    <Paper
      ref={drag}
      style={{ 'opacity': opacity }}
      className={style}
    >
      <Typography align={'center'}>{lesson.subject[0] + lesson.subject[1]}</Typography>
    </Paper>
  )
}

export default DraggableLesson

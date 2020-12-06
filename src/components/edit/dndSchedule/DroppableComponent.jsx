import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '../../../utils/DragItemsTypes'
import grey from '@material-ui/core/colors/grey';
import theme from '../../../styles/theme';

const useStyles = makeStyles({
  droppableDiv: {
    width: 50,
    height: 50,
    margin: 1,
    border: '1px solid ' + grey[300],
    borderRadius: 2,
    '&:hover': {
      backgroundColor: grey[300]
    }
  },
})

const DroppableComponent = ({ id }) => {
  const styles = useStyles()
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.LESSON,
    drop: () => ({ name: 'TableCell' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = theme.palette.primary.main
  } 

  return (
    <div
      key={id}
      ref={drop}
      className={styles.droppableDiv}
      style={{ backgroundColor }}>

    </div>
  )
}

export default DroppableComponent

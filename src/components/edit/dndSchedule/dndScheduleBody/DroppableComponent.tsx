import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '../../../../utils/DragItemsTypes'
import theme from '../../../../styles/theme'
import { teal } from '@material-ui/core/colors'

type DroppableComponentPropsT = {
  style: string
  id: string
}

const DroppableComponent: FC<DroppableComponentPropsT> = ({ style, id }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.LESSON,
    drop: () => ({ name: id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  let stylesOnActive = {}
  if (isActive) {
    stylesOnActive = {
      backgroundColor: theme.palette.primary.main,
      border: '1px solid ' + teal[700],
      borderRadius: 2,
    }
  }

  return (
    <div
      key={id}
      ref={drop}
      className={style}
      style={{ ...stylesOnActive }}></div>
  )
}

export default DroppableComponent

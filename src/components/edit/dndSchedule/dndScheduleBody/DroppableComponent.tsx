import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '../../../../utils/DragItemsTypes'
import theme from '../../../../styles/theme'

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
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = theme.palette.primary.main
  }

  return (
    <div
      key={id}
      ref={drop}
      className={style}
      style={{ backgroundColor }}></div>
  )
}

export default DroppableComponent

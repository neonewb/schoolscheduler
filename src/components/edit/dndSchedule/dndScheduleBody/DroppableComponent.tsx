import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '../../../../utils/DragItemsTypes'
import theme from '../../../../styles/theme'
import { teal } from '@material-ui/core/colors'
import { ClassT } from '../../../../redux/timetable/timetable'

type DroppableComponentPropsT = {
  style: string
  classTitle: string
  dayNum: number
  period: number
  id: string
  myClass: ClassT | undefined
  children: any
}

const DroppableComponent: FC<DroppableComponentPropsT> = ({
  style,
  id,
  classTitle,
  dayNum,
  period,
  myClass,
  children,
}) => {
  const canLessonDrop = (
    item: any,
    classTitle: string,
    myClass: ClassT | undefined
  ) => {
    if (item.classTitle !== classTitle) return false
    if (myClass?.lessons.length === 0) return true
    return true
  }
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.LESSON,
    canDrop: (item) => canLessonDrop(item, classTitle, myClass),
    drop: () => ({ classTitle, dayNum, period, id }),
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
      borderRadius: 4,
    }
  }

  let stylesOnCanDrop = {}
  if (canDrop) {
    stylesOnCanDrop = {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 4,
    }
  }

  return (
    <div
      key={id}
      ref={drop}
      className={style}
      style={{ ...stylesOnCanDrop, ...stylesOnActive }}>
      {children}
    </div>
  )
}

export default DroppableComponent

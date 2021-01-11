import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '../../../../utils/DragDropTypes'
import theme from '../../../../styles/theme'
import { teal } from '@material-ui/core/colors'
import { ClassT } from '../../../../redux/timetable/timetable'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'
import { getClass } from '../../../../redux/timetable/tt.selectors'
import { useSelector } from 'react-redux'
import DraggableLesson from '../dndScheduleFooter/DraggableLesson'
import { AppStateType } from '../../../../redux/rootReducer'
import { getClassDemo } from '../../../../redux/timetableDemo/tt.demo.selectors'

type DroppableComponentPropsT = {
  style: string
  classTitle: string
  dayNum: number
  period: number
  id: string
  demo?: boolean
}

const DroppableComponent: FC<DroppableComponentPropsT> = ({
  style,
  id,
  classTitle,
  dayNum,
  period,
  demo,
}) => {
  const getClassSelector = demo ? getClassDemo : getClass
  const myClass = useSelector<AppStateType, ClassT | undefined>((state) =>
    getClassSelector(state, classTitle)
  )

  const renderLesson = () => {
    if (!myClass || myClass?.lessons.length === 0) return null

    const lesson = myClass.lessons.find(
      (i) => i.dayOfTheWeek === daysOfTheWeek[dayNum] && i.period === period
    )

    return lesson ? (
      <DraggableLesson lesson={lesson} source={'timetable'} demo={demo} />
    ) : null
  }

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
    drop: () => ({ classTitle, dayNum, period, id, target: 'timetable' }),
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
      {renderLesson()}
    </div>
  )
}

export default DroppableComponent

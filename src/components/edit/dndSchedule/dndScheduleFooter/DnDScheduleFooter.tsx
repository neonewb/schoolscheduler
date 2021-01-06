import { Paper } from '@material-ui/core'
import { makeStyles, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/rootReducer'
import { LessonT } from '../../../../redux/timetable/timetable'
import { getLessonsS } from '../../../../redux/timetable/tt.selectors'
import theme from '../../../../styles/theme'
import { DragItemTypes } from '../../../../utils/DragDropTypes'
import DraggableLesson from './DraggableLesson'

const useStyles = makeStyles({
  footer: {
    borderTop: '1px solid #E0E0E0',
    // boxShadow: '0px -1px 5px #E0E0E0',
    width: '100%',
    minWidth: 600,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    background: 'white',
  },
  lessons: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    height: 82,
    overflow: 'auto',
    '& div': {
      margin: 8,
    },
  },
  margin: {
    marginRight: 8,
  },
})

const DnDScheduleFooter: FC = () => {
  const styles = useStyles()
  const lessons = useSelector<AppStateType, LessonT[]>(getLessonsS)

  const canLessonDrop = (item: any) => {
    if (item.source === 'footer') return false
    return true
  }

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.LESSON,
    canDrop: (item) => canLessonDrop(item),
    drop: () => ({ target: 'footer' }),
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
    <Paper className={styles.footer}>
      <Typography className={styles.margin}>Lessons:</Typography>

      <div
        ref={drop}
        className={styles.lessons}
        style={{ ...stylesOnCanDrop, ...stylesOnActive }}>
        {lessons.map((lesson) => {
          if (lesson.currentLessons !== 0) {
            return (
              <DraggableLesson
                key={lesson.id}
                lesson={lesson}
                source={'footer'}
              />
            )
          }
          return null
        })}
      </div>
    </Paper>
  )
}

export default DnDScheduleFooter

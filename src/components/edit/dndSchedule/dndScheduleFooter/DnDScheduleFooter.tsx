import { Paper } from '@material-ui/core'
import { makeStyles, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../redux/rootReducer'
import { LessonT } from '../../../../redux/timetable/timetable'
import { getLessonsS } from '../../../../redux/timetable/tt.selectors'
import DraggableLesson from './DraggableLesson'

const useStyles = makeStyles({
  footer: {
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
    height: 90,
    overflow: 'auto',
  },
  lessonPaper: {
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    '&:hover': {
      background: teal[50],
      cursor: 'grab',
    },
  },
  margin: {
    marginRight: 8,
  },
})

const DnDScheduleFooter: FC = () => {
  const styles = useStyles()
  const lessons = useSelector<AppStateType, LessonT[]>(getLessonsS)

  return (
    <Paper className={styles.footer}>
      <Typography className={styles.margin}>Lessons:</Typography>

      <div className={styles.lessons}>
        {lessons.map((lesson) => (
          
          <DraggableLesson
            key={lesson.id}
            style={styles.lessonPaper}
            lesson={lesson}
          />
        ))}
      </div>
    </Paper>
  )
}

export default DnDScheduleFooter

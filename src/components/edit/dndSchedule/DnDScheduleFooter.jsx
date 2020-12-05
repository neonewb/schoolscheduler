import { Paper } from '@material-ui/core'
import { makeStyles, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'
import DraggableLesson from './DraggableLesson'

const useStyles = makeStyles({
  footer: {
    width: '100%',
    minWidth: 600,
    // height: '100%',
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
      background: grey[300],
      cursor: 'grab'
    }
  },
  margin: {
    marginRight: 8,
  },
})

const DnDScheduleFooter = ({ mySchedule }) => {
  let { load } = mySchedule
  const styles = useStyles()

  return (
    <Paper className={styles.footer}>
      <Typography className={styles.margin}>Lessons:</Typography>

      <div className={styles.lessons}>
        {load.map((e) => (
          <DraggableLesson key={e.id} style={styles.lessonPaper} lesson={e} />
        ))}
      </div>
    </Paper>
  )
}

export default DnDScheduleFooter

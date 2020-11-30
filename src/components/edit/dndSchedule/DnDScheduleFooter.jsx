import { Paper } from '@material-ui/core'
import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
  footer: {
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    padding: 8,
  },
  lessons: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  lessonPaper: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
})

const DnDScheduleFooter = ({ mySchedule }) => {
  let { load } = mySchedule
  const styles = useStyles()

  return (
    <div className={styles.footer}>
      <Typography>Lessons:</Typography>
      <Droppable droppableId='footer'>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className={styles.lessons}>
            {load.map((e, index) => {
              return (
                <Draggable key={e.id} draggableId={e.id} index={index}>
                  {(provided, snapshot) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.lessonPaper}>
                      <Typography align={'center'}>
                        {e.subject[0] + e.subject[1]}
                      </Typography>
                    </Paper>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default DnDScheduleFooter

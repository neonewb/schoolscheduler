import { Paper } from '@material-ui/core'
import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
  footer: {
    width: '100%',
    minWidth: 600,
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    position: 'sticky',
    // top: 100,
    bottom: '0%',
    background: 'white',
    zIndex: 5,
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
  },
  margin: {
    marginRight: 8
  }
})

const DnDScheduleFooter = ({ mySchedule }) => {
  let { load } = mySchedule
  const styles = useStyles()

  return (
    <Paper elevation={24} className={styles.footer}>
    <Typography className={styles.margin}>Lessons:</Typography>

    <Droppable droppableId='footer' direction='horizontal'>
      {(provided, snapshot) => (
        
        <div ref={provided.innerRef} 
        className={styles.lessons} 
        {...provided.droppableProps}>
          {load.map((e, index) => (

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
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
   </Paper>
  )
}

export default DnDScheduleFooter

import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
droppableDiv: {
  width: 50,
  height: 50,
  background: 'green',
  margin: 1,
}})

const DroppableComponent = ({id}) => {
  const styles = useStyles()
  return (
    <Droppable key={id} droppableId={id}>
          {(provided, snapshot) => (
            <div
              className={styles.droppableDiv}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
  )
}

export default DroppableComponent

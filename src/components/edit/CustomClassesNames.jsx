import { IconButton, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

const useStyles = makeStyles({
  textField: {
    margin: 8,
  },
})

const CustomClassesNames = () => {
  const classes = useStyles()

  const [textFields, setTextFields] = useState([
    <TextField
      key={Math.random()*100000}
      className={classes.textField}
      name='customClassName'
      type='text'
      size='small'
      variant='outlined'
      placeholder='Custom name'
      // inputRef={(e) => {
      //   register(e)
      //   scheduleTitleRef.current = e
      // }}
      // defaultValue={mySchedule.title}
    />,
  ])

  const handleAddCustomClass = () => {
    setTextFields([
      ...textFields,
      <TextField
        key={Math.random()*100000}
        className={classes.textField}
        name='customClassName'
        type='text'
        size='small'
        variant='outlined'
        placeholder='Custom name'

        // inputRef={(e) => {
        //   register(e)
        //   scheduleTitleRef.current = e
        // }}
        // defaultValue={mySchedule.title}
      />,
    ])
  }

  return (
    <div>
      {textFields}
      <IconButton onClick={handleAddCustomClass}>
        <AddCircleRoundedIcon color='primary' fontSize='default' />
      </IconButton>
    </div>
  )
}

export default CustomClassesNames

import React, { useState } from 'react'
import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useDispatch } from 'react-redux'
import {
  setSubjectAC,
  deleteSubjectAC,
} from '../../../../redux/database/firestore.actions'
import LoadAutocomplete from './LoadAutocomplete'

const useStyles = makeStyles((theme) => ({
  textInput: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  subjectsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const Load = ({ mySchedule }) => {
  let { classes, subjects, teachers } = mySchedule
  const styles = useStyles()

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    // dispatch(setSubjectAC(inputValue))
  }

  const handleDelete = (e) => {
    // dispatch(deleteSubjectAC(e))
  }

  if (classes.length > 0 && subjects.length > 0 && teachers.length > 0) {
    return (
      <>
        <div className={styles.subjectsDiv}>
          {/* {subjects.map((e) => {
            return (
              <Chip
                key={Math.random() * 1000}
                label={e}
                variant='outlined'
                color='primary'
                onDelete={() => {
                  handleDelete(e)
                }}
              />
            )
          })} */}
        </div>

        <form
          className={styles.textInput}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          autoComplete='off'>

          <LoadAutocomplete label={'Teacher'} options={teachers} />
          <LoadAutocomplete label={'Subject'} options={subjects} />
          <LoadAutocomplete label={'Classes'} options={classes} />
          <LoadAutocomplete label={'№ lessons/week'} />


          <IconButton type='submit'>
            <AddCircleRoundedIcon color='primary' fontSize='default' />
          </IconButton>
        </form>
      </>
    )
  } else {
    return <div>Add some classes, subjects and teachers</div>
  }
}

export default Load

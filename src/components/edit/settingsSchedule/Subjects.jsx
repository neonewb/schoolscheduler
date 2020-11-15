import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  setSubjectAC,
  deleteSubjectAC,
} from '../../../redux/database/firestore.actions'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'

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

const Subjects = ({ subjects }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const submit = ( data ) => {
    // console.log(data);
    dispatch(setSubjectAC(data.subject))
    reset({ subject: '' })
  }

  const handleDelete = (e) => {
    dispatch(deleteSubjectAC(e))
  }

  const subjectsOptions = ['Astronomy', 'History', 'Mathematics']

  return (
    <>
      <div className={classes.subjectsDiv}>
        {subjects.map((e) => {
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
        })}
      </div>

      <form
        className={classes.textInput}
        onSubmit={handleSubmit(submit)}
        noValidate
        autoComplete='off'>
        <Controller
          name='subject'
          as={
            <Autocomplete
              freeSolo
              selectOnFocus
              handleHomeEndKeys
              options={subjectsOptions}
              style={{ width: 223 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size='small'
                  label='Subject'
                  variant='outlined'
                />
              )}
            />
          }
          defaultValue=''
          control={control}
        />

        <IconButton type='submit'>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </form>
    </>
  )
}

export default Subjects

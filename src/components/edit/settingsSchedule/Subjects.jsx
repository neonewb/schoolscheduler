import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  setSubjectAC,
  deleteSubjectAC,
} from '../../../redux/database/firestore.actions'

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
  short: {
    width: 51,
  }
}))

const Subjects = ({ subjects }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const onSubmit = ({ customClassName }) => {
    dispatch(setSubjectAC(customClassName))
    reset({ customClassName: '' })
  }

  const handleDelete = (e) => {
    dispatch(deleteSubjectAC(e))
  }

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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'>

        <Controller
          as={TextField}
          type='text'
          name='customClassName'
          size='small'
          variant='outlined'
          placeholder='Custom name'
          control={control}
          defaultValue=''
        />

        <IconButton type='submit'>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </form>
    </>
  )
}

export default Subjects

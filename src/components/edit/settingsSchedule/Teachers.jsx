import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  deleteTeacherAC,
  setTeacherAC,
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
  classDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const Teachers = ({ teachers }) => {
  const classeStyle = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const onSubmit = ({ teacher }) => {
    dispatch(setTeacherAC(teacher))
    reset({ teacher: '' })
  }

  const handleDelete = (e) => {
    dispatch(deleteTeacherAC(e))
  }

  return (
    <>
      <div className={classeStyle.classDiv}>
        {teachers.map((e) => {
          return (
            <Chip
              key={e}
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
        className={classeStyle.textInput}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'>
        <Controller
          as={TextField}
          type='text'
          name='teacher'
          size='small'
          variant='outlined'
          label='Teacher'
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

export default Teachers

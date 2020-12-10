import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  deleteTeacherAC,
  ScheduleT,
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

type TeacherProps = {
  teachers: ScheduleT['teachers']
}

const Teachers: FC<TeacherProps> = ({ teachers }) => {
  const classeStyle = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const onSubmit = ({ teacher }: {teacher: string}) => {
    dispatch(setTeacherAC(teacher))
    reset()
  }

  const handleDelete = (teacher: string) => {
    dispatch(deleteTeacherAC(teacher))
  }

  return (
    <>
      <div className={classeStyle.classDiv}>
        {teachers.map((teacher) => {
          return (
            <Chip
              key={teacher}
              label={teacher}
              variant='outlined'
              color='primary'
              onDelete={() => {
                handleDelete(teacher)
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

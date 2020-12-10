import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  deleteCustomClassAC,
  ScheduleT,
  setCustomClassAC,
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

type CustomClassesNamesProps = {
  classes: ScheduleT['classes']
}

const CustomClassesNames: FC<CustomClassesNamesProps> = ({ classes }) => {
  const classeStyle = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const onSubmit = ({ customClassName }: {customClassName: string}) => {
    dispatch(setCustomClassAC(customClassName))
    reset()
  }

  const handleDelete = (className: string) => {
    dispatch(deleteCustomClassAC(className))
  }

  return (
    <>
      <div className={classeStyle.classDiv}>
        {classes.map((className) => {
          return (
            <Chip
              key={className}
              label={className}
              variant='outlined'
              color='primary'
              onDelete={() => {
                handleDelete(className)
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
          name='customClassName'
          size='small'
          variant='outlined'
          label='Custom name'
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

export default CustomClassesNames

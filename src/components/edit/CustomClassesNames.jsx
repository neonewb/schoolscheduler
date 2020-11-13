import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setCustomClassAC } from '../../redux/database/firestore.actions'

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

const CustomClassesNames = ({ classes }) => {
  const classeStyle = useStyles()

  const dispatch = useDispatch()
  const { handleSubmit, control, reset } = useForm()

  const onSubmit = (data, e) => {
    dispatch(setCustomClassAC(data.customClassName))
    reset({ customClassName: '' })
    e.target.focus()
  }

  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <>
      <div className={classeStyle.classDiv}>
        {classes.map((e) => {
          return (
            <Chip
              key={Math.random() * 1000}
              label={e}
              variant='outlined'
              color='primary'
              onDelete={handleDelete}
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
          autoFocus
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

export default CustomClassesNames

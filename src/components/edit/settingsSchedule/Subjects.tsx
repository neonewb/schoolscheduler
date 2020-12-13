import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'
import {
  setSubjectAC,
  deleteSubjectAC,
  ScheduleT,
} from '../../../redux/schedules/sched.actions'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FC, useState } from 'react'
import { subjectsOptions, SubjectT } from '../../../utils/subjects'

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

type SubjectProps = {
  subjects: ScheduleT['subjects']
}

const Subjects: FC<SubjectProps> = ({ subjects }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [value, setValue] = useState<SubjectT | string>('')
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setSubjectAC(inputValue))
  }

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      setValue(newValue)
      dispatch(setSubjectAC(newValue))
    } else {
      setValue('')
    }
  }

  const handleInputChange = (newValue: string | null) => {
    if (newValue) {
    setInputValue(newValue)
    } else {
      setInputValue('')
    }
  }

  const handleDelete = (subject: SubjectT | string) => {
    dispatch(deleteSubjectAC(subject))
  }

  return (
    <>
      <div className={classes.subjectsDiv}>
        {subjects.map((subject) => {
          return (
            <Chip
              key={subject}
              label={subject}
              variant='outlined'
              color='primary'
              onDelete={() => {
                handleDelete(subject)
              }}
            />
          )
        })}
      </div>

      <form
        className={classes.textInput}
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        autoComplete='off'>
        <Autocomplete
          openOnFocus
          autoComplete
          includeInputInList
          disableCloseOnSelect
          clearOnEscape
          freeSolo
          selectOnFocus
          handleHomeEndKeys
          //@ts-ignore
          options={subjectsOptions}
          value={value}
          onChange={(event, newValue) => {
            handleChange(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            handleInputChange(newInputValue)
          }}
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

        <IconButton type='submit'>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </form>
    </>
  )
}

export default Subjects

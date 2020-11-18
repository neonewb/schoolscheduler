import { Chip, IconButton, makeStyles, TextField } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'
import {
  setSubjectAC,
  deleteSubjectAC,
} from '../../../redux/database/firestore.actions'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import { subjectsOptions } from '../../../utils/subjects'

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

  const [value, setValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setSubjectAC(inputValue))
  }

  const handleChange = (newValue) => {
    dispatch(setSubjectAC(newValue))
    setValue(newValue)
  }

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
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

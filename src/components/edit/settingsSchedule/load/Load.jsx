import React, { useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'
import LoadAutocomplete from './LoadAutocomplete'
import {
  deleteLoadAC,
  setLoadAC,
} from '../../../../redux/database/firestore.actions'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { getNumbersArray } from '../../../../utils/funcs'
import LoadMultipleAutocomplete from './LoadMultipleAutocomplete'
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles((theme) => ({
  textInput: {
    minWidth: 1000,
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  table: {
    width: 1050,
  },
}))

const Load = ({ mySchedule }) => {
  let { classes, subjects, teachers, load } = mySchedule
  const styles = useStyles()

  const dispatch = useDispatch()

  const [newLoad, setNewLoad] = useState({})

  const handleNewLoad = (key, value) => {
    setNewLoad({
      ...newLoad,
      [key]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setLoadAC(newLoad))
  }

  const handleDelete = (id) => {
    dispatch(deleteLoadAC(id))
  }

  const numbers = getNumbersArray(10)

  const [selection, setSelection] = useState([])
  console.log(selection)
  const columns = [
    { field: 'teacher', headerName: 'Teacher', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'className', headerName: 'Class' },
    {
      field: 'lessons',
      headerName: 'Lessons/week',
    },
    {
      field: 'id',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDelete(params.value)
          }}>
          <CancelRoundedIcon color='primary' />
        </IconButton>
      ),
    },
  ]

  const rows = load.map((e) => {
    return {
      teacher: e.teacher,
      subject: e.subject,
      className: e.className,
      lessons: e.lessons,
      id: e.id,
      delete: (
        <IconButton
          onClick={() => {
            handleDelete(e.id)
          }}>
          <CancelRoundedIcon color='primary' />
        </IconButton>
      ),
    }
  })

  if (classes.length > 0 && subjects.length > 0 && teachers.length > 0) {
    return (
      <>
        <form
          className={styles.textInput}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          autoComplete='off'>
          <LoadAutocomplete
            label={'Teacher'}
            options={teachers}
            handleNewLoad={handleNewLoad}
          />
          <LoadAutocomplete
            label={'Subject'}
            options={subjects}
            handleNewLoad={handleNewLoad}
          />
          <LoadMultipleAutocomplete
            label={'Classes'}
            options={classes}
            handleNewLoad={handleNewLoad}
          />
          <LoadAutocomplete
            label={'Lessons'}
            options={numbers}
            handleNewLoad={handleNewLoad}
          />

          <IconButton type='submit'>
            <AddCircleRoundedIcon color='primary' fontSize='default' />
          </IconButton>
        </form>

        <div style={{ height: '80vh', width: 780 }}>
          <DataGrid
            onSelectionChange={(newSelection) => {
              setSelection(newSelection.rowIds)
            }}
            checkboxSelection
            columns={columns}
            rows={rows}
          />
        </div>
      </>
    )
  } else {
    return <div>Add some classes, subjects and teachers</div>
  }
}

export default Load

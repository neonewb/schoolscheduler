import React, { useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'
import LoadAutocomplete from './LoadAutocomplete'
import {
  deleteLoadAC,
  setLoadAC,
} from '../../../../redux/database/firestore.actions'
import { getNumbersArray } from '../../../../utils/funcs'
import LoadMultipleAutocomplete from './LoadMultipleAutocomplete'
import MUIDataTable from 'mui-datatables'

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

  const numbers = getNumbersArray(10)

  const columns = [
    {
      name: 'teacher',
      label: 'Teacher',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subject',
      label: 'Subject',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'className',
      label: 'Class',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'lessons',
      label: 'Lessons/week',
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const data = load.map((e) => {
    return {
      teacher: e.teacher,
      subject: e.subject,
      className: e.className,
      lessons: e.lessons,
      id: e.id,
    }
  })

  const handleDeleteLoad = (rowsDeleted) => {
    const idsToDelete = rowsDeleted.data.map((d) => data[d.dataIndex].id)
    console.log(idsToDelete)
    dispatch(deleteLoadAC(idsToDelete))
  }

  const options = {
    caseSensitive: true,
    download: false,
    filterType: 'checkbox',
    jumpToPage: true,
    print: false,
    onRowsDelete: handleDeleteLoad,
  }

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

        <MUIDataTable columns={columns} data={data} options={options} />
      </>
    )
  } else {
    return <div>Add some classes, subjects and teachers</div>
  }
}

export default Load

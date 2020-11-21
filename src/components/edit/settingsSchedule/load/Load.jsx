import React, { useState } from 'react'
import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'
import LoadAutocomplete from './LoadAutocomplete'
import { deleteLoadAC, setLoadAC } from '../../../../redux/database/firestore.actions'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { getNumbersArray } from '../../../../utils/funcs'
import LoadMultipleAutocomplete from './LoadMultipleAutocomplete'

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

        <TableContainer className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teacher</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Lessons/week</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {load.map((e) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell>{e.teacher}</TableCell>
                    <TableCell>{e.subject}</TableCell>
                    <TableCell>{e.className}</TableCell>
                    <TableCell>{e.lessons}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleDelete(e.id)
                        }}>
                        <CancelRoundedIcon color='primary'  />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  } else {
    return <div>Add some classes, subjects and teachers</div>
  }
}

export default Load

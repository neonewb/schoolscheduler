import React, { useEffect, useState } from 'react'
import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useDispatch } from 'react-redux'

import LoadAutocomplete from './LoadAutocomplete'
import { setLoadAC } from '../../../../redux/database/firestore.actions'

const useStyles = makeStyles((theme) => ({
  textInput: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
    console.log(newLoad)
    dispatch(setLoadAC(newLoad))
  }

  const handleDelete = (e) => {
    // dispatch(deleteSubjectAC(e))
  }

  useEffect(() => {
    console.log(newLoad)
    // for (const [key, value] of Object.entries(newLoad)) {
    //   console.log(`${key}: ${value}`)
    // }
  }, [newLoad])

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
          <LoadAutocomplete
            label={'Classes'}
            options={classes}
            handleNewLoad={handleNewLoad}
          />
          <LoadAutocomplete
            label={'Lessons/week'}
            options={'numbers'}
            handleNewLoad={handleNewLoad}
          />

          <IconButton type='submit'>
            <AddCircleRoundedIcon color='primary' fontSize='default' />
          </IconButton>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Teacher</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Classes</TableCell>
                <TableCell>Lessons/week</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {load.map((e) => {
                return (
                  <TableRow key={Math.random() * 1000}>
                    <TableCell>{e.teacher}</TableCell>
                    <TableCell>{e.subject}</TableCell>
                    <TableCell>{e.classes}</TableCell>
                    <TableCell>{e['lessons/week']}</TableCell>
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

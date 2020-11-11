import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded'
import {
  checkClassToFsdbAC,
  clearCheckedAC,
  setCheckedAC,
  updateFieldAC,
  clearClassesAC,
  setClassAC,
} from '../../../redux/database/firestore.actions'

const ClassesTableHead = ({ numberOfColumns, schedID, checked, classes }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  let columns = []

  const dispatch = useDispatch()

  const handleAllCheck = () => {
    dispatch(setCheckedAC(schedID, 'All classes'))
    if (!checked.includes('All classes')) {
      for (let i = 0; i < numberOfColumns; i++) {
        if (!checked.includes(`All ${alphabet[i]}`)) {
          dispatch(setCheckedAC(schedID, `All ${alphabet[i]}`))
        }
      }
      for (let i = 1; i < 12; i++) {
        if (!checked.includes(`All ${i}`)) {
          dispatch(setCheckedAC(schedID, `All ${i}`))
        }
      }
      for (let i = 1; i < 12; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
          if (!classes.includes(`${i} ${alphabet[j]}`)) {
            dispatch(setClassAC(schedID, `${i} ${alphabet[j]}`))
          }
        }
      }
    } else {
      dispatch(clearCheckedAC(schedID))
      dispatch(clearClassesAC(schedID))
    }
    dispatch(checkClassToFsdbAC(schedID))
  }

  const handleCheck = (letter) => {
    if (checked.includes('All classes')) {
      dispatch(setCheckedAC(schedID, 'All classes'))
    }
    if (!checked.includes(`All ${letter}`)) {
      for (let i = 1; i < 12; i++) {
        if (!classes.includes(`${i} ${letter}`)) {
          dispatch(setClassAC(schedID, `${i} ${letter}`))
        }
      }
    } else {
      for (let i = 1; i < 12; i++) {
        if (classes.includes(`${i} ${letter}`)) {
          dispatch(setClassAC(schedID, `${i} ${letter}`))
        }
      }
    }
    dispatch(setCheckedAC(schedID, `All ${letter}`))
    dispatch(checkClassToFsdbAC(schedID))
  }

  for (let i = 0; i < numberOfColumns; i++) {
    const name = `All ${alphabet[i]}`
    columns.push(
      <TableCell key={i + 100 * Math.random()}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={
                checked.includes(name) || checked.includes('All classes')
              }
              onChange={() => handleCheck(alphabet[i])}
              color='primary'
            />
          }
          label={alphabet[i]}
        />
      </TableCell>
    )
  }

  const handleAddColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns + 1))
    if (checked.includes('All classes')) {
      dispatch(setCheckedAC(schedID, `All ${alphabet[numberOfColumns]}`))
      for (let i = 1; i < 12; i++) {
        if (!classes.includes(`${i} ${alphabet[numberOfColumns]}`)) {
          dispatch(setClassAC(schedID, `${i} ${alphabet[numberOfColumns]}`))
        }
      }

      dispatch(checkClassToFsdbAC(schedID))
    }
  }

  const handleSubtractColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns - 1))
    if (checked.includes(`All ${alphabet[numberOfColumns - 1]}`)) {
      dispatch(setCheckedAC(schedID, `All ${alphabet[numberOfColumns - 1]}`))
      dispatch(checkClassToFsdbAC(schedID))
    }
  }

  if (numberOfColumns < 10) {
    columns.push(
      <TableCell key={100 + Math.random()}>
        <IconButton onClick={handleAddColumn}>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </TableCell>
    )
  }

  if (numberOfColumns > 2 && numberOfColumns < 11) {
    columns.push(
      <TableCell key={100 + Math.random()}>
        <IconButton onClick={handleSubtractColumn}>
          <RemoveCircleRoundedIcon color='secondary' fontSize='default' />
        </IconButton>
      </TableCell>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <FormControlLabel
            control={
              <Checkbox
                name={'All classes'}
                checked={checked.includes('All classes')}
                onChange={handleAllCheck}
                color='primary'
              />
            }
            label='All'
          />
        </TableCell>

        {columns}
      </TableRow>
    </TableHead>
  )
}

export default ClassesTableHead

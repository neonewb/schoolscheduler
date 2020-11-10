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
  checkedToSagaAC,
  clearCheckedAC,
  setCheckedAC,
  updateFieldAC,
} from '../../../redux/database/firestore.actions'

const ClassesTableHead = ({ numberOfColumns, schedID, checked }) => {
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
    } else {
      dispatch(clearCheckedAC(schedID))
    }
    dispatch(checkedToSagaAC(schedID))
  }

  const handleCheck = (name) => {
    if (checked.includes('All classes')) {
      dispatch(setCheckedAC(schedID, 'All classes'))
    }
    dispatch(setCheckedAC(schedID, name))
    dispatch(checkedToSagaAC(schedID))
  }

  for (let i = 0; i < numberOfColumns; i++) {
    console.log('loop')
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
              onChange={() => handleCheck(name)}
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
      dispatch(checkedToSagaAC(schedID))
    }
  }

  const handleSubtractColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns - 1))
    if (checked.includes(`All ${alphabet[numberOfColumns - 1]}`)) {
      dispatch(setCheckedAC(schedID, `All ${alphabet[numberOfColumns - 1]}`))
      dispatch(checkedToSagaAC(schedID))
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

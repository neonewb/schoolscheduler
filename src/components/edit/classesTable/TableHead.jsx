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
  setCheckedAC,
  updateFieldAC,
  setClassAC,
  allCheckAC,
} from '../../../redux/database/firestore.actions'
import { alphabet } from '../../../utils/alphabet'

const ClassesTableHead = ({ numberOfColumns, schedID, checked, classes }) => {
  let columns = []

  const dispatch = useDispatch()

  const handleAllCheck = () => {
    dispatch(allCheckAC())
  }

  const handleCheck = (letter) => {
    if (checked.includes('All')) {
      dispatch(setCheckedAC(schedID, 'All'))
    }
    if (!checked.includes(letter)) {
      for (let i = 1; i < 12; i++) {
        if (!classes.includes(`${i} ${letter}`)) {
          dispatch(setClassAC(schedID, `${i} ${letter}`))
        }
      }
    } else {
      for (let i = 1; i < 12; i++) {
        if (!checked.includes(i + '')) {
          dispatch(setClassAC(schedID, `${i} ${letter}`))
        }
      }
    }

    dispatch(setCheckedAC(schedID, letter))
    dispatch(checkClassToFsdbAC(schedID))
  }

  for (let i = 0; i < numberOfColumns; i++) {
    const name = alphabet[i]
    columns.push(
      <TableCell key={i + 100 * Math.random()}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={checked.includes(name) || checked.includes('All')}
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
    if (checked.includes('All')) {
      dispatch(setCheckedAC(schedID, alphabet[numberOfColumns]))
      for (let i = 1; i < 12; i++) {
        dispatch(setClassAC(schedID, `${i} ${alphabet[numberOfColumns]}`))
      }
    } else {
      for (let i = 1; i < 12; i++) {
        if (checked.includes(i)) {
          dispatch(setClassAC(schedID, `${i} ${alphabet[numberOfColumns]}`))
        }
      }
    }
    dispatch(checkClassToFsdbAC(schedID))
  }

  const handleSubtractColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns - 1))
    if (checked.includes(alphabet[numberOfColumns - 1])) {
      dispatch(setCheckedAC(schedID, alphabet[numberOfColumns - 1]))
    }
    for (let i = 1; i < 12; i++) {
      if (classes.includes(`${i} ${alphabet[numberOfColumns - 1]}`)) {
        dispatch(setClassAC(schedID, `${i} ${alphabet[numberOfColumns - 1]}`))
      }
    }
    dispatch(checkClassToFsdbAC(schedID))
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
                name={'All'}
                checked={checked.includes('All')}
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

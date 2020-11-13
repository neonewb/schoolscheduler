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
  allCheckAC,
  setCheckAC,
  addColumnAC,
  subtractColumnAC,
} from '../../../redux/database/firestore.actions'
import { alphabet } from '../../../utils/alphabet'

const ClassesTableHead = ({ numberOfColumns, checked }) => {
  let columns = []

  const dispatch = useDispatch()

  const handleAllCheck = () => {
    dispatch(allCheckAC())
  }

  const handleCheck = (letter) => {
    dispatch(setCheckAC(letter))
  }

  for (let i = 0; i < numberOfColumns; i++) {
    const name = alphabet[i]
    columns.push(
      <TableCell key={i + 100 * Math.random()}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={checked.includes(name)}
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
    dispatch(addColumnAC())
  }

  const handleSubtractColumn = () => {
    dispatch(subtractColumnAC())
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

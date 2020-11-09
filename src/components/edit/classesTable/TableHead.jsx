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
import { updateFieldAC } from '../../../redux/database/firestore.actions'
import { Controller, useForm } from 'react-hook-form'

const ClassesTableHead = ({ numberOfColumns, schedID }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const { register, watch, control } = useForm()

  console.log(watch())

  let columns = []

  for (let index = 0; index < numberOfColumns; index++) {
    columns.push(
      <TableCell key={index + 1 * Math.random()}>
        <FormControlLabel
          control={
            <Controller
              name={`All ${alphabet[index]}`}
              control={control}
              defaultValue={false}
              color='primary'
              render={(props) => (
                <Checkbox
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                />
              )}
            />
          }
          label={alphabet[index]}
        />
      </TableCell>
    )
  }

  const dispatch = useDispatch()

  const handleAddColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns + 1))
  }

  const handleSubtractColumn = () => {
    dispatch(updateFieldAC(schedID, 'numberOfColumns', numberOfColumns - 1))
  }

  if (numberOfColumns < 10) {
    columns.push(
      <TableCell>
        <IconButton onClick={handleAddColumn}>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </TableCell>
    )
  }

  if (numberOfColumns < 11 && numberOfColumns > 2) {
    columns.push(
      <TableCell>
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
                inputRef={register}
                name={'All classes'}
                defaultValue={false}
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

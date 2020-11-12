import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setCheckedAC,
  setClassAC,
  checkClassToFsdbAC,
} from '../../../redux/database/firestore.actions'
import { alphabet } from '../../../utils/alphabet'

const ClassesTableBody = ({ numberOfColumns, checked, schedID, classes }) => {
  const dispatch = useDispatch()

  const handleCheck = (num) => {
    if (checked.includes('All')) {
      dispatch(setCheckedAC(schedID, 'All'))
    }
    if (!checked.includes(num)) {
      for (let i = 0; i < numberOfColumns; i++) {
        if (!classes.includes(`${num} ${alphabet[i]}`)) {
          dispatch(setClassAC(schedID, `${num} ${alphabet[i]}`))
        }
      }
    } else {
      for (let i = 0; i < numberOfColumns; i++) {
        if (!checked.includes(alphabet[i])) {
          dispatch(setClassAC(schedID, `${num} ${alphabet[i]}`))
        }
      }
    }
    dispatch(setCheckedAC(schedID, num))
    dispatch(checkClassToFsdbAC(schedID))
  }

  const handleClassCheck = ({ num, letter }) => {
    if (checked.includes('All')) {
      dispatch(setCheckedAC(schedID, 'All'))
    }
    if (checked.includes(num)) {
      dispatch(setCheckedAC(schedID, num))
    }
    if (checked.includes(letter)) {
      dispatch(setCheckedAC(schedID, letter))
    }
    dispatch(setClassAC(schedID, `${num} ${letter}`))
    dispatch(checkClassToFsdbAC(schedID))
  }

  let rows = []

  for (let i = 0; i < 11; i++) {
    let row = []

    let parralelName = i + 1 + ''
    row.push(
      <TableCell key={i + 100 * Math.random()}>
        <FormControlLabel
          control={
            <Checkbox
              name={parralelName}
              checked={
                checked.includes(parralelName) ||
                checked.includes('All')
              }
              onChange={() => handleCheck(i + 1 + '')}
              color='primary'
            />
          }
          label={i + 1}
        />
      </TableCell>
    )

    for (let j = 0; j < numberOfColumns; j++) {
      let className = `${i + 1} ${alphabet[j]}`
      row.push(
        <TableCell key={j + 100 * Math.random()}>
          <FormControlLabel
            control={
              <Checkbox
                name={className}
                checked={
                  classes.includes(className) ||
                  checked.includes(alphabet[j]) ||
                  checked.includes(i + 1 + '')
                }
                onChange={() =>
                  handleClassCheck({ num: i + 1 + '', letter: alphabet[j] })
                }
                color='primary'
              />
            }
            label={className}
          />
        </TableCell>
      )
    }
    rows.push(row)
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={100 * Math.random()}>{row}</TableRow>
      ))}
    </TableBody>
  )
}

export default ClassesTableBody

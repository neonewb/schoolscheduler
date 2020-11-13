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
  setCheckAC,
  setClassAC
} from '../../../redux/database/firestore.actions'
import { alphabet } from '../../../utils/alphabet'
const ClassesTableBody = ({ numberOfColumns, checked, classes }) => {
  const dispatch = useDispatch()

  const handleCheck = (num) => {
    dispatch(setCheckAC(num))
  }

  const handleClassCheck = ({ num, char }) => {
    dispatch(setClassAC(num, char))
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
              checked={checked.includes(parralelName)}
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
                checked={classes.includes(className)}
                onChange={() =>
                  handleClassCheck({ num: i + 1 + '', char: alphabet[j] })
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

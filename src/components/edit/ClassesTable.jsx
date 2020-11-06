import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'

const ClassesTable = () => {
  const createClassesRows = (grade) => {
    let rowsAr = []
    for (let index = 1; index <= grade; index++) {
      rowsAr.push({
        grade: (
          <FormControlLabel
            control={<Checkbox name={`${grade} class`} color='primary' />}
            label={index}
          />
        ),
        checkbox: (
          <FormControlLabel
            control={<Checkbox name={`${grade} class`} color='primary' />}
            label={`${index} A`}
          />
        ),
        key: grade + Math.random(),
      })
    }
    return rowsAr
  }

  const rows = createClassesRows(12)

  return (
    <TableContainer>
      <Table size='small' aria-label='Classes table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={<Checkbox name={'All Grade'} color='primary' />}
                label='Grade'
              />
            </TableCell>
            <TableCell>
              <FormControlLabel
                control={<Checkbox name={'A'} color='primary' />}
                label='A'
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component='th' scope='row'>
                {row.grade}
              </TableCell>
              <TableCell component='th' scope='row'>
                {row.checkbox}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ClassesTable

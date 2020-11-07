import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel, IconButton } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

const ClassesTable = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const createClasses = (grade) => {
    let rowsArr = []
    for (let index = 1; index <= grade; index++) {
      rowsArr.push({
        keys: grade * Math.random(),
        grade: (
          <FormControlLabel
            control={<Checkbox name={`${grade} class`} color='primary' />}
            label={index}
          />
        ),
      })
    }
    return rowsArr
  }

  const addClassLetter = (rows) => {
    let nextLetterIndex
    if (rows[0].letterIndex === undefined) {
      nextLetterIndex = 0
    } else if (rows[0].letterIndex === 9) {
      return rows
    } else {
      nextLetterIndex = rows[0].letterIndex + 1
    }

    let classLetter = 'classLetter' + alphabet[nextLetterIndex]

    let rowsWithAddedClassLetter = rows.map((element, index) => {
      return {
        ...element,
        letterIndex: nextLetterIndex,
        [classLetter]: (
          <FormControlLabel
            control={
              <Checkbox name={`${element.grade} class`} color='primary' />
            }
            label={`${index + 1} ${alphabet[nextLetterIndex]}`}
          />
        ),
      }
    })
    return rowsWithAddedClassLetter
  }

  let rows = createClasses(12)
  rows = addClassLetter(rows)
  rows = addClassLetter(rows)
  const [rowState, setRows] = useState(rows)

  let rowsMaped = rowState.map((row) => {
    let tableCells = []
    for (const key in row) {
      if (key !== 'keys' && key !== 'letterIndex') {
        tableCells.push(
          <TableCell key={row.keys + Math.random()} component='th' scope='row'>
            {row[key]}
          </TableCell>
        )
      }
    }
    return <TableRow key={row.keys}>{tableCells}</TableRow>
  })

  const [lettersNumber, setLettersNumber] = useState(2)
  const [newLetters, setNewLetters] = useState([])
  const [lettersLimit, setLettersLimit] = useState(false)

  const handleAddClassLetter = () => {
    setLettersNumber(lettersNumber + 1)
    addLetterToHead()
    setRows(addClassLetter(rowState))
    if (lettersNumber > 9) setLettersLimit(true)
  }


  const createTableHead = () => {
    let tableHead = (
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
        <TableCell>
          <FormControlLabel
            control={<Checkbox name={'B'} color='primary' />}
            label='B'
          />
        </TableCell>

        {newLetters ? newLetters : null}

        {!lettersLimit && (
              <TableCell>
                <IconButton onClick={handleAddClassLetter}>
                  <AddCircleRoundedIcon color='primary' fontSize='default' />
                </IconButton>
              </TableCell>
            )
          }
      </TableRow>
    )
    return tableHead
  }

  let tableHead = createTableHead()

  const addLetterToHead = () => {
    if (lettersNumber > 9) {
      return
    } else {
      setNewLetters([
        ...newLetters,
        <TableCell key={lettersNumber * Math.random()}>
          <FormControlLabel
            control={
              <Checkbox name={alphabet[lettersNumber]} color='primary' />
            }
            label={alphabet[lettersNumber]}
          />
        </TableCell>,
      ])
    }
  }

  return (
    <TableContainer>
      <Table size='small' aria-label='Classes table'>
        <TableHead>{tableHead}</TableHead>
        <TableBody>{rowsMaped}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default ClassesTable

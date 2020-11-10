import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@material-ui/core'
import React from 'react'

const ClassesTableBody = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // const createClasses = (grade) => {
  //   let rowsArr = []
  //   for (let index = 1; index <= grade; index++) {
  //     rowsArr.push({
  //       keys: grade * Math.random(),
  //       grade: (
  //         <FormControlLabel
  //           control={<Checkbox name={`${grade} class`} color='primary' />}
  //           label={index}
  //         />
  //       ),
  //     })
  //   }
  //   return rowsArr
  // }

  // const addClassLetter = (rows) => {
  //   let nextLetterIndex
  //   if (rows[0].letterIndex === undefined) {
  //     nextLetterIndex = 0
  //   } else if (rows[0].letterIndex === 9) {
  //     return rows
  //   } else {
  //     nextLetterIndex = rows[0].letterIndex + 1
  //   }

  //   let classLetter = 'classLetter' + alphabet[nextLetterIndex]

  //   let rowsWithAddedClassLetter = rows.map((element, index) => {
  //     return {
  //       ...element,
  //       letterIndex: nextLetterIndex,
  //       [classLetter]: (
  //         <FormControlLabel
  //           control={
  //             <Checkbox name={`${element.grade} class`} color='primary' />
  //           }
  //           label={`${index + 1} ${alphabet[nextLetterIndex]}`}
  //         />
  //       ),
  //     }
  //   })
  //   return rowsWithAddedClassLetter
  // }

  // let rows = createClasses(12)
  // rows = addClassLetter(rows)
  // rows = addClassLetter(rows)
  // const [rowState, setRows] = useState(rows)

  // let rowsMaped = rowState.map((row) => {
  //   let tableCells = []
  //   for (const key in row) {
  //     if (key !== 'keys' && key !== 'letterIndex') {
  //       tableCells.push(
  //         <TableCell key={row.keys + Math.random()} component='th' scope='row'>
  //           {row[key]}
  //         </TableCell>
  //       )
  //     }
  //   }
  //   return <TableRow key={row.keys}>{tableCells}</TableRow>
  // })

  return (
    <TableBody>
      <TableRow>
        <TableCell>a</TableCell>
        <TableCell>a</TableCell>
        <TableCell>a</TableCell>
        <TableCell>a</TableCell>
      </TableRow>
    </TableBody>
  )
}

export default ClassesTableBody

import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { nanoid } from 'nanoid'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  ScheduleT,
  setCheckAC,
  setClassAC,
} from '../../../../redux/schedules/sched.actions'
import { alphabet } from '../../../../utils/alphabet'

type ClassesTableBodyProps = {
  numberOfColumns: ScheduleT['numberOfColumns']
  checked: ScheduleT['checked']
  classes: ScheduleT['classes']
}

const ClassesTableBody: FC<ClassesTableBodyProps> = ({
  numberOfColumns,
  checked,
  classes,
}) => {
  const dispatch = useDispatch()

  const handleCheck = (num: string) => {
    dispatch(setCheckAC(num))
  }

  const handleClassCheck = ({ num, char }: {num:string, char: string}) => {
    dispatch(setClassAC(num, char))
  }

  let rows = []

  for (let i = 0; i < 11; i++) {
    let row = []
    const key = nanoid()

    const parralelName = i + 1 + ''
    row.push(
      <TableCell key={key}>
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
        <TableCell key={key + className}>
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
      {rows.map((row) => {
        const key = nanoid()
        return <TableRow key={key}>{row}</TableRow>
      })}
    </TableBody>
  )
}

export default ClassesTableBody

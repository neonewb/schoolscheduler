import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TableCell,
  TableRow,
  TableHead,
  makeStyles,
} from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded'
import {
  allCheckAC,
  setCheckAC,
  addColumnAC,
  subtractColumnAC,
} from '../../../../redux/database/firestore.actions'
import { alphabet } from '../../../../utils/alphabet'
import { deepPurple } from '@material-ui/core/colors'

const useStyles = makeStyles({
  rippleColor: {
    '& .MuiTouchRipple-child': {
      backgroundColor: deepPurple[400],
    },
  },
})

const ClassesTableHead = ({ numberOfColumns, checked }) => {
  const styles = useStyles()
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
      <TableCell key={name + i + 123 * 100}>
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
      <TableCell key={'AddColumn'}>
        <IconButton onClick={handleAddColumn}>
          <AddCircleRoundedIcon color='primary' fontSize='default' />
        </IconButton>
      </TableCell>
    )
  }

  if (numberOfColumns > 2 && numberOfColumns < 11) {
    columns.push(
      <TableCell key={'SubtractColumn'}>
        <IconButton className={styles.rippleColor} onClick={handleSubtractColumn}>
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

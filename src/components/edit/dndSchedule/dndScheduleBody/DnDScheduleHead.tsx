import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { nanoid } from 'nanoid'
import React, { FC } from 'react'
import { daysOfTheWeek } from '../../../../utils/daysOfTheWeek'
import { getNumbersArray } from '../../../../utils/funcs'

const useStyles = makeStyles({
  rowDivs: {
    display: 'flex',
    '&:hover $classesNames': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
  tableHeader: {
    height: 82,
    paddingTop: 8,
  },
  tableHeadCell: {
    height: 50,
    width: 50,
    maxWidth: 50,
    minWidth: 50,
    margin: '0px 1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: teal[50],
      border: '1px solid ' + teal[100],
      borderRadius: 2,
    },
  },
  headWrapper: {
    top: 0,
    position: 'sticky',
    zIndex: 1,
    display: 'flex',
    // padding: 8,
    width: '100%',
    maxWidth: '100%',
  },
})

type DnDScheduleHeadProps = {
  numberOfDays: number
  maxLessonsPerDay: number
}

const DnDScheduleHead: FC<DnDScheduleHeadProps> = ({
  numberOfDays,
  maxLessonsPerDay,
}) => {
  const styles = useStyles()

  let header = []

  for (let i = 0; i < numberOfDays; i++) {
    let headSchedule = getNumbersArray(maxLessonsPerDay)
    headSchedule.unshift('Class')
    const key = nanoid()

    header.push(
      <Paper key={key} elevation={2} className={styles.tableHeader}>
        <Typography align='center'>{daysOfTheWeek[i]}</Typography>
        <div className={styles.rowDivs}>
          {headSchedule.map((number) => {
            const key2 = nanoid()
            return (
              <Box className={styles.tableHeadCell} key={key2}>
                <Typography>{number}</Typography>
              </Box>
            )
          })}
        </div>
      </Paper>
    )
  }
  return <div className={styles.headWrapper}>{header}</div>
}

export default DnDScheduleHead

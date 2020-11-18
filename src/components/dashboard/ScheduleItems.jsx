import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { chooseSingleAC } from '../../redux/database/firestore.actions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: teal[50],
    },
  },
  fixedHeightWidth: {
    height: 240,
    width: 240,
  },
  zeroPadding: {
    padding: 0,
  },
  activeSchedule: {
    background: teal[50],
    '&:hover': {
      background: teal[100],
    },
  },
}))

const ScheduleItems = ({ schedules, chooseScheduleAC }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const history = useHistory()
  const handleOnDubbleClick = (id) => {
    history.push(`/edit/${id}`)
    dispatch(chooseSingleAC(id))

}
  let items

  if (schedules.length > 0) {
    items = schedules.map((item) => {
      let itemClass
      if (!item.isChoosen) {
        itemClass = clsx(classes.paper, classes.fixedHeightWidth)
      } else {
        itemClass = clsx(
          classes.paper,
          classes.fixedHeightWidth,
          classes.activeSchedule
        )
      }
      return (
        <Grid item key={item.id}>
          <Button
            className={classes.zeroPadding}
            onClick={() => {
              chooseScheduleAC(item.id)
            }}
            onDoubleClick={() => {
              handleOnDubbleClick(item.id)
            }}>
            <Paper className={itemClass}>
              <Typography align='center' component='p' variant='h4'>
                {item.title || 'New schedule'}
              </Typography>
            </Paper>
          </Button>
        </Grid>
      )
    })
  }
  return <>{items}</>
}

export default ScheduleItems

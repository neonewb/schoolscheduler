import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { teal } from '@material-ui/core/colors'
import clsx from 'clsx'

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
}))

const ScheduleItems = ({
  schedules,
  handleClickDel
}) => {
  const classes = useStyles()

  const fixedHeightWidthPaper = clsx(classes.paper, classes.fixedHeightWidth)

  let items

  if (schedules.length > 0) {
    items = schedules.map((item, index) => {
      return (
        <Grid item key={item.id}>
          <Paper className={fixedHeightWidthPaper}>
            <Typography align='center' component='p' variant='h4'>
              {index}
            </Typography>
            <IconButton
              onClick={() => {
                handleClickDel(index, item.id)
              }}>
              <DeleteRoundedIcon color='primary' />
            </IconButton>
          </Paper>
        </Grid>
      )
    })
  }
  return <>{items}</>
}

export default ScheduleItems

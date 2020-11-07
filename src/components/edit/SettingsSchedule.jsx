import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import ClassesTable from './ClassesTable'

const useStyles = makeStyles({
  root: {
    width: '100wv',
    margin: 16,
  },
  divider: {
    marginBottom: 16,
  },
  slider: {
    width: 300,
  },
})

const SettingsSchedule = ({ isOpen }) => {
  const classes = useStyles()
  const marksDays = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 7,
      label: '7',
    },
  ]

  const marksLessons = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
  ]

  if (isOpen) {
    return (
      <div className={classes.root}>
        <Typography variant='h6' id='days-slider' gutterBottom>
          Number of days
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={6}
          // getAriaValueText={valuetext}
          aria-labelledby='days-slider'
          valueLabelDisplay='auto'
          step={1}
          marks={marksDays}
          min={1}
          max={7}
        />

        <Divider className={classes.divider} />

        <Typography variant='h6' id='lessons-slider' gutterBottom>
          Maximum lessons per day
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={10}
          // getAriaValueText={valuetext}
          aria-labelledby='lessons-slider'
          valueLabelDisplay='auto'
          step={1}
          marks={marksLessons}
          min={1}
          max={20}
        />

        <Divider className={classes.divider} />

        <Typography variant='h6' id='classes' gutterBottom>
          Classes
        </Typography>
        <ClassesTable />

        <Divider className={classes.divider} />

        <Typography variant='h6' id='teachers' gutterBottom>
          Teachers
        </Typography>

        <Divider className={classes.divider} />

        <Typography variant='h6' id='subjects' gutterBottom>
          Subjects
        </Typography>

        <Divider className={classes.divider} />

        <Typography variant='h6' id='load' gutterBottom>
          Load
        </Typography>
      </div>
    )
  }
  return <></>
}

export default SettingsSchedule

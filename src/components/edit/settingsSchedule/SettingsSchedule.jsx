import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider } from '@material-ui/core'
import ClassesTable from './classesTable/ClassesTable'
import CustomClassesNames from './CustomClassesNames'
import { teal } from '@material-ui/core/colors'
import { useDispatch } from 'react-redux'
import {
  clearCheckClassAC,
  openCustomClassNamesAC,
  updateFieldAC,
} from '../../../redux/database/firestore.actions'
import Subjects from './Subjects'
import Teachers from './Teachers'

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
  button: {
    fontFamily: 'Comfortaa',
    textTransform: 'none',
    fontSize: '1.25rem',
    fontWeight: 500,
    color: teal[500],
  },
})

const SettingsSchedule = ({ isOpen, mySchedule }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChangeNumOfDays = (event, newValue) => {
    dispatch(updateFieldAC(mySchedule.id, 'numberOfDays', newValue))
  }

  const handleChangeMaxLessons = (event, newValue) => {
    dispatch(updateFieldAC(mySchedule.id, 'maxLessonsPerDay', newValue))
  }


  const handleOpenCustomClassNames = () => {
    dispatch(clearCheckClassAC(mySchedule.id))
    dispatch(openCustomClassNamesAC())
  }
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
          onChangeCommitted={handleChangeNumOfDays}
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
          onChangeCommitted={handleChangeMaxLessons}
          aria-labelledby='lessons-slider'
          valueLabelDisplay='auto'
          step={1}
          marks={marksLessons}
          min={1}
          max={20}
        />

        <Divider className={classes.divider} />
        {mySchedule.isOpenCustomClassNames ? (
          <>
            <Typography variant='h6' id='classes' gutterBottom>
              Set custom class names or{' '}
              <Button
                className={classes.button}
                onClick={handleOpenCustomClassNames}>
                choose classes
              </Button>
            </Typography>
            <CustomClassesNames classes={mySchedule.classes} />
          </>
        ) : (
          <>
            <Typography variant='h6' id='classes' gutterBottom>
              Choose classes or{' '}
              <Button
                className={classes.button}
                onClick={handleOpenCustomClassNames}>
                set custom names
              </Button>
            </Typography>
            <ClassesTable mySchedule={mySchedule} />
          </>
        )}

        <Divider className={classes.divider} />
        <Typography variant='h6' id='subjects' gutterBottom>
          Subjects
        </Typography>
        <Subjects subjects={mySchedule.subjects} />

        <Divider className={classes.divider} />

        <Typography variant='h6' id='teachers' gutterBottom>
          Teachers
        </Typography>
        <Teachers teachers={mySchedule.teachers} />

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

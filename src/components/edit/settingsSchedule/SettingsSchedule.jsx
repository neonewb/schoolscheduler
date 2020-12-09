import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider } from '@material-ui/core'
import ClassesTable from './classesTable/ClassesTable'
import CustomClassesNames from './CustomClassesNames'
import { deepPurple, teal } from '@material-ui/core/colors'
import { useDispatch } from 'react-redux'
import {
  clearCheckClassAC,
  manuallyCreateScheduleAC,
  openCustomClassNamesAC,
  updateFieldAC,
} from '../../../redux/database/firestore.actions'
import Subjects from './Subjects'
import Teachers from './Teachers'
import BookRoundedIcon from '@material-ui/icons/BookRounded'
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import TodayRoundedIcon from '@material-ui/icons/TodayRounded'
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded'
import Load from './load/Load'

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
  section: {
    display: 'flex',
  },
  finalButton: {
    fontFamily: 'Comfortaa',
    textTransform: 'none',
    fontSize: '1.25rem',
    margin: 12,
  },
  rippleColor: {
    '& .MuiTouchRipple-child': {
      backgroundColor: deepPurple[400],
    },
  },
})

const SettingsSchedule = ({ isOpen, mySchedule, setSettingsOpen }) => {
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

  const handleManuallyCreate = () => {
    setSettingsOpen(!isOpen)
    dispatch(manuallyCreateScheduleAC())
  }

  if (isOpen) {
    return (
      <div className={classes.root}>
        <div className={classes.section}>
          <DateRangeRoundedIcon
            className={classes.icon}
            fontSize='large'
            color='primary'
          />
          <Typography variant='h6' id='days-slider' gutterBottom>
            Number of days
          </Typography>
        </div>

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

        <div className={classes.section}>
          <TodayRoundedIcon
            className={classes.icon}
            fontSize='large'
            color='primary'
          />
          <Typography variant='h6' id='lessons-slider' gutterBottom>
            Maximum lessons per day
          </Typography>
        </div>
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
            <div className={classes.section}>
              <SupervisorAccountRoundedIcon
                className={classes.icon}
                fontSize='large'
                color='primary'
              />
              <Typography variant='h6' id='classes' gutterBottom>
                Set custom classes or{' '}
                <Button
                  className={classes.button}
                  onClick={handleOpenCustomClassNames}>
                  choose classes
                </Button>
              </Typography>
            </div>
            <CustomClassesNames classes={mySchedule.classes} />
          </>
        ) : (
          <>
            <div className={classes.section}>
              <SupervisorAccountRoundedIcon
                className={classes.icon}
                fontSize='large'
                color='primary'
              />
              <Typography variant='h6' id='classes' gutterBottom>
                Choose classes or{' '}
                <Button
                  className={classes.button}
                  onClick={handleOpenCustomClassNames}>
                  set custom names
                </Button>
              </Typography>
            </div>
            <ClassesTable mySchedule={mySchedule} />
          </>
        )}

        <Divider className={classes.divider} />
        <div className={classes.section}>
          <BookRoundedIcon
            className={classes.icon}
            fontSize='large'
            color='primary'
          />
          <Typography variant='h6' id='subjects' gutterBottom>
            Subjects
          </Typography>
        </div>
        <Subjects subjects={mySchedule.subjects} />

        <Divider className={classes.divider} />

        <div className={classes.section}>
          <SchoolRoundedIcon
            className={classes.icon}
            fontSize='large'
            color='primary'
          />
          <Typography variant='h6' id='teachers' gutterBottom>
            Teachers
          </Typography>
        </div>
        <Teachers teachers={mySchedule.teachers} />

        <Divider className={classes.divider} />

        <div className={classes.section}>
          <HourglassFullRoundedIcon
            className={classes.icon}
            fontSize='large'
            color='primary'
          />
          <Typography variant='h6' id='load' gutterBottom>
            Load
          </Typography>
        </div>

        <Load mySchedule={mySchedule} />

        <Button
          className={classes.finalButton}
          color='primary'
          variant='outlined'>
          Auto generate
        </Button>

        <Button
          className={`${classes.finalButton} + ${classes.rippleColor}`}
          onClick={handleManuallyCreate}
          color='secondary'
          variant='outlined'>
          Manually create
        </Button>
      </div>
    )
  }
  return <></>
}

export default SettingsSchedule

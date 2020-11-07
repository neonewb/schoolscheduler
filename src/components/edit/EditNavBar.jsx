import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { logOutAC } from '../../redux/auth/auth.actions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useStylesEdit } from '../../styles/stylesForEdit'
import {
  getDocsFromDBAC,
  setSchedTitleAC,
} from '../../redux/database/firestore.actions'
import { useForm } from 'react-hook-form'
import { Skeleton } from '@material-ui/lab'

const EditNavBar = ({ user, schedLength, schedID, isLoading, mySchedule }) => {
  const { register, handleSubmit, watch } = useForm()
  const scheduleTitleRef = useRef()

  const classes = useStylesEdit()

  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(setSchedTitleAC(data.title, schedID))
    scheduleTitleRef.current.blur()
  }

  const watchTitle = watch('title')

  useEffect(() => {
    if (mySchedule !== undefined) {
      if (mySchedule.title && watchTitle && mySchedule.title !== watchTitle) {
        dispatch(setSchedTitleAC(watchTitle, schedID))
      }
    }
  }, [dispatch, watchTitle, schedID, mySchedule])

  const handleDashboardClick = () => {
    history.push('/dashboard')
    if (schedLength < 2) dispatch(getDocsFromDBAC(user.email, user.uid))
  }

  const handleLogOut = () => {
    dispatch(logOutAC())
  }

  let myScheduleTitle

  if (isLoading || mySchedule === undefined) {
    myScheduleTitle = <Skeleton variant='rect' width={223} height={40} />
  } else {
    myScheduleTitle = (
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
        <TextField
          className={classes.titleInput}
          name='title'
          type='text'
          id='title'
          size='small'
          variant='outlined'
          inputRef={(e) => {
            register(e)
            scheduleTitleRef.current = e
          }}
          defaultValue={mySchedule.title}
        />
      </form>
    )
  }

  return (
    <Box className={classes.editBar}>
      <Box m={1}>
        <Tooltip title='Dashboard'>
          <IconButton
            aria-label='Dashboard'
            onClick={handleDashboardClick}
            color='inherit'>
            <DashboardRoundedIcon color='primary' fontSize='large' />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container justify='space-between' alignItems='center'>
        <Grid item>{myScheduleTitle}</Grid>
        <Grid item>
          <Typography>{user.displayName || user.email}</Typography>
        </Grid>
      </Grid>

      <Box m={1}>
        <Tooltip title='Log Out'>
          <IconButton
            aria-label='Dashboard'
            onClick={handleLogOut}
            color='inherit'>
            <ExitToAppRoundedIcon color='primary' fontSize='large' />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default EditNavBar

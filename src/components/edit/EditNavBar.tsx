import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import React, { FC, useEffect, useRef } from 'react'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { CurrentUserT, logOutAC } from '../../redux/auth/auth.actions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useStylesEdit } from '../../styles/stylesForEdit'
import {
  getDocsFromDBAC,
  updateFieldAC,
  cancelСhoiceAC,
  ScheduleT,
} from '../../redux/database/firestore.actions'
import { useForm } from 'react-hook-form'
import { Skeleton } from '@material-ui/lab'

type EditNavBarPropsT = {
  user: CurrentUserT
  schedLength: number
  schedID: string
  isLoading: boolean
  mySchedule: ScheduleT | undefined
}

type InputT = {
  title: string
}

const EditNavBar: FC<EditNavBarPropsT> = ({ user, schedLength, schedID, isLoading, mySchedule }) => {
  const { register, handleSubmit, watch } = useForm<InputT>()
  const scheduleTitleRef = useRef<HTMLInputElement | null>(null)

  const classes = useStylesEdit()

  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = (data: InputT) => {
    dispatch(updateFieldAC(schedID, 'title', data.title))
    if (null !== scheduleTitleRef.current) {
      scheduleTitleRef.current.blur()
    } 
  }

  const onFocus = () => {
    if (null !== scheduleTitleRef.current) {
    scheduleTitleRef.current.select()
    }
  }

  const watchTitle: string = watch('title')

  useEffect(() => {
    if (mySchedule !== undefined) {
      if (mySchedule.title && watchTitle && mySchedule.title !== watchTitle) {
        dispatch(updateFieldAC(schedID, 'title', watchTitle))
      }
    }
  }, [dispatch, watchTitle, schedID, mySchedule])

  const handleDashboardClick = () => {
    history.push('/dashboard')
    if (schedLength < 2) dispatch(getDocsFromDBAC(user.email!, user.uid!))
    dispatch(cancelСhoiceAC())
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
          onFocus={onFocus}
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

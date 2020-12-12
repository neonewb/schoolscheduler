import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { CurrentUserT, logOutAC } from '../../redux/auth/auth.actions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useStylesEdit } from '../../styles/stylesForEdit'
import {
  getDocsFromDBAC,
  cancelСhoiceAC,
  ScheduleT,
} from '../../redux/database/firestore.actions'
import { Skeleton } from '@material-ui/lab'
import { ScheduleTitle } from './ScheduleTitle'
import { clearTimeTableAC } from '../../redux/timetable/tt.actions'

type EditNavBarPropsT = {
  user: CurrentUserT
  schedLength: number
  schedID: string
  isLoading: boolean
  mySchedule: ScheduleT | undefined
}

const EditNavBar: FC<EditNavBarPropsT> = ({
  user,
  schedLength,
  schedID,
  isLoading,
  mySchedule,
}) => {
  const classes = useStylesEdit()

  const history = useHistory()
  const dispatch = useDispatch()

  const handleDashboardClick = () => {
    history.push('/dashboard')
    if (schedLength < 2) dispatch(getDocsFromDBAC(user.email!, user.uid!))
    dispatch(cancelСhoiceAC())
    dispatch(clearTimeTableAC())
  }

  const handleLogOut = () => {
    dispatch(logOutAC())
  }

  let myScheduleTitle

  if (isLoading || mySchedule === undefined) {
    myScheduleTitle = <Skeleton variant='rect' width={223} height={40} />
  } else {
    myScheduleTitle = (
      <ScheduleTitle propTitle={mySchedule.title} schedID={schedID} />
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

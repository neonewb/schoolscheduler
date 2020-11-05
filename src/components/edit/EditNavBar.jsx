import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import React from 'react'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { logOutAC } from '../../redux/auth/auth.actions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useStylesEdit } from '../../styles/stylesForEdit'
import { getDocsFromDBAC } from '../../redux/database/firestore.actions'

const EditNavBar = ({ scheduleTitle, user, schedLength }) => {
  const classes = useStylesEdit()

  const history = useHistory()
  const dispatch = useDispatch()

  const handleDashboardClick = () => {
    history.push('/dashboard')
    if (schedLength < 2) dispatch(getDocsFromDBAC(user.email, user.uid))
  }

  const handleLogOut = () => {
    dispatch(logOutAC())
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
        <Grid item>
          <form noValidate autoComplete='off'>
            <TextField
              // InputProps={{
              //     classes: {
              //       root: classes.titleInput,
              //     },
              //   }}
              name='title'
              type='text'
              id='title'
              size='small'
              variant='outlined'
              defaultValue={scheduleTitle}
            />
          </form>
        </Grid>
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

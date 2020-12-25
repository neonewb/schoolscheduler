import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAC, CurrentUserT } from '../../redux/auth/auth.actions'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import Tooltip from '@material-ui/core/Tooltip'
import { MainListItems, secondaryListItems } from './ListItems'
import PlusIcon from '../../utils/PlusIcon'
import theme from '../../styles/theme'
import { Button } from '@material-ui/core'
import {
  addDocToCollectionAC,
  getDocsFromDBAC,
  ScheduleT,
} from '../../redux/schedules/sched.actions'
import ScheduleItems from './ScheduleItems'
import DeleteConfirm from './DeleteConfirm'
import { useHistory } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'
import { useStylesDashboard } from '../../styles/stylesDashboard'
import { AppStateType } from '../../redux/rootReducer'
import { getUserS } from '../../redux/auth/auth.selectors'
import { getSchedulesS } from '../../redux/schedules/sched.selectors'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

const Dashboard: FC = () => {
  useDocumentTitle('Dashboard')

  const classes = useStylesDashboard()
  const fixedHeightWidthPaper = clsx(classes.paper, classes.fixedHeightWidth)

  const dispatch = useDispatch()

  const [isOpenMenu, setOpenMenu] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpenMenu(true)
  }
  const handleDrawerClose = () => {
    setOpenMenu(false)
  }

  const history = useHistory()

  const schedules = useSelector<AppStateType, Array<ScheduleT>>(getSchedulesS)
  const currentUser = useSelector<AppStateType, CurrentUserT>(getUserS)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user && schedules.length === 0) {
        dispatch(getDocsFromDBAC(user.email!, user.uid!))
      } else if (!user) {
        history.push('/login')
      }
    })

    return () => unsubscribeFromAuth()
  }, [history, schedules, dispatch])

  const handleAddClick = () => {
    dispatch(addDocToCollectionAC(currentUser.email!, currentUser.uid!))
  }

  const [isOpenDelDialog, setOpenDelDialog] = useState(false)

  const handleClickDel = () => {
    setOpenDelDialog(true)
  }

  const handleClose = () => {
    setOpenDelDialog(false)
  }

  const logOut = () => {
    dispatch(logOutAC())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position='absolute'
        className={clsx(classes.appBar, isOpenMenu && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Tooltip title='Menu'>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='Menu'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                isOpenMenu && classes.menuButtonHidden
              )}>
              <MenuIcon fontSize='large' />
            </IconButton>
          </Tooltip>

          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>

          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            {currentUser.displayName || currentUser.email}
          </Typography>

          <Tooltip title='Log Out'>
            <IconButton onClick={logOut} color='inherit' aria-label='Log Out'>
              <ExitToAppRoundedIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isOpenMenu && classes.drawerPaperClose
          ),
        }}
        open={isOpenMenu}>
        <div className={classes.toolbarIcon}>
          <Typography className={classes.menuMargin}>Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems handleClickDel={handleClickDel} />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container className={classes.container}>
          <Grid
            container
            direction='row'
            spacing={2}
            justify='flex-start'
            alignItems='flex-start'>
            <Grid item>
              <Button className={classes.zeroPadding} onClick={handleAddClick}>
                <Paper className={fixedHeightWidthPaper}>
                  <PlusIcon color={theme.palette.primary.main} />
                </Paper>
              </Button>
            </Grid>

            <ScheduleItems
              schedules={schedules}
            />
          </Grid>
        </Container>
      </main>
      <DeleteConfirm
        isOpen={isOpenDelDialog}
        handleClose={handleClose}
      />
    </div>
  )
}

export default Dashboard
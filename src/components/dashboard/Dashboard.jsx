import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { logOutAC } from '../../redux/auth/auth.actions'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
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
  deleteDocFromCollectionAC,
  getDoscFromDBAC,
  chooseScheduleAC,
} from '../../redux/database/firestore.actions'
import { teal } from '@material-ui/core/colors'
import ScheduleItems from './ScheduleItems'
import DeleteConfirm from './DeleteConfirm'
import { useHistory } from 'react-router-dom'
import { auth } from '../../configs/firebase.config'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    maxWidth: '100vw',
    margin: 0,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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
    width: drawerWidth,
  },
  zeroPadding: {
    padding: 0,
  },
  child: {
    backgroundColor: 'blue',
  },
}))

const Dashboard = ({
  currentUser,
  logOutAC,
  addDocToCollectionAC,
  schedules,
  deleteDocFromCollectionAC,
  getDoscFromDBAC,
  chooseScheduleAC,
}) => {
  const classes = useStyles()
  const fixedHeightWidthPaper = clsx(classes.paper, classes.fixedHeightWidth)

  const [isOpenMenu, setOpenMenu] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpenMenu(true)
  }
  const handleDrawerClose = () => {
    setOpenMenu(false)
  }

  const history = useHistory()

  const fsdb = useSelector(state => state.fsdb.schedules)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user && fsdb.length === 0) {
        getDoscFromDBAC(user.email, user.uid)
      } else if (!user) {
        history.push('/login')
      }
    })

    return () => unsubscribeFromAuth()
  }, [getDoscFromDBAC, history, fsdb])

  const handleAddClick = () => {
    addDocToCollectionAC(currentUser.email, currentUser.uid)
  }

  const [isOpenDelDialog, setOpenDelDialog] = useState(false)

  const handleClickDel = () => {
    setOpenDelDialog(true)
  }

  const handleClose = () => {
    setOpenDelDialog(false)
  }

  const logOut = () => {
    logOutAC()
    // history.push('/login')
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
              aria-label='open drawer'
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

          {currentUser && currentUser ? (
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}>
              {currentUser.displayName || currentUser.email}
            </Typography>
          ) : null}

          <Tooltip title='Log Out'>
            <IconButton onClick={logOut} color='inherit'>
              {currentUser && currentUser ? (
                <ExitToAppRoundedIcon fontSize='large' />
              ) : null}
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
          <Typography>Menu</Typography>
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
              chooseScheduleAC={chooseScheduleAC}
            />
          </Grid>
        </Container>
      </main>
      <DeleteConfirm
        deleteDocFromCollectionAC={deleteDocFromCollectionAC}
        currentUser={currentUser}
        isOpen={isOpenDelDialog}
        handleClose={handleClose}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  schedules: state.fsdb.schedules,
})

export default connect(mapStateToProps, {
  logOutAC,
  addDocToCollectionAC,
  deleteDocFromCollectionAC,
  getDoscFromDBAC,
  chooseScheduleAC,
})(Dashboard)

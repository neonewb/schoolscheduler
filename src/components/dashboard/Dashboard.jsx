import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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
import { mainListItems, secondaryListItems } from './ListItems'
import PlusIcon from '../../utils/PlusIcon'
import theme from '../../styles/theme'
import { Button } from '@material-ui/core'
import {
  addDocToCollectionAC,
  setDoscToRxStateAC,
  deleteDocFromCollectionAC,
} from '../../redux/database/firestore.actions'
import { db } from '../../configs/firebase.config'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  },
  fixedHeightWidth: {
    height: 240,
    width: drawerWidth,
  },
}))

const Dashboard = ({
  currentUser,
  logOutAC,
  addDocToCollectionAC,
  setDoscToRxStateAC,
  schedules,
  deleteDocFromCollectionAC,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightWidthPaper = clsx(classes.paper, classes.fixedHeightWidth)

  const onAddClick = () => {
    // const date = new Date()
    addDocToCollectionAC(currentUser.email)
  }

  const onDeleteClick = (docId) => {
    deleteDocFromCollectionAC(currentUser.email, docId)
  }

  useEffect(() => {
    if (currentUser.email) {
      db.collection(currentUser.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data())
            setDoscToRxStateAC({ id: doc.id, ...doc.data() })
          })
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
    }
  }, [currentUser, setDoscToRxStateAC])

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Tooltip title='Menu'>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
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
            <IconButton onClick={logOutAC} color='inherit'>
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
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container className={classes.container}>
          <Grid
            container
            direction='row'
            spacing={3}
            justify='flex-start'
            alignItems='flex-start'>
            <Grid item>
              <Paper className={fixedHeightWidthPaper}>
                <Button onClick={onAddClick}>
                  <PlusIcon color={theme.palette.primary.main} />
                </Button>
              </Paper>
            </Grid>
            {schedules.map((item, index) => {
              return (
                <Grid item key={index}>
                  <Paper className={fixedHeightWidthPaper}>
                    <Typography align='center' component='p' variant='h4'>
                      {index}
                    </Typography>
                    <IconButton onClick={ () => {onDeleteClick(item.id)}}>
                      <DeleteRoundedIcon color='primary' />
                    </IconButton>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </main>
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
  setDoscToRxStateAC,
  deleteDocFromCollectionAC,
})(Dashboard)

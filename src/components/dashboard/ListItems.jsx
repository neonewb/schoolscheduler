import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';import Tooltip from '@material-ui/core/Tooltip'

export const mainListItems = (
  <div>
      <Tooltip title='Add new schedule' placement='right'>
      <ListItem button>
        <ListItemIcon>
          <AddCircleOutlineRoundedIcon color="primary" fontSize="large"/>
        </ListItemIcon>
        <ListItemText primary='Add new schedule' />
      </ListItem>
    </Tooltip>

    <Tooltip title='Dashboard' placement='right'>
      <ListItem button>
        <ListItemIcon>
          <DashboardRoundedIcon color="primary" fontSize="large"/>
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
    </Tooltip>

  </div>
)

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Made by Ruslan</ListSubheader>
    <ListSubheader inset>With</ListSubheader>
    <ListSubheader inset>React</ListSubheader>
    <ListSubheader inset>Redux</ListSubheader>
    <ListSubheader inset>Firebase</ListSubheader>
  </div>
)

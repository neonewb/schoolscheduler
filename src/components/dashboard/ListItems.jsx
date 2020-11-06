import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import Tooltip from '@material-ui/core/Tooltip'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'

export const MainListItems = ({ handleClickDel }) => {
  return (
    <div>
      <Tooltip title='Delete schedule' placement='right'>
        <ListItem
          button
          onClick={() => {
            handleClickDel()
          }}>
          <ListItemIcon>
            <DeleteRoundedIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Delete schedule' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Settings' placement='right'>
        <ListItem button>
          <ListItemIcon>
            <SettingsRoundedIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Support' placement='right'>
        <ListItem
          button>
          <ListItemIcon>
            <HelpRoundedIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Support' />
        </ListItem>
      </Tooltip>
    </div>
  )
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Made by Ruslan</ListSubheader>
    <ListSubheader inset>With</ListSubheader>
    <ListSubheader inset>React</ListSubheader>
    <ListSubheader inset>Redux</ListSubheader>
    <ListSubheader inset>Firebase</ListSubheader>
  </div>
)

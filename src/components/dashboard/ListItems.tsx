import React, { FC } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded'
import Tooltip from '@material-ui/core/Tooltip'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import { Footer } from '../Footer'

type MainListItemsPropsT = {
  handleClickDel: () => void
}

export const MainListItems: FC<MainListItemsPropsT> = ({ handleClickDel }) => {
  return (
    <div>
      <Tooltip title='Copy schedule' placement='right'>
        <ListItem button>
          <ListItemIcon>
            <FileCopyRoundedIcon color='primary' fontSize='large' />
          </ListItemIcon>
          <ListItemText primary='Copy schedule' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Delete schedule' placement='right'>
        <ListItem button onClick={handleClickDel}>
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
        <ListItem button>
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
    <ListSubheader inset>Made by Ruslan:</ListSubheader>
    <ListSubheader inset><Footer /></ListSubheader>
    
  </div>
)

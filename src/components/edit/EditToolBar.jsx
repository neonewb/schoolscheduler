import {
  Button,
  Divider,
  Toolbar,
  Tooltip,
} from '@material-ui/core'
import React from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import PrintRoundedIcon from '@material-ui/icons/PrintRounded'
import { useStylesEditToolBar } from '../../styles/stylesEditToolBar'

const EditToolBar = ({setIsSetSchedOpen, isOpen}) => {
  const classes = useStylesEditToolBar()
  const handleSettingsClick = () => {
    setIsSetSchedOpen(!isOpen)
  }
  return (
    <Toolbar className={classes.toolBar} variant='dense'>
      <Tooltip title='Settings Schedule'>
        <Button onClick={handleSettingsClick} className={classes.button} aria-label='Settings Schedule'>
          <SettingsRoundedIcon color='primary' fontSize='default' />
        </Button>
      </Tooltip>

      <Divider orientation='vertical' light flexItem />
      <Tooltip title='Print Schedule'>
        <Button className={classes.button} aria-label='Print Schedule'>
          <PrintRoundedIcon color='primary' fontSize='default' />
        </Button>
      </Tooltip>

      <Divider orientation='vertical' light flexItem />

      <Tooltip title='Help'>
        <Button className={classes.button} aria-label='Help'>
          <HelpRoundedIcon color='primary' fontSize='default' />
        </Button>
      </Tooltip>

      <Divider orientation='vertical' light flexItem />

      <Tooltip title='Delete schedule'>
        <Button className={classes.button} aria-label='Delete'>
          <DeleteRoundedIcon color='primary' fontSize='default' />
        </Button>
      </Tooltip>


    </Toolbar>
  )
}

export default EditToolBar

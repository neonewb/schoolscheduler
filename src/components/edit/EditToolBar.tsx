import { Button, Divider, Toolbar, Tooltip } from '@material-ui/core'
import React, { FC } from 'react'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import PrintRoundedIcon from '@material-ui/icons/PrintRounded'
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { useStylesEditToolBar } from '../../styles/stylesEditToolBar'
import { ScheduleT } from '../../redux/database/firestore.actions'

type EditToolBarPropsT = {
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  mySchedule: ScheduleT | undefined
}

const EditToolBar: FC<EditToolBarPropsT> = ({ setSettingsOpen, mySchedule }) => {
  const classes = useStylesEditToolBar()
  
  const handleSettingsClick = () => {
    setSettingsOpen(prevState => !prevState)
  }

  return (
    <Toolbar className={classes.toolBar} variant='dense'>
      <Tooltip title='Settings Schedule'>
        <div>
          <Button
            disabled={!mySchedule}
            onClick={handleSettingsClick}
            className={classes.button}
            aria-label='Settings Schedule'>
            <SettingsRoundedIcon color='primary' fontSize='default' />
          </Button>
        </div>
      </Tooltip>

      <Divider orientation='vertical' light flexItem />
      <Tooltip title='Print Schedule'>
        <Button className={classes.button} aria-label='Print Schedule'>
          <PrintRoundedIcon color='primary' fontSize='default' />
        </Button>
      </Tooltip>

      <Divider orientation='vertical' light flexItem />

      <Divider orientation='vertical' light flexItem />
      <Tooltip title='Copy Schedule'>
        <Button className={classes.button} aria-label='Copy Schedule'>
          <FileCopyRoundedIcon color='primary' fontSize='default' />
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

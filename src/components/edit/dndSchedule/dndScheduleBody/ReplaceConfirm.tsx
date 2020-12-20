import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import {
  closeReplaceConfirm,
  isOpenReplace,
} from '../../../../effector/replaceStore'
import { useStore } from 'effector-react'
import React, { FC } from 'react'

export const ReplaceConfirm: FC = () => {
  const isOpen = useStore(isOpenReplace)

  const replaceConfirm = () => {

    closeReplaceConfirm()
  }

  const handleClose = () => {

    closeReplaceConfirm()
  }

  return (
    <Dialog
      transitionDuration={100}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        Are you sure you want to replace lesson?
      </DialogTitle>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            replaceConfirm()
          }}
          color='secondary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

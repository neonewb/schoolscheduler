import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import {
  closeReplaceConfirm,
  isOpenReplace,
} from '../../../../effector/replaceStore'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import ReactDOM from 'react-dom'

export const getConfirmReplace = () => {
  return new Promise<boolean>((resolve, reject) => {
    ReactDOM.render(
      <ReplaceConfirm resolve={resolve} />,
      document.getElementById('modal')
    )
  })
}

type ReplaceConfirmProps = {
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

export const ReplaceConfirm: FC<ReplaceConfirmProps> = ({ resolve }) => {
  const isOpen = useStore(isOpenReplace)

  const replaceConfirm = () => {
    resolve(true)
    closeReplaceConfirm()
  }

  const handleClose = () => {
    resolve(false)
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

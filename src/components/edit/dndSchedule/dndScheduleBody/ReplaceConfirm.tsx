import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

type ReplaceConfirmPropsT = {
  isOpen: boolean
  handleClose: () => void
}

export const ReplaceConfirm: FC<ReplaceConfirmPropsT> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch()

  const delConfirm = () => {
    // dispatch(deleteDocsFromCollectionAC())
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to replace lesson?'}
      </DialogTitle>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            delConfirm()
          }}
          color='secondary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

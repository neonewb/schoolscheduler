import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { deleteDocsFromCollectionAC } from '../../redux/database/firestore.actions'

type DeleteConfirmPropsT = {
  isOpen: boolean
  handleClose: () => void
}

const DeleteConfirm: FC<DeleteConfirmPropsT> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch()

  const deleteConfirm = () => {
    dispatch(deleteDocsFromCollectionAC())
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to delete choosen schedules?'}
      </DialogTitle>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            deleteConfirm()
          }}
          color='secondary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirm

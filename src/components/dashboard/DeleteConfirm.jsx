import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import React from 'react'

const DeleteConfirm = ({
  deleteDocFromCollectionAC,
  currentUser,
  isOpen,
  handleClose,
  index,
  docID,
}) => {
  const deleteConfirm = (docId) => {
    deleteDocFromCollectionAC(currentUser.email, currentUser.uid, docId)
    handleClose()
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {`Are you sure you want to delete ${index} schedule?`}
      </DialogTitle>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            deleteConfirm(docID)
          }}
          color='secondary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirm

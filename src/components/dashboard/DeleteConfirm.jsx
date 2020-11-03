import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const selectChoosenShedules = state => state.fsdb.schedules.filter((i) => i.isChoosen === true)

const DeleteConfirm = ({
  deleteDocFromCollectionAC,
  currentUser,
  isOpen,
  handleClose,
}) => {
  const choosenShedules = useSelector(selectChoosenShedules)
  const deleteConfirm = () => {
    if (choosenShedules.length === 0) {
      console.log('no choosen schedules')
      handleClose()
    }
    choosenShedules.forEach( i => {
      deleteDocFromCollectionAC(currentUser.email, currentUser.uid, i.id)
    })
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

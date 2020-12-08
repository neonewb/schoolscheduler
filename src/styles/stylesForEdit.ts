import { makeStyles } from '@material-ui/core'

export const useStylesEdit = makeStyles((theme) => ({
  html: {
  overflowY: 'hidden'
  },
  root: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    minWidth: 600,
  },
  editBar: {
    display: 'flex',
    minWidth: 600,
  },
  dashboardIcon: {
    display: 'inline',
  },
  titleInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    },
  },
}))
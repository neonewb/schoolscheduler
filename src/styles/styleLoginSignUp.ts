import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const useStylesLoginSignUp = makeStyles((theme) => ({
  button: {
    height: 66.69,
    fontSize: 25,
    fontFamily: 'Comfortaa',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: teal[200],
    },
  },

  avatar: {
    margin: 1,
    backgroundColor: teal[500],
  },
  fontSizeTextField: {
    fontSize: 25,
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
    },
    '&:-webkit-autofill:first-line': {
      fontSize: 25,
      fontFamily: 'Comfortaa',
    },
    background: '#f5fffe'
  },
  paper: {
    margin: theme.spacing(8, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(3),
  },
}))

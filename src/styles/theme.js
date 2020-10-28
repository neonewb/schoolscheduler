import { createMuiTheme } from '@material-ui/core'
import { deepPurple, red, teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: 
      'Comfortaa',
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: deepPurple[400],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiButton: {
      containedSizeLarge: {
        height: 66.69,
        fontSize: 24,
      },
    },
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
        },
        '&:-webkit-autofill:first-line': {
          fontSize: 25,
          fontFamily: 'Comfortaa',
        },
      },
    },
    MuiAvatar: {
      circle: {
        margin: 1,
        backgroundColor: teal[500],
      }
    }
  },
  props: {
    MuiTextField: {
      inputProps: {
        style: {
          fontSize: 25,
        },
      },
    },
  },
})

export default theme

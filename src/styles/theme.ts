import { createMuiTheme } from '@material-ui/core'
import { deepPurple, red, teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Comfortaa',
  },
  palette: {
    primary: {
      main: teal[500],
      light: '#f5fffe',
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
})

export default theme

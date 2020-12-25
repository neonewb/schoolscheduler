import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/redux.store'
import { BrowserRouter as Router } from 'react-router-dom'

import theme from './styles/theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import App from './components/App'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider preventDuplicate maxSnack={3}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

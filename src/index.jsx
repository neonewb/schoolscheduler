import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/redux.store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import theme from './styles/theme.js'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import App from './components/App.jsx'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

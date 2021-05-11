import { ThemeProvider } from '@material-ui/styles'
import React, { useEffect } from 'react'
import SuccessMessage from './components/snackBars/SuccessMessage'
import ErrorMessage from './components/snackBars/ErrorMessage'
import Map from './Map'
import theme from './theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PasswordReset from './pages/PasswordReset'
import { useDispatch } from 'react-redux'
import { windowResizer } from './redux/reducers/mapSlice'

const App = () => {
  const dispatch = useDispatch()

  const handleResize = () => {
    return dispatch(windowResizer(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path='/' exact component={Map} />
          <Route
            path='/password-reset/:token'
            exact
            component={PasswordReset}
          />
        </Switch>

        <SuccessMessage />
        <ErrorMessage />
      </ThemeProvider>
    </Router>
  )
}

export default App

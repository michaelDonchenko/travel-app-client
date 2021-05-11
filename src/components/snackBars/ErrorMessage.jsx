import { Snackbar } from '@material-ui/core'
import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { authState, resetError } from '../../redux/reducers/authSlice'

const ErrorMessage = () => {
  const auth = useSelector(authState)
  const { error } = auth
  const dispatch = useDispatch()

  return (
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={() => dispatch(resetError())}
    >
      <Alert onClose={() => dispatch(resetError())} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  )
}

export default ErrorMessage

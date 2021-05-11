import { Snackbar } from '@material-ui/core'
import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { authState, resetMessage } from '../../redux/reducers/authSlice'

const SuccessMessage = () => {
  const auth = useSelector(authState)
  const { message } = auth
  const dispatch = useDispatch()
  return (
    <Snackbar
      open={message}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(resetMessage())
      }}
    >
      <Alert
        onClose={() => {
          dispatch(resetMessage())
        }}
        severity='success'
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SuccessMessage

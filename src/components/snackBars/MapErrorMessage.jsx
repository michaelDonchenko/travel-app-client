import { Snackbar } from '@material-ui/core'
import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { mapState, resetError } from '../../redux/reducers/mapSlice'

const MapErrorMessage = () => {
  const dispatch = useDispatch()
  const state = useSelector(mapState)
  const { error } = state

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

export default MapErrorMessage

import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { Popup } from 'react-map-gl'
import { useDispatch } from 'react-redux'
import { setCurrentMarker } from '../redux/reducers/mapSlice'
import styles from '../styles'
import { getPins, createNewPin } from '../redux/actions/markerActions'

const NewMarkerPopup = ({ long, lat }) => {
  const classes = styles()
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setCurrentMarker(null))
  }

  const [placeName, setPlaceName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createNewPin({ long, lat, placeName }))
    handleClose()
    setPlaceName('')
    await dispatch(getPins())
  }
  return (
    <Popup
      className={classes.mapPopup}
      anchor='left'
      latitude={lat}
      longitude={long}
      closeOnClick={false}
      onClose={() => {
        handleClose()
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label='Place name'
          type='text'
          values={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <Button
          className={classes.popupButton}
          type='submit'
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </form>
    </Popup>
  )
}

export default NewMarkerPopup

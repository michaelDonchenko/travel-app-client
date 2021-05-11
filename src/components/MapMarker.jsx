import RoomIcon from '@material-ui/icons/Room'
import { Marker, FlyToInterpolator } from 'react-map-gl'
import { Tooltip } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setPinId, setViewport } from '../redux/reducers/mapSlice'

const MapMarker = ({ viewport, long, lat, marker }) => {
  const dispatch = useDispatch()

  let viewportOBJ = {
    latitude: lat,
    longitude: long,
    zoom: 11,
    transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    transitionDuration: 1000,
  }

  const handleClick = async () => {
    await dispatch(setViewport(viewportOBJ))
    setTimeout(() => dispatch(setPinId(marker._id)), 1200)
  }

  return (
    <Marker
      onClick={handleClick}
      latitude={lat}
      longitude={long}
      offsetLeft={-3.5 * viewport.zoom}
      offsetTop={-7 * viewport.zoom}
    >
      <Tooltip title={marker?.placeName}>
        <RoomIcon
          style={{
            fontSize: viewport.zoom * 7,
            color: 'crimson',
            cursor: 'pointer',
          }}
        />
      </Tooltip>
    </Marker>
  )
}

export default MapMarker

import { Backdrop, Button, CircularProgress } from '@material-ui/core'
import { useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import MapMarker from './components/MapMarker'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentMarker,
  mapState,
  setViewport,
} from './redux/reducers/mapSlice'
import { openLoginModal, openAboutModal } from './redux/reducers/modalSlice'
import NewMarkerPopup from './components/NewMarkerPopup'
import { getPins } from './redux/actions/markerActions'
import Login from './components/modals/Login'
import Register from './components/modals/Register'
import { authState } from './redux/reducers/authSlice'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logout } from './redux/actions/authActions'
import Cookies from 'universal-cookie'
import PinModel from './components/modals/PinModel'
import MapErrorMessage from './components/snackBars/MapErrorMessage'
import CloudinaryErrorMessage from './components/snackBars/CloudinaryErrorMessage'
import About from './components/modals/About'
import 'mapbox-gl/dist/mapbox-gl.css'

function Map() {
  const dispatch = useDispatch()
  const classes = styles()
  const cookies = new Cookies()

  //state
  const state = useSelector(mapState)
  const auth = useSelector(authState)
  const { user, loading: authLoading } = auth

  const { currentMarker, markers, viewport, loading: mapLoading } = state

  const handleNewClick = (e) => {
    user && dispatch(setCurrentMarker({ long: e.lngLat[0], lat: e.lngLat[1] }))
  }

  useEffect(() => dispatch(getPins()), [])

  const handleLogout = async () => {
    await dispatch(logout())
    cookies.remove('user')
  }

  return (
    <>
      <ReactMapGL
        onDblClick={(e) => handleNewClick(e)}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(nextViewport) => dispatch(setViewport(nextViewport))}
      >
        {currentMarker && (
          <>
            <MapMarker
              viewport={viewport}
              long={Number(currentMarker.long)}
              lat={Number(currentMarker.lat)}
            />
            <NewMarkerPopup
              long={Number(currentMarker.long)}
              lat={Number(currentMarker.lat)}
            />
          </>
        )}
        {markers.length > 0 &&
          markers.map((m, i) => (
            <MapMarker
              key={i}
              viewport={viewport}
              long={Number(m.long)}
              lat={Number(m.lat)}
              marker={m}
            />
          ))}

        {!user ? (
          <Button
            className={classes.menuButton}
            variant='contained'
            color='primary'
            onClick={() => dispatch(openLoginModal())}
          >
            login
          </Button>
        ) : (
          <Button
            className={classes.menuButton}
            variant='contained'
            color='primary'
            onClick={handleLogout}
            endIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        )}

        <Button
          className={classes.menuButton}
          variant='contained'
          color='secondary'
          onClick={() => dispatch(openAboutModal())}
        >
          About
        </Button>

        {/* Modals imports */}
        <Login />
        <Register />
        <PinModel />
        <About />

        {/* loader */}
        <Backdrop className={classes.backdrop} open={authLoading || mapLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>

        {/* errors */}
        <MapErrorMessage />
        <CloudinaryErrorMessage />
      </ReactMapGL>
    </>
  )
}

export default Map

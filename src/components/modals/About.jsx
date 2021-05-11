import { Dialog, Typography } from '@material-ui/core'
import { closeAboutModal, modalState } from '../../redux/reducers/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { mapState } from '../../redux/reducers/mapSlice'
import ModalToolbar from './ModalToolbar'

const About = () => {
  const dispatch = useDispatch()
  const modal = useSelector(modalState)
  const { aboutModal } = modal
  const classes = styles()

  const map = useSelector(mapState)
  const { windowWidth } = map

  const handleClsoe = () => {
    dispatch(closeAboutModal())
  }

  return (
    <Dialog
      open={aboutModal}
      onClose={handleClsoe}
      fullScreen={windowWidth < 600}
    >
      {windowWidth < 600 && <ModalToolbar handleClsoe={handleClsoe} />}

      <Typography variant='h4' align='center' className={classes.header}>
        Travel-App 101
      </Typography>
      <Typography variant='h6' align='center' style={{ padding: '7px' }}>
        Have you ever wanted to share your favorite places with the world?
        Comment, upload images, or rate places you have been to? now it's all
        possible with Mike's travel app!
      </Typography>

      <div style={{ padding: '10px' }}>
        <p>
          1. View all the places in the world by clicking on the markers on the
          map.
        </p>
        <p>
          2. Register a new account and loggin to be able to create new markers!
        </p>
        <p>
          3. Creating a marker is done by double clicking the map, choose a
          place you want to mark and just double click it! (make sure you logged
          in)
        </p>
        <p>
          4. You can post comments ratings and images on other people's markers
          as well.
        </p>
        <p>
          5. Don't worry you can delete your comments and photos later if you
          change your mind...
        </p>

        <p>6. Enjoy your time.</p>

        <p style={{ color: 'gray', marginTop: '15px' }}>
          Please note that if needed the admim can delete any marker on the map
          and all the images and comments will be deleted too..
        </p>
      </div>
    </Dialog>
  )
}

export default About

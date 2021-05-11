import {
  Backdrop,
  Badge,
  CircularProgress,
  Dialog,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { mapState, resetPinId } from '../../redux/reducers/mapSlice'
import {
  getComments,
  getPin,
  getRating,
  removeMarker,
} from '../../redux/actions/markerActions'
import styles from './styles'
import Comment from '../Comment'
import TabsMenu from '../Tabs'
import { getImages, removeImage } from '../../redux/actions/cloudinaryActions'
import { cloudinaryState } from '../../redux/reducers/cloudinarySlice'
import { authState } from '../../redux/reducers/authSlice'
import Rating from '@material-ui/lab/Rating'
import { StyledButton } from '../../styled'
import ModalToolbar from './ModalToolbar'

const PinModel = () => {
  const classes = styles()
  const map = useSelector(mapState)
  const auth = useSelector(authState)
  const cloudinary = useSelector(cloudinaryState)

  const { pinId, loading, currentPin, comments, rating, windowWidth } = map
  const { user } = auth
  const { loading: loadingImages, images } = cloudinary
  const dispatch = useDispatch()

  useEffect(() => pinId !== null && dispatch(getPin(pinId)), [pinId])
  useEffect(() => pinId !== null && dispatch(getComments(pinId)), [pinId])
  useEffect(() => pinId !== null && dispatch(getImages(pinId)), [pinId])
  useEffect(() => pinId !== null && dispatch(getRating(pinId)), [pinId])

  const ratingAverage = function () {
    const values = rating.map((r) => r.value)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = values.reduce(reducer)
    const result = total / values.length
    return result
  }

  const confirmDeleteMarker = async () => {
    if (window.confirm('Are you sure you wnat to delete this marker?')) {
      await dispatch(removeMarker(pinId))
      dispatch(resetPinId())
    }
  }

  return loading || loadingImages ? (
    <Backdrop className={classes.backdrop} open={loading || loadingImages}>
      <CircularProgress color='inherit' />
    </Backdrop>
  ) : (
    <Dialog
      onClose={() => dispatch(resetPinId())}
      open={pinId}
      fullScreen={windowWidth < 600}
    >
      {windowWidth < 600 && (
        <ModalToolbar handleClsoe={() => dispatch(resetPinId())} />
      )}

      <DialogTitle className={classes.modal}>
        <Typography
          variant='h5'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ flex: 1 }}> {currentPin?.placeName}</span>

          <Rating
            name='simple-controlled'
            value={rating && rating.length > 0 ? ratingAverage().toFixed(1) : 0}
            readOnly
            precision={0.5}
          />
          <span style={{ marginLeft: '7px' }}>
            {`(${
              rating && rating.length > 0
                ? ratingAverage().toFixed(1)
                : 'No ratings'
            })`}
          </span>
        </Typography>

        {rating && rating.length && (
          <Typography
            style={{ float: 'right', color: 'GrayText' }}
            variant='subtitle1'
          >{`from ${rating.length} ratings`}</Typography>
        )}
      </DialogTitle>

      {/* marker deletion */}
      {user && user.role === 'admin' && (
        <StyledButton
          style={{ width: '200px' }}
          variant='contained'
          fullWidth
          onClick={confirmDeleteMarker}
        >
          Delete this marker
        </StyledButton>
      )}

      <div className={classes.imagesDiv}>
        {images?.length > 0 ? (
          images.map((image, i) => (
            <div className={classes.imgDiv}>
              {user?._id === image.createdBy ? (
                <>
                  <img className={classes.img} key={i} src={image.url} />
                  <Badge
                    onClick={() =>
                      dispatch(
                        removeImage({ pinId, public_id: image.public_id })
                      )
                    }
                    className={classes.badge}
                    badgeContent={'Delete'}
                    color='error'
                  ></Badge>
                </>
              ) : (
                <img className={classes.img} key={i} src={image.url} />
              )}
            </div>
          ))
        ) : (
          <p>No images yet.</p>
        )}
      </div>

      <div className={classes.commentsDiv}>
        {comments?.length > 0 ? (
          comments.map((c, i) => <Comment key={i} comment={c} />)
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <TabsMenu />
    </Dialog>
  )
}

export default PinModel

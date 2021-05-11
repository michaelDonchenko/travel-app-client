import React, { useState } from 'react'
import { StyledButton } from '../../styled'
import Resizer from 'react-image-file-resizer'
import { useDispatch, useSelector } from 'react-redux'
import { addImages } from '../../redux/actions/cloudinaryActions'
import { mapState } from '../../redux/reducers/mapSlice'
import { returnError } from '../../redux/reducers/cloudinarySlice'

const ImagesUpload = () => {
  const dispatch = useDispatch()
  const [files, setFiles] = useState('')

  const state = useSelector(mapState)
  const { pinId, loading } = state

  const handleChange = (e) => {
    setFiles(e.target.files)
  }

  const dispatchImageUpload = async (uri) => {
    await dispatch(addImages({ image: uri, pinId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (files.length > 3) {
      return dispatch(
        returnError(`Please don't uplaod more than 3 images at once.`)
      )
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          500,
          500,
          'auto',
          100,
          0,
          (uri) => {
            dispatchImageUpload(uri)
          },
          'base64'
        )
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{
          fontSize: '15px',
          display: 'flex',
          padding: '10px 20px',
        }}
        type='file'
        accept='image/*'
        name='imagetoUpload'
        multiple
        onChange={handleChange}
      />

      <StyledButton primary>{loading ? 'Loading...' : 'Submit'}</StyledButton>
    </form>
  )
}

export default ImagesUpload

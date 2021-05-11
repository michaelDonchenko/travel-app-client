import React, { useState } from 'react'
import { FlexDiv, HiddenDiv, StyledButton } from '../styled'
import CommentForm from './tabs/CommentForm'
import ImagesUpload from './tabs/ImagesUpload'
import { useSelector } from 'react-redux'
import { authState } from '../redux/reducers/authSlice'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import AddRating from './tabs/AddRating'

const TabsMenu = () => {
  const [value, setValue] = useState(0)
  const auth = useSelector(authState)
  const { user } = auth

  const handleClick = (e) => {
    setValue(e.target.value)
  }
  return (
    <FlexDiv>
      {!user ? (
        <Typography
          style={{ margin: '10px 0', padding: '10px', color: 'GrayText' }}
          variant='subtitle1'
        >
          Only logged in users are able to add comments/photos/rating.
        </Typography>
      ) : (
        <>
          <div>
            <StyledButton onClick={handleClick} value={1}>
              Add comment
            </StyledButton>
            <StyledButton onClick={handleClick} value={2}>
              Add photo
            </StyledButton>
            <StyledButton onClick={handleClick} value={3}>
              Add rating
            </StyledButton>
          </div>
          <Divider></Divider>
        </>
      )}

      <div>
        <HiddenDiv value={value} number={1}>
          <CommentForm />
        </HiddenDiv>
        <HiddenDiv value={value} number={2}>
          <ImagesUpload />
        </HiddenDiv>
        <HiddenDiv value={value} number={3}>
          <AddRating />
        </HiddenDiv>
      </div>
    </FlexDiv>
  )
}

export default TabsMenu

import { makeStyles } from '@material-ui/core'

const styles = makeStyles((theme) => ({
  commentsDiv: {
    maxHeight: '350px',
    overflowY: 'auto',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },

  imagesDiv: {
    maxHeight: '500px',
    overflowY: 'auto',
    width: '100%',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    display: 'flex',
    flexWrap: 'wrap',
  },

  imgDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
  },

  img: {
    margin: '5px auto',
    maxWidth: '95%',
    '&:hover': {
      cursor: 'auto',
    },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

  badge: {
    position: 'relative',
    marginRight: '15px',
    display: 'flex',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  header: {
    margin: theme.spacing(4, 0),
  },
}))

export default styles

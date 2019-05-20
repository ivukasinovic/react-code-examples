import grey from '@material-ui/core/colors/grey';

const styles = {
  conversationBody: {
    backgroundColor: grey[200],
    borderRadius: 4,
    padding: 7,
    marginBottom: '1rem',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  loading: {
    color: '#EBEBEB',
    height: 20,
    width: 20,
  },
};

export default styles;

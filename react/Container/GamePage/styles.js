import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const styles = {
  form: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: grey[300],
    marginTop: '1rem',
  },
  error: {
    color: red[500],
  },
};
export default styles;

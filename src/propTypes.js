import PropTypes from 'prop-types';

export default PropTypes.shape({
  show: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
  closeAll: PropTypes.func.isRequired
});

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';

const styles = () => ({
  progress: {
    margin: 'auto',
  },
  commonLoaderMain: {
    display: 'flex'
  }
});

function CommonLoader(props) {
  const { classes, showLoader } = props;
  if (showLoader) {
    return <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={showLoader}
      className={classes.commonLoaderMain}
    >
      <CircularProgress className={classes.progress} />
    </Modal>;
  } else {
    return null;
  }
}

CommonLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  showLoader: PropTypes.bool
};

export default withStyles(styles)(CommonLoader);

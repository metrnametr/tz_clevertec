import React from 'react';
import Button from 'arui-feather/button';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import './style.scss';

const ModalCancelLoad = ({ pending, cancel }) => pending && (
  <div className="modal-wrapper">
    <div className="modal-container">
      <Spinner />
      <Button onClick={cancel} view="action">
        Отмена
      </Button>
    </div>
  </div>
);

ModalCancelLoad.propTypes = {
  cancel: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default ModalCancelLoad;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  split, slice, join, isEmpty, has,
} from 'lodash';
import Notification from 'arui-feather/notification';

import Form from '../../components/Form';
import ModalCancelLoad from '../../components/ModalCancelLoad';

import {
  uploadFormMetaAction,
  unloadFormMetaAction,
  setFormDataAction,
  cancelLoadAction,
} from '../../actions';

import './style.scss';

const FormPage = () => {
  const [visibleNotice, setVisibleNotice] = useState(false);
  const dispatch = useDispatch();
  const {
    loading, formMeta, result, pending, loadedFormMeta,
  } = useSelector((state) => state.reducerForm);
  useEffect(() => {
    if (!loadedFormMeta) {
      dispatch(uploadFormMetaAction());
    }

    return () => {
      if (loadedFormMeta) {
        dispatch(unloadFormMetaAction());
      }
    };
  }, [loadedFormMeta]);

  const setFormData = (formData) => {
    const payload = has(formData, 'numeric')
      ? { ...formData, numeric: formData.numeric && +formData.numeric }
      : formData;
    dispatch(setFormDataAction(payload));
  };

  useEffect(() => {
    if (!pending && !isEmpty(result)) {
      setVisibleNotice(true);
    }
  }, [pending, result]);

  const cancelLoad = () => {
    dispatch(cancelLoadAction());
  };

  return (
    <div className="form-wrapper">
      {
        loading || isEmpty(formMeta) ? (
          null
        )
          : <Form formMeta={formMeta} setFormData={setFormData} />
      }
      <ModalCancelLoad
        cancel={cancelLoad}
        pending={pending}
      />
      <Notification
        offset={12}
        onCloserClick={() => {
          setVisibleNotice(false);
        }}
        onCloseTimeout={() => {
          setVisibleNotice(false);
        }}
        status="ok"
        stickTo="left"
        title={slice(split(result, ': '), 0, 1)}
        visible={visibleNotice}
      >
        {join(slice(split(result, ': '), 1))}
      </Notification>
    </div>
  );
};

export default FormPage;

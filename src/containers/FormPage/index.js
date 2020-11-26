import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from 'arui-feather/notification';
import {
  split, slice, join, isEmpty, has
} from 'lodash';

import Form from '../../components/Form';
import './style.scss';
import { PRELOAD_FORM_META, GET_UNLOAD_FORM_META, SET_FORM_DATA_PENDING } from '../../actionTypes';

import Spinner from '../../components/Spinner';

const FormPage = () => {
  const [visibleNotice, setVisibleNotice] = useState(false);
  const dispatch = useDispatch();
  const {
    loading, formMeta, result, pending, loadedFormMeta,
  } = useSelector((state) => state.reducerForm);
  useEffect(() => {
    if (!loadedFormMeta) {
      dispatch({
        type: PRELOAD_FORM_META,
      });
    }

    return () => {
      if (loadedFormMeta) {
        dispatch({
          type: GET_UNLOAD_FORM_META,
        });
      }
    };
  }, [loadedFormMeta]);

  const setFormData = (formData) => {
    const payload = has(formData, 'numeric')
      ? { ...formData, numeric: formData.numeric && +formData.numeric }
      : formData;
    dispatch({
      type: SET_FORM_DATA_PENDING,
      payload,
    });
  };

  useEffect(() => {
    if (!pending && !isEmpty(result)) {
      setVisibleNotice(true);
    }
  }, [pending, result]);

  return (
    <div className="form-wrapper">
      {
        loading || isEmpty(formMeta) ? <Spinner />
          : <Form formMeta={formMeta} setFormData={setFormData} />
      }
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

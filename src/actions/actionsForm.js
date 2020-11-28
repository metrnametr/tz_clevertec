import {
  FORM_META_REQUESTED, GET_UNLOAD_FORM_META, SET_FORM_DATA_PENDING, CANCEL_LOAD_REQUEST,
} from '../actionTypes';

export const uploadFormMetaAction = () => ({
  type: FORM_META_REQUESTED,
});

export const unloadFormMetaAction = () => ({
  type: GET_UNLOAD_FORM_META,
});

export const setFormDataAction = (payload) => ({
  type: SET_FORM_DATA_PENDING,
  payload,
});

export const cancelLoadAction = () => ({
  type: CANCEL_LOAD_REQUEST,
});

import {
  has, get,
} from 'lodash';
import {
  UNLOAD_FORM_META,
  CANCEL_LOAD,
  FORM_META_REQUESTED,
  FORM_META_SUCCESSED,
  FORM_META_FAILED,
  SET_FORM_DATA_PENDING,
  SET_FORM_DATA_SUCCESSED,
  SET_FORM_DATA_FAILED,
} from '../actionTypes';

const initialStateForm = {
  formMeta: {},
  errorFormMetaMessage: '',
  cancelGetFormMeta: false,
  loading: false,
  pending: false,
  loadedFormMeta: false,
  result: {},
  errorSetFormMessage: '',
};

const reducerFormSwitch = {
  [FORM_META_REQUESTED]: (state) => ({
    ...state,
    loading: true,
    loadedFormMeta: false,
    cancelGetFormMeta: false,
    pending: true,
  }),
  [FORM_META_SUCCESSED]: (state, payload) => ({
    ...state,
    loading: false,
    formMeta: payload,
    loadedFormMeta: true,
    pending: false,
  }),
  [FORM_META_FAILED]: (state, payload) => ({
    ...state,
    loading: false,
    loadedFormMeta: true,
    errorFormMetaMessage: payload,
    pending: false,
  }),
  [UNLOAD_FORM_META]: (state) => ({
    ...state,
    loadedFormMeta: false,
    pending: false,
    formMeta: {},
    result: {},
  }),
  [CANCEL_LOAD]: (state) => ({
    ...state,
    pending: false,
  }),
  [SET_FORM_DATA_PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [SET_FORM_DATA_SUCCESSED]: (state, payload) => ({
    ...state,
    pending: false,
    result: payload,
  }),
  [SET_FORM_DATA_FAILED]: (state, payload) => ({
    ...state,
    pending: false,
    errorSetFormMessage: payload,
  }),
};

const reducerForm = (
  state = initialStateForm,
  { type, payload },
) => (has(reducerFormSwitch, type) ? get(reducerFormSwitch, type)(state, payload) : state);

export {
  reducerForm,
};

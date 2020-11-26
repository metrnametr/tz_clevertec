import {
  has, get, mergeWith,
} from 'lodash';
import {
  UNLOAD_FORM_META,
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
  loading: false,
  pending: false,
  loadedFormMeta: false,
  result: {},
  errorSetFormMessage: '',
};

const reducerFormSwitch = {
  [FORM_META_REQUESTED]: (state) => ({ ...state, loading: true, loadedFormMeta: false }),
  [FORM_META_SUCCESSED]: (state, payload) => ({
    ...state, loading: false, formMeta: payload, loadedFormMeta: true,
  }),
  [FORM_META_FAILED]: (state, payload) => (
    {
      ...state, loading: false, loadedFormMeta: true, errorFormMetaMessage: payload,
    }),
  [UNLOAD_FORM_META]: (state) => ({
    ...state, loadedFormMeta: false, pending: false, result: {},
  }),
  [SET_FORM_DATA_PENDING]: (state) => ({ ...state, pending: true }),
  [SET_FORM_DATA_SUCCESSED]: (state, payload) => ({ ...state, pending: false, result: payload }),
  [SET_FORM_DATA_FAILED]: (state, payload) => (
    { ...state, pending: false, errorSetFormMessage: payload }),
};

const reducerForm = (
  state = initialStateForm,
  { type, payload },
) => (has(reducerFormSwitch, type) ? get(reducerFormSwitch, type)(state, payload) : state);

export {
  reducerForm,
};

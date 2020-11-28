import {
  call, put, takeEvery, all, fork,
} from 'redux-saga/effects';
import {
  UNLOAD_FORM_META,
  GET_UNLOAD_FORM_META,
  FORM_META_REQUESTED,
  FORM_META_SUCCESSED,
  FORM_META_FAILED,
  SET_FORM_DATA_PENDING,
  SET_FORM_DATA_SUCCESSED,
  SET_FORM_DATA_FAILED,
  CANCEL_LOAD,
  CANCEL_LOAD_REQUEST,
} from '../actionTypes';

import Api from '../Api';

function* getFormMeta() {
  try {
    const formMeta = yield call(Api.getFormMeta);
    yield put({ type: FORM_META_SUCCESSED, payload: formMeta });
  } catch (e) {
    yield put({ type: FORM_META_FAILED, message: e.message });
  }
}

function* cancelLoad() {
  try {
    // eslint-disable-next-line no-unused-expressions
    yield call(Api.cancelLoad);
    yield put({ type: CANCEL_LOAD });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

function* watchCanselFormMetaSaga() {
  yield takeEvery(CANCEL_LOAD_REQUEST, cancelLoad);
}

function* watchFormMeta() {
  yield takeEvery(FORM_META_REQUESTED, getFormMeta);
}

function* setFormData(action) {
  try {
    const formData = yield call(Api.setFormData, action.payload);
    yield put({ type: SET_FORM_DATA_SUCCESSED, payload: formData });
  } catch (error) {
    yield put({ type: SET_FORM_DATA_FAILED, payload: error });
    console.error(error) // eslint-disable-line
  }
}

function* unloadFormMeta() {
  yield put({ type: UNLOAD_FORM_META });
}

function* watchSetFormData() {
  yield takeEvery(SET_FORM_DATA_PENDING, setFormData);
}

function* watchUnloadFormMeta() {
  yield takeEvery(GET_UNLOAD_FORM_META, unloadFormMeta);
}

function* watchGetFormMeta() {
  yield fork(getFormMeta);
}

const sagas = [
  fork(watchSetFormData),
  fork(watchFormMeta),
  fork(watchUnloadFormMeta),
  fork(watchCanselFormMetaSaga),
];

export function* clientFormSaga() {
  yield all([
    ...sagas,
  ]);
}

export function* serverFormSaga() {
  yield all([
    fork(watchGetFormMeta),
    ...sagas,
  ]);
}

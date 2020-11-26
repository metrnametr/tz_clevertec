import {
  call, put, takeEvery, all, fork,
} from 'redux-saga/effects';
import {
  PRELOAD_FORM_META,
  UNLOAD_FORM_META,
  GET_UNLOAD_FORM_META,
  FORM_META_REQUESTED,
  FORM_META_SUCCESSED,
  FORM_META_FAILED,
  SET_FORM_DATA_PENDING,
  SET_FORM_DATA_SUCCESSED,
  SET_FORM_DATA_FAILED,
} from '../actionTypes';

import Api from '../Api';

function* fetchFormMeta() {
  yield put({ type: FORM_META_REQUESTED });
  try {
    const formMeta = yield call(Api.fetchFormMeta);
    yield put({ type: FORM_META_SUCCESSED, payload: formMeta });
  } catch (e) {
    yield put({ type: FORM_META_FAILED, message: e.message });
  }
}

function* formMetaSaga() {
  yield takeEvery(PRELOAD_FORM_META, fetchFormMeta);
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

function* watchFetchFormMeta() {
  yield fork(fetchFormMeta);
}

const sagas = [
  fork(watchSetFormData),
  fork(formMetaSaga),
  fork(watchUnloadFormMeta),
];

export function* clientSaga() {
  yield all([
    ...sagas,
  ]);
}

export function* serverSaga() {
  yield all([
    fork(watchFetchFormMeta),
    ...sagas,
  ]);
}

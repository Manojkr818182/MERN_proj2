import { put, takeEvery } from 'redux-saga/effects';
import { INVALID_CREDENTIAL, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS } from '../types/types';
import axios from 'axios';
import API_URL from '../../API_URL/API_URL';
import Swal from 'sweetalert2';

function* loginFun(action) {
    let res = yield axios.post(`${API_URL}signIn`, action.data);
    if (res.data.code === 1) {
        localStorage.setItem("admin", JSON.stringify(res.data.data));
        yield put({ type: LOGIN_SUCCESS, data: res.data.data });
        Swal.fire({
            icon: "success",
            title: "Logged In Successfully!",
            showConfirmButton: false,
            timer: 800
        });
    } else if (res.data.code === 777) {
        yield put({ type: INVALID_CREDENTIAL, data: null });
    } else {
        yield put({ type: LOGIN_FAILED, data: null })
    }
};
function* logoutFun() {
    yield localStorage.removeItem("admin");
    yield put({ type: LOGOUT_SUCCESS, data: null });
    Swal.fire({
        icon: "success",
        title: "Logged Out!",
        showConfirmButton: false,
        timer: 800
    });
}

function* authSaga() {
    yield takeEvery(LOGIN, loginFun);
    yield takeEvery(LOGOUT, logoutFun);
};

export default authSaga;
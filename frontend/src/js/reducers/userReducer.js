/**
 * Created by Increment on 31.08.2016.
 */
import {USER_REG,USER_AUTH,USER_LOGOUT,USER_REG_ERR,USER_LOGIN_ERR} from '../constants/userConst'

const initialState = {};

export default function (state = initialState, action) {
	switch(action.type){
		case USER_REG:
			return {...state, user: action.payload};
		case USER_AUTH:
			return {...state, token: action.payload.token, user: action.payload.user};
		case USER_LOGOUT:
			return {...state, token: null, user: null};
		case USER_LOGIN_ERR:/** @todo обработать ошибку и выводить её */
			return {...state, err: action.payload};
		case USER_REG_ERR:/** @todo обработать ошибку и выводить её */
			return {...state, err: action.payload};
		default:
			return state;
	}
}
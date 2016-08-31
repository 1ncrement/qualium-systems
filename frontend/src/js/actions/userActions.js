/**
 * Created by Increment on 31.08.2016.
 */
import {USER_REG,USER_AUTH,USER_LOGOUT,USER_REG_ERR,USER_LOGIN_ERR} from '../constants/userConst'
import {browserHistory} from 'react-router'

export function authUser(formBody){
	return (dispatch) => {
		fetch('http://localhost:8000/login', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formBody)
		})
			.then((res)=>res.json())
			.then((data)=>{
				if(data.err){
					dispatch({
						type: USER_LOGIN_ERR,
						payload: data.err
					})
				}else{
					localStorage.setItem('token', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					dispatch({
						type: USER_AUTH,
						payload: data//object
					});
					browserHistory.push('/');
				}
			})
			.catch((err)=>{
				dispatch({
					type: USER_LOGIN_ERR,
					payload: err
				})
			});
	}
}

/**
 * @desc при логауте не вызываеться рендер, разобраться "что за буйня" (как говорил великий Леонард TBBT)
 * */
export function userLogout(){
	return (dispatch) => {
		fetch('http://localhost:8000/logout', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				authorization: localStorage.getItem('token')//string
			})
		})
			.then((res)=>{
				res.json()
			})
			.then((data)=>{
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				dispatch({
					type: USER_LOGOUT,
					payload: null//remove token in store
				});
			})
			.then(()=>{
				browserHistory.push('/');
			})
			.catch((err)=>{
				dispatch({
					type: USER_LOGIN_ERR,
					payload: err
				})
			});
	}
}

export function registrationUser(formBody){
	return (dispatch) => {
		fetch('http://localhost:8000/postuser', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formBody)
		})
			.then((res)=>res.json())
			.then((data)=>{
				if(data.err){
					dispatch({
						type: USER_REG_ERR,
						payload: data.err
					})
				}else{
					dispatch({
						type: USER_REG,
						payload: data//obj user information
					});
				}
			})
			.catch((err)=>{
				dispatch({
					type: USER_REG_ERR,
					payload: err
				})
			});
	}
}


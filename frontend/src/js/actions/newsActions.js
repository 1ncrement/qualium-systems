/**
 * Created by user on 31.08.2016.
 */
import {NEWS_SET,NEWS_REMOVE,NEWS_GET_ERR,NEWS_REMOVE_ERR,NEWS_ADD_ERR,NEWS_ADD,NEWS_EDIT,NEWS_EDIT_ERR} from '../constants/newsConst'
import {browserHistory} from 'react-router'
import config from '../config'

export function getNews(page){
	return (dispatch) => {
		fetch(`${config.server}/getnews${page ? '?page='+page : ''}`, {
			method: 'get',
			headers: {
				'authorization': localStorage.getItem('token')
			}
		})
			.then((res)=> res.json())
			.then((data)=>{
				if(data.err){
					dispatch({
						type: NEWS_GET_ERR,
						payload: data
					});
				}else{
					dispatch({
						type: NEWS_SET,
						payload: data
					});
				}
			})
			.catch((err)=>{
				dispatch({
					type: NEWS_GET_ERR,
					payload: err
				})
			});
	}
}

export function removeNews(_id) {
	return (dispatch) => {
		fetch(`${config.server}/removenews`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({_id})
		})
			.then((res)=>res.json())
			.then((data)=>{
				if(!data.ok){
					dispatch({
						type: NEWS_REMOVE_ERR,
						payload: data.err
					})
				}else{/** @todo добавить обновление состояния что бы был убран удалённый объект */
					dispatch({
						type: NEWS_REMOVE,
						payload: _id
					})
				}
			})
			.catch((err)=>{
				dispatch({
					type: NEWS_REMOVE_ERR,
					payload: err
				})
			});
	}
}

export function editNews(value) {
	return (dispatch) => {
		fetch(`${config.server}/editnews`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(value)
		})
			.then((res)=>res.json())
			.then((data)=>{
				if(!data.ok){
					dispatch({
						type: NEWS_EDIT_ERR,
						payload: data.err
					})
				}else{
					dispatch({
						type: NEWS_EDIT,
						payload: value
					})
				}
			})
			.catch((err)=>{
				dispatch({
					type: NEWS_EDIT_ERR,
					payload: err
				})
			});
	}
}

export function addNews(bodyForm) {
	return (dispatch) => {
		fetch(`${config.server}/addnews`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyForm)
		})
			.then((res)=>res.json())
			.then((data)=>{
				if(data.err){
					dispatch({
						type: NEWS_ADD_ERR,
						payload: data.err
					})
				}else{
					dispatch({/** @todo сделать обновление страници после добавления*/
						type: NEWS_ADD,
						payload: data
					})
				}
			})
			.catch((err)=>{
				dispatch({
					type: NEWS_ADD_ERR,
					payload: err
				})
			});
	}
}
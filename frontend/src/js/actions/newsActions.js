/**
 * Created by user on 31.08.2016.
 */
import {NEWS_SET,NEWS_REMOVE,NEWS_GET_ERR,NEWS_REMOVE_ERR} from '../constants/newsConst'
import {browserHistory} from 'react-router'

export function getNews(page){
	return (dispatch) => {
		fetch(`http://localhost:8000/getnews${page ? '?page='+page : ''}`, {
			method: 'get',
			headers: {
				// 'Accept': 'application/json',
				// 'Content-Type': 'application/json',
				'authorization': localStorage.getItem('token')
			}
		})
			.then((res)=> res.json())
			.then((data)=>{
				dispatch({
					type: NEWS_SET,
					payload: data
				});
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
		fetch('http://localhost:8000/removenews', {
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
						payload: data.ok
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
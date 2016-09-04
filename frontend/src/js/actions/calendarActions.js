/**
 * Created by Increment on 04.09.2016.
 */
import {
	CALENDAR_ADD_TASK, CALENDAR_ADD_TASK_ERR, CALENDAR_CHANGE_SELECT_DAY, CALENDAR_CHANGE_MONTH, CALENDAR_GET_TASK, CALENDAR_GET_TASK_ERR
} from '../constants/calendarConst'
import {browserHistory} from 'react-router'
import config from '../config'

export function addTask(obj) {
	return (dispatch) => {
		fetch(`${config.server}/calendar/addtask`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		})
			.then((res)=> res.json())
			.then((data)=> {
				if (data.err) {
					dispatch({
						type: CALENDAR_ADD_TASK_ERR,
						payload: data
					});
				} else {
					dispatch({
						type: CALENDAR_ADD_TASK,
						payload: data
					});
				}
			})
			.catch((err)=> {
				dispatch({
					type: CALENDAR_ADD_TASK_ERR,
					payload: err
				})
			});
	}
}

export function changeSelectDay(day) {
	let params = {
		date: day.format('YYYY MM DD')
	};

	return (dispatch) => {
		dispatch({//специально ради того что бы отображение селекта было видно пользователю сразу.
			type: CALENDAR_CHANGE_SELECT_DAY,
			payload: day
		});

		fetch(`${config.server}/calendar/get`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'/** @todo добавить аутентификацию что бы отдавались таски только одного пользователя */
			},
			body: JSON.stringify(params)
		})
			.then((res)=> res.json())
			.then((data)=> {
				if (data.err) {
					dispatch({
						type: CALENDAR_GET_TASK_ERR,
						payload: data
					});
				} else {
					dispatch({
						type: CALENDAR_GET_TASK,
						payload: data
					});
				}
			})
			.catch((err)=> {
				dispatch({
					type: CALENDAR_GET_TASK_ERR,
					payload: err
				})
			});
	}
}

export function changeMonth(month) {
	return (dispatch) => {
		dispatch({
			type: CALENDAR_CHANGE_MONTH,
			payload: month
		});
	}
}
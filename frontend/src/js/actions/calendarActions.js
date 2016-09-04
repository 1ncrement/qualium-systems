/**
 * Created by Increment on 04.09.2016.
 */
import {CALENDAR_ADD_TASK, CALENDAR_ADD_TASK_ERR, CALENDAR_CHANGE_SELECT_DAY} from '../constants/calendarConst'
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
	return (dispatch) => {
		dispatch({
			type: CALENDAR_CHANGE_SELECT_DAY,
			payload: day
		});
	}
}
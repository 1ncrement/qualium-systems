/**
 * Created by Increment on 04.09.2016.
 */
import {CALENDAR_ADD_TASK,CALENDAR_ADD_TASK_ERR,CALENDAR_CHANGE_SELECT_DAY} from '../constants/calendarConst'
import moment from 'moment'

let date = moment();

const initState = {
	date,
	selected: date,
	month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	nameDays: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
};

export default function (state = initState, action) {
	switch(action.type){
		case CALENDAR_ADD_TASK:
			return {...state};
		case CALENDAR_ADD_TASK_ERR:
			return state;
		case CALENDAR_CHANGE_SELECT_DAY:
			return {...state, selected: action.payload.clone()};
		default:
			return state;
	}
}
/**
 * Created by Increment on 31.08.2016.
 */
import {combineReducers} from 'redux'
import userReducer from './userReducer'
import newsReducer from './newsReducer'
import calendarReducer from './calendarReducer'

export default combineReducers({
	user: userReducer,
	news: newsReducer,
	calendar: calendarReducer
})
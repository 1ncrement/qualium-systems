/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/calendarActions'

class Day extends Component {
	render() {
		let date = this.props.date,
			day = {
				date,
				number: date.date(),
				isCurrMonth: date.month() == this.props.month,
				today: date.isSame(new Date(), 'day'),
				selected: date.date() == this.props.selected.date() && this.props.selected.isSame(date, 'day')
			};

		return (
			<td
				data-day={date.toString()}
				onClick={this.selectDay.bind(this)}
				className={`${day.today ? 'day-today' : ''} ${day.isCurrMonth ? 'day-curr' : 'day-no-curr'} ${day.selected ? 'selected' : ''}`}
			>{day.number}</td>
		)
	}

	selectDay(e){
		let day = e.target.getAttribute('data-day');
		this.props.actions.changeSelectDay(moment(day));
	}
}

export default connect(
	({calendar}) => {
		return {calendar}
	},
	dispatch => {
		return {
			actions: bindActionCreators(actions, dispatch)
		}
	}
)(Day)
/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/calendarActions'
import Month from './Month'
import TaskManager from './TaskManager'

class CalendarComp extends Component {
	render() {
		window.moment = moment;//TODO for testing x)
		let date = this.props.calendar.date;

		return (
			<div className="row">
				<div className="calendar">
					<table className="table text-center">
						<thead>
						<tr>
							<th onClick={this.prevMonth.bind(this)} className="text-center">{'<'}</th>
							<th className="text-center"
							    colSpan="5">{this.props.calendar.month[date.month()]} {date.year()}</th>
							<th onClick={this.nextMonth.bind(this)} className="text-center">{'>'}</th>
						</tr>
						<tr>
							{this.props.calendar.nameDays.map(name=>(<th key={name} className="text-center">{name}</th>))}
						</tr>
						</thead>
						<Month date={date} selected={this.props.calendar.selected}/>
					</table>
					<TaskManager />
				</div>
			</div>
		)
	}

	nextMonth() {
		let next = this.props.calendar.date.clone();
		next.add(1, 'M');
		this.props.actions.changeMonth(next);
	}

	prevMonth() {
		let prev = this.props.calendar.date.clone();
		prev.add(-1, 'M');
		this.props.actions.changeMonth(prev);
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
)(CalendarComp)
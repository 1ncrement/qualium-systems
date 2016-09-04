/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/calendarActions'
import Month from './Month'

class CalendarComp extends Component {
	render() {
		let date = this.props.calendar.date;

		return (
			<div className="row text-center">
				<table className="table calendar">
					<thead>
						<tr>
							<th className="text-center">{'<'}</th>
							<th className="text-center" colSpan="5">{this.props.calendar.month[date.month()]}</th>
							<th className="text-center">{'>'}</th>
						</tr>
					<tr>
						{this.props.calendar.nameDays.map(name=>(<th key={name} className="text-center">{name}</th>))}
					</tr>
					</thead>
					<Month date={date} selected={this.props.calendar.selected} />
				</table>
			</div>
		)
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
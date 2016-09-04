/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/calendarActions'

class TaskManager extends Component{
	render(){

		return(
			<div className="taskManager">
				<h3>Task list <small>count: {this.props.calendar.tasks.length}</small></h3>
				<ul>
					{
						this.props.calendar.tasks.map(el=>{
							return (<li key={el._id}>{el.date} text: {el.text}</li>)
						})
					}
				</ul>
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
)(TaskManager)
/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import Day from './Day'

export default class Week extends Component {
	render() {
		let days = [],
			date = this.props.date;

		for (let i = 0; i < 7; i++) {
			days.push(<Day key={date.toString()} date={date} month={this.props.month} selected={this.props.selected} />);
			date = date.clone();
			date.add(1, 'd');
		}

		return (
			<tr>
				{days}
			</tr>
		)
	}
}
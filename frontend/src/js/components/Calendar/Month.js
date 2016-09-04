/**
 * Created by Increment on 04.09.2016.
 */
import React, {Component} from 'react'
import moment from 'moment'
import Week from './Week'

export default class Month extends Component {
	render() {
		let
			date = this.props.date.clone().startOf('month').startOf('isoWeek'),
			weeks = [],
			done = false,
			month = this.props.date.clone().month(),
			monthIndex = date.month(),
			count = 0;

		while(!done){
			weeks.push(<Week
				key={date.toString()}
				date={date.clone()}
				selected={this.props.selected}
				month={month}
			/>);
			date.add(1, 'w');
			done = count++ > 2 && monthIndex != date.month();
			monthIndex = date.month();
		}

		return (
			<tbody>
			{weeks}
			</tbody>
		)
	}
}
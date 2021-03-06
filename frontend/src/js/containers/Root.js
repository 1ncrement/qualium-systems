/**
 * Created by Increment on 30.08.2016.
 */
import React, {Component} from 'react'
import {Router, Route, browserHistory} from 'react-router'

/** Components */
import App from '../components/App'

/** Pages */
import Home from '../pages/Home'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import News from '../pages/News'
import Calendar from '../pages/Calendar'
import NoSuchPage from '../pages/NoSuchPage'

export default class Root extends Component{
	render(){
		return(
			<Router history={browserHistory}>
				<Route component={App}>
					<Route path="/" component={Home} />
					<Route path="login" component={Login} />
					<Route path="registration" component={Registration} />
					<Route path="news" component={News} />
					<Route path="calendar" component={Calendar} />
					<Route path="*" component={NoSuchPage} />
				</Route>
			</Router>
		)
	}
}
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
import Users from '../pages/Users'

export default class Root extends Component{
	render(){
		return(
			<Router history={browserHistory}>
				<Route component={App}>
					<Route path="/" component={Home} />
					<Route path="login" component={Login} />
					<Route path="registration" component={Registration} />
					<Route path="getusers" component={Users} />
				</Route>
			</Router>
		)
	}
}
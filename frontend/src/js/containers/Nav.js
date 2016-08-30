/**
 * Created by Increment on 30.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions/userActions'
import {Link} from 'react-router'

class Nav extends Component {
	render() {
		var sign = (
			<Link className="btn btn-default" to="/login">Sign In</Link>
		),
			user = '';
		if (localStorage.getItem('token')) {
			sign = (
				<a className="btn btn-default" onClick={this.logout.bind(this)}>Logout</a>
			)
		}
		if(localStorage.getItem('user')){
			let obj = JSON.parse(localStorage.getItem('user'));
			user = (
				<li><p className="navbar-text">Вы авторизованы как {obj.firstName} {obj.lastName}</p></li>
			)
		}
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Home</Link>
					</div>
					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li><Link className="btn btn-default" to="/getusers">Get Users</Link></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							{user}
							<li>{sign}</li>
							<li><Link className="btn btn-success" to="/registration">Sign Up</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}

	logout(e){
		e.preventDefault();
		this.props.actions.userLogout();
	}
}

export default connect(
	({userReducer}) => {
		return {userReducer}
	},
	dispatch => {
		return {
			actions: bindActionCreators(actions, dispatch)
		}
	}
)(Nav)
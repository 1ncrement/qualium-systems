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
		var sign = [],
			user = '';
		sign.push(<li key="login"><Link className="btn btn-default" to="/login">Sign In</Link></li>);
		sign.push(<li key="reg"><Link className="btn btn-success" to="/registration">Sign Up</Link></li>);

		if (localStorage.getItem('token')) {
			sign = [];
			sign.push(<li key="logout"><a className="btn btn-default" onClick={this.logout.bind(this)}>Logout</a></li>)
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
							<li><Link className="btn btn-default" to="/news">News</Link></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							{user}
							{sign.map(el=>el)}
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
	({user}) => {
		return {user}
	},
	dispatch => {
		return {
			actions: bindActionCreators(actions, dispatch)
		}
	}
)(Nav)
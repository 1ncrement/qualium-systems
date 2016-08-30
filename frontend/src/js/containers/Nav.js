/**
 * Created by Increment on 30.08.2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Nav extends Component {
	render() {
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
							<li><Link className="btn btn-default" to="/login">Sign In</Link></li>
							<li><Link className="btn btn-success" to="/registration">Sign Up</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

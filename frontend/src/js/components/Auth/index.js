/**
 * Created by Increment on 31.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/userActions'

class AuthComp extends Component {
	render() {
		return (
			<div className="row">
				<div className="page-header">
					<h2>Authorisation page</h2>
				</div>
				<form className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-2 control-label">Email</label>
						<div className="col-sm-10">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								ref="email"
								defaultValue="vakulenko.kname@gmail.com"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Password</label>
						<div className="col-sm-10">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								ref="password"
								defaultValue="123456789"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<div className="checkbox">
								<label>
									<input
										type="checkbox"
										ref="check"
									/> Remember me
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button onClick={this.reqAuth.bind(this)} className="btn btn-default">Login</button>
						</div>
					</div>
				</form>
			</div>
		)
	}

	reqAuth(e) {
		e.preventDefault();

		let email = this.refs.email.value,
			password = this.refs.password.value,
			check = this.refs.check.checked;

		this.props.actions.authUser({
			email,
			password,
			check
		});
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
)(AuthComp)
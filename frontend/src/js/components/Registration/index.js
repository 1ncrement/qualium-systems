/**
 * Created by Increment on 31.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/userActions'

class RegComp extends Component {
	render() {
		return (
			<div className="row">
				<h3>Registration page</h3>
				<form className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-2 control-label">First Name</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								placeholder="First Name"
								ref="firstName"
								defaultValue="Jeka"
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Last Name</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								placeholder="Last Name"
								ref="lastName"
								defaultValue="Vakula"
							/>
						</div>
					</div>
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
						<label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
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
									/> I agree.
								</label>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button onClick={this.reqReg.bind(this)} className="btn btn-default">Login</button>
						</div>
					</div>
				</form>
			</div>
		)
	}

	reqReg(e) {
		e.preventDefault();

		let
			firstName = this.refs.firstName.value,
			lastName = this.refs.lastName.value,
			email = this.refs.email.value,
			password = this.refs.password.value,
			check = this.refs.check.checked;

		this.props.actions.registrationUser({
			firstName,
			lastName,
			email,
			password,
			check
		});
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
)(RegComp)
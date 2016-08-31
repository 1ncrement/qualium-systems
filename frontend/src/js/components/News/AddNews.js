/**
 * Created by Increment on 31.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/newsActions'
import moment from 'moment'

class AddNews extends Component{
	render(){
		return(
			<div className="row">
				<div className="form-group">
					<input defaultValue="Title for web" type="text" ref="form-title" className="form-control" placeholder="News Title" />
				</div>
				<div className="form-group">
					<textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti dolorem, ipsam itaque iusto molestias mollitia quas similique sint ut!" type="text" ref="form-text" className="form-control" placeholder="News text" rows="3" />
				</div>
				<div className="form-group">
					<input defaultValue="news, web" type="text" ref="form-tags" className="form-control" placeholder="Exsample: web, weather, news" />
				</div>
				<a className="btn btn-success pull-right" onClick={this.addNews.bind(this)}>Submit</a>
			</div>
		)
	}

	addNews(e){
		e.preventDefault();

		let
			title = this.refs['form-title'].value,
			text = this.refs['form-text'].value,
			tags = this.refs['form-tags'].value.split(',').map(el=>el.trim());

		this.props.actions.addNews({
			author: JSON.parse(localStorage.getItem('user')).lastName,
			title,
			text,
			tags
		})
	}
}

export default connect(
	({news}) => {
		return {news}
	},
	dispatch => {
		return {
			actions: bindActionCreators(actions, dispatch)
		}
	}
)(AddNews)
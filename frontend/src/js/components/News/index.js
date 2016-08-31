/**
 * Created by user on 31.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/newsActions'
import moment from 'moment'
import AddNews from './AddNews'

class NewsComp extends Component{
	render(){
		var news = (
			<h4>Пока новостей нет.</h4>
		);
		if(this.props.news.docs){
			news = this.props.news.docs.map((el)=>{
				return (
					<article key={el._id} className="news">
						<span className="news-title">{el.title}<span className="news-props dropdown clearfix">
							<button className="btn btn-default btn-xs dropdown-toggle"
							        type="button"
							        id="dropdownMenu1"
							        data-toggle="dropdown"
							        aria-haspopup="true"
							        aria-expanded="true"><span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								<li><a >Edit</a></li>
								<li><a data-id={el._id} onClick={this.removeNews.bind(this)}>Remove</a></li>
							</ul>
						</span></span>
						<p className="news-body">
							{el.text}
						</p>
						<footer>
							<span className="author">author: {el.author}</span>
							{' '}
							<span className="tags">{el.tags.join(', ')}</span>
							{' '}
							<span className="date text-right">{moment(el.createdAt).format('MMM Do YY')}</span>
						</footer>
					</article>
				)
			})
		}

		var pagination = [];
		for(let i = 1;i <= this.props.news.pages;i++){
			pagination.push(
				<li key={i} className={(this.props.news.page == i) ? 'active' : ''}>
					<a data-page={i} onClick={this.getNews.bind(this)}>{i}</a>
				</li>
			);
		}
		return(
			<div className="row">
				<div className="page-header">
					<h2>News page. <small><a onClick={this.showFormAddNews.bind(this)} className="btn btn-info btn-xs">Add</a></small></h2>
				</div>
				<div className="row hide" ref="formAddNews">
					<AddNews />
					<hr />
				</div>
				<div className="container">
					{news}
				</div>
				<nav aria-label="Page navigation" className="text-center">
					<ul className="pagination">
						{pagination.map((el)=>el)}
					</ul>
				</nav>
			</div>
		)
	}

	getNews(e){
		e.preventDefault();
		this.props.actions.getNews(e.target.getAttribute('data-page'));
	}

	removeNews(e){
		this.props.actions.removeNews(e.target.getAttribute('data-id'));
	}

	showFormAddNews(e){
		this.refs.formAddNews.classList.toggle('hide');
	}

	componentWillMount(){
		this.props.actions.getNews(this.props.news.page);
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
)(NewsComp)
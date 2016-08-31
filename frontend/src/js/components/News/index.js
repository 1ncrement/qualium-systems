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
	componentWillMount(){
		this.props.actions.getNews(this.props.news.page);
	}

	render(){
		var news = (
			<h4>Пока новостей нет.</h4>
		);

		if(!localStorage.getItem('user')){
			news = (
				<h4>Вы не авторизованы.</h4>
			)
		}

		if(this.props.news.docs){
			news = this.props.news.docs.map((el)=>{
				return (
					<article key={el._id} data-id={el._id} className="news">
						<span className="news-title">{el.title}</span>
						<span className="news-props pull-right dropdown clearfix">
							<button className="btn btn-default btn-xs dropdown-toggle"
							        type="button"
							        id="dropdownMenu1"
							        data-toggle="dropdown"
							        aria-haspopup="true"
							        aria-expanded="true"><span className="caret"></span>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
								<li><a data-id={el._id} onClick={this.showEditForm.bind(this)}>Edit</a></li>
								<li><a data-id={el._id} onClick={this.removeNews.bind(this)}>Remove</a></li>
							</ul>
						</span>
						<p className="news-text">
							{el.text}
						</p>
						<footer>
							<span className="news-author">author: {el.author}</span>
							{' '}
							<span className="news-tags">tags: {el.tags.map((el, i)=>{return (<span key={i} className="label label-default">{el}</span>)})}</span>
							{' '}
							<span className="date text-right pull-right"><small>date:</small> {moment(el.createdAt).startOf('min').fromNow()}</span>
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
					<h2>News page. <small><a
						onClick={this.showFormAddNews.bind(this)}
						className={`btn btn-info btn-xs ${localStorage.getItem('user') ? '':'disabled'}`}>
						Add
					</a></small></h2>
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
		e.preventDefault();
		this.props.actions.removeNews(e.target.getAttribute('data-id'));
	}

	showFormAddNews(e){
		e.preventDefault();
		this.refs.formAddNews.classList.toggle('hide');
	}

	showEditForm(e){
		/** @todo доделать формирование формы которая будет брать значения из стейта по
		 * id и написать бекенд на findOne с фильтром по _id и update-ом */
		e.preventDefault();
		let id = e.target.closest('article.news').getAttribute('data-id');
		console.log(id);
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
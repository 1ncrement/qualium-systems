/**
 * Created by user on 31.08.2016.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/newsActions'
import moment from 'moment'
import AddNews from './AddNews'
import InlineEdit from 'react-edit-inline'

class NewsComp extends Component{
	componentWillMount(){
		this.props.actions.getNews(this.props.news.page);
	}

	render(){
		let flag = !!localStorage.getItem('user');
		var news = (
			<h4>Пока новостей нет.</h4>
		);

		if(!flag){
			news = (
				<h4>Вы не авторизованы.</h4>
			)
		}

		if(this.props.news.docs){
			news = this.props.news.docs.map((el)=>{
				return (
					<article key={el._id} data-id={el._id} className="news">
						<span className="news-title">
							{
								flag ?
								<InlineEdit
									activeClassName="form-control"
									text={el.title}
								   change={this.changeInput.bind(this)}
									paramName={`title~${el._id}`}
								/>
								:
								el.title
							}
						</span>

						<a data-id={el._id} className={`close pull-right ${flag?'':'hide'}`} onClick={this.removeNews.bind(this)}>&times;</a>

						<p className="news-text">
							{
								flag ?
									<InlineEdit
										activeClassName="form-control"
										text={el.text}
										change={this.changeInput.bind(this)}
										paramName={`text~${el._id}`}
									/>
									:
									el.text
							}
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
						className={`btn btn-info btn-xs ${flag ? '':'hide'}`}>
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

	changeInput(value){
		let _id, param;
		
		for(var prop in value){
			_id = prop.split('~')[1];
			param = prop.split('~')[0];
		}
		
		this.props.actions.editNews({
			_id,
			[param]: value[prop]
		});
		/** @todo доделать формирование формы которая будет брать значения из стейта по
		 * id и написать бекенд на findOne с фильтром по _id и update-ом */
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
/**
 * Created by Increment on 30.08.2016.
 */
import React, {Component} from 'react'
import Nav from '../containers/Nav'
import Footer from '../containers/Footer'

export default class App extends Component{
	render(){
		return(
			<div className="row">
				<Nav />

				<div className="container">
					{this.props.children}
				</div>

				<Footer />
			</div>
		)
	}
}
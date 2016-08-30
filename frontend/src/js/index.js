/**
 * Created by Increment on 30.08.2016.
 */
import '../scss/index.scss'

import React, {Component} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Root from './containers/Root'

import configureStore from './store'
const store = configureStore();

render(
	<Provider store={store} >
		<Root />
	</Provider>
	,
	document.querySelector('#root')
);
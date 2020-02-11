import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Modules from '../modules'
import {imageDetailAction} from '../actions/imageDetailAction'

const mapStateToProps = state => ({
	...state
})

const mapDispatchToProps = dispatch => ({
	imageDetailAction: (params) => dispatch(imageDetailAction(params))
})

class Routes extends Component {

	render() {
		return (
			<Modules
				{...this.props}
			/>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Routes);
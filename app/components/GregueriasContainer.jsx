import React from 'react'
import Greguerias from './Greguerias'
import InfiniteScroll from 'react-infinite-scroller'
import ReactModal from 'react-modal'
import GregueriaModal from './GregueriaModal'
import api from '../../config'
import _ from 'lodash'
import '../styles/Greguerias.css'

export default class GregueriasContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showModal: false,
			resultsLoaded: 10,
			resultsPerLoad: 10,
			hasMoreResults: true
		}

		this.addResults = this.addResults.bind(this)
		// this.hasMoreResults = this.hasMoreResults.bind(this)

	} 

	addResults() {

		console.log(this.props.results)

		if (this.props.results.length == 0) {
			return
		}

		if (this.props.results.length < this.state.resultsLoaded) {
			this.setState({hasMoreResults: false})
			return
		}

    	const resultsLoaded = this.state.resultsLoaded;
    	this.setState({resultsLoaded: resultsLoaded + this.state.resultsPerLoad})
	}

	render() {
		/*
		var resultGreguerias = []
		const len = this.props.results.length;
		for (var i = -1; ++i < len;) {
			resultGreguerias.push(this.props.greguerias[this.props.results[i]])
		}
		*/

		const spinner = (
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		)

		return (
			<div className="greguerias">
				<InfiniteScroll pageStart={0}
					loadMore={this.addResults}
					hasMore={this.state.hasMoreResults}
					loader={spinner}
					useWindow={false}
    			>
					<Greguerias greguerias={resultGreguerias} />
				</InfiniteScroll>
			</div>
		)
	}
}
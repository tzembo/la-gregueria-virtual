import React from 'react'
import { Row,
		 Col,
		 Container,
		 Button,
		 ButtonGroup } from 'reactstrap'
import Filters from './Filters'
import Greguerias from './Greguerias'
import GregueriasMap from './GregueriasMap'
import GregueriaModal from './GregueriaModal'
import api from '../../config'
import _ from 'lodash'
import '../styles/Search.css'
import queryString from 'query-string'
import Header from './Header'
import $ from 'jquery'

export default class Search extends React.Component {

	constructor(props) {

		super(props)

		this.state = {
			greguerias: [],
			results: [],
			// modal: false,
			map: false,
			// modalGregueria: null,
			// modalSimilar: []
		}

		this.processSearch = this.processSearch.bind(this)
		this.runSearch = this.runSearch.bind(this)
		this.loadGreguerias = this.loadGreguerias.bind(this)
		this.mapView = this.mapView.bind(this)
		this.textView = this.textView.bind(this)
		// this.showModal = this.showModal.bind(this)
		// this.hideModal = this.hideModal.bind(this)

	}

	/*
	showModal(id) {
		let url = "gregueria/" + id;
		api.get(url, (err, res) => {
			if (err) {
				console.warn(err)
			} else {
				console.log(res)
				this.setState({modal: true, modalGregueria: res.body['gregueria'], modalSimilar: res.body['similar_greguerias']})
			}
		})
	}

	hideModal() {
		this.setState({modal: false})
	}
	*/

	mapView() {
		this.setState({map: true})
	}

	textView() {
		this.setState({map: false})
	}

	componentDidMount() {

		if (this.props.location.search) {
			const parsed = queryString.parse(this.props.location.search)
			if (parsed.view == "map") {
				this.mapView();
			} else {
				this.textView();
			}
		}

		this.search = _.debounce(url => {
			api.get(url, this.processSearch);
		}, 400)

		this.loadGreguerias()
	}

	processSearch(err, res) {
		if (err) {
			console.warn(err)
		} else {
			console.log(res)
			this.setState({results: res.body['results']})
		}
	}

	loadGreguerias() {
		let url = "greguerias/all/"
		api.get(url, (err, res) => {
			if (err) {
				console.warn(err)
			} else {
				console.log(res)
				const results = res.body['results'].map((result) => {
					return result['id']
				})
				this.setState({greguerias: res.body['results']})
			}
		})
	}

	runSearch() {
		let url = "greguerias?"
		const fulltext = document.querySelector('.gregueria-search').value
		const wcmin = document.querySelector('.wc-min').value
		const wcmax = document.querySelector('.wc-max').value
		const tags = document.getElementsByName('select-tag')[0].value
		console.log(tags)
		if (fulltext) url += 'fulltext=' + encodeURIComponent(fulltext) + '&'
		if (wcmin) url += 'wcmin=' + wcmin + '&'
		if (wcmax) url += 'wcmax=' + wcmax + '&'
		if (tags) url += 'tags=' + tags + '&'
		this.search(url)
	}


	render() {

		let results = null;

		if (this.state.map) {
			if (this.state.greguerias.length > 0) {
				results = <GregueriasMap width={$('.right').width()} height={$('.right').height()} greguerias={this.state.greguerias} results={this.state.results}  />;
			}
		} else {
			results = <Greguerias results={this.state.results} onBodyClick={this.showModal}/>
		}

		return (
			<div>
				<div className="left">
					<Header />
					<Filters updateSearch={this.runSearch} />
					<ButtonGroup className="w-100 mt-3">
						<Button outline className="view-control w-50" color="secondary" onClick={this.textView}>Text View</Button>
						<Button outline className="view-control w-50" color="secondary" onClick={this.mapView}>Map View</Button>
					</ButtonGroup>
					<div className="mb-3 mt-3" ><span className="text-muted">  {this.state.results.length} results found.</span></div>
				</div>
				<div className="right">
						{results}
				</div>
			</div>
		)
	}
}
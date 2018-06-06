import React from 'react'
import Header from './Header'
import Greguerias from './Greguerias'
import {
  InteractiveForceGraph,
  ForceGraph,
  ForceGraphNode,
  ForceGraphLink,
  ForceGraphArrowLink
} from 'react-vis-force'
import api from '../../config'
import {
	Container,
	Row,
	Col
} from 'reactstrap'
import queryString from 'query-string'
import Select from 'react-select'
import Graph from '../../data/graph.json'
import $ from 'jquery'
import 'react-select/dist/react-select.css'


export default class Themes extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			greguerias: [],
			results: [],
			selectedOption: {
				value: 'humano',
				label: 'humano'
			},
			selectedNode: {
      			"id": "humano",
      			"group": 1
    		}
		}

		this.handleSelectNode = this.handleSelectNode.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.getTopic = this.getTopic.bind(this)
		this.runSearch = this.runSearch.bind(this)
		this.loadGreguerias = this.loadGreguerias.bind(this)
		this.processSearch = this.processSearch.bind(this)
	}

	componentDidMount () {
		this.getTopic()

		this.search = _.debounce(url => {
			api.get(url, this.processSearch);
		}, 400)

		this.loadGreguerias()
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

	processSearch(err, res) {
		if (err) {
			console.warn(err)
		} else {
			console.log(res)
			const results = res.body['results'].map((result) => {
				return result['id']
			})
			this.setState({results: results})
		}
	}

	getTopic() {
		if (this.props.location.search) {
			const parsed = queryString.parse(this.props.location.search)
			this.setState({ selectedOption: {
								value: parsed.id,
								label: parsed.id
							}})
		}
	}

	handleChange(selectedOption) {
		const update = selectedOption === null ? '' : selectedOption;
    	this.setState({ selectedOption: update }, this.runSearch());
  	}

	handleSelectNode(event, node) {
		this.setState({selectedNode: node});
	}

	runSearch() {
		let url = "greguerias?"
		const tags = document.getElementsByName('select-tag')[0].value
		if (tags) url += 'tags=' + tags + '&'
		this.search(url)
	}


	render() {

		const nodes = Graph.nodes.filter(node => {
			if (node.group == this.state.selectedNode.group || node.root) {
				return true;
			} else {
				return false;
			}
		}).map(node => {
			return (
				<ForceGraphNode
					key={node.id}
					node={{id: node.id, group: node.group, radius: 6 }}
					fill="#11939A"
				/>
			)
		})

		console.log(nodes)

		const links = Graph.links.filter(link => {
			if (link.group == this.state.selectedNode.group) {
				return true;
			} else {
				return false;
			}
		}).map(link => {
			return (
				<ForceGraphLink
	              key={`${link.source}=>${link.target}`}
	              link={{ source: link.source, target: link.target, value: link.value }}
	            />					
			)
		})

		console.log(links)

		const tags = Graph.nodes.map(node => {
			return {value: node.id, label: node.id}
		})

		return (
			<div>
				<div className="left">
					<Header />
					<Select
						name="select-tag"
						value={this.state.selectedOption.value}
						onChange={this.handleChange}
						options={tags}
    				/>
					<InteractiveForceGraph
						simulationOptions={{ height: 400,
											 width: $(".left").width(),
											 animate: true,
											 strength: {
											 	charge: -180
											 }}}
						onSelectNode={this.handleSelectNode}
						//defaultSelectedNode={{id:"humano"}}
						//selectedNode={{id:this.state.selectedOption.value}}
						highlightDependencies
						showLabels
					>
						{nodes}
						{links}
					</InteractiveForceGraph>
				</div>
				<div className="right">
					<Greguerias greguerias={this.state.greguerias} results={this.state.results} onBodyClick={this.showModal} />
				</div>
			</div>
		)
	}
}
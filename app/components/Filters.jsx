import React from 'react'
import { Row,
		 Col,
		 Container,
		 InputGroup,
		 InputGroupButton,
		 Input,
		 Button,
		 ButtonGroup,
		 Collapse,
		 Card,
		 CardBody,
		 ListGroup,
		 ListGroupItem } from 'reactstrap'
import Select from 'react-select'
import Graph from '../../data/graph.json'
import '../styles/Filters.css'

export default class Search extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			value: []
		}

		// this.toggleFilter = this.toggleFilter.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	/*
	toggleFilter() {
		this.setState({collapse: !this.state.collapse});
	}
	*/

	handleChange(update) {
		const value = update === null ? '' : update;
    	this.setState({ value }, this.props.updateSearch);
  	}


	render() {

		const tags = Graph.nodes.map(node => {
			return {value: node.id, label: node.id}
		})

		return (
			<div>
				<Input placeholder="Search..." className="gregueria-search" onChange={this.props.updateSearch} />
				
				<div className="mb-2 mt-4">Word count</div>
				<div className="d-flex flex-row w-100 justify-content-between">
					<Input placeholder="Min" type="number" className="wc wc-min" onChange={this.props.updateSearch}/>
					<Input placeholder="Max" type="number" className="wc wc-max" onChange={this.props.updateSearch}/>
				</div>
			
				<div className="mb-2 mt-4">Tags</div>
				<Select
						name="select-tag"
						className="select-tag"
						multi={true}
						joinValues={true}
						delimeter=','
						value={this.state.value}
						onChange={this.handleChange}
						options={tags}
    				/>

			</div>
		)
	}
} 
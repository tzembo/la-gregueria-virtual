import React from 'react'
import { Card,
		 CardText,
		 CardBody,
		 CardFooter,
		 Badge } from 'reactstrap'
import { Link,
		 LinkContainer } from 'react-router-bootstrap'
import $ from 'jquery'
import Mark from 'mark.js'

import '../styles/Gregueria.css'

export default class Gregueria extends React.Component {

	constructor(props) {
		super(props)
		this.createMarkup = this.createMarkup.bind(this)
		this.handleBodyClick = this.handleBodyClick.bind(this)
	}

	createMarkup() {
		return {__html: this.props.gregueria.text};
	}

	handleBodyClick() {
		this.props.onBodyClick(this.props.gregueria.id)
	}

	componentWillMount() {
		console.log(this.props.gregueria.text)
	}

	componentDidMount() {
	}

	render() {

		let tagFooter = null

		if (this.props.gregueria.tags.length > 0) {
			const tags = this.props.gregueria.tags.map((tag, i) => {
				return (<span key={i}><LinkContainer to={'/topics?id=' + tag + '#'}><Badge className="tag" color="secondary">{tag}</Badge></LinkContainer> </span>)
			})
			tagFooter = <CardFooter>{tags}</CardFooter>
		}

    	let parts = this.props.gregueria.text.split(new RegExp('<mark>'));
    	console.log(parts)

    	let highlightedText = (<span>
    		{ parts.map((part, i) =>
    			<span key={i} style={i % 2 == 1 ? { backgroundColor: '#fff8b5' } : {} }>
    				{part}
    			</span>)
    		} </span>
    	);
    
	
		return (
			<Card className="gregueria">
				<CardBody onClick={this.handleBodyClick} className="gregueria-body">
					<CardText>
						{highlightedText}
					</CardText>
				</CardBody>
				{tagFooter}
			</Card>
		)			
	}
}
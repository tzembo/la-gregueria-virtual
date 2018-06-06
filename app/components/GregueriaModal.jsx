import React from 'react'
import Gregueria from './Gregueria'
import { Badge } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/GregueriaModal.css'

export default class GregueriaModal extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {

		let tags = null;

		if (this.props.gregueria.tags.length == 0) {
			tags = "None."
		} else {
			tags = this.props.gregueria.tags.map((tag, i) =>
				<span key={i}><LinkContainer to={'/topics?id=' + tag + '#'}><Badge className="tag" color="secondary">{tag}</Badge></LinkContainer> </span>
			)
		}

		const similarGreguerias = this.props.similar.map( (gregueria) => {
			return <Gregueria gregueria={gregueria} onBodyClick={this.props.onBodyClick} />
		})

		return (
			<div>
				<div className="gregueria-header" onClick={this.props.onClose}>Back</div>
				<div className="gregueria-content">
					<div className="gregueria-body">
						<p>{this.props.gregueria.text}</p>
						<h5>Tags</h5>
						<p>{tags}</p>
						<h5>Word count</h5>
						<p>{this.props.gregueria.wc}</p>
						<h5>Similar greguerias</h5>
					</div>
					<div className="gregueria-similar">
						{similarGreguerias}
					</div>
				</div>
			</div>
		)
	}
}


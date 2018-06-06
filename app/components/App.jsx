// App.jsx
import React from 'react'
import Header from './Header'
import { Container } from 'reactstrap'

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			spanish: false
		}

		this.changeLanguage = this.changeLanguage.bind(this)

	}

	componentDidMount() {

	}

	changeLanguage() {
		if (this.state.spanish) {
			this.setState({spanish: false})
			// change word?
		} else {
			this.setState({spanish: true})
		}
	}




	render() {

		const routeView = this.props.children;

		return (
			<div>
				<div>
					{routeView}
				</div>
			</div>
		);
	}
}

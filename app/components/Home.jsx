// Home.jsx
import React from 'react'
import Header from './Header'
import Greguerias from './Greguerias'
import { Button } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import api from '../../config'
import _ from 'lodash'
import $ from 'jquery'
import homeImg from '../images/home.jpg';
import '../styles/Home.css'


export default class Home extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			greguerias: [],
			results: []
		}

		this.loadGreguerias = this.loadGreguerias.bind(this)

	}

	componentDidMount() {
		this.loadGreguerias()

		var div = $('div.greguerias');
		var scroller = setInterval(function(){
			var pos = div.scrollTop();
				div.scrollTop(++pos);
		}, 40);

		div.mouseover( () => {
			clearInterval(scroller);
		})

		div.mouseout( () => {
			scroller = setInterval(function(){
				var pos = div.scrollTop();
				div.scrollTop(++pos);
			}, 35);
		})
	}


	loadGreguerias() {
		let url = "greguerias/all/"
		api.get(url, (err, res) => {
			if (err) {
				console.warn(err)
			} else {
				console.log(res)
				this.setState({results: _.shuffle(res.body['results'])})
			}
		})
	}

	render() {


		const image = (<img src={"build/" + homeImg} alt='Ramón Gómez de la Serna' />);

		return (
			<div>
				<div className="left">
					<Header />
					{image}
					<LinkContainer to="/search"><Button className="w-100 mt-2" color="success">Start searching!</Button></LinkContainer>
					<LinkContainer to="/topics"><Button className="w-100 mt-2" color="light">Browse topics</Button></LinkContainer>

				</div>
				<div className="right">
					<Greguerias results={this.state.results}
								infinite={true}
					/>
				</div>
			</div>
		);
	}
}

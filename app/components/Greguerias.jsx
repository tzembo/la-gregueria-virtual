import React from 'react'
import Gregueria from './Gregueria'
import { CardColumns } from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroller'
import ReactModal from 'react-modal'
import GregueriaModal from './GregueriaModal'
import _ from 'lodash'
import api from '../../config'
import '../styles/Greguerias.css'
import Mark from 'mark.js'

// var instance = new Mark(document.querySelector(".gregueria-body"));

export default class Greguerias extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showModal: false,
			gregueria: '',
			similarGreguerias: [],
			resultsLoaded: 10,
			resultsPerLoad: 10,
			hasMoreResults: true
		}

		this.addResults = this.addResults.bind(this)

		this.handleOpenModal = this.handleOpenModal.bind(this);
   		this.handleCloseModal = this.handleCloseModal.bind(this);

	} 

	componentDidMount() {
		console.log(this.props.results)

	}

	componentDidUpdate() {
		// instance.markRegExp(/<mark>.*?<\/mark>/)
		//console.log("shoould")
	}

	handleOpenModal(id) {
		let url = "gregueria/" + id
		api.get(url, (err, res) => {
			if (err) {
				console.warn(err)
			} else {
				this.setState({
					gregueria: res.body['gregueria'],
					similarGreguerias: res.body['similar_greguerias'],
					showModal: true
				})
			}
		})
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}
  
  	componentDidMount() {
  		console.log(this.props.results)
  	}

	addResults() {

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

		const spinner = (
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		)

		let greguerias;

		if (this.props.infinite) {
			greguerias = (
				<InfiniteScroll pageStart={0}
								loadMore={this.addResults}
								hasMore={this.state.hasMoreResults}
								loader={spinner}
								useWindow={false}
				>
					{_.take(this.props.results, this.state.resultsLoaded).map((gregueria, i) => {
								console.log(gregueria.text)
								return <Gregueria key={i}
												  map={false}
												  gregueria={gregueria} 
												  onBodyClick={this.handleOpenModal}
										/>
					})}
				</InfiniteScroll>
			)
		} else {
			greguerias = (
				<div>
					{this.props.results.map((gregueria, i) => {
						return <Gregueria key={i}
										  map={false}
										  gregueria={gregueria}
										  id={gregueria.id}
										  onBodyClick={this.handleOpenModal}
								/>
					})}
				</div>
			)
		}

		

		return (
			<div className="greguerias">
				<ReactModal 
		           isOpen={this.state.showModal}
		           contentLabel="Gregueria"
		           onRequestClose={this.handleCloseModal}
		           style={{
              			overlay: {
                			backgroundColor: 'rgba(0, 0, 0, 0.70)'
              			},
              			content: {
                			top: '30px',
                			bottom: '30px',
                			left: '150px',
                			right: '150px',
							border: '0px',
                			borderRadius: '0px',
                			padding: '0px'
              			}
            		}}
		        >
		          <GregueriaModal 
		          				  gregueria={this.state.gregueria}
		          				  similar={this.state.similarGreguerias}
		          				  onBodyClick={this.handleOpenModal}
		          				  onClose={this.handleCloseModal}
		          />
		        </ReactModal>
		        {greguerias}
			</div>
		)
	}
}


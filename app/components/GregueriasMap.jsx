import React from 'react'
import Gregueria from './Gregueria'
import { Card, CardBody } from 'reactstrap'
import * as d3 from "d3";
import '../styles/GregueriasMap.css'
import _ from 'lodash'
import $ from 'jquery'

const quadtree = d3.quadtree()
              		.x(point => { return point.x })
              		.y(point => { return point.y });


// point settings
const pointRadius = 3;

const cardOffset = 10;

// x and y scales
var x;
var y;


export default class GregueriasMap extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			results: this.props.results.map((result) => {
				return result.id
			}),
			selectedPoint: 0
		}
		this.draw = this.draw.bind(this)
	}

	// initialize d3 scatterplot
	componentDidMount() {

		var canvas = d3.select("canvas");
		const context = canvas.node().getContext('2d');

		quadtree.addAll(this.props.greguerias);
		x = d3.scaleLinear().range([0, this.props.width]).nice();
		y = d3.scaleLinear().range([this.props.height, 0]);

		x.domain(d3.extent(this.props.greguerias, point => { return point.x; })).nice();
		y.domain(d3.extent(this.props.greguerias, point => { return point.y; })).nice();

		this.draw(d3.zoomIdentity); // draw initial 

		// handle zoom calls
		canvas.call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", (event) => {
			this.draw(d3.event.transform);
		}))

		// handle mouse
		$('.map').mousemove( (event) => {

			var position = $(".map").offset()

			var transform = d3.zoomTransform(canvas.node());

			var canvasX = x.invert(transform.invertX(event.pageX - position.left));
			var canvasY = y.invert(transform.invertY(event.pageY - position.top));

			var closest = quadtree.find(canvasX, canvasY);

			$('.map-focus').css({top: event.pageY + cardOffset, left: event.pageX + cardOffset}).text(this.props.greguerias[closest.id].text).show()

			this.setState({selectedPoint: closest.id}, () => {
				this.draw(transform);
			})

		});

		$('.map').mouseout( (event) => {

			$('.map-focus').hide();

			var transform = d3.zoomTransform(canvas.node());
			this.draw(transform);
		});
		
	}

	// prevent re-rendering of canvas
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	componentWillReceiveProps(nextProps) {
		
		this.setState({results: nextProps.results.map((result) => {
				return result.id
			})}, () => {
			const canvas = d3.select("canvas");
			const transform = d3.zoomTransform(canvas.node());
			this.draw(transform)			
		})

		
	}

	// update the canvas
	draw(transform) {

		var dx, dy;
		var canvas = d3.select("canvas");
		const context = canvas.node().getContext('2d');		

		context.clearRect(0, 0, this.props.width, this.props.height);

		context.beginPath();
		for (let i = 0; i < this.props.greguerias.length; ++i) {
			var point = this.props.greguerias[i];

			if (point.id == this.state.selectedPoint || this.state.results.includes(point.id)) continue;

	    	dx = transform.applyX(x(point.x));
	    	dy = transform.applyY(y(point.y));
	    	context.moveTo(dx, dy);
	    	context.arc(dx, dy, pointRadius, 0, 2 * Math.PI);
		}
		context.fillStyle = "rgba(66,146,198,0.5)";
		context.fill();

		context.beginPath();
		for (let i = 0; i < this.state.results.length; ++i) {
			var point = this.props.greguerias[this.state.results[i]];

			dx = transform.applyX(x(point.x));
	    	dy = transform.applyY(y(point.y));
	    	context.moveTo(dx, dy);
	    	context.arc(dx, dy, pointRadius, 0, 2 * Math.PI);
		}
		context.fillStyle = "rgb(255,140,0)";
		context.fill();

		context.beginPath();
		var point = this.props.greguerias[this.state.selectedPoint];
		dx = transform.applyX(x(point.x));
	    dy = transform.applyY(y(point.y));
	    context.moveTo(dx, dy);
	    context.arc(dx, dy, pointRadius, 0, 2 * Math.PI);
	    context.fillStyle = "rgb(255,0,0)"
	    context.fill();

	}

	render() {
		return (
			<div>
				<canvas className="map" width={this.props.width} height={this.props.height} />
				<div className="map-focus"></div>
			</div>
		)
	}
}

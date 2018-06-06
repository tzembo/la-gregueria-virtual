// Home.jsx
import React from 'react'
import Header from './Header'
import { Button } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import $ from 'jquery'
import homeImg from '../images/home.jpg';
import '../styles/Home.css'
import '../styles/main.css'


export default class About extends React.Component {

	render() {

		const about = (
			<div className="about">
				<div className="heading">About Ramón Gomez de la Serna</div>
				<div className="content">The Spanish author, Ramón Gómez de la Serna (Madrid 1888-Buenos Aires 1963), was a
central figure of the avant-garde whose work was praised by authors such as José Ortega
y Gasset, Walter Benjamin, Jorge Luis Borges, Pablo Neruda, and Octavio Paz. Among
his abundant production of novels, essays, and plays one can find his famous greguerías
—brief literary creations that Gómez de la Serna once described as “Humor + metaphor.”
Due to their brevity, the greguerías have often been compared to aphorisms, haiku, and
maxims, however the audacity of their humor and their endless experimentations with
imagery have set the greguerías apart from these other short forms and secured them their
own place in the canon and in literary history.</div>
				<div className="heading">About the project</div>
				<div className="content">Throughout his career, Gómez de la Serna composed more than 10,000 greguerías, which
he published in Spanish and Latin American anthologies, journals, and newspapers. After
his death, collections of his greguerías continued to be published. In this way, without the
author’s supervision, various critics and editors compiled their own selections of
greguerías and offered them to contemporary readers. Our current project, “The Virtual
Greguería”, aims to continue this editorial tradition while also enhancing it with some
new digital tools that change that ways in which modern readers can interact with the
greguerías. For the first time, the entire catalogue of greguerías will be available in one
location, a task that previously required the consultation of multiple volumes and
collections. Through our website, the reader will be able to search for greguerías by using
specific key words or phrases or by simply narrowing a search via a list of categories
provided. All of these options will allow readers to create their own personalized
collections of greguerías based on their individual interests.</div>
			<div className="heading">Acknowledgements</div>
		</div>
		)


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
					{about}
				</div>
			</div>
		);
	}
}

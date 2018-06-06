import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'
import About from './components/About'
import Home from './components/Home'
import Search from './components/Search'
import Themes from './components/Themes'
import { Container } from 'reactstrap'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  { path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

ReactDOM.render(
	<Router>
    	<App>
    		<Route exact path="/" component={Home} />
      		<Route path="/search" component={Search} />
      		<Route path="/about" component={About} />
      		<Route path="/topics" component={Themes} />
    	</App>
  	</Router>, document.getElementById("content")
);
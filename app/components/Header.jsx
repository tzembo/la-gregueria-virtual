import React from 'react'
import { Link,
         NavLink } from 'react-router-dom'
import '../styles/Header.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Link to="/" className="header"><div>La Greguería Virtual</div></Link>
        <div className="navigation">
            <NavLink className="header-link" activeClassName="header-active" to="/search?view=text">Browse</NavLink>
            <NavLink className="header-link" activeClassName="header-active" to="/search?view=map">Map</NavLink>
            <NavLink className="header-link" activeClassName="header-active" to="/topics">Topics</NavLink>
            <NavLink className="header-link" activeClassName="header-active" to="/about">About</NavLink>
            <NavLink className="header-link" activeClassName="header-active" to="/spanish">Español</NavLink>
        </div>
      </div>
    );
  }
}

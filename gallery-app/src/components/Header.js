import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPORT COMPONENTS
import Nav from './Nav';

//The Header component just has an H1 element with a Link to the root of the site, and imports the Nav component.
class Header extends Component {
  render() {
    return(
      <header>
        <h2><Link to="/">React Gallery App</Link></h2>
        <Nav />
      </header>
    );
  }
}

export default Header;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return(
      <nav>
        <ul className="main-nav">
          <li><NavLink to="/trees">Trees</NavLink></li>
          <li><NavLink to="/mountains">Mountains</NavLink></li>
          <li><NavLink to="/lakes">Lakes</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;

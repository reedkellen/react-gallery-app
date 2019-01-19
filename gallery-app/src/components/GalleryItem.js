import React, { Component } from 'react';

class GalleryItem extends Component {
  render() {
    return(
      <li>
        <img className="gallery-item" src={this.props.src} alt={this.props.alt} />
      </li>
    );
  }
}

export default GalleryItem;

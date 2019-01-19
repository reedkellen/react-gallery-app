import React, { Component } from 'react';

//IMPORT COMPONENTS
import GalleryItem from './GalleryItem';

//The Gallery component creates a gallery container and populates the search term via props, and then renders each Gallery component (photo) by mapping through the array (passed through props) that corresponds to the search term.
class Gallery extends Component {
  render() {
    return(
      <div className="photo-container">
        <h2>Photo Gallery</h2>
        <h3>Search: {this.props.searchTerm}</h3>
        <ul>
          {(this.props.array).map(function(image) {
            return <GalleryItem src={image.url_m} alt='An image' key={image.id}/>
          })}
        </ul>
      </div>
    );
  }
};

export default Gallery;

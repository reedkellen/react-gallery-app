import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//IMPORT STYLES
import './App.css';

//IMPORT COMPONENTS
import Gallery from './components/Gallery';
import Header from './components/Header';
import SearchForm from './components/SearchForm';

//IMPORT FLICKR API KEY
import apiKey from './config';

//Save the base Flickr API URL in a variable to combine with each search term.
const flickrAPIURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&safe_search=1&extras=url_m&per_page=24&format=json&nojsoncallback=1&tags=`;

class App extends Component {
  //Call the constructor to add state for the photo arrays, search terms, and search text field.
  constructor(props) {
    super(props);
    this.state = {
      homePhotoArray : [],
      treePhotoArray : [],
      mountainPhotoArray : [],
      lakePhotoArray : [],
      searchPhotoArray : [],
      searchTerms : [
        'puppy',
        'tree',
        'mountain',
        'lake'
      ],
      userSearchText : 'waiting on user input',
      searchURL : flickrAPIURL,
      userSearchURL : flickrAPIURL + 'nothing'
    };
  }

  //Create a method that saves the value of the search text field from SearchForm.js.  Arrow functions eliminate the need for binding this inside the state.
  saveSearchText = (event) => {
    this.setState({userSearchText : event.target.value});
    this.setState({userSearchURL : flickrAPIURL + event.target.value});
  }

  //Create a method that fetches data using the search + flickrAPIURL and populate the searchPhotoArray, prevent default stops the page from reloading and loss of data.
  fetchSearchPhotos = (event) => {
    fetch(this.state.userSearchURL)
      .then(res => res.json())
      .then(data => this.setState({searchPhotoArray : data.photos.photo}));
      event.preventDefault();
  }

  //Run the intial fetch of photos for the home page and the three built-in search pages.  Each fetch combines a search term with the flickr URL and populates a photo array.
  componentDidMount() {
    fetch(this.state.searchURL + this.state.searchTerms[0])
      .then(res => res.json())
      .then(data => this.setState({homePhotoArray : data.photos.photo}));
    fetch(this.state.searchURL + this.state.searchTerms[1])
      .then(res => res.json())
      .then(data => this.setState({treePhotoArray : data.photos.photo}));
    fetch(this.state.searchURL + this.state.searchTerms[2])
      .then(res => res.json())
      .then(data => this.setState({mountainPhotoArray : data.photos.photo}));
    fetch(this.state.searchURL + this.state.searchTerms[3])
      .then(res => res.json())
      .then(data => this.setState({lakePhotoArray : data.photos.photo}));
  }

  render() {
    return (
      //Wrap the app inside Router tags
      //The Header and Navigation (nested inside the Header) are on every page.  The search field is only on the Search page.
      //The render method is called on all Routes to allow for passing props to the components being rendered - specifically the search term and array with corresponding photos.
      //The two methods created above are passed to the SearchForm component to extract the text from the search field and populate the photo array on 'submit'.
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" render={ () =>
            <Gallery searchTerm={this.state.searchTerms[0]} array={this.state.homePhotoArray} /> } />
          <Route path="/trees" render={ () =>
            <Gallery searchTerm={this.state.searchTerms[1]} array={this.state.treePhotoArray} /> } />
          <Route path="/mountains" render={ () =>
            <Gallery searchTerm={this.state.searchTerms[2]} array={this.state.mountainPhotoArray} /> } />
          <Route path="/lakes" render={ () =>
            <Gallery searchTerm={this.state.searchTerms[3]} array={this.state.lakePhotoArray} /> } />
          <Route path="/search" render={ () =>
            <div>
              <SearchForm onChange={this.saveSearchText} onClick={this.fetchSearchPhotos} />
              <Gallery searchTerm={this.state.userSearchText} array={this.state.searchPhotoArray} />
            </div>} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, {Component, PropTypes, createElement} from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base64-js';
var request = require('request');
import {bake_cookie, read_cookie} from 'sfcookies';
import {connect} from 'react-redux';
import {setArtist, setTopTracks, setAccessToken} from '../actions';
//import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import * as SpotifyWebApi from 'spotify-web-api-js';
import Profile from './Profile';
import Gallery from './Gallery';
import NewReleases from './NewReleases';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      artist: null,
      tracks: null,
      featurePlaylists: null,
      spotify_code: ''
    };
  }

  componentDidMount() {
    //this.clientCredentials();

    const artist = read_cookie('artist');
    this.props.setArtist(artist);
    if (artist != null) {
      this.searchTopTracks(artist);
    }
    this.authentificationProcess();
    //this.getFeaturePlayLists();
  }

  clientCredentials() {
    var request = require('request'); // "Request" library

    var client_id = '864d1c0ec7604e418dbcec6ad2e438de'; // Your client id
    var client_secret = '42eb263122de432faaf7b974c815c64a'; // Your secret

    // your application requests authorization
    var myHeaders = new Headers({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    });

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      crossDomain: true,
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    console.log("authOptions ", authOptions);
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        console.log("response body", body);
        // use the access token to access the Spotify Web API
        var accesToken = body.access_token;
        this.props.setAccessToken(accesToken);
      }
    });
  }

  authentificationProcess() {
    const AUTHORISE_URL = "https://accounts.spotify.com/authorize?";
    let TOKEN_URL = 'https://accounts.spotify.com/api/token';
    const CALLBACK_URL = 'http://localhost:3000/';
    const client_id = "864d1c0ec7604e418dbcec6ad2e438de";
    const client_secret = "42eb263122de432faaf7b974c815c64a";
    const client_credentials = new Buffer(client_id + ":" + client_secret);
    const client_credentials_base64 = 'Basic ' + client_credentials.toString('base64');

    let FETCH_URL = `${AUTHORISE_URL}client_id=${client_id}&response_type=code&redirect_uri=${CALLBACK_URL}`;
    console.log("requests authorization url: ", FETCH_URL);

    TOKEN_URL = 'https://accounts.spotify.com/api/token';

    var formBody = [];
    var encodedKey = encodeURIComponent('grant_type');
    var encodedValue = encodeURIComponent('client_credentials');
    formBody.push(encodedKey + "=" + encodedValue);
    formBody = formBody.join("&");
    // need to add https://accounts.spotify.com/api/token in the cors extension of chrome to get it works
    var authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      crossDomain: true,
      body: formBody
    };

    fetch(TOKEN_URL, authOptions).then(response => {
      console.log("token acces response: ", response);
      return response.json();
    }).then(result => {
      var accessToken = result.access_token;
      this.props.setAccessToken(accessToken);
    });

  }

  search() {
    console.log('this.state', this.state);
    const SEARCH_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${SEARCH_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    console.log("FETCH_URL ", FETCH_URL);
    fetch(FETCH_URL, {method: 'GET'}).then(response => response.json()).then(json => {
      const artist = json.artists.items[0];
      this.props.setArtist(artist);
      this.searchTopTracks(artist);
    });
  }

  searchTopTracks(artist) {
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    if (artist !== null) {
      let FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=FR&`;
      fetch(FETCH_URL, {method: 'GET'}).then(response => response.json()).then(json => {
        const {tracks} = json;
        this.props.setTopTracks(tracks);
      });
    }
  }

  render() {
    return (< div className = "App" > < div className = "App-title" > Music Master < /div> < FormGroup > <
    InputGroup >
    < FormControl type = "text"
    placeholder = "serach an artist..."
    value = {
      this.state.query
    }
    onChange = {
      event => {
        this.setState({
          query: event.target.value
        })
      }
    }
    onKeyPress = {
      event => {
        if (event.key === 'Enter') {
          this.search();
        }
      }
    }
    / > < InputGroup.Addon onClick = {
      () => this.search()
    } > < Glyphicon glyph = "search" > < /Glyphicon> < /InputGroup.Addon > < /InputGroup> < /FormGroup > { < div > {
      this.props.artist !== null
      ? < Profile artist = {
        this.props.artist
      } />: < div > < /div >
    } < Gallery tracks = {
      this.props.topTracks
    }
    / > {
      this.props.accessToken !== ''
      ? < NewReleases />
    : <div></div>
} </div>
} </div>);
}}

function mapStateToProps(state) {
  const {artist, topTracks, accessToken} = state;
  return {artist, topTracks, accessToken};

}

export default connect(mapStateToProps, {setArtist, setTopTracks, setAccessToken})(App);

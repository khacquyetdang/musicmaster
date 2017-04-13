import React, {Component} from 'react';
import base64 from 'base64-js';
var request = require('request');
import {bake_cookie, read_cookie} from 'sfcookies';
import {connect} from 'react-redux';
import { setArtist, setTopTracks } from '../actions';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import * as SpotifyWebApi from 'spotify-web-api-js';
import Profile from './Profile';
import Gallery from './Gallery';


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
    console.log('componentDidMount artist', artist);

    this.props.setArtist({artist:artist });
    if (artist != null)
    {
      this.searchTopTracks() ;
    }
    //this.authentificationProcess();
    //this.getFeaturePlayLists();
  }

  clientCredentials() {
    console.log("clientCredentials");
    var request = require('request'); // "Request" library

    var client_id = '864d1c0ec7604e418dbcec6ad2e438de'; // Your client id
    var client_secret = '42eb263122de432faaf7b974c815c64a'; // Your secret

    // your application requests authorization
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

    request.post(authOptions, function(error, response, body) {
      console.log("body: ", body);
      console.log("error: ", error);
      console.log("response: ", response);

      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        console.log("access_token: ", token);
      }
    });
  }

  authentificationProcess() {
    const AUTHORISE_URL = "https://accounts.spotify.com/authorize?";
    const TOKEN_URL = 'https://accounts.spotify.com/api/token';
    const CALLBACK_URL = 'http://localhost:3000/';
    const client_id = "864d1c0ec7604e418dbcec6ad2e438de";
    const client_secret = "42eb263122de432faaf7b974c815c64a";
    const client_credentials = new Buffer(`${client_id}:${client_secret}`);
    const client_credentials_base64 = 'Basic ' + client_credentials.toString('base64');

    let FETCH_URL = `${AUTHORISE_URL}client_id=${client_id}&response_type=code&redirect_uri=${CALLBACK_URL}`;
    console.log("requests authorization url: ", FETCH_URL);

    fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      mode: 'no-cors',
      body: {
        grant_type: 'client_credentials'
      }
    }).then(response => {
      console.log("token acces response: ", response);
    });

  }
  getFeaturePlayLists() {
    const FeaturePlaylists_URL = 'https://api.spotify.com/v1/browse/featured-playlists?';
    const FETCH_URL = `${FeaturePlaylists_URL}country='FR'&limit='10'`;
    const OAUTH_TOKEN = 'Bearer BQBDWQvfrLptL_t17UBmAWwH7DylvBOI1HCnKOU0ZZyxk7Dqo7viP06Z5xwHPkKonXw7JghGdnWr20rSUlVJJMfVhgj5OiiGncbfuEndrtmlmIMIyKSShPLbRxqz5HYB0KjYLxM49LfMzTwiCC3weJ3KcY2CT9b2d1qTDrl5nGtVXuQUMP6TX4Dtd4q5C6bgoJ6JrEawF0D9DV-pizhD99OWo7bJd8MnTHWeELc8LpRrgU1I5Fy6cnS55T9c1bHWKTAYFJ9L76QQogZ0kVoGO75p-flq-52PUGz_P6I4xALaNRQ9Q7nr516WkG_-g3-wKFC-7y8';

    fetch(FETCH_URL, {method: 'GET'}).then(response => response.json()).then(json => {
      console.log("featured-playlists: ", json);
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
      this.props.setArtist({artist});
      bake_cookie('artist', artist);
      this.searchTopTracks();
    });
  }

  searchTopTracks() {
    console.log('this.props', this.props);
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const { artist } = this.props;
    let FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=FR&`;
    console.log('top-tracks url: ', FETCH_URL);
    fetch(FETCH_URL, {method: 'GET'}).then(response => response.json()).then(json => {
      console.log("artist\'s top top-tracks: ", json);
      const {tracks} = json;
      this.props.setTopTracks({tracks});
      bake_cookie('artist_tracks', json);
    });
  }

  render()
  {
    console.log("render this.props", this.props);
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="serach an artist..." value={this.state.query} onChange={event => {
                this.setState({query: event.target.value})
              }} onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}/>
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          {
            <div>

              <Profile artist={this.props.artist}/>
              <Gallery tracks={this.state.tracks}/>
            </div>
          }
        </div>
      );
    }
  }

  function mapStateToProps(state)
  {
    console.log("mapStateToProps state", state);
    const { artist, top_tracks } = state;
    return {
      artist, top_tracks
    }
  }

  export default  connect(mapStateToProps, {setArtist, setTopTracks}) (App);

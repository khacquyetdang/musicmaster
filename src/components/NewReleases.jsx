import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setAccessToken, setNewReleases} from '../actions';
import * as SpotifyWebApi from 'spotify-web-api-js';

import './App.css';

class NewReleases extends Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount(){
    console.log("newReleases props", this.props);
  }

  getNewReleaseLists() {
    //const FeaturePlaylists_URL = 'https://api.spotify.com/v1/browse/featured-playlists?';
    //const FETCH_URL = `${FeaturePlaylists_URL}country='FR'&limit='10'`;
    const { accessToken } = this.props;

    var Spotify = require('spotify-web-api-js');
    var spotifyApi = new Spotify();
    spotifyApi.setAccessToken(accessToken);
    //spotifyApi.setPromiseImplementation(Q);
    var params = {
      country : 'FR',
      limit : 10
    }
    spotifyApi.getNewReleases(params)
    .then(data =>{
        const { albums }  = data;
        console.log("new releases albums ", albums);
        this.props.setNewReleases(albums);
    }, error => {
      console.log("error getNewReleases ", error);
    });
    console.log("spotifyApi ", spotifyApi);
  }

  render() {
    console.log("new releases this.props ", this.props);
    this.getNewReleaseLists();
    const {tracks} = this.props;
    return (
      <div>
        <h1>New releases</h1>
        {tracks != null
          ? (tracks.map((track, k) => {
            console.log("track: ", track);
            const tracksImg = track.album.images[0].url;
            return <div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>
              <img src={tracksImg} className="track-img" alt="track"></img>
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url ?
                    <span>| |</span>
                    : <span>&#9654;</span>
                }

              </div>
            </div>
            <p className="track-text">
              {track.name}
            </p>
          </div>;
        }))
        : <div></div>}
      </div>
    );
  }

}
function mapStateToProps(state) {
  console.log("mapStateToProps new releases state", state);
  const {accessToken} = state;
  return {accessToken};

}

export default connect(mapStateToProps, {setAccessToken, setNewReleases}) (NewReleases);

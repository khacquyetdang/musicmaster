import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setAccessToken, setNewReleases} from '../actions';
import * as SpotifyWebApi from 'spotify-web-api-js';

import './App.css';

class NewReleases extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      newReleasesItems: [],
      newReleasesAlbumsTracks: {},
      spotifyApi : null,
      playingUrl : '',
      playingAlbum : '',
      audio: null,
      playing: false
    }
  }

  componentDidMount(){
    //console.log("newReleases props", this.props);
    this.getNewReleaseLists();
  }


  playAudio(album)
  {
    const albumId = album.id;
    console.log("playAudio album id: ", album.id);
    console.log("playAudio album tracks: ", this.state.newReleasesAlbumsTracks["'" + albumId + "'"]);

    console.log("playAudio : ", this.state.newReleasesAlbumsTracks);
    let trackUrl = this.state.newReleasesAlbumsTracks[album.id].items[0].preview_url;
    let audio = new Audio(trackUrl);
    if (this.state.playing === false) {
      audio.play();
      this.setState({playing: true, playingAlbum: album, audio});
    } else {
      if (this.state.playingAlbum === album) {
        this.state.audio.pause();
        this.setState({playing: false});
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({playing: true, playingAlbum: album, audio});
      }
    }
  }

  getNewReleaseAlbumsTracks()
  {
    const { newReleasesItems } = this.state;
    newReleasesItems.map((album, k) => {
      let newReleasesAlbumsTracks = this.state.newReleasesAlbumsTracks;
      this.state.spotifyApi.getAlbumTracks(album.id)
      .then(data =>{
        newReleasesAlbumsTracks[album.id] =  data;
        this.setState({newReleasesAlbumsTracks});
      }, error => {
        console.log("getTracks error", error);
      });
    });
  }

  getNewReleaseLists() {
    //const FeaturePlaylists_URL = 'https://api.spotify.com/v1/browse/featured-playlists?';
    //const FETCH_URL = `${FeaturePlaylists_URL}country='FR'&limit='10'`;
    const { accessToken } = this.props;
    console.log("getNewReleaseLists accesToken", this.props);
    var Spotify = require('spotify-web-api-js');
    var spotifyApi = new Spotify();
    this.setState({spotifyApi});
    spotifyApi.setAccessToken(accessToken);
    //spotifyApi.setPromiseImplementation(Q);
    var params = {
      country : 'FR',
      limit : 20
    }
    spotifyApi.getNewReleases(params)
    .then(data =>{
      console.log("shopifyygetNewReleaseLists data", data);

      const { albums }  = data;
      //this.props.setNewReleases(albums);
      this.setState({newReleasesItems: albums.items});
      this.getNewReleaseAlbumsTracks();
    }, error => {
      console.log("getNewReleaseLists error", error);
    });
  }

  render()
  {
    let { newReleasesItems } = this.state;

    return (
      <div>
        <h1>New releases</h1>
        <div className="newReleasesContainer">
          {
            newReleasesItems.map((album, k) => {
              const tracksImg = album.images[0].url;
              const {name} = album;
              const artist_name = album.artists[0].name;

              return (
                <div key={k} className="album">
                  <div className="album_image_container" onClick = {() => this.playAudio(album)}>
                    <img src={tracksImg} className="album_image"  alt="track"></img>
                  </div>
                  <div className="album_name">{name}</div>
                  <div className="album_artist_name">{artist_name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log("mapStateToProps new releases state", state);
  const {accessToken, newReleases } = state;
  return {accessToken, newReleases};
}

export default connect(mapStateToProps, {setAccessToken, setNewReleases}) (NewReleases);

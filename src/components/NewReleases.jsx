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
      newReleasesItems: []
    }
  }

  componentDidMount(){
    console.log("newReleases props", this.props);
    this.getNewReleaseLists();

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
      limit : 20
    }
    spotifyApi.getNewReleases(params)
    .then(data =>{
      const { albums }  = data;
      console.log("new releases albums ", albums);
      //this.props.setNewReleases(albums);
      this.setState({newReleasesItems: albums.items});
    }, error => {
      console.log("error getNewReleases ", error);
    });
  }

  render()
  {
    console.log("new releases this.props ", this.props);
    console.log("new releases state ", this.state);
    let { newReleasesItems } = this.state;
    console.log("new releases render newReleasesItems ", newReleasesItems);

    return (
      <div>
        <h1>New releases</h1>
        <div className="newReleasesContainer">
          {
            newReleasesItems.map((album, k) => {
              console.log("track render : ", album);
              console.log("key render : ", k);
              const tracksImg = album.images[0].url;
              const {name} = album;
              const artist_name = album.artists[0].name;
              console.log("artist name : ", artist_name);
              console.log("albulm name : ", name);

              return (
                <div key={k} className="album">
                  <img src={tracksImg}  className="album_image" alt="track"></img>
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
  console.log("mapStateToProps new releases state", state);
  const {accessToken, newReleases } = state;
  return {accessToken, newReleases};

}

export default connect(mapStateToProps, {setAccessToken, setNewReleases}) (NewReleases);

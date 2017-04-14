import React, {Component} from 'react';
import './App.css';

class FeaturePlaylists extends Component {

  constructor(props)
  {
    super(props);
  }

  render() {
    const {tracks} = this.props;
    return (
      <div>
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

  export default FeaturePlaylists;

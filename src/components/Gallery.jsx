import React, {Component} from 'react';
import './App.scss';
import {connect} from 'react-redux';
import {activateTrack, setTopTracks} from '../actions/index';

class Gallery extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }
  playAudio(track)
  {
    const  previewUrl = track.preview_url;
    const  activeTrackId = track.id;
    this.props.activateTrack(activeTrackId);

    /*
    console.log("previewUrl", previewUrl);
    let audio = new Audio(previewUrl);
    if (this.state.playing === false) {
      audio.play();
      this.setState({playing: true, playingUrl: previewUrl, audio});
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({playing: false});
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({playing: true, playingUrl: previewUrl, audio});
      }
    }*/
  }
  render() {
    //console.log("Gallery props", this.props);
    const {tracks} = this.props;
    return (
      <div>
        {tracks != null
          ? (Object.keys(tracks).map((key, index) => {
            const track  = tracks[key];
            const tracksImg = track.album.images[0].url;
            return (<div key={index} className="track" onClick={() => this.playAudio(track)}>
              <img src={tracksImg} className="track-img" alt="track"></img>
              <div className="track-play">
                <div className="track-play-inner">
                  {this.props.activeTrackId === track.id
                    ? <span>| |</span>
                    : <span>&#9654;</span>}
                </div>
              </div>
              <p className="track-text">
                {track.name}
              </p>
            </div>)
          }))
          : <div></div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId
  };
}
export default connect(mapStateToProps, {setTopTracks, activateTrack})(Gallery);

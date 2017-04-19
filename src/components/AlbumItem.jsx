import React, {Component} from 'react';
import './App.css';

class AlbumItem extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      playingUrl : '',
      audio: null,
      playing: false
    }
  }
  playAudio(previewUrl)
  {
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
    }
  }
  render() {
    const {album} = this.props;
    return (
      <div>
        albumItem
      </div>
    );
  }
}

export default AlbumItem;

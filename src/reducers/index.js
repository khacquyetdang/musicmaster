import { combineReducers } from 'redux';

import artist from './reducerArtist';
import top_tracks from './reducerTopTracks';

export default combineReducers({
  artist,
  top_tracks
});

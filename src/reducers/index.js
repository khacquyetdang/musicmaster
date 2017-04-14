import { combineReducers } from 'redux';

import artist from './reducerArtist';
import topTracks from './reducerTopTracks';
import newReleases from './reducerNewReleases';
import accessToken from './reducerAccessToken';

export default combineReducers({
  artist,
  topTracks,
  newReleases,
  accessToken
});

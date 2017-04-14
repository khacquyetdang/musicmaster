import { SET_ARTIST, SET_TOP_TRACKS } from '../constants';


export const setArtist = (artist) => {
  const action = {
    type: SET_ARTIST,
    artist
  };  
  return action;
}


export const setTopTracks = (top_tracks) => {
  const action = {
    type: SET_TOP_TRACKS,
    top_tracks
  };
  console.log('set top tracks action', action);
  return action;
}

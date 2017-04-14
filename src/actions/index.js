import { SET_ARTIST, SET_TOP_TRACKS } from '../constants';


export const setArtist = (artist) => {
  const action = {
    type: SET_ARTIST,
    artist
<<<<<<< HEAD
  };  
=======
  };
  console.log('set artist action', action);
>>>>>>> cd934c573d5b3d9b0a59a674ebfa5e3fa3b524b6
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

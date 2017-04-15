import { SET_ARTIST, SET_TOP_TRACKS, SET_ACCESS_TOKEN, SET_NEW_RELEASES } from '../constants';


export const setArtist = (artist) => {
  const action = {
    type: SET_ARTIST,
    artist
  }
  return action;
}


export const setAccessToken = (accessToken) => {
  const action = {
    type: SET_ACCESS_TOKEN,
    accessToken
  }
  return action;
}



export const setNewReleases = (newReleases) => {
  const action = {
    type: SET_NEW_RELEASES,
    newReleases
  }
  return action;
}


export const setTopTracks = (topTracks) => {
  const action = {
    type: SET_TOP_TRACKS,
    topTracks
  };
  console.log('set top tracks action', action);
  return action;
}

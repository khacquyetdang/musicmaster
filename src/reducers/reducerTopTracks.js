import {
    SET_TOP_TRACKS
} from '../constants/constants';

export default (state = [], action) => {

    switch (action.type) {
        case SET_TOP_TRACKS:
            const {
                topTracks
            } = action;
            //console.log("setTopTracks reducers", topTracks);
            var tracksDico = topTracks.reduce(function(acc, val){
              const id = val.id;
              acc[id] = val;
              return acc;
            }, {});

            return tracksDico;
        default:
            return state;
    }
}

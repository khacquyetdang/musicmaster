import {
    SET_TOP_TRACKS
} from '../constants/constants';

export default (state = [], action) => {

    switch (action.type) {
        case SET_TOP_TRACKS:
            const {
                topTracks
            } = action;
            return topTracks;
        default:
            return state;
    }
}

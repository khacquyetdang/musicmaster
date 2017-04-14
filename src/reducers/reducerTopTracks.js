import {
    SET_TOP_TRACKS
} from '../constants';

export default (state = [], action) => {

    switch (action.type) {
        case SET_TOP_TRACKS:
            const {
                top_tracks
            } = action;
            return top_tracks;
        default:
            return state;

    }
}

import {
    SET_ARTIST
} from '../constants';


export default (state = [], action) => {

    switch (action.type) {
        case SET_ARTIST:
            const {
                artist
            } = action;
            return artist;
        default:
            return state;

    }
}

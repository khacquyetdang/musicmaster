import {
    SET_ARTIST
} from '../constants';


export default (state = null, action) => {

    switch (action.type) {
        case SET_ARTIST:
            const {
                artist
            } = action;
            console.log("SET_ARTIST artist", artist);
            return artist;
        default:
            return state;
    }
}

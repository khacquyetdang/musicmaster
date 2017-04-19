import {
    SET_ARTIST
} from '../constants/constants';

import {bake_cookie} from 'sfcookies';

export default (state = null, action) => {

    switch (action.type) {
        case SET_ARTIST:
            const {
                artist
            } = action;
            bake_cookie('artist', artist);
            return artist;
        default:
            return state;
    }
}

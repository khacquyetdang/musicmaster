import {
    SET_NEW_RELEASES
} from '../constants/constants';

//import {bake_cookie, read_cookie} from 'sfcookies';

export default (state = null, action) => {

    switch (action.type) {
        case SET_NEW_RELEASES:
            const {
                newReleases
            } = action;
            return newReleases;
        default:
            return state;
    }
}

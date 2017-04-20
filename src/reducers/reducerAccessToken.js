import {
    SET_ACCESS_TOKEN
} from '../constants/constants';

export default (state = '', action) => {

    switch (action.type) {
        case SET_ACCESS_TOKEN:
          const {
            accessToken
          } = action;
          return accessToken;
        default:
            return state;
    }
}

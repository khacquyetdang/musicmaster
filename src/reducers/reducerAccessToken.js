import {
    SET_ACESS_TOKEN
} from '../constants';

export default (state = '', action) => {

    switch (action.type) {
        case SET_ACESS_TOKEN:
          const {
            accessToken
          } = action;
          return accessToken;
        default:
            return state;
    }
}

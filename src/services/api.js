import Cookies from 'js-cookie';




export function getLazyLoadingUsersUrl(user, nextHref, initHref) {
  function getUrlPrefix(u) {
    return u ? `users/${u.id}` : `me`;
  }

  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(`${getUrlPrefix(user)}/${initHref}`, '&');
  }
}

export function getLazyLoadingCommentsUrl(nextHref, initHref) {
  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(initHref, '&');
  }
}

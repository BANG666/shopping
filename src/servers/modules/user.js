import HTTP from '../http';

export function fetchLogin (postData) {
  return HTTP.post({
    url: '/auth/signin',
    data: postData
  });
}

export function getUserInfo () {
  return HTTP.get('/auth/users/me')
}

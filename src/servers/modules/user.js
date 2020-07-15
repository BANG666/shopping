import HTTP from '../http';

export function authLoading (data) {
  return HTTP.post({
    url: '/auth/wechat-signin',
    data: data
  });
}


export function bindPhone (data) {
  return HTTP.post({
    url: '/auth/phone-bind',
    data: data
  })
}

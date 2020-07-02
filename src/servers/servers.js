import HTTP from './http';

export function fetchLogin (postData) {
  return HTTP.post({
    url: '/auth/signin',
    data: postData
  });
}

export function getUserInfo () {
  return HTTP.get('/auth/users/me')
}


export function getHotelList () {
  return HTTP.post({
    url: '/hotels/v4/search',
    data: {
      agreementUser: '5e8c51a794c4b300112bb6c7',
      checkInAt: '2020-07-01T16:00:00.000Z',
      checkOutAt: '2020-07-02T16:00:00.000Z',
      city: '310100',
      guestCount: 1,
      roomCount: 1
    },
    paginate: {
      pageNum: 1,
      pageLimit: 10
    }
  });
}

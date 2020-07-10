import HTTP from '../http';

export function getHotelList({ data = {}, paginate = {} }) {
  return HTTP.post({
    url: '/voucher-reservations/booking/hotels',
    data: data,
    paginate: paginate
  });
}

export function getHotelRoomType(data) {
  return HTTP.get(`/voucher-reservations/booking/hotels/${data}`)
}

export function createHotelOrder({ data = {} }) {
  return HTTP.post({
    url: '/voucher-reservations',
    data: data
  })
}

export function getReservation({ data = {}, paginate = {} }) {
  const params = {
    conds: { customer: data.conds.customer }
  };
  if (data.conds.status != null) {
    params.conds.status = data.conds.status;
  }
  return HTTP.post({
    url: '/voucher-reservations/list',
    data: data
  })
}

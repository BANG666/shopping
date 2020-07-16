import HTTP from '../http';

export function orderList ({data, paginate}) {
  return HTTP.post({
    url: '/voucher-orders/list',
    data: data,
    paginate
  });
}

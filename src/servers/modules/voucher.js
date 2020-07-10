import HTTP from '../http';

export function getHomeVoucherList(data) {
  return HTTP.post({
    url: '/voucher-packages/list',
    data: data
  })
}

export function getVoucherDetail(data = {}) {
  return HTTP.get(`/voucher-packages/info/${data.id}`)
}

export function createVoucherOrders(data) {
  return HTTP.post({
    url: `/voucher-orders`,
    data: data
  })
}

export function getVoucherOrderList(data) {
  console.log(data);
  return HTTP.post({
    url: `/vouchers/list`,
    data: data
  })
}

export function voucherUpdate(data){
  return HTTP.put('/voucher-orders',data);
}


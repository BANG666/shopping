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
  return HTTP.post({
    url: `/vouchers/list`,
    data: data,
    paginate: {
      pageLimit: 1000
    }
  })
}

export function voucherUpdate(data){
  return HTTP.put('/voucher-orders',data);
}

export function payment(data){
  return HTTP.post({
    url: `/payvoucherorder/${data.id}/pay`,
    data: data
  })
}


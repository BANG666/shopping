import Taro from '@tarojs/taro';
import _ from 'lodash';
import getBaseUrl from './baseUrl';
import interceptors from './interceptors';

interceptors.forEach(i => Taro.addInterceptor(i));

class httpRequest {
  baseOptions (params, method = 'GET') {
    let { url, data, contentType = 'application/json', paginate = {} } = params;
    const BASE_URL = getBaseUrl(url);
    const header = {
      'content-type': contentType,
      'Authorization': 'Bearer ' + Taro.getStorageSync('token')
    };
    if ( !_.isEmpty(paginate) ) {
      const { pageLimit = 10, pageNum = 1 } = paginate;
      header[ 'x-pagination-no' ] = pageNum;
      header[ 'x-pagination-limit' ] = pageLimit;
    }
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header
    };
    return Taro.request(option);
  }

  get (url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post ({ url, data, contentType, paginate }) {
    let params = { url, data, contentType, paginate };
    return this.baseOptions(params, 'POST');
  }

  put (url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'PUT');
  }

  delete (url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'DELETE');
  }

}

export default new httpRequest();
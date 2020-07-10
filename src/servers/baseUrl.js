const getBaseUrl = (url) => {
  // let BASE_URL = 'https://api.chuxingpay.com';
  // let BASE_URL = 'http://192.168.100.158:4000';
  let BASE_URL = 'http://192.168.100.32:4000';
  // if ( process.env.NODE_ENV === 'development' ) {
  //   if ( url.includes('/api/') ) {
  //     BASE_URL = '';
  //   } else if ( url.includes('/iatadatabase/') ) {
  //     BASE_URL = '';
  //   }
  // } else {
  //   // 生产环境
  //   if ( url.includes('/api/') ) {
  //     BASE_URL = '';
  //   } else if ( url.includes('/iatadatabase/') ) {
  //     BASE_URL = '';
  //   }
  // }
  return BASE_URL;
};

export default getBaseUrl;

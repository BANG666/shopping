import Taro from '@tarojs/taro';
import dayJs from 'dayjs';

// 获取当前页url
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[ pages.length - 1 ];
  let url = currentPage.route;
  return url;
};


export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if ( !path.includes('login') ) {
    Taro.navigateTo({
      url: '/pages/login/login'
    });
  }
};

// 获取星期几
export const getDay = num => {
  let str = '';
  switch (num) {
    case 0:
      str = '日';
      break;
    case 1:
      str = '一';
      break;
    case 2:
      str = '二';
      break;
    case 3:
      str = '三';
      break;
    case 4:
      str = '四';
      break;
    case 5:
      str = '五';
      break;
    case 6:
      str = '六';
      break;
  }
  return `星期${str}`;
};

export const roomBedType = [
  { name: '其它', nameEn: 'Others', code: 'BT00', bedCount: 1 },
  { name: '双床', nameEn: 'Twin Bed', code: 'BT01', bedCount: 2 },
  { name: '大床', nameEn: 'Double Bed', code: 'BT02', bedCount: 1 },
  { name: '单床', nameEn: 'Single Bed', code: 'BT03', bedCount: 1 },
  { name: '双人大床', nameEn: 'Queen Bed', code: 'BT04', bedCount: 1 },
  { name: '经济双床', nameEn: 'Semi-double Bed', code: 'BT05', bedCount: 2 },
  { name: '三床', nameEn: 'Three Bed', code: 'BT06', bedCount: 3 },
  { name: '四床', nameEn: 'Four Bed', code: 'BT07', bedCount: 4 },
  { name: '上下铺', nameEn: '上下铺', code: 'BT08', bedCount: 4 },
  { name: '通铺', nameEn: '通铺', code: 'BT09', bedCount: 1 },
  { name: '榻榻米', nameEn: '榻榻米', code: 'BT10', bedCount: 1 },
  { name: '水床', nameEn: '水床', code: 'BT11', bedCount: 1 },
  { name: '圆床', nameEn: '圆床', code: 'BT12', bedCount: 1 },
  { name: '拼床', nameEn: '拼床', code: 'BT13', bedCount: 1 },
  { name: '炕', nameEn: '炕', code: 'BT14', bedCount: 1 },
  { name: '特殊床型', nameEn: '特殊床型', code: 'BT15', bedCount: 1 },
  { name: '大/双床', nameEn: '大/双床', code: 'BT17', bedCount: 2 }
];

export const formatRoomBed = code => _.filter(roomBedType, el => el.code === code) || [];

export const formatRoomWindow = key => {
  const obj = {
    1: '有窗',
    2: '部分有窗',
    3: '内窗',
    4: '天窗',
    5: '封闭窗',
    6: '飘窗'
  };
  return obj[key];
};

export const formatRoomWifi = key => {
  const obj = {
    0: '没有Wifi',
    1: '有WIFI',
    2: '有WIFI',
    3: '有WIFI',
    4: '有WIFI'
  };
  return obj[key];
};

// 计算两个时间相差的天数
export const dateSpace = (checkItAt, checkOutAt) =>
  dayJs(checkOutAt).diff(dayJs(checkItAt), 'd');

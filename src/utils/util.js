import Taro from '@tarojs/taro';
import dayJs from 'dayjs';
import _ from 'underscore';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';
import { roomBedType } from '../assets/hotelBase';

dayJs.extend(LocalizedFormat);

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

export const formatRoomBed = code => _.find(roomBedType, el => el.code === code) || {};

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

// 格式化取消政策
export const formatCancellationPolicy = (checkInAt, cancelPolicy = null, cancelSettings = {}) => {
  const { deadlineDay = 0, deadline = 0 } = cancelSettings;
  let cancelPolicyStr = '';
  let dateStr = '';
  // const getPolicyText = () => {
  // dayJs.locale('zh-cn');
  let day = Number(deadlineDay);
  const hour = Number(deadline).toFixed(0);
  if (cancelPolicy === 0) {
    cancelPolicyStr = '不可取消';
    dateStr =
      '订单已经确认,不可取消、修改。未入住或取消订单, 全部或部分预付房费不予退还。若您的旅途尚未确定, 望请周知后再做预订';
  } else if (cancelPolicy === 1) {
    cancelPolicyStr = '随时取消';
    const checkIn = dayJs(checkInAt).format('YYYY-MM-DD');
    const date = dayJs(`${checkIn} 18:00`).locale('zh-cn').format('llll');
    dateStr = `<span class="text-main margin-right-sm">${date}</span>前可以免费取消`;
  } else if (cancelPolicy === 2) {
    cancelPolicyStr = '限时取消';
    if (day === 0 && dayJs().hour() >= Number(hour) && dayJs().isSame(checkInAt, 'day')) {
      cancelPolicyStr = '不可取消';
      dateStr = '已过免费取消时间，完成预订后将不可退改。';
    } else {
      let date = dayJs(checkInAt)
        .subtract(day, 'd')
        .hour(Number(hour))
        .locale('zh-cn')
        .format('llll');
      if (hour === '0') {
        day = day + 1;
        date = dayJs(checkInAt)
          .subtract(day, 'd')
          .hour(23)
          .minute(59)
          .locale('zh-cn')
          .format('llll');
      }
      if (
        dayJs(checkInAt)
          .subtract(day, 'd')
          .hour(Number(hour))
          .isBefore(dayJs())
      ) {
        cancelPolicyStr = '不可取消';
        dateStr = '已过免费取消时间，完成预订后将不可退改。';
      } else {
        dateStr = `<span class="text-main margin-right-sm">${date}</span>前可以免费取消`;
      }
    }
  } else if (cancelPolicy === 3) {
    cancelPolicyStr = '付费取消';
    if (day === 0 && dayJs().hour() >= Number(hour) && dayJs().isSame(checkInAt, 'day')) {
      dateStr =
        '订单已经确认,不可取消、修改。未入住或取消订单, 全部或部分预付房费不予退还。若您的旅途尚未确定, 望请周知后再做预订';
    } else {
      let date = dayJs(checkInAt)
        .subtract(day, 'd')
        .hour(Number(hour))
        .locale('zh-cn')
        .format('llll');
      if (hour === '0') {
        day = day + 1;
        date = dayJs(checkInAt)
          .subtract(day, 'd')
          .hour(23)
          .minute(59)
          .locale('zh-cn')
          .format('llll');
      }
      dateStr = `<span class="text-main margin-right-sm">${date}</span>前可以免费取消, 超时则收取首晚房费`;
    }
  }

  return {
    cancelPolicyStr,
    dateStr
  };
};

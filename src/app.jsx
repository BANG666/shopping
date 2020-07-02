import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import configStore from './redux/store';
import './custom-theme.scss';
import './app.scss';
import { getUserInfo } from './servers/servers';
import { UPDATE_USER } from './redux/actions/user';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/coupon/index',
      'pages/bookingHome/index',
      'pages/hotelList/index',
      'pages/hotelDetail/index',
      'pages/couPonDetail/index',
      'pages/confirmCoupon/index',
      'pages/login/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#aaaaaa',
      selectedColor: '#BB9D4B',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'assets/image/tabbar/home.png',
          selectedIconPath: 'assets/image/tabbar/home_select.png',
          text: '首页'
        },
        {
          pagePath: 'pages/coupon/index',
          iconPath: 'assets/image/tabbar/home.png',
          selectedIconPath: 'assets/image/tabbar/home_select.png',
          text: '我的券'
        },
        {
          pagePath: 'pages/couPonDetail/index',
          iconPath: 'assets/image/tabbar/home.png',
          selectedIconPath: 'assets/image/tabbar/home_select.png',
          text: '酒店详情'
        },

      ]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    }
  };

  componentDidMount () {
  }

  componentDidShow () {
    const token = Taro.getStorageSync('token');
    if ( token ) {
      this.getUserInfo();
    }
  }

  componentDidHide () {
  }

  componentDidCatchError () {
  }

  getUserInfo = () => {
    getUserInfo().then(res => {
      const { data, code } = res;
      if ( code === 0 ) {
        Taro.setStorageSync('userInfo', data);
        store.dispatch({
          type: UPDATE_USER,
          payload: { user: data }
        });
      }
    }).catch(err => {

    });
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={ store }>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));

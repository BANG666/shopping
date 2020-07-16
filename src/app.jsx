import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import Index from './pages/index';
import configStore from './redux/store';
import { authLoading } from './servers/servers';
import handleError from './utils/handleError';
import { UPDATE_USER } from './redux/actions/user';
import './style/custom-theme.scss';
import './style/animation.css';
import './style/iconfont.css';
import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/bookingOrder/index',
      'pages/coupon/index',
      'pages/userInfo/index',
      'pages/couPonDetail/index',
      'pages/confirmCoupon/index',
      'pages/order/index',
      'pages/order/payment'
    ],
    subPackages: [
      {
        root: 'hotelPages',
        pages: [
          'city/index',
          'calendar/index',
          'bookingHome/index',
          'hotelList/index',
          'hotelDetail/index',
          'booking/index',
          'selectCoupon/index',
          'bookingSuccess/index',
          'hotelFacilities/index',
          'hotelPhoto/index'
        ]
      }
    ],
    preloadRule: {
      'pages/index/index': {
        'network': 'all',
        'packages': ['hotelPages']
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    // globalStyle: {
    //   navigationBarTitleText: '房券商城',
    //   navigationBarTextStyle: 'black',
    //   navigationBarBackgroundColor: '#ffffff',
    //   backgroundColor: '#ffffff',
    //   'app-plus': {
    //     bounce: 'none'
    //   }
    // },
    tabBar: {
      color: '#aaaaaa',
      selectedColor: '#ffa940',
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
          iconPath: 'assets/image/tabbar/order.png',
          selectedIconPath: 'assets/image/tabbar/order_select.png',
          text: '订单'
        },
        {
          pagePath: 'pages/bookingOrder/index',
          iconPath: 'assets/image/tabbar/my_order.png',
          selectedIconPath: 'assets/image/tabbar/my_order_select.png',
          text: '我的预订'
        },
        {
          pagePath: 'pages/userInfo/index',
          iconPath: 'assets/image/tabbar/mine.png',
          selectedIconPath: 'assets/image/tabbar/mine_select.png',
          text: '我的'
        }
      ]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
      // 'scope.userInfo': {
      //   desc: '你的手机号将用于账号绑定'
      // }
    }
  };

  componentDidMount() {
    this.login();
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  login = () => {
    Taro.login({
      success: (info) => {
        authLoading({ jscode: info.code }).then(res => {
          const { data, code } = res;
          const { isLogin = false, message = '' } = handleError(res);
          if (!message) {
            Taro.setStorageSync('token', data.token);
            Taro.setStorageSync('info', data);
            store.dispatch({
              type: UPDATE_USER,
              payload: data
            });
          } else {
            Taro.showToast({
              title: message,
              icon: 'none'
            })
          }
        }).catch(err => {
          Taro.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none'
          })
        });
      }
    })
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    );
  }
}

Taro.render(<App/>, document.getElementById('app'));

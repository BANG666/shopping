import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtButton, AtMessage } from 'taro-ui';
import { fetchLogin } from '../../servers/servers';
import { UPDATE_USER } from '../../redux/actions/user';
import handleError from '../../utils/handleError';
import { authLoading } from '../../servers/modules/user';
import logo from '../../assets/image/logo.png';
import './index.scss';

@connect(({ userModel }) => ({}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  config = {
    navigationBarTitleText: '登录'
  };

  componentWillUnmount() {
  };

  componentDidMount() {
    Taro.login({
      success: (info) => {
        authLoading({ jscode: info.code }).then(res => {
          const { data, code } = res;
          const { isLogin = false, message = '' } = handleError(res);
          if (!message) {
            this.props.dispatch({
              type: UPDATE_USER,
              payload: data
            });
          }
        }).catch(err => {
          console.log(err, 'err');
        });
      }
    })
  }

  componentDidShow() {
  };

  componentDidHide() {
  };

  bindGetPhone = val => {
    console.log(val, 111);
    Taro.switchTab({
      url: '/pages/index/index'
    })
  };

  render() {
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtMessage/>
        <View className='flex flex-direction justify-center align-center main-wrap'>
          <View className='logo-wrap text-center flex flex-direction justify-center align-center'>
            <View className='logo'>
              <Image src={logo}/>
            </View>
            <View className='margin-top-lg'>文本内容文本内容文本内容</View>
          </View>
          <View className='phone-btn margin-lg'>
            <AtButton openType="getPhoneNumber" type='primary' onGetPhoneNumber={this.bindGetPhone}>绑定手机号</AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

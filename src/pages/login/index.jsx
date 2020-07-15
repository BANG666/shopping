import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtButton, AtMessage } from 'taro-ui';
import handleError from '../../utils/handleError';
import { bindPhone } from '../../servers/servers';
import logo from '../../assets/image/logo.png';
import './index.scss';

@connect(({ userModel }) => ({
  user: userModel.user
}))
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
  }

  componentDidShow() {
    const { user } = this.props;
    const info = Taro.getStorageSync('info') || {};
    if(user.mobileNum || info.mobileNum){
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    }
  };

  componentDidHide() {
  };

  bindGetPhone = e => {
    const { user, dispatch } = this.props;
    const { detail } = e;
    if (detail.errMsg === 'getPhoneNumber:ok') {
      bindPhone({ openid: user.openid, encryptedData: detail.encryptedData, iv: detail.iv }).then(res => {
        const { data, code } = res;
        const { message = '' } = handleError(res);
        if (!message) {
          Taro.switchTab({
            url: '/pages/index/index'
          })
        } else {
          Taro.showToast({
            title: message,
            icon: 'none'
          })
        }
      }).catch(err => {

      });
    }
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
            <View className='margin-top-lg'>特惠酒店套餐</View>
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

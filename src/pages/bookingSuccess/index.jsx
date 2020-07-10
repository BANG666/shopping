import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

import './index.scss';
import { AtButton } from 'taro-ui';

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 5
    };
    this.timer = null;
  }

  config = {
    navigationBarTitleText: '预订成功'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
    this.setCountDown();
  };

  componentDidHide() {
    clearInterval(this.timer);
  };

  setCountDown = () => {
    this.setState({
      countDown: 5
    });
    this.timer = setInterval(() => {
      const { countDown } = this.state;
      if (countDown === 1) {
        clearInterval(this.timer);
        Taro.reLaunch({
          url: '/pages/order/index?type=reload'
        });
        return;
      }
      this.setState({
        countDown: countDown - 1
      })
    }, 1000);
  };

  render() {
    const { countDown } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='content text-center flex flex-direction justify-center align-center'>
          <View className='margin-bottom-lg'>
            <Text className='cuIcon-check2'/>
          </View>
          <View className='text-sm'>订单已经提交成功，酒店稍后确定您的预订状态。 </View>
          <View className='margin-tb-md'>{countDown}秒后将跳转至我的预订</View>
          <View className='goBackHome bg-main text-center text-base' onClick={() => Taro.switchTab({url: ''})}>返回首页</View>
        </View>
      </View>
    );
  }
}

export default Coupon;

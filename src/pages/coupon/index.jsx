import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';

class Coupon extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  config = {
    navigationBarTitleText: '优惠券'
  };

  componentWillUnmount () {
  };

  componentDidShow () {
  };

  componentDidHide () {
  };

  render () {
    return (
      <View className='index'>
        <View className='pageTopLine' />
        <AtButton type='primary' onClick={() => Taro.navigateTo({url:'/pages/bookingHome/index'})}>预订</AtButton>
      </View>
    );
  }
}

export default Coupon;

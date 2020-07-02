import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

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
        <View><Text>coupon</Text></View>
      </View>
    );
  }
}

export default Coupon;

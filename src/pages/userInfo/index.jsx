import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

import './index.scss';

class UserInfo extends Component {
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
        <View><Text>userInfo</Text></View>
      </View>
    );
  }
}

export default UserInfo;

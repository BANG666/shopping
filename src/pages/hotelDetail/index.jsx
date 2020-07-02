import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

import './index.scss';

class HotelDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }


  config = {
    navigationBarTitleText: '酒店详情'
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
        <View><Text>酒店详情</Text></View>
      </View>
    );
  }
}

export default HotelDetail;

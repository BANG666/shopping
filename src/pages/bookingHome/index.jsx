import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import './index.scss';

class BookingHome extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }


  config = {
    navigationBarTitleText: '锦江Wehotel'
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
        <View className='home-banner'>
          <Image lazyLoad src='http://img1.imgtn.bdimg.com/it/u=1809468132,2618176109&fm=26&gp=0.jpg' />
        </View>
        <View className='form-wrap bg-white'>
          <View className='flex justify-between align-center'>
            <Text>上海</Text>
            <Text>></Text>
          </View>
        </View>
      </View>
    );
  }
}

export default BookingHome;

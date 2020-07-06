import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

import './index.scss';
import WhiteSpace from '../../components/WhiteSpace';

class ConfirmCoupon extends Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 1,
      price: 1888
    };
  }

  config = {
    navigationBarTitleText: '预订房券'
  };

  componentWillUnmount () {
  };

  componentDidShow () {
  };

  componentDidHide () {
  };

  render () {
    const { count, price } = this.state;
    return (
      <View className='page'>
        <View className='pageTopLine' />
        <View className='padding-lg'>
          <View className='text-line-zh text-base text-bold-6'>宁波柏悦酒店 ｜ 3天2晚打卡东钱湖畔中国首家度假系柏悦，酒店控必入！含2餐，更有航海俱乐部体验活动</View>
          <View className='text-base margin-top-lg'>度假精选套餐—柏悦客房</View>
        </View>
        <WhiteSpace my-class='padding-top-sm padding-bottom-sm bg-gray' />
        <View className='solid-bottom padding-lg flex justify-between align-center'>
          <Text className='text-lg'>数量</Text>
          <View className='flex align-center justify-between'>
            <View className='action-item reduce' onClick={ () => {
              if ( count > 1 ) {
                this.setState({ count: count - 1 });
              }
            } }>-</View>
            <View className='margin-lr-lg'>{ count }</View>
            <View className='action-item plus' onClick={ () => this.setState({ count: count + 1 }) }>+</View>
          </View>
          <Text className='text-red text-xxl'>¥{ price * count }</Text>
        </View>
        <View className='flex justify-between align-center padding-left-lg footer-booking-wrap'>
          <View className='flex-sub'>
            <Text>小计：</Text>
            <Text className='text-red text-xxl'>￥{ price * count }</Text>
          </View>
          <View className='bg-main booking-btn flex-sub text-center text-xl'>支 付</View>
        </View>
      </View>
    );
  }
}

export default ConfirmCoupon;

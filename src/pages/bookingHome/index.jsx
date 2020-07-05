import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import './index.scss';
import { getDay } from '../../utils/util';

@connect(({hotelModel}) => ({
  params: hotelModel.params
}))
class BookingHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  config = {
    navigationBarTitleText: '锦江Wehotel'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  render() {
    const {params} = this.props;
    const {checkInAt, checkOutAt, cityName, guestCount, roomCount, dateNum} = params;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='home-banner'>
          <Image lazyLoad src='http://img1.imgtn.bdimg.com/it/u=1809468132,2618176109&fm=26&gp=0.jpg'/>
        </View>
        <View className='form-wrap bg-white padding-left-lg padding-right-lg padding-bottom-lg'>
          <View className='flex justify-between align-center solid-bottom form-item'
                onClick={() => Taro.navigateTo({url: '/pages/city/index'})}>
            <Text className='text-lg text-bold-5'>{cityName}</Text>
            <Text className='cuIcon-right text-gray-d9'/>
          </View>
          <View className='flex justify-between align-center solid-bottom form-item'
                onClick={() => Taro.navigateTo({url: '/pages/calendar/index'})}>
            <View className='flex align-center'>
              <View className='text-ml'>{dayJs(checkInAt).format('DD')}</View>
              <View className='margin-left-md'>
                <View className='text-xs'>{getDay(dayJs(checkInAt).day())}</View>
                <View className='text-xs'>{dayJs(checkInAt).format('M')}月</View>
              </View>
            </View>
            <View className='dateNum text-center text-gray-8 text-sm'>{dateNum}晚</View>
            <View className='flex align-center'>
              <View className='text-ml'>{dayJs(checkOutAt).format('DD')}</View>
              <View className='margin-left-md'>
                <View className='text-xs'>{getDay(dayJs(checkOutAt).day())}</View>
                <View className='text-xs'>{dayJs(checkOutAt).format('M')}月</View>
              </View>
            </View>
          </View>
          <View className='flex justify-between align-center solid-bottom form-item'>
            <View>
              <Text className='text-ml'>{roomCount}</Text>
              <Text className='text-base'>间</Text>
            </View>
            <View>
              <Text className='text-ml'>{guestCount}</Text>
              <Text className='text-base'>成人</Text>
            </View>
          </View>
          <View className='form-btn bg-main text-lg text-center margin-top-lg'
                onClick={() => Taro.navigateTo({url: '/pages/hotelList/index'})}>
            查找酒店
          </View>
        </View>
      </View>
    );
  }
}

export default BookingHome;

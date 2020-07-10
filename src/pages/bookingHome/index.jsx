import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import { getDay } from '../../utils/util';
import './index.scss';
import { UPDATE_PARAMS } from '../../redux/actions/hotel';

@connect(({ hotelModel }) => ({
  params: hotelModel.params
}))
class BookingHome extends Component {
  constructor(props) {
    super(props);
    const { roomCount = 1 } = props.params;
    this.state = {
      roomCount: roomCount
    };
  }

  config = {
    navigationBarTitleText: '酒店预订'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  handleClickFindHotel = () => {
    this.props.dispatch({
      type: UPDATE_PARAMS,
      payload: {
        roomCount: this.state.roomCount
      }
    });
    Taro.navigateTo({ url: '/pages/hotelList/index' })
  };

  render() {
    const { params } = this.props;
    const { checkInAt, checkOutAt, cityName, guestCount, dateNum } = params;
    const { roomCount } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='home-banner'>
          <Image lazyLoad src='http://img1.imgtn.bdimg.com/it/u=1809468132,2618176109&fm=26&gp=0.jpg'/>
        </View>
        <View className='form-wrap bg-white padding-lr-lg padding-bottom-lg'>
          <View className='flex justify-between align-center solid-bottom form-item'
                onClick={() => Taro.navigateTo({ url: '/pages/city/index' })}>
            <Text className='text-lg text-bold-5'>{cityName}</Text>
            <Text className='cuIcon-right text-gray-d9'/>
          </View>
          <View className='flex justify-between align-center solid-bottom form-item'
                onClick={() => Taro.navigateTo({ url: '/pages/calendar/index' })}>
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
          <View className='flex align-center solid-bottom form-item'>
            <Text className={`cuIcon-reduce text-xl ${roomCount > 1 ? 'text-main' : ''}`} onClick={() => {
              if (roomCount > 1) {
                this.setState({ roomCount: roomCount - 1 });
              }
            }}/>
            <View className='margin-lr-lg'>
              <Text className='text-ml'>{roomCount}</Text>
              <Text className='text-base'>间</Text>
            </View>
            <Text className={`cuIcon-plus text-xl ${roomCount < 5 ? 'text-main' : ''}`}
                  onClick={() => {
                    if (roomCount < 5) {
                      this.setState({ roomCount: roomCount + 1 })
                    }
                  }}/>
            {/*<View>*/}
            {/*  <Text className='text-ml'>{roomCount}</Text>*/}
            {/*  <Text className='text-base'>间</Text>*/}
            {/*</View>*/}
            {/*<View>*/}
            {/*  <Text className='text-ml'>{guestCount}</Text>*/}
            {/*  <Text className='text-base'>成人</Text>*/}
            {/*</View>*/}
          </View>
          <View className='form-btn bg-main text-lg text-center margin-top-lg'
                onClick={this.handleClickFindHotel}>
            查找酒店
          </View>
        </View>
      </View>
    );
  }
}

export default BookingHome;

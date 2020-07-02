import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import './index.scss';

class HotelList extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  config = {
    navigationBarTitleText: '酒店列表'
  };

  componentWillUnmount () {
  };

  componentDidShow () {
  };

  componentDidHide () {
  }

  // 触底翻页
  onReachBottom () {
    console.log(1);
  }

  handleItemClick = () => {
    Taro.navigateTo({
      url: `/pages/hotelDetail/index?id=${123123213213}`
    })
  };

  render () {
    return (
      <View className='index'>
        <View onClick={this.handleItemClick} className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
        <View className='hotel-pic'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-price-wrap text-right flex justify-end'>
            <View className='hotel-price bg-main padding-left-sm'>
              <Text>CNY 1080</Text>
              <Text>起 每晚</Text>
            </View>
          </View>
          <View className='hotel-name-wrap text-white padding-left-lg padding-bottom-lg'>
            <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='hotel-address text-base text-bold-5'>中国上海浦东花木路1388号 邮政编码 201204</View>
          </View>
        </View>
      </View>
    );
  }
}

export default HotelList;

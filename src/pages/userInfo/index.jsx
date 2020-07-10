import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import _ from 'underscore';
import all_order_icon from '../../assets/image/all_order.png';
import await_payment_icon from '../../assets/image/await_payment.png';
import my_booking_icon from '../../assets/image/my_booking.png';
import to_be_used_icon from '../../assets/image/to_be_used.png';
// import go_to_use_bg from '../../assets/image/go_to_use_bg.png';
import { AtButton, AtDivider, AtIcon } from 'taro-ui';

import './index.scss';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    const wxUserInfo = Taro.getStorageSync('wxUserInfo');
    this.state = {
      wxUserInfo: wxUserInfo || {}
    };
  }


  config = {
    navigationBarTitleText: '优惠券'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  bindGetUserInfo = ({ detail }) => {
    const { userInfo } = detail;
    if (userInfo) {
      this.setState({
        wxUserInfo: userInfo
      });
      Taro.setStorageSync('wxUserInfo', userInfo);
    }
  };

  render() {
    const { wxUserInfo } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='index-bg'/>
        <View className='info-wrap'>
          <View className='flex align-center user-info'>
            <View className='avatar margin-right-lg'><Image
              src={wxUserInfo.avatarUrl || 'http://img5.imgtn.bdimg.com/it/u=183326193,1784969774&fm=26&gp=0.jpg'}/></View>
            <Text className='text-base text-bold'>{wxUserInfo.nickName}</Text>
            {
              _.isEmpty(wxUserInfo) ? <AtButton className='get-user-info-btn text-xs' size='small' openType="getUserInfo" type='primary'
                                                onGetUserInfo={this.bindGetUserInfo}>获取信息</AtButton> : null
            }
          </View>
          <View className='unused-voucher margin-lr-lg margin-tb-md flex align-center text-white justify-between'>
            <View className='flex-sub text-center'>您有5张券未使用</View>
            <View className='flex-sub flex justify-center align-center'>
              <View className='goToUse text-black text-center text-sm'>去使用</View>
            </View>
          </View>
        </View>
        <View className='cells_auto cells-grid margin-lr-lg'>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
            <Image className='cells-icon' src={all_order_icon}/>
            <View className='margin-top-sm'>全部订单</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
            <Image className='cells-icon' src={await_payment_icon}/>
            <View className='margin-top-sm'>待支付</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
            <Image className='cells-icon' src={my_booking_icon}/>
            <View className='margin-top-sm'>我的预订</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
            <Image className='cells-icon' src={to_be_used_icon}/>
            <View className='margin-top-sm'>待使用</View>
          </View>
        </View>
        <View className='my-coupon margin-lr-lg'>
          <View className='padding-left-lg margin-bottom-lg text-base text-bold'>我的优惠</View>
          <View className='cells-grid'>
            <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
              <Image className='cells-icon' src={all_order_icon}/>
              <View className='margin-top-md'>优惠券</View>
            </View>
          </View>
        </View>
        <View className='margin-top-lg padding-lg'>
          <View className='margin-bottom-lg text-lg'>最近预订</View>
          <View className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
            <View className='hotel-pic'>
              <Image
                src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'/>
            </View>
            <View className='flex-sub margin-left-md'>
              <View className='flex justify-between'>
                <Text className='text-base flex-twice text-bold margin-right-md'>如家酒店-上海柳州路光大会展中心店</Text>
                <Text className='text-main text-sm'>待确认</Text>
              </View>
              <View className='margin-top-md'>
                <AtIcon value='map-pin' size={12} color='#888'/>
                <Text className='text-sm text-gray-8 margin-left-sm'>上海柳州路光大会展中心店</Text>
              </View>
              <View className='margin-top-md'>
                <AtIcon value='calendar' size={12} color='#888'/>
                <Text className='text-sm text-gray-8 margin-lr-sm'>入住:</Text>
                <Text className='text-main text-sm'>03月10日</Text>
                <Text className='text-sm text-gray-8 margin-lr-md'>离店:</Text>
                <Text className='text-main text-sm'>03月11日</Text>
                <Text className='text-sm text-gray-8 margin-left-md'>共1晚</Text>
              </View>
              <AtDivider content=''/>
              <View className='flex justify-end align-center'>
                <AtButton size='small'>再次预订</AtButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default UserInfo;

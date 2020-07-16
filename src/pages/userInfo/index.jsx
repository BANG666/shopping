import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import { AtButton, AtDivider, AtIcon } from 'taro-ui';
import dayJs from 'dayjs';
import { dateSpace } from '../../utils/util';
import { getReservation, getVoucherOrderList } from '../../servers/servers';
import handleError from '../../utils/handleError';
import all_order_icon from '../../assets/image/all_order.png';
import await_payment_icon from '../../assets/image/await_payment.png';
import my_booking_icon from '../../assets/image/my_booking.png';
import to_be_used_icon from '../../assets/image/to_be_used.png';
import defaultCover from '../../assets/image/hotel-cover.png';
import './index.scss';

@connect(({ userModel }) => ({
  user: userModel.user
}))
class UserInfo extends Component {
  constructor(props) {
    super(props);
    const wxUserInfo = Taro.getStorageSync('wxUserInfo');
    this.state = {
      wxUserInfo: wxUserInfo || {},
      orderList: [],
      voucherCount: 0
    };
  }


  config = {
    navigationBarTitleText: '优惠券'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
    this.getOrderList();
    this.getVoucherCount();
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

  getVoucherCount = () => {
    const { user } = this.props;
    getVoucherOrderList({ conds: { type: 'available', customer: user._id } }).then(res => {
      const { data = [], code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          voucherCount: data.length
        })
      }
    }).catch(err => {})
  };

  getOrderList = (status = undefined) => {
    const { user } = this.props;
    getReservation({ data: { conds: { customer: user._id, status } } }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          orderList: data
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        });
      }
    }).catch(err => {
      Taro.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none'
      })
    });
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { wxUserInfo, orderList, voucherCount } = this.state;
    const firstOrder = _.first(orderList) || {};
    const { hotel = {}, checkOutDate, checkInDate, status, contact } = firstOrder;
    let statusStr = '';
    const checkInStr = `${dayJs(checkInDate).format('MM[月]DD[日]')}`;
    const checkOutStr = `${dayJs(checkOutDate).format('MM[月]DD[日]')}`;
    switch (status) {
      case 0:
        statusStr = '待确认';
        break;
      case 1:
        statusStr = '已确认';
        break;
      case 2:
        statusStr = '已取消';
        break;

    }
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
              _.isEmpty(wxUserInfo) ?
                <AtButton className='get-user-info-btn text-xs' size='small' openType="getUserInfo" type='primary'
                          onGetUserInfo={this.bindGetUserInfo}>获取信息</AtButton> : null
            }
          </View>
          <View className='unused-voucher margin-lr-lg margin-tb-md flex align-center text-white justify-between'
                onClick={() => {
                  let url = voucherCount ? '/pages/coupon/index' : '/pages/index/index';
                  Taro.switchTab({ url: url })
                }}>
            <View className='flex-sub text-center'>{voucherCount ? `您有${voucherCount}张券未使用` : '暂无可用优惠券'}</View>
            <View className='flex-sub flex justify-center align-center'>
              <View className='goToUse text-black text-center text-sm'>{voucherCount ? '去使用' : '去购买'}</View>
            </View>
          </View>
        </View>
        <View className='cells_auto cells-grid margin-lr-lg'>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'
                onClick={() => Taro.navigateTo({ url: '/pages/order/index' })}>
            <Image className='cells-icon' src={all_order_icon}/>
            <View className='margin-top-sm'>全部订单</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'
                onClick={() => Taro.navigateTo({ url: '/pages/order/index' })}>
            <Image className='cells-icon' src={await_payment_icon}/>
            <View className='margin-top-sm'>待支付</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'
                onClick={() => Taro.switchTab({ url: '/pages/bookingOrder/index' })}>
            <Image className='cells-icon' src={my_booking_icon}/>
            <View className='margin-top-sm'>我的预订</View>
          </View>
          <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'
          onClick={() => Taro.switchTab({ url: '/pages/coupon/index' })}>
            <Image className='cells-icon' src={to_be_used_icon}/>
            <View className='margin-top-sm'>待使用</View>
          </View>
        </View>
        <View className='my-coupon margin-lr-lg'>
          <View className='padding-left-lg margin-bottom-lg text-base text-bold'>我的优惠</View>
          <View className='cells-grid'>
            <View className='text-center text-sm cells_auto_item flex justify-center align-center flex-direction'>
              <Image className='cells-icon' src={to_be_used_icon}/>
              <View className='margin-top-md'>优惠券</View>
            </View>
          </View>
        </View>
        {
          orderList.length ? (
            <View className='margin-top-lg padding-lg'>
              <View className='margin-bottom-lg text-lg'>最近预订</View>
              <View className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                <View className='hotel-pic'>
                  <Image
                    mode='aspectFill'
                    src={hotel.cover || defaultCover} onError={this.handleError}/>
                </View>
                <View className='flex-sub margin-left-md'>
                  <View className='flex justify-between'>
                    <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                    <Text className={`text-sm ${status === 2 ? 'text-red' : 'text-main'}`}>{statusStr}</Text>
                  </View>
                  <View className='margin-top-md'>
                    <AtIcon value='map-pin' size={12} color='#888'/>
                    <Text className='text-sm text-gray-8 margin-left-sm'>{hotel.address}</Text>
                  </View>
                  <View className='margin-top-md'>
                    <AtIcon value='calendar' size={12} color='#888'/>
                    <Text className='text-sm text-gray-8 margin-lr-sm'>入住:</Text>
                    <Text className='text-main text-sm'>{checkInStr}</Text>
                    <Text className='text-sm text-gray-8 margin-lr-md'>离店:</Text>
                    <Text className='text-main text-sm'>{checkOutStr}</Text>
                    <Text className='text-sm text-gray-8 margin-left-md'>共{dateSpace(checkInDate, checkOutDate)}晚</Text>
                  </View>
                  <AtDivider height='40' content=''/>
                  <View className='flex justify-end align-center text-sm text-gray-8'>
                    <View>入住人：{contact.name}</View>
                    <View className='margin-left-md'>联系电话：{contact.phone}</View>
                  </View>
                </View>
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default UserInfo;

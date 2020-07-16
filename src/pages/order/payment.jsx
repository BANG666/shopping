import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { payment } from '../../servers/servers';
import handleError from '../../utils/handleError';
import { UPDATE_ORDER_VOUCHER } from '../../redux/actions/order';
import defaultCover from '../../assets/image/hotel-cover.png';
import './index.scss';


@connect(({ orderModel }) => ({
  orderDetail: orderModel.orderDetail
}))
class OrderPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 0
    };
  }

  config = {
    navigationBarTitleText: '订单支付'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  handleClickPayment = () => {
    const { orderDetail, dispatch } = this.props;
    payment({ id: orderDetail._id, from: 'yh' }).then(res => {
      const { message = '' } = handleError(res);
      if (!message) {
        const { nonceStr, paySign, signType, timeStamp, package: payPackage } = res.data;
        Taro.requestPayment({
          nonceStr,
          paySign,
          package: payPackage,
          timeStamp,
          signType,
          success(res) {
            Taro.showToast({
              title: '支付成功',
              icon: 'none'
            });
            dispatch({
              type: UPDATE_ORDER_VOUCHER,
              payload: {}
            });
            Taro.reLaunch({
              url: '/pages/coupon/index'
            });
          },
          fail(res) {
            Taro.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        })
      }
      Taro.hideLoading();
    }).catch(err => {
      Taro.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none'
      })
    })
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { orderDetail } = this.props;
    const { totalPrice, voucherPackage = {} } = orderDetail;
    return (
      <View className='index' style={{ background: '#fff' }}>
        <View className='pageTopLine'/>
        <View className='coupon-cover'>
          <Image
            src={voucherPackage.image || defaultCover} onError={this.handleError}/>
        </View>
        <View className='padding-lg'>
          <View className='text-line-zh text-base text-bold-6'>{voucherPackage.name}</View>
          <View className='text-base margin-top-lg'>{voucherPackage.description}</View>
        </View>
        <AtDivider height='40' content=''/>
        <View className='flex justify-between align-center padding-lr-lg'>
          <Text className='text-black text-bold'>需付款</Text>
          <Text className='text-red text-xxxl'>¥{totalPrice}</Text>
        </View>
        <AtDivider height='40' content=''/>
        <View className='padding-lg flex justify-end'>
          <View className='payment-btn text-center bg-main' onClick={this.handleClickPayment}>支付</View>
        </View>
      </View>
    );
  }
}

export default OrderPayment;

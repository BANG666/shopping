import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import WhiteSpace from '../../components/WhiteSpace';
import { createVoucherOrders, payment } from '../../servers/servers';
import handleError from '../../utils/handleError';
import defaultCover from '../../assets/image/hotel-cover.png';
import './index.scss';

@connect(({ voucherModel, userModel }) => ({
  detail: voucherModel.detail,
  user: userModel.user
}))
class ConfirmCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  config = {
    navigationBarTitleText: '确认订单'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  handleClickPayment = () => {
    const { user, detail, dispatch } = this.props;
    const { price } = detail;
    const { count } = this.state;
    Taro.showLoading({ title: '订单创建中' });
    createVoucherOrders({
      voucherPackage: detail._id,
      price,
      totalPrice: price * count,
      number: count,
      customer: user._id
    }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        payment({ id: data._id, from: 'yh' }).then(res => {
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
                Taro.reLaunch({
                  url: '/pages/coupon/index?type=reload'
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
            title: '请先登录',
            icon: 'none'
          })
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
        title: '请先登录',
        icon: 'none'
      })
    });
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { count } = this.state;
    const { detail = {} } = this.props;
    const { price = 0, image, name, description } = detail;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='coupon-cover'>
          <Image
            mode='aspectFill'
            src={image || defaultCover} onError={this.handleError}/>
        </View>
        <View className='padding-lg'>
          <View className='text-line-zh text-base text-bold-6'>{name}</View>
          <View className='text-base margin-top-lg'>{description}</View>
        </View>
        <WhiteSpace my-class='padding-top-sm padding-bottom-sm bg-gray'/>
        <View className='solid-bottom padding-lg flex justify-between align-center'>
          <Text className='text-lg'>数量</Text>
          <View className='flex align-center justify-between'>
            <Text className='cuIcon-reduce text-xxl' onClick={() => {
              if (count > 1) {
                this.setState({ count: count - 1 });
              }
            }}/>
            <View className='margin-lr-lg'>{count}</View>
            <Text className='cuIcon-plus text-xxl' onClick={() => this.setState({ count: count + 1 })}/>
          </View>
          <Text className='text-red text-xxl'>¥{price * count}</Text>
        </View>
        <View className='flex justify-between align-center padding-left-lg footer-booking-wrap'>
          <View className='flex-sub'>
            <Text>小计：</Text>
            <Text className='text-red text-xxl'>￥{price * count}</Text>
          </View>
          <View className='bg-main booking-btn flex-sub text-center text-xl' onClick={this.handleClickPayment}>支
            付</View>
        </View>
      </View>
    );
  }
}

export default ConfirmCoupon;

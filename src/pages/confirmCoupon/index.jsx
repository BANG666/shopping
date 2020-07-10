import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import WhiteSpace from '../../components/WhiteSpace';

import './index.scss';
import { createVoucherOrders, voucherUpdate } from '../../servers/servers';
import handleError from '../../utils/handleError';

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
    Taro.showLoading({ title: '订单支付中' });
    createVoucherOrders({ voucherPackage: detail._id, price: price * count, customer: user._id }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        voucherUpdate({ updates: { status: 10 }, conds: { _id: data._id } }).then(res => {
          const { data, code } = res;
          const { message = '' } = handleError(res);
          if (!message) {
            Taro.hideLoading();
            Taro.reLaunch({
              url: '/pages/coupon/index?type=reload'
            });
          } else {
            Taro.showToast({
              title: message,
              icon: 'none'
            })
          }
        }).catch(err => {

        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        })
      }
    }).catch(err => {
      TAro.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none'
      })
    });
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
            src={image || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593670274645&di=a830446a157ce2d8619c5e56784115b2&imgtype=0&src=http%3A%2F%2Fimages4.c-ctrip.com%2Ftarget%2F2A020800000030cxh7F27.jpg'}/>
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

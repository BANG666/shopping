import React from 'react';
import { Component } from '@tarojs/taro';
import { Checkbox, Image, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import _ from 'underscore';

import './index.scss';
import { UPDATE_VOUCHER } from '../../redux/actions/hotel';

@connect(({ hotelModel }) => ({
  voucher: hotelModel.voucher
}))
class Login extends Component {
  constructor(props) {
    super(props);
    const { voucher } = props;
    this.state = {
      list: voucher || []
    };
  }

  config = {
    navigationBarTitleText: '选择优惠券'
  };

  componentWillUnmount() {
  };

  componentDidMount() {
  }

  componentDidShow() {
    this.getVoucherOrderList();
  };

  componentDidHide() {
  };

  handleClickConfirm = () => {
    const { list } = this.state;

    this.props.dispatch({
      type: UPDATE_VOUCHER,
      params: list
    })
  };

  render() {
    const { list } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='padding-lg coupon-list'>
          {
            list.map(el => {
              const { template: { expireDate, name, description, image }, _id, selected = false } = el;
              return (
                <View key={_id}
                      className={`margin-bottom-lg coupon-item ${selected ? 'selected' : ''}`}
                      onClick={() => {
                        this.setState({
                          list: _.map(list, item => {
                            if (item._id === _id) {
                              return {
                                ...item,
                                selected: !selected
                              }
                            }
                            return item;
                          })
                        })
                      }}
                >
                  <View
                    className='flex justify-between align-center padding-lg'>
                    <View className='coupon-pic'>
                      <Image
                        src={image || 'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
                    </View>
                    <View className='flex-sub padding-left-md'>
                      <View className='text-base text-bold'>{name}</View>
                      <View className='text-sm margin-top-sm'>{description}</View>
                      <View
                        className='text-xs margin-top-xl'>有效期：{dayJs(expireDate).format('YYYY-MM-DD')}</View>
                    </View>
                    <View className='coupon-info text-center text-white padding-tb-lg text-sm margin-right-md'>
                      <View>五星酒店</View>
                      <View>通用房券</View>
                      <Text className='coupon-use text-xs margin-top-md'>立即使用</Text>
                    </View>
                    <View className='text-xl text-main'>
                      <Checkbox value={_id} color='#ffa940' checked={selected}/>
                    </View>
                  </View>
                </View>
              );
            })
          }
        </View>
        {
          list.length ? (
            <View className='footer-wrap'>
              <View className='bg-main text-center margin-lr-lg btn' onClick={this.handleClickConfirm}>确 定</View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default Login;

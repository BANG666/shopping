import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';

import './index.scss';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { orderList } from '../../servers/servers';
import defaultCover from '../../assets/image/hotel-cover.png';
import handleError from '../../utils/handleError';
import empty_list from '../../assets/image/empty.png';
import { connect } from '@tarojs/redux';
import { UPDATE_ORDER_VOUCHER } from '../../redux/actions/order';


@connect(({ orderModel }) => ({
  orderDetail: orderModel.orderDetail
}))
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 0,
      paginate:{
        pageLimit: 20,
        pageNum: 1
      }
    };
  }

  config = {
    navigationBarTitleText: '我的订单'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
    this.getOrderList();
  };

  componentDidHide() {
  };

  handleClickTabs = index => {
    const type = index + 1;
    this.setState({
      current: index,
      list: []
    });
    this.getOrderList(type);
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  getOrderList = (status = 1) => {
    const { paginate } = this.state;
    Taro.showLoading({ title: '加载中...' });
    orderList({ data: {conds: { status }}, paginate }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          list: data
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        });
      }
      Taro.hideLoading();
    }).catch(err => {})
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { list, current } = this.state;
    const tabList = [{ title: '待支付' }, { title: '已完成' }];
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtTabs swipeable={false} current={current} tabList={tabList} onClick={this.handleClickTabs}>
          <AtTabsPane current={current} index={0}>
            <View className='padding-lg order-list'>
              {
                list.map(item => {
                  const { number, totalPrice = 0, voucherPackage = {}, _id } = item;
                  return (
                    <View key={_id} className='order-item bg-white padding-lg margin-bottom-lg'>
                      <View className='flex justify-between'>
                        <View className='order-pic'>
                          <Image
                            src={voucherPackage.image || defaultCover}
                            onError={this.handleError}/>
                        </View>
                        <View className='flex-sub margin-lr-md'>
                          <View className='text-sm margin-right-md'>
                            {voucherPackage.name} ｜ {voucherPackage.description}
                          </View>
                          <View className='text-bold text-base margin-top-lg'>金额：￥{totalPrice}</View>
                        </View>
                        <View className='text-sm text-right'>
                          <View className='text-main margin-bottom-md'>已完成</View>
                          <View>x{number}</View>
                        </View>
                      </View>
                      <View className='flex justify-end align-center text-sm text-gray-8 margin-top-xl'>
                        <View className='order-payment-btn text-center text-main' onClick={() => {
                          this.props.dispatch({
                            type: UPDATE_ORDER_VOUCHER,
                            payload: item
                          });
                          Taro.navigateTo({ url: '/pages/order/payment' })
                        }}>去支付</View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='padding-lg order-list'>
              {
                list.map(item => {
                  const { number, totalPrice = 0, voucherPackage = {}, _id } = item;
                  return (
                    <View key={_id} className='order-item bg-white padding-lg margin-bottom-lg'>
                      <View className='flex justify-between'>
                        <View className='order-pic'>
                          <Image
                            src={voucherPackage.image ||defaultCover}
                            onError={this.handleError}/>
                        </View>
                        <View className='flex-sub margin-lr-md'>
                          <View className='text-sm margin-right-md'>
                            {voucherPackage.name} ｜ {voucherPackage.description}
                          </View>
                          <View className='text-bold text-base margin-top-lg'>金额：￥{totalPrice}</View>
                        </View>
                        <View className='text-sm text-right'>
                          <View className='text-main margin-bottom-md'>已完成</View>
                          <View>x{number}</View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
        </AtTabs>
        {
          list.length === 0 ? (
            <View className='empty_list'>
              <Image className='pic' src={empty_list}/>
              <View className='text-center text-sm'>暂无数据~</View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default Order;

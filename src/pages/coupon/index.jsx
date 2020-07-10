import React from 'react';
import { Component } from '@tarojs/taro';
import { Block, Image, Text, View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import _ from 'underscore';
import used from '../../assets/image/used.png';
import expired from '../../assets/image/expired.png';

import { getVoucherOrderList } from '../../servers/servers';
import handleError from '../../utils/handleError';
import empty_list from '../../assets/image/empty.png';
import './index.scss';
import { UPDATE_PARAMS } from '../../redux/actions/hotel';

@connect(({ userModel, hotelModel }) => ({
  user: userModel.user
}))
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      couponType: 'used',
      loadState: false,
      list: []
    };
  }

  config = {
    navigationBarTitleText: '我的订单'
  };

  componentWillUnmount() {
  };

  componentDidMount() {
    this.getVoucherList();
  }

  componentDidShow() {
  };

  componentDidHide() {

  };

  // 触底翻页
  onReachBottom() {
    console.log(1);
  }

  getVoucherList = (type = 'available') => {
    const { user } = this.props;
    Taro.showLoading({ title: '加载中...' });
    getVoucherOrderList({ conds: { type, customer: user._id } }).then(res => {
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

  handleClickTabs = index => {
    let type = '';
    this.setState({
      current: index,
      loadState: false,
      list: []
    });
    switch (index) {
      case 0:
        type = 'available';
        break;
      case 1:
        type = 'used';
        break;
      case 2:
        type = 'expired';
        break;
    }
    this.getVoucherList(type);
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  handleClickCoupon = id => {
    this.props.dispatch({
      type: UPDATE_PARAMS,
      payload: {
        template: id
      }
    });
    Taro.navigateTo({
      url: '/pages/bookingHome/index'
    })
  };

  render() {
    const { current, loadState, list } = this.state;
    const tabList = [{ title: '未使用' }, { title: '已使用' }, { title: '已过期' }];
    let not_list_str = '';
    let unusedList = [];
    const unusedList1 = _.groupBy(list, el => {
      return el.template._id
    });
    unusedList = _.values(unusedList1);
    switch (current) {
      case 0:
        not_list_str = '暂无可用房券~';
        break;
      case 1:
        not_list_str = '暂无已使用房券~';
        break;
      case 2:
        not_list_str = '暂无已失效房券~';
        break;
    }
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClickTabs}>
          <AtTabsPane current={current} index={0}>
            <View className='padding-lg coupon-list'>
              {
                unusedList.map(el => {
                  const { template: { expireDate, name, description, image, _id } } = el[0];
                  return (
                    <View key={el._id}
                          className='margin-bottom-lg coupon-item'
                          onClick={() => this.handleClickCoupon(_id)}>
                      <View className='flex justify-between align-center padding-lg'>
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
                        <View className='text-xl text-main'>*{el.length}</View>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='padding-lg coupon-list'>
              {
                list.map(el => {
                  const { template: { expireDate, name, description } } = el;
                  return (
                    <View key={el._id}
                          className='margin-bottom-lg coupon-item'>
                      <View className='flex justify-between align-center'>
                        <View className='flex-sub padding-md'>
                          <View className='text-base text-bold'>{name}</View>
                          <View className='text-sm margin-top-sm'>{description}</View>
                          <View className='text-xs margin-top-xl'>有效期：{dayJs(expireDate).format('YYYY-MM-DD')}</View>
                        </View>
                        <View className='used-icon'>
                          <Image src={used}/>
                        </View>
                        <View className='used text-center text-white padding-md'>
                          <View className='text-base text-bold'>五星酒店</View>
                          <View className='text-sm margin-top-sm'>通用房券</View>
                        </View>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className='padding-lg coupon-list'>
              {
                list.map(el => {
                  const { template: { expireDate, name, description } } = el;
                  return (
                    <View key={el._id}
                          className='margin-bottom-lg coupon-item'>
                      <View className='flex justify-between align-center'>
                        <View className='flex-sub padding-md'>
                          <View className='text-base text-bold'>{name}</View>
                          <View className='text-sm margin-top-sm'>{description}</View>
                          <View className='text-xs margin-top-xl'>有效期：{dayJs(expireDate).format('YYYY-MM-DD')}</View>
                        </View>
                        <View className='used-icon'>
                          <Image src={expired}/>
                        </View>
                        <View className='used text-center text-white padding-md'>
                          <View className='text-base text-bold'>五星酒店</View>
                          <View className='text-sm margin-top-sm'>通用房券</View>
                        </View>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </AtTabsPane>
        </AtTabs>
        {
          list.length ? (
            <Block>
              {/*{*/}
              {/*  loadState ? (<AtActivityIndicator content='加载中...'/>) : (*/}
              {/*    <View className='text-center text-sm'>已加载全部</View>*/}
              {/*  )*/}
              {/*}*/}
            </Block>
          ) : (
            <View className='empty_list'>
              <Image className='pic' src={empty_list}/>
              <View className='text-center text-sm'>暂无数据~</View>
            </View>
          )
        }
      </View>
    );
  }
}

export default Coupon;

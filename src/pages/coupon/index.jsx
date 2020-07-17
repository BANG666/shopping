import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Block, Image, Text, View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import _ from 'underscore';
import { getVoucherOrderList } from '../../servers/servers';
import handleError from '../../utils/handleError';
import { UPDATE_PARAMS } from '../../redux/actions/hotel';
import Skeleton from '../../components/Skeleton/Skeleton';
import used from '../../assets/image/used.png';
import expired from '../../assets/image/expired.png';
import empty_list from '../../assets/image/empty.png';
import defaultCover from '../../assets/image/hotel-cover.png';
import './index.scss';

@connect(({ userModel, hotelModel }) => ({
  user: userModel.user
}))
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      couponType: 'used',
      isLoad: false,
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

  getVoucherList = (type = 'available') => {
    const token =  Taro.getStorageSync('token');
    if(token) {
      const { user } = this.props;
      Taro.showLoading({ title: '加载中...' });
      getVoucherOrderList({ conds: { type, customer: user._id } }).then(res => {
        const { data, code } = res;
        const { message = '' } = handleError(res);
        if (!message) {
          this.setState({
            list: data,
            isLoad: true
          })
        } else {
          Taro.showToast({
            title: message,
            icon: 'none'
          });
        }
        Taro.hideLoading();
      }).catch(err => {})
    } else {
      this.setState({
        isLoad: true
      })
    }
  };

  handleClickTabs = index => {
    let type = '';
    this.setState({
      current: index,
      list: [],
      isLoad: false
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
      url: '/hotelPages/bookingHome/index'
    })
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { current, list, isLoad } = this.state;
    const tabList = [{ title: '未使用' }, { title: '已使用' }, { title: '已过期' }];
    const unusedList1 = _.groupBy(list, el => {
      return el.template._id
    });
    const unusedList = _.values(unusedList1) || [];
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtTabs swipeable={false} current={current} tabList={tabList} onClick={this.handleClickTabs}>
          <AtTabsPane current={current} index={0}>
            <View className='padding-lg coupon-list'>
              {
                unusedList.map(el => {
                  const { template: { expireDate, name, description, _id, image } } = el[0];
                  return (
                    <View key={el._id}
                          className='margin-bottom-lg coupon-item'
                          onClick={() => this.handleClickCoupon(_id)}>
                      <View className='flex justify-between align-center padding-lg'>
                        <View className='coupon-pic'>
                          <Image
                            mode='aspectFill'
                            src={image || defaultCover} onError={this.handleError}/>
                        </View>
                        <View className='flex-sub padding-left-md'>
                          <View className='text-base text-bold'>{name}</View>
                          <View className='text-sm margin-top-sm'>{description}</View>
                          <View
                            className='text-xs margin-top-xl'>有效期：{dayJs(expireDate).format('YYYY-MM-DD')}</View>
                        </View>
                        <View className='coupon-info text-center text-white padding-tb-lg text-sm margin-right-md'>
                          {/*<View>五星酒店</View>*/}
                          {/*<View>通用房券</View>*/}
                          <View>{name}</View>
                          <Text className='coupon-use text-xs margin-top-md'>立即使用</Text>
                        </View>
                        <View className='text-xl text-main' style={{ width: '30px' }}>*{el.length}</View>
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
                          {name}
                          {/*<View className='text-base text-bold'>五星酒店</View>*/}
                          {/*<View className='text-sm margin-top-sm'>通用房券</View>*/}
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
                          {name}
                          {/*<View className='text-base text-bold'>五星酒店</View>*/}
                          {/*<View className='text-sm margin-top-sm'>通用房券</View>*/}
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
          list.length === 0 && isLoad ? (
            <View className='empty_list'>
              <Image className='pic' src={empty_list}/>
              <View className='text-center text-sm'>暂无数据~</View>
            </View>
          ) : null
        }
        {
          !list.length && !isLoad ? (
            <Block>
              {
                [1, 2, 3, 4].map(el => <Skeleton key={el}/>)
              }
            </Block>) : null
        }
      </View>
    );
  }
}

export default Coupon;

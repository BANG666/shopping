import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Block, Image, Text, View } from '@tarojs/components';
import { AtDivider, AtIcon, AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from '@tarojs/redux';
import dayJs from 'dayjs';
import { getReservation } from '../../servers/servers';
import handleError from '../../utils/handleError';
import { dateSpace } from '../../utils/util';
import empty_list from '../../assets/image/empty.png';
import defaultCover from '../../assets/image/hotel-cover.png';
import './index.scss';
import Skeleton from '../../components/Skeleton/Skeleton';

@connect(({ userModel }) => ({
  user: userModel.user
}))
class BookingOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      list: [],
      orderType: 0,
      notMore: false,
      isLoad: false,
      paginate: {
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

  componentDidMount() {
    this.getOrderList();
  }

  componentDidShow() {
  };

  componentDidHide() {

  };

  // 触底翻页
  onReachBottom() {
    const { orderType, paginate: { total }, list } = this.state;
    if (list.length < total) {
      this.getOrderList(orderType)
    } else {
      this.setState({
        notMore: true
      })
    }
  }

  getOrderList = (status = undefined) => {
    const { user } = this.props;
    const { paginate: { pageLimit, pageNum }, list } = this.state;
    Taro.showLoading({ title: '加载中...' });
    getReservation({ data: { conds: { customer: user._id, status } }, paginate: { pageLimit, pageNum } }).then(res => {
      const { data, code, paginate } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          list: [...list, ...data],
          isLoad: true,
          paginate: {
            pageLimit,
            pageNum: paginate.next || pageNum,
            total: paginate.total
          }
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        });
      }
      Taro.hideLoading();
    }).catch(err => {
      Taro.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none'
      })
    });
  };

  handleClickTabs = index => {
    let type = '';
    switch (index) {
      case 0:
        type = undefined;
        break;
      case 1:
        type = 0;
        break;
      case 2:
        type = 1;
        break;
      case 3:
        type = 2;
        break;
    }
    this.setState({
      current: index,
      list: [],
      orderType: type,
      isLoad: false,
      notMore: false,
      paginate: {
        pageLimit: 20,
        pageNum: 1
      }
    }, () => {
      this.getOrderList(type);
      Taro.pageScrollTo({ scrollTop: 0 });
    });

  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { current, list, notMore, isLoad } = this.state;
    const tabList = [{ title: '全部' }, { title: '待确认' }, { title: '已确认' }, { title: '已取消' }];

    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtTabs swipeable={false} current={current} tabList={tabList} onClick={this.handleClickTabs}>
          <AtTabsPane current={current} index={0}>
            <View className='order-list padding-lg'>
              {
                list.map(item => {
                  const { hotel = {}, checkOutDate, checkInDate, status, contact = {} } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM[月]DD[日]')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM[月]DD[日]')}`;
                  let statusStr = '';
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
                    <View key={item._id}
                          className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          mode='aspectFill'
                          src={hotel.cover || defaultCover}
                          onError={this.handleError}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text
                            className={`text-sm ${status === 2 ? 'text-red' : ''} ${status === 1 ? 'text-green' : ''} ${status === 0 ? 'text-main' : ''}`}>{statusStr}</Text>
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
                          <Text
                            className='text-sm text-gray-8 margin-left-md'>共{dateSpace(checkInDate, checkOutDate)}晚</Text>
                        </View>
                        <AtDivider height='40' content=''/>
                        <View className='flex justify-end align-center text-sm text-gray-8'>
                          <View>入住人：{contact.name}</View>
                          <View className='margin-left-md'>联系电话：{contact.phone}</View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='order-list padding-lg'>
              {
                list.map(item => {
                  const { hotel = {}, checkOutDate, checkInDate, contact = {} } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          mode='aspectFill'
                          src={hotel.cover || defaultCover}
                          onError={this.handleError}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text className='text-main text-sm'>待确认</Text>
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
                          <Text
                            className='text-sm text-gray-8 margin-left-md'>共{dateSpace(checkInDate, checkOutDate)}晚</Text>
                        </View>
                        <AtDivider height='40' content=''/>
                        <View className='flex justify-end align-center text-sm text-gray-8'>
                          <View>入住人：{contact.name}</View>
                          <View className='margin-left-md'>联系电话：{contact.phone}</View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className='order-list padding-lg'>
              {
                list.map(item => {
                  const { hotel = {}, checkOutDate, checkInDate, contact = {} } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          mode='aspectFill'
                          src={hotel.cover || defaultCover}
                          onError={this.handleError}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text className='text-green text-sm'>已确认</Text>
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
                          <Text
                            className='text-sm text-gray-8 margin-left-md'>共{dateSpace(checkInDate, checkOutDate)}晚</Text>
                        </View>
                        <AtDivider height='40' content=''/>
                        <View className='flex justify-end align-center text-sm text-gray-8'>
                          <View>入住人：{contact.name}</View>
                          <View className='margin-left-md'>联系电话：{contact.phone}</View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View className='order-list padding-lg'>
              {
                list.map(item => {
                  const { hotel = {}, checkOutDate, checkInDate, contact = {} } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          mode='aspectFill'
                          src={hotel.cover || defaultCover}
                          onError={this.handleError}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text className='text-red text-sm'>已取消</Text>
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
                          <Text
                            className='text-sm text-gray-8 margin-left-md'>共{dateSpace(checkInDate, checkOutDate)}晚</Text>
                        </View>
                        <AtDivider height='40' content=''/>
                        <View className='flex justify-end align-center text-sm text-gray-8'>
                          <View>入住人：{contact.name}</View>
                          <View className='margin-left-md'>联系电话：{contact.phone}</View>
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
        {
          list.length && notMore ? (
            <View className='text-center text-sm text-sm text-gray-8' style={{lineHeight: '40px'}}>已加载全部</View>
          ) : null
        }
      </View>
    )
  }
}

export default BookingOrder;

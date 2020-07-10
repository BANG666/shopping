import React from 'react';
import { Component } from '@tarojs/taro';
import { Block, Image, Text, View } from '@tarojs/components';
import { AtButton, AtDivider, AtIcon, AtTabs, AtTabsPane } from 'taro-ui';
import { getReservation } from '../../servers/servers';

import './index.scss';
import { connect } from '@tarojs/redux';
import handleError from '../../utils/handleError';
import { dateSpace } from '../../utils/util';
import dayJs from 'dayjs';
import empty_list from '../../assets/image/empty.png';

@connect(({ userModel }) => ({
  user: userModel.user
}))
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
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
    this.getOrderList();
  }

  componentDidShow() {
  };

  componentDidHide() {

  };

  // 触底翻页
  onReachBottom() {
    console.log(1);
    // this.setState({
    //   loadState: true
    // })
  }

  getOrderList = (status = undefined) => {
    const { user } = this.props;
    Taro.showLoading({ title: '加载中...' });
    getReservation({ data: { conds: { customer: user._id, status } } }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          list: data,
          loadState: false
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        });
      }
      Taro.hideLoading();
    }).catch(err => {
      console.log(err);
    });
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
    this.getOrderList(type);
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  render() {
    const { current, loadState, list } = this.state;
    const tabList = [{ title: '全部' }, { title: '待确认' }, { title: '已确认' }, { title: '已取消' }];


    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClickTabs}>
          <AtTabsPane current={current} index={0}>
            <View className='order-list padding-lg'>
              {
                list.map(item => {
                  const { hotel = {}, checkOutDate, checkInDate, status } = item;
                  let statusStr = '';
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
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
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          src={'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text className='text-main text-sm'>{statusStr}</Text>
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
                        <AtDivider content=''/>
                        <View className='flex justify-end align-center'>
                          <AtButton size='small'>再次预订</AtButton>
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
                  const { hotel = {}, checkOutDate, checkInDate } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          src={'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
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
                        <AtDivider content=''/>
                        <View className='flex justify-end align-center'>
                          <AtButton size='small'>再次预订</AtButton>
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
                  const { hotel = {}, checkOutDate, checkInDate } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          src={'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
                      </View>
                      <View className='flex-sub margin-left-md'>
                        <View className='flex justify-between'>
                          <Text className='text-base flex-twice text-bold margin-right-md'>{hotel.name}</Text>
                          <Text className='text-main text-sm'>已确认</Text>
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
                        <AtDivider content=''/>
                        <View className='flex justify-end align-center'>
                          <AtButton size='small'>再次预订</AtButton>
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
                  const { hotel = {}, checkOutDate, checkInDate } = item;
                  const checkInStr = `${dayJs(checkInDate).format('MM')}月${dayJs(checkInDate).format('DD')}`;
                  const checkOutStr = `${dayJs(checkOutDate).format('MM')}月${dayJs(checkOutDate).format('DD')}`;
                  return (
                    <View key={item} className='order-item bg-white padding-md margin-bottom-lg flex justify-between'>
                      <View className='hotel-pic'>
                        <Image
                          src={'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
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
                        <AtDivider content=''/>
                        <View className='flex justify-end align-center'>
                          <AtButton size='small'>再次预订</AtButton>
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
    )
  }
}

export default Order;

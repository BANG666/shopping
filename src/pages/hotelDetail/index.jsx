import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, RichText, Text, View } from '@tarojs/components';
import _ from 'underscore';
import dayJs from 'dayjs';
import { connect } from '@tarojs/redux';
import { AtMessage } from 'taro-ui';
import { formatRoomBed, formatRoomWifi, formatRoomWindow } from '../../utils/util';
import './index.scss';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

@connect(({ hotelModel }) => ({
  params: hotelModel.params,
  hotelDetail: hotelModel.hotelDetail
}))
class HotelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      roomList: [
        { id: 1, isOpen: false, uid: 'uid-' + generateUUID() },
        { id: 2, isOpen: false, uid: 'uid-' + generateUUID() },
        { id: 3, isOpen: false, uid: 'uid-' + generateUUID() },
        { id: 4, isOpen: false, uid: 'uid-' + generateUUID() },
        { id: 5, isOpen: false, uid: 'uid-' + generateUUID() }
      ]
    };
  }


  config = {
    navigationBarTitleText: '酒店详情'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  onPageScroll({ scrollTop }) {
    // console.log(scrollTop);
    this.setState({
      scrollTop
    });
  }

  handleRoomItemClick = item => {
    const { isOpen, uid } = item;
    const { scrollTop, roomList } = this.state;
    const query = Taro.createSelectorQuery().in(this.$scope);
    this.setState({
      roomList: _.map(roomList, el => {
        if (el.id === item.id) {
          return {
            ...el,
            isOpen: !el.isOpen
          };
        } else {
          return {
            ...el,
            isOpen: false
          };
        }
      })
    });
    query.select('#' + uid).boundingClientRect(data => {
      if (!data) return false;
      if (!isOpen) {
        Taro.pageScrollTo({
          scrollTop: data.top + scrollTop
        });
      }
    }).exec();
  };

  render() {
    const { roomList } = this.state;
    const { params, hotelDetail = {} } = this.props;
    const { checkInAt, checkOutAt, dateNum } = params;
    const { lng = 121.499428, lat = 31.235754, address, name, openedAt, decoratedAt, introduction, description, contactNumber, _id: hotelId } = hotelDetail;
    const checkInStr = dayJs(checkInAt).format('MM') + '月' + dayJs(checkInAt).format('DD') + '日';
    const checkOutStr = dayJs(checkOutAt).format('MM') + '月' + dayJs(checkOutAt).format('DD') + '日';
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtMessage/>
        <View className='hotel-pic-wrap' onClick={() => {
          Taro.navigateTo({
            url: '/pages/hotelPhoto/index'
          })
        }}>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'/>
        </View>
        <View className='hotel-float-top padding-lr-lg'>
          <View className='hotel-name-wrap text-black padding-md' onClick={() => {
            Taro.navigateTo({
              url: '/pages/hotelFacilities/index'
            })
          }}>
            <View className='text-lg text-bold-6 margin-bottom-sm'>{name}</View>
            <View className='flex justify-between align-center'>
              {
                openedAt || decoratedAt ? (
                  <View className='text-sm'>
                    {decoratedAt ? (
                      <Text className='margin-right-sm'>装修：{decoratedAt}</Text>
                    ) : null}
                    {openedAt ? <Text>开业：{openedAt}</Text> : null}
                  </View>
                ) : (<Text className='text-sm'>酒店设施</Text>)
              }
              <View className='text-main text-sm'>
                <Text>设施详情</Text>
                <Text className='cuIcon-right margin-left-md'/>
              </View>
            </View>
          </View>
          <View className='flex align-center justify-between map-icon-wrap margin-top-sm' onClick={() => {
            Taro.openLocation({
              latitude: +lat,
              longitude: +lng,
              name: name,
              address: address,
              fail() {
                Taro.atMessage({
                  'message': '地图打开失败，请稍后重试',
                  'type': 'warning'
                })
              }
            });
          }}>
            <View className='padding-left-md text-base'>{address}</View>
            <View className='hotel-map-icon'>
              <Image lazyLoad src='../../assets/image/map.png'/>
            </View>
          </View>
          <View
            className='flex align-center justify-between margin-top-sm padding-lr-md text-base hotel-facilities-wrap'
            onClick={() => Taro.navigateTo({ url: '/pages/calendar/index' })}>
            <View>
              <Text>日期</Text>
              <Text className='margin-left-md text-main'>{checkInStr}</Text>
              <Text className='margin-left-md text-gray-8'>/</Text>
              <Text className='margin-left-md text-main'>{checkOutStr}</Text>
            </View>
            <Text className='text-main'>共{dateNum}晚</Text>
            {/*<Text className='text-sm cuIcon-right text-gray-d9 margin-left-md'/>*/}
          </View>
        </View>
        <View className='rooms-list'>
          {
            roomList.map((item, index) => {
              const { isOpen, uid } = item;
              const roomCharacteristic = [];
              const style = {
                transform: isOpen ? 'translateY(0)' : 'translateY(-50%)',
                '-webkit-transform': isOpen ? 'translateY(0)' : 'translateY(-50%)'
              };
              _.forEach(
                _.pick({ 'area': 100, 'floor': '10', 'maximumOccupancy': 2, bedTypeCode: 'BT12' }, [
                  'area',
                  'floor',
                  'maximumOccupancy',
                  'bedTypeCode',
                  'wifi',
                  'hasWindow'
                ]),
                (val, key) => {
                  if (val) {
                    let icon = '';
                    let value = val + '';
                    switch (key) {
                      case 'area':
                        icon = 'cuIcon-area';
                        value = val + '㎡';
                        break;
                      case 'floor':
                        icon = 'cuIcon-floor';
                        value = _.isNumber(val) ? val : val.search('层') !== -1 ? val : val + '层';
                        break;
                      case 'maximumOccupancy':
                        icon = 'cuIcon-guests';
                        value = val + '人';
                        break;
                      case 'bedTypeCode':
                        icon = 'cuIcon-bed';
                        const bedObj = formatRoomBed(val);
                        value = bedObj.name || '其它';
                        break;
                      case 'hasWindow':
                        icon = 'cuIcon-window';
                        value = formatRoomWindow(val);
                        break;
                      case 'wifi':
                        icon = 'cuIcon-wifi';
                        value = formatRoomWifi(val);
                        break;
                    }
                    roomCharacteristic.push({
                      icon,
                      value
                    });
                  }
                }
              );
              return (
                <View key={index} className={`margin-bottom-lg ${isOpen ? '' : 'collapse-cell--hide'} `}>
                  <View className='room-pic' id={uid} onClick={() => this.handleRoomItemClick(item)}>
                    <Image lazyLoad
                           src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2778184159,1139093014&fm=26&gp=0.jpg'/>
                    <View className='room-pic-float'>
                      <View className='float-top padding-left-md padding-top-md flex justify-end'>
                        <View className='room-pic-price bg-main padding-lr-sm'><Text
                          className='text-sm'>CNY 1,080 </Text><Text className='text-xs'>每晚</Text></View>
                      </View>
                      <View className='float-bottom padding-md'><Text className='text-lg text-white'>豪华客房</Text></View>
                    </View>
                  </View>
                  <View
                    className={`${isOpen ? '' : 'collapse-cell__content--hide'} collapse-cell__content`}>
                    <View className='collapse-cell--animation collapse-cell__wrapper' style={style}>
                      <View className='solid-bottom padding-bottom-sm'>
                        <View>特色</View>
                        <View className='roomFacilities-wrap flex justify-start align-center flex-wrap'>
                          {
                            roomCharacteristic.map(el => {
                              return (
                                <View key={el.icon} className='roomFacilities'>
                                  <View className='margin-md text-base'>
                                    <Text className={`${el.icon}`}/>
                                    <Text className='margin-left-md'>{el.value}</Text>
                                  </View>
                                </View>
                              );
                            })
                          }
                        </View>
                      </View>
                      <View className='text-base margin-top-lg'>
                        <View className='text-bold'>优享价 / 自选包价（特大床）</View>
                        <View className='flex justify-between align-center margin-top-sm'>
                          <View className='reference-price bg-main text-center text-sm'>参考价</View>
                          <View className='rate-price text-right'>
                            <View className='text-main'>CNY 980</View>
                            <View className='booking-btn bg-main text-center margin-top-sm' onClick={() => {
                              Taro.navigateTo({
                                url: `/pages/booking/index?id=${hotelId}`
                              })
                            }}>预 订</View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          }

        </View>

        {
          introduction || description ? (
            <View className='bg-white margin-lg padding-md'>
              <View className='text-line-zh text-lg margin-bottom-lg'>关于酒店</View>
              <View className='text-sm'>
                <RichText nodes={introduction || description}/>
              </View>
            </View>
          ) : null
        }

        <View className='flex justify-between align-center text-center margin-lr-lg bg-white'>
          <View className='flex-sub padding-tb-lg' onClick={() => {
            if (contactNumber) {
              Taro.makePhoneCall({
                phoneNumber: contactNumber
              })
            }
          }}>电话</View>
          <View className='text-gray-d9'>|</View>
          <View className='flex-sub padding-tb-lg'/>
        </View>
      </View>
    );
  }
}

export default HotelDetail;

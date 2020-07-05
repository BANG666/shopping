import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import './index.scss';
import _ from 'underscore';
import { formatRoomBed, formatRoomWifi, formatRoomWindow } from '../../utils/util';

function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class HotelDetail extends Component {
  constructor (props) {
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

  componentWillUnmount () {
  };

  componentDidShow () {
  };

  componentDidHide () {
  };

  onPageScroll ({ scrollTop }) {
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
        if ( el.id === item.id ) {
          return {
            ...el,
            isOpen: true
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
      if ( !data ) return false;
      if ( !isOpen ) {
        Taro.pageScrollTo({
          scrollTop: data.top + scrollTop,
        });
      }
    }).exec();
  };

  render () {
    const { scrollTop, roomList } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine' />
        <View className='hotel-pic-wrap'>
          <Image lazyLoad
                 src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
          <View className='hotel-name-wrap text-white padding-left-lg padding-right-lg padding-bottom-md'>
            <View className='text-lg text-bold-6 margin-bottom-sm'>上海浦东嘉里大酒店</View>
            <View className='flex justify-between align-center'>
              <Text className='text-sm'>跃动浦东 追随自己的节奏</Text>
              <Text className='cuIcon-xiangce2 text-xxl' />
            </View>
          </View>
        </View>
        <View className='padding-left-lg padding-right-lg padding-top-lg bg-gray'>
          <View className='flex align-center justify-between bg-white map-icon-wrap'>
            <View className='padding-left-md text-base'>中国上海浦东花木路1388号 邮政编码 201204</View>
            <View className='hotel-map-icon'>
              <Image lazyLoad src='../../assets/image/map.png' />
            </View>
          </View>
          <View className='flex align-center justify-between margin-top-md padding-left-md padding-right-md bg-white hotel-facilities-wrap'>
            <View className='text-sm'>
              <Text>美食</Text>
              <Text className='margin-left-md'>休闲与健身</Text>
              <Text className='margin-left-md'>Spa</Text>
            </View>
            <View className='text-sm'>
              <Text className='text-main'>更多</Text>
              <Text className='cuIcon-right text-gray-d9 margin-left-md' />
            </View>
          </View>
          <View className='flex align-center justify-between margin-top-md padding-left-md padding-right-md bg-white hotel-facilities-wrap'>
            <View className='text-sm'>
              <Text>日期</Text>
              <Text className='margin-left-md text-main'>03月23日</Text>
              <Text className='margin-left-md text-gray-8'>/</Text>
              <Text className='margin-left-md text-main'>03月24日</Text>
            </View>
            <Text className='text-sm cuIcon-right text-gray-d9 margin-left-md' />
          </View>
        </View>
        <View className='rooms-list'>
          {/*{*/ }
          {/*  [1,2,3,4,5].map(item => {*/ }
          {/*    return <Room key={item} scrollTop={scrollTop} />*/ }
          {/*  })*/ }
          {/*}*/ }
          {
            roomList.map((item, index) => {
              const { isOpen, uid } = item;
              const roomCharacteristic = [];
              const style = {
                transform: isOpen ? 'translateY(0)' : 'translateY(-50%)',
                '-webkit-transform': isOpen ? 'translateY(0)' : 'translateY(-50%)'
              };
              _.forEach(
                _.pick({ 'area': 100, 'floor': '10', 'maximumOccupancy': 2 }, [
                  'area',
                  'floor',
                  'maximumOccupancy',
                  'bedTypeCode',
                  'wifi',
                  'hasWindow'
                ]),
                (val, key) => {
                  if ( val ) {
                    let icon = '';
                    let value = val + '';
                    switch ( key ) {
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
                        value = _.get(formatRoomBed(val), '[0].name', '');
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
              // console.log(roomCharacteristic);
              return (
                <View key={ index } className={ `${ isOpen ? '' : 'collapse-cell--hide' } ` }
                      onClick={ () => this.handleRoomItemClick(item) }>
                  <View className='room-pic' id={ uid }>
                    <Image lazyLoad
                           src='https://fx-photos.chuxingpay.com/remote/732d80d350d0d89af89a3a738b4362f9.jpg?&x-oss-process=image/quality,q_80&auth_key=1593763913-20c843cc5d274911953c6cbf926b9517-0-e75fe7757827fa40b82bd01505149ca8' />
                  </View>
                  <View
                    className={ `${ isOpen ? '' : 'collapse-cell__content--hide' } collapse-cell__content` }>
                    <View className='collapse-cell--animation collapse-cell__wrapper' style={ style }>
                      <View className='roomFacilities-wrap'>
                        {
                          roomCharacteristic.map(el => {
                            if ( el.value ) {
                              return (
                                <View key={ el.icon } className='roomFacilities'>
                                  <View className='item'>
                                    <Text className={ `${ el.icon }` } />
                                    <Text className='facilities-val'>{ el.value }</Text>
                                  </View>
                                </View>
                              );
                            }
                          })
                        }
                      </View>
                      <View className='room-rate'>
                        <View className='rate-name'>优享价 / 自选包价（特大床）</View>
                        <View className='rate-price-wrap'>
                          <View>参考价</View>
                          <View className='rate-price'>
                            <View className='price'>CNY 980</View>
                            <View className='booking-btn'>预订</View>
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
      </View>
    );
  }
}

export default HotelDetail;

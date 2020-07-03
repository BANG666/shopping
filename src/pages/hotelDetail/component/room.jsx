import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, View, Text } from '@tarojs/components';
import _ from 'lodash';
import { formatRoomBed, formatRoomWifi, formatRoomWindow } from '../../../utils/util';
import '../index.scss';

function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Room extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      uid: 'uid-' + generateUUID()
    };
  }

  componentWillUnmount () {
  }

  componentDidShow () {
  }

  componentDidHide () {
  }

  handleRoomItemClick = (e) => {
    const { isOpen, uid } = this.state;
    const { scrollTop } = this.props;
    const query = Taro.createSelectorQuery().in(this.$scope);
    this.setState({
      isOpen: !isOpen
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
    const { isOpen, uid } = this.state;
    const roomCharacteristic = [];
    const style = {
      transform: isOpen ? 'translateY(0)' : 'translateY(-50%)',
      '-webkit-transform': isOpen ? 'translateY(0)' : 'translateY(-50%)'
    };
    const item = { 'area': 100, 'floor': '10', 'maximumOccupancy': 2 };
    _.forEach(
      _.pick(item, [ 'area', 'floor', 'maximumOccupancy', 'bedTypeCode', 'wifi', 'hasWindow' ]),
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
    return (
      <View className={ `${ isOpen ? '' : 'collapse-cell--hide' } ` }
            onClick={ this.handleRoomItemClick }>
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
  }
}

export default Room;

import React from 'react';
import { Component } from '@tarojs/taro';
import { Picker, RichText, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import { AtForm, AtInput, AtList, AtListItem, AtTextarea } from 'taro-ui';
import { formatCancellationPolicy, formatRoomBed, formatRoomWifi, formatRoomWindow } from '../../utils/util';

import './index.scss';

@connect(({ hotelModel }) => ({
  params: hotelModel.params,
  hotelDetail: hotelModel.hotelDetail
}))
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: null,
      name: '',
      mail: '',
      remark: '',
      selectorChecked: '13:00',
      season: ['12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
    };
  }

  config = {
    navigationBarTitleText: '预订酒店'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
    const { hotelDetail } = this.props;
    const { name } = hotelDetail;
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffa940',
      animation: {
        duration: 100,
        timingFunc: 'easeIn'
      }
    });
    Taro.setNavigationBarTitle({
      title: name || '预订酒店'
    })
  };

  componentDidHide() {
  };

  render() {
    const { params } = this.props;
    const { mobile, name, mail, selectorChecked, season, remark } = this.state;
    const { checkInAt } = params;
    const { cancelPolicyStr, dateStr } = formatCancellationPolicy(checkInAt, 1, {
      deadlineDay: 0,
      percent: 0,
      amount: 0,
      nights: 0,
      deadline: 18
    });
    const roomCharacteristic = [];
    _.forEach(
      _.pick({ 'area': 100, 'floor': '10', 'maximumOccupancy': 2, 'bedTypeCode': 'BT12' }, [
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
      <View className='index'>
        <View className='gradients padding-lr-lg padding-top-md'>
          <View className='room-info-card padding-md bg-white'>
            <View className='flex align-center padding-bottom-md margin-bottom-md checkInDate'>
              <Text>07月06日</Text>
              <Text>今天</Text>
              <View>1晚</View>
              <Text>07月06日</Text>
              <Text>今天</Text>
            </View>
            <View className='text-line-zh text-bold'>标准房 / 双床</View>
            <View className='text-line-zh margin-tb-sm'>入住人数：1</View>
            <View className='text-line-zh'>房间数：1</View>
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
        </View>
        <View className='cancelInfo padding-md flex margin-top-sm'>
          <Text className='cuIcon-notification margin-right-md text-main'/>
          <View className='text-sm text-gray-8 text-line-zh'>
            <RichText nodes={`取消修改说明：${cancelPolicyStr} ${dateStr}`}/>
          </View>
        </View>
        <View className='bg-white padding-lg'>
          <View className='flex justify-between align-center'>
            <Text className='text-base text-bold'>入住人信息</Text>
            <Text className='cuIcon-user text-xxl text-main'/>
          </View>
          <AtForm>
            <AtInput
              name='name'
              required
              border
              title='姓名'
              type='text'
              placeholder='姓名'
              value={name}
              onChange={val => {
                this.setState({
                  name: val
                })
              }}
            />
            <AtInput
              name='mobile'
              required
              border
              title='手机号码'
              type='phone'
              placeholder='手机号码'
              value={mobile}
              onChange={val => {
                this.setState({
                  mobile: val
                })
              }}
            />
            <AtInput
              name='mail'
              border
              title='邮箱'
              type='text'
              placeholder='邮箱'
              value={mail}
              onChange={val => {
                this.setState({
                  mail: val
                })
              }}
            />
            {/*<View className='page-section'>*/}
            {/*  <View>*/}
            <Picker mode='selector' range={season} onChange={e => {
              const { detail } = e;
              this.setState({
                selectorChecked: season[+detail.value]
              })
            }}>
              <AtList>
                <AtListItem
                  title='国家地区'
                  extraText={selectorChecked}
                />
              </AtList>
            </Picker>
            <View className='remark text-sm'>备选要求</View>
            <AtTextarea
              value={remark}
              onChange={val => {
                this.setState({
                  remark: val
                })
              }}
              placeholderClass='textAreaPlaceholder'
              maxLength={300}
              placeholder='备选要求...'
            />
            {/*</View>*/}
            {/*</View>*/}
          </AtForm>
        </View>
      </View>
    );
  }
}

export default Booking;

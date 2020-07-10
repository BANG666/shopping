import React from 'react';
import { Component } from '@tarojs/taro';
import { Block, Picker, RichText, Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import dayJs from 'dayjs';
import { AtButton, AtFloatLayout, AtForm, AtInput, AtList, AtListItem, AtTextarea } from 'taro-ui';
import {
  formatCancellationPolicy,
  formatRoomBed,
  formatRoomWifi,
  formatRoomWindow,
  getDay,
  getToDayAndAfterDay
} from '../../utils/util';
import { createHotelOrder, getVoucherOrderList } from '../../servers/servers';

import './index.scss';
import handleError from '../../utils/handleError';
import { UPDATE_VOUCHER } from '../../redux/actions/hotel';

@connect(({ hotelModel, userModel }) => ({
  params: hotelModel.params,
  hotelDetail: hotelModel.hotelDetail,
  roomType: hotelModel.roomType,
  voucher: hotelModel.voucher,
  user: userModel.user
}))
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRemark: false,
      showNameErr: false,
      showMobileErr: false,
      mobile: null,
      name: '',
      mail: '',
      remark: '',
      defaultRemark: '',
      arrivalTime: '',
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
    const { name, _id } = hotelDetail;
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

  handleBooking = () => {
    const { user, params, roomType, hotelDetail } = this.props;
    const { name, mobile, mail, remark, arrivalTime } = this.state;
    if (name && mobile && arrivalTime) {
      const payload = {
        customer: user._id,
        vouchers: ['5f083b4efcf45e3f0c61c6af'],
        roomType: roomType._id,
        hotel: hotelDetail._id,
        checkInDate: params.checkInAt,
        checkOutDate: params.checkOutAt,
        roomNights: params.dateNum,
        status: 0,
        contact: {
          name,
          email: mail,
          phone: mobile
        },
        estimatedArrivalTime: dayJs().startOf('d')
      };
      createHotelOrder({ data: payload }).then(res => {
        const { data, code } = res;
        const { message = '' } = handleError(res);
        if (!message) {
          Taro.showToast({
            title: '酒店预订成功',
            icon: 'success'
          });
          Taro.reLaunch({
            url: '/pages/bookingSuccess/index'
          })
        } else {
          Taro.showToast({
            title: message,
            icon: 'none'
          });
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.setState({
        showNameErr: !name,
        showMobileErr: !mobile,
        showArrivalTime: !arrivalTime
      });
    }
  };

  getVoucherOrderList = () => {
    const { hotelDetail, dispatch } = this.props;
    getVoucherOrderList({ conds: { type: 'available', hotel: hotelDetail._id } }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        dispatch({
          type: UPDATE_VOUCHER,
          params: data
        })
      } else {
        Taro.showToast({
          title: message,
          icon: 'none'
        });
      }
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    const { params, roomType, voucher } = this.props;
    const { mobile, name, mail, arrivalTime, season, remark, defaultRemark, openRemark, showNameErr, showMobileErr, showArrivalTime } = this.state;
    const { checkInAt, checkOutAt, roomCount, dateNum } = params;
    const checkInToDay = getToDayAndAfterDay(checkInAt) || getDay(dayJs(checkInAt).day());
    const checkInStr = `${dayJs(checkInAt).format('MM')}月${dayJs(checkInAt).format('DD')}`;
    const checkOutToDay = getToDayAndAfterDay(checkOutAt) || getDay(dayJs(checkOutAt).day());
    const checkOutStr = `${dayJs(checkOutAt).format('MM')}月${dayJs(checkOutAt).format('DD')}`;
    const roomBedTypeStr = `${roomType.title} / ${formatRoomBed(roomType.bedTypeCode).name}`;
    const { cancelPolicyStr, dateStr } = formatCancellationPolicy(checkInAt, 1, {
      deadlineDay: 0,
      percent: 0,
      amount: 0,
      nights: 0,
      deadline: 18
    });
    const filterVouchers = _.filter(voucher, el => el.selected);
    const pluckVoucher = _.pluck(filterVouchers, '_id');
    const voucherCount = voucher.length;
    const voucherSelectCount = filterVouchers.length;
    const needVoucherCount = dateNum * roomCount;
    const roomCharacteristic = [];
    _.forEach(
      _.pick(roomType, [
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
              <Text className='text-bold'>{checkInStr}</Text>
              <Text className='text-bold margin-lr-md'>{checkInToDay}</Text>
              <View className='roomNight text-xs'>{dateNum}晚</View>
              <Text className='text-bold margin-lr-md'>{checkOutStr}</Text>
              <Text className='text-bold'>{checkOutToDay}</Text>
            </View>
            <View className='text-line-zh text-bold margin-bottom-md'>{roomBedTypeStr}</View>
            {/*<View className='text-line-zh margin-tb-sm'>入住人数：1</View>*/}
            <View className='text-line-zh'>房间数：{roomCount}</View>
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
        <View className='cancelInfo padding-md flex align-start margin-top-sm'>
          <Text className='cuIcon-notification margin-right-md text-main'/>
          <View className='text-sm text-gray-8 text-line-zh'>
            <RichText nodes={`取消修改说明：${cancelPolicyStr} ${dateStr}`}/>
          </View>
        </View>
        <View className='bg-white padding-lr-lg padding-top-lg'>
          <View className='flex justify-between align-center'>
            <Text className='text-base text-bold'>入住人信息</Text>
            {/*<Text className='cuIcon-user text-xxl text-main'/>*/}
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
                  name: val,
                  showNameErr: !val
                })
              }}
            />
            {
              showNameErr ? (<View className='text-red text-sm'>请填写姓名</View>) : null
            }
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
                  mobile: val,
                  showMobileErr: !val
                })
              }}
            />
            {
              showMobileErr ? (<View className='text-red text-sm'>请填写手机号</View>) : null
            }
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
            <Picker mode='selector' range={season} onChange={e => {
              const { detail } = e;
              const timeStr = season[+detail.value];
              this.setState({
                arrivalTime: timeStr,
                showArrivalTime: !timeStr
              })
            }}>
              <AtList>
                <AtListItem
                  title='抵达酒店时间(必选)'
                  extraText={arrivalTime || '选择抵达酒店时间'}
                />
              </AtList>
            </Picker>
            {
              showArrivalTime ? (<View className='text-red text-sm'>请选择到店时间</View>) : null
            }
            {/*<View className='remark flex justify-between align-center'*/}
            {/*      onClick={() => this.setState({ openRemark: true, defaultRemark: remark })}>*/}
            {/*  <View className='remark-title text-base'>备选要求</View>*/}
            {/*  <View className='flex-sub margin-left-xl text-sm text-right flex align-center'>*/}
            {/*    <View className='text-cut flex-sub padding-right-md remark-text'>*/}
            {/*      {remark ? remark : <Text className='text-gray-9'>可选</Text>}*/}
            {/*    </View>*/}
            {/*    <Text className='cuIcon-right text-gray-9'/>*/}
            {/*  </View>*/}
            {/*</View>*/}
            <View className='remark flex justify-between align-center'
                  onClick={() => Taro.navigateTo({ url: '/pages/selectCoupon/index' })}>
              <View className='remark-title text-base'>选择优惠券</View>
              <View className='flex-sub margin-left-xl text-sm text-right flex align-center'>
                <View className='text-cut flex-sub padding-right-md remark-text'>
                  <Text className='text-gray-9'>必选</Text>
                </View>
                <Text className='cuIcon-right text-gray-9'/>
              </View>
            </View>
          </AtForm>
        </View>
        <View className='footer-booking-wrap flex justify-between align-center padding-left-md bg-white'>
          <View className='flex flex-twice text-sm'>
            {
              voucherCount - needVoucherCount >= 0 ? (
                <Block>
                  <View>
                    <View>房券不足</View>
                    <View className='text-main margin-top-sm'>跳转购买>> </View>
                  </View>
                  <Text className='cuIcon-info margin-left-lg' onClick={() => {
                    Taro.showToast({
                      title: '您将使用4张券，同类券剩余3张，还需1张，点击立刻跳转购买页面',
                      icon: 'none',
                      duration: 3000
                    })
                  }}/>
                </Block>) : (
                voucherSelectCount ? (
                  <View>将使用{voucherSelectCount}张同类型房券，剩余{voucherCount - voucherSelectCount}张</View>) : null
              )
            }
          </View>
          <AtButton className='bg-main text-center text-base booking-btn' onClick={this.handleBooking}>预 订</AtButton>
        </View>
        <AtFloatLayout isOpened={openRemark} title='' onClose={() => {this.setState({ openRemark: false })}}>
          <View className='flex justify-between align-center margin-bottom-lg remark-action text-lg'>
            <View className='flex-sub' onClick={() => {this.setState({ openRemark: false })}}>取消</View>
            <View className='flex-sub text-main text-right'
                  onClick={() => {this.setState({ openRemark: false, remark: defaultRemark })}}>确定</View>
          </View>
          <AtTextarea
            value={defaultRemark}
            onChange={val => {
              this.setState({
                defaultRemark: val
              })
            }}
            placeholderClass='textAreaPlaceholder'
            maxLength={300}
            placeholder='备选要求...'
          />
        </AtFloatLayout>
      </View>
    );
  }
}

export default Booking;

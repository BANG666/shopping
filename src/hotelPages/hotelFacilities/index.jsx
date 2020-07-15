import React from 'react';
import { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import { facilityTypes } from '../../utils/util';
import alipayPayIcon from '../../assets/image/payment-icon/alipay.png';
import wechatPayIcon from '../../assets/image/payment-icon/wechat.png';
import applePayIcon from '../../assets/image/payment-icon/apple.png';
import axPayIcon from '../../assets/image/payment-icon/ax.png';
import dcPayIcon from '../../assets/image/payment-icon/dc.png';
import dsPayIcon from '../../assets/image/payment-icon/ds.png';
import masterPayIcon from '../../assets/image/payment-icon/master.png';
import unionPayIcon from '../../assets/image/payment-icon/union.png';
import visaPayIcon from '../../assets/image/payment-icon/visa.png';
import './index.scss';

@connect(({ hotelModel }) => ({
  hotelDetail: hotelModel.hotelDetail
}))
class HotelFacilities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  config = {
    navigationBarTitleText: '酒店设施'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  render() {
    const { hotelDetail } = this.props;
    const { facilities = [], policies = {} } = hotelDetail;
    const { checkInAndOut = [14, 12], payMethods = [] } = policies;
    const facObj = {
      FCT01: {
        code: 'FCT01',
        name: '酒店设施',
        list: []
      },
      FCT02: {
        code: 'FCT02',
        name: '前台服务',
        list: []
      },
      FCT03: {
        code: 'FCT03',
        name: '餐饮服务',
        list: []
      },
      FCT04: {
        code: 'FCT04',
        name: '休闲娱乐',
        list: []
      },
      FCT05: {
        code: 'FCT05',
        name: '通用设施',
        list: []
      },
      FCT07: {
        code: 'FCT07',
        name: '客房设施',
        list: []
      },
      FCT08: {
        code: 'FCT08',
        name: '食品饮品',
        list: []
      },
      FCT09: {
        code: 'FCT09',
        name: '浴室',
        list: []
      },
      FCT06: {
        code: 'FCT06',
        name: '其它',
        list: []
      }
    };

    function mapCodeName(code) {
      const list1 = facilityTypes.filter(el => el.code.length > 5);
      if (code.length > 5) {
        list1.forEach(item => {
          if (item.code === code) {
            const key = code.substr(0, 5);
            const list = facObj[key] ? facObj[key].list : [];
            list.push(item);
            facObj[key].list = list;
          }
        });
      }
    }

    _.forEach(facilities, el => {
      mapCodeName(el);
    });
    const payMethodsIcons = payMethods.map(el => {
      switch (el) {
        case 'wechat':
          return {
            name: el,
            icon: wechatPayIcon
          };
        case 'alipay':
          return {
            name: el,
            icon: alipayPayIcon
          };
        case 'union':
          return {
            name: el,
            icon: unionPayIcon
          };
        case 'master':
          return {
            name: el,
            icon: masterPayIcon
          };
        case 'visa':
          return {
            name: el,
            icon: visaPayIcon
          };
        case 'apple':
          return {
            name: el,
            icon: applePayIcon
          };
        case 'ax':
          return {
            name: el,
            icon: axPayIcon
          };
        case 'dc':
          return {
            name: el,
            icon: dcPayIcon
          };
        case 'ds':
          return {
            name: el,
            icon: dsPayIcon
          };
      }
    });

    const formatFacilities = _.filter(facObj, el => el.list.length);
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        {
          _.isEmpty(formatFacilities) ? null : (
            <View>
              <View className='text-bold text-lg'>
                <Text className='verticalLine'/>
                <Text className='margin-left-lg'>酒店设施</Text>
              </View>
              {
                formatFacilities.map(item => {
                  const { list = [] } = item;
                  return (
                    <View key={item.code} className='padding-md'>
                      <View className='margin-bottom-md'>
                        <Text className='leader text-bold'>{item.name}</Text>
                      </View>
                      <View className='flex align-center flex-wrap'>
                        {
                          list.map(subItem => {
                            return (
                              <View key={subItem.code} className='roomFacilities padding-sm'>
                                <View
                                  className='margin-sm text-base text-center text-cut'>
                                  <View className={`${subItem.icon} text-xxl`}/>
                                  <View className='text-cut text-sm text-gray-6'>{subItem.name}</View>
                                </View>
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                })
              }
            </View>
          )
        }
        <View>
          <View className='text-bold text-lg'>
            <Text className='verticalLine'/>
            <Text className='margin-left-lg'>酒店政策</Text>
          </View>
          <View className='padding-md'>
            <View className='margin-bottom-lg text-bold leader'>入住/退房</View>
            <View className='text-gray-6 text-sm margin-bottom-md'>入住：{checkInAndOut[0]}点钟以后</View>
            <View className='text-gray-6 text-sm'>退房：{checkInAndOut[1]}点钟以前</View>
          </View>
        </View>
        {
          _.isEmpty(payMethods) ? null : (
            <View className='margin-top-xl'>
              <View className='padding-md'>
                <View className='margin-bottom-lg text-bold leader'>付款方式</View>
                <View className='payMethodIcons'>
                  {payMethodsIcons.map(el => {
                    return (
                      <View key={el.name} className='payment-item'>
                        <View
                          className='margin-sm payment-item-pic'
                          style={{ backgroundImage: `url(${el.icon})` }}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

export default HotelFacilities;

import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getHotelList } from '../../servers/servers';
import _ from 'underscore';
import './index.scss';
import handleError from '../../utils/handleError';
import { UPDATE_HOTEL_DETAIL } from '../../redux/actions/hotel';

@connect(({ hotelModel }) => ({
  params: hotelModel.params
}))
class HotelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  config = {
    navigationBarTitleText: '酒店列表'
  };

  componentDidMount() {
    this.getHotelList();
  }

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  }

  // 触底翻页
  onReachBottom() {
    console.log(1);
  }

  getHotelList = () => {
    const { params } = this.props;
    Taro.showLoading({ title: '加载中' });
    getHotelList({
      data: { ..._.pick(params, 'city', 'checkInAt', 'checkOutAt', 'template') }, paginate: {
        pageLimit: 30,
        pageNum: 1
      }
    }).then(res => {
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
    }).catch(err => {
      console.log(err);
    });
  };

  handleItemClick = item => {
    this.props.dispatch({
      type: UPDATE_HOTEL_DETAIL,
      payload: item
    });
    Taro.navigateTo({
      url: `/pages/hotelDetail/index?id=${item._id}`
    })
  };

  render() {
    const { list } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        {
          list.map(item => {
            return (
              <View key={item._id} onClick={() => this.handleItemClick(item)} className='hotel-pic'>
                <Image lazyLoad
                       src={item.cover || 'https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c'}/>
                {/*<View className='hotel-price-wrap text-right flex justify-end'>*/}
                {/*  <View className='hotel-price bg-main padding-left-sm'>*/}
                {/*    <Text>CNY 1080</Text>*/}
                {/*    <Text>起 每晚</Text>*/}
                {/*  </View>*/}
                {/*</View>*/}
                <View className='hotel-name-wrap text-white padding-lg'>
                  <View className='hotel-name text-lg text-bold-6 margin-bottom-sm'>{item.name}</View>
                  <View className='hotel-address text-sm text-bold-5'>{item.address}</View>
                </View>
              </View>
            )
          })
        }
      </View>
    );
  }
}

export default HotelList;

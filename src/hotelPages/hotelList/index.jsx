import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Block, Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getHotelList } from '../../servers/servers';
import _ from 'underscore';
import handleError from '../../utils/handleError';
import { UPDATE_HOTEL_DETAIL } from '../../redux/actions/hotel';
import defaultCover from '../../assets/image/hotel-cover.png';
import empty_list from '../../assets/image/empty.png';
import './index.scss';
import Skeleton from '../../components/Skeleton/Skeleton';

@connect(({ hotelModel }) => ({
  params: hotelModel.params
}))
class HotelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoad: false,
      paginate: {
        pageLimit: 30,
        pageNum: 1
      }
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
  }

  getHotelList = () => {
    const { params } = this.props;
    const { paginate } = this.state;
    Taro.showLoading({ title: '加载中' });
    getHotelList({
      data: { ..._.pick(params, 'city', 'checkInAt', 'checkOutAt', 'template') },
      paginate
    }).then(res => {
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
    }).catch(err => {
      Taro.showToast({
        title: '服务器异常，请稍后重试',
        icon: 'none'
      })
    });
  };

  handleItemClick = item => {
    this.props.dispatch({
      type: UPDATE_HOTEL_DETAIL,
      payload: item
    });
    Taro.navigateTo({
      url: `/hotelPages/hotelDetail/index?id=${item._id}`
    })
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  render() {
    const { list, isLoad } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        {
          list.map(item => {
            return (
              <View key={item._id} onClick={() => this.handleItemClick(item)} className='hotel-pic'>
                <Image lazyLoad
                       mode='aspectFill'
                       src={item.cover || defaultCover} onError={this.handleError}/>
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
        {
          !list.length && !isLoad ? (
            <Block>
              {
                [1, 2, 3, 4].map(el => <Skeleton key={el}/>)
              }
            </Block>) : null
        }
        {
          list.length === 0 && isLoad ? (
            <View className='empty_list'>
              <Image className='pic' src={empty_list}/>
              <View className='text-center text-sm'>暂无数据~</View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default HotelList;

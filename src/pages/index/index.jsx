import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import { getHomeVoucherList } from '../../servers/servers';
import handleError from '../../utils/handleError';
import './index.scss';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      list: [],
      bannerList: [
        {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_A1768.png',
          _id: '5f0d713e5662590023d8fb8d'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_A2188.png',
          _id: '5f0d713e5662590023d8fb91'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_A3839.png',
          _id: '5f0d713e5662590023d8fb89'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_B1088.png',
          _id: '5f0d713e5662590023d8fb8f'
        }, {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_B1299.png',
          _id: '5f0d713e5662590023d8fb94'
        }, {
          image: 'http://fx-public.chuxingpay.com/20200715/JJ_B1688.png',
          _id: '5f0d713e5662590023d8fb8b'
        }
      ]
    };
  }

  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentDidMount() {
    this.getVoucherList();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onChange = val => {
    this.setState({
      keyword: val
    });
  };

  getVoucherList = () => {
    getHomeVoucherList({}).then(res => {
      const { data, code } = res;
      const { isLogin = false, message = '' } = handleError(res);
      if (!message) {
        this.setState({
          list: data
        })
      }
    }).catch(err => {

    });
  };

  render() {
    const { keyword, list, bannerList } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        {/*<AtSearchBar*/}
        {/*  value={keyword}*/}
        {/*  onChange={this.onChange}*/}
        {/*/>*/}
        <View className='margin-lg'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
            {
              bannerList.map(item => {
                return (
                  <SwiperItem key={item._id} onClick={() => {
                    Taro.navigateTo({ url: `/pages/couPonDetail/index?id=${item._id}` })
                  }}>
                    <Image lazyLoad
                           src={item.image}/>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </View>
        <View className='padding-top-lg margin-bottom-lg'>
          <View className='text-base text-bold margin-bottom-md padding-lr-lg'>热卖中</View>
          <ScrollView
            className='scrollView padding-left-lg'
            scrollX
            scrollWithAnimation
          >
            {
              list.map(item => {
                return (
                  <View key={item._id} className={`margin-right-lg selling-item ${item === 1 ? 'margin-left-lg' : ''}`}
                        onClick={() => {
                          Taro.navigateTo({ url: `/pages/couPonDetail/index?id=${item._id}` })
                        }}>
                    <View className='selling-item-pic'>
                      <Image src={item.image}/>
                    </View>
                    <View
                      className='text-sm selling-item-info padding-lr-md padding-tb-lg'>
                      <View className='text-red text-line-zh text-cut margin-bottom-md'>{item.name}</View>
                      <Text className='text-line-zh text-cut-twice selling-hotel-name margin-bottom-md'>
                        {item.description}
                      </Text>
                      <View className='text-red text-line-zh text-bold-5'>
                        <Text>￥</Text>
                        <Text className='text-base'>{item.price}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View className='padding-top-lg'>
          <View className='text-base text-bold margin-bottom-md padding-lr-lg'>今日特价</View>
          <View className='special-list'>
            {
              bannerList.map(item => {
                return (
                  <View key={item._id} className='margin-lg special-item' onClick={() => {
                    Taro.navigateTo({ url: `/pages/couPonDetail/index?id=${item._id}` })
                  }}>
                    <Image src={item.image}/>
                    {/*<View className='special-item-info padding-md text-white'>*/}
                    {/*  {item.name}*/}
                    {/*</View>*/}
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

export default Index;

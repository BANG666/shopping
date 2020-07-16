import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { getHomeVoucherList } from '../../servers/servers';
import handleError from '../../utils/handleError';
import './index.scss';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      hotList: [
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG84.png',
          _id: '5f0d713e5662590023d8fb8d'
        },
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG82.png',
          _id: '5f0d713e5662590023d8fb94'
        },
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG80.png',
          _id: '5f0d713e5662590023d8fb89'
        },
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG85.png',
          _id: '5f0d713e5662590023d8fb8f'
        },
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG83.png',
          _id: '5f0d713e5662590023d8fb91'
        },
        {
          image: 'https://fx-public.oss-cn-shanghai.aliyuncs.com/20200716001/WechatIMG81.png',
          _id: '5f0d713e5662590023d8fb8b'
        }
      ],
      bannerList: [
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/3_1768.png',
          _id: '5f0d713e5662590023d8fb8d'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/6_1299.png',
          _id: '5f0d713e5662590023d8fb94'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/3839.png',
          _id: '5f0d713e5662590023d8fb89'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/4_1088.png',
          _id: '5f0d713e5662590023d8fb8f'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/5_2188.png',
          _id: '5f0d713e5662590023d8fb91'
        },
        {
          image: 'http://fx-public.chuxingpay.com/20200716001/2_1688.png',
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
    const { list, bannerList, hotList } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        {/*<AtSearchBar*/}
        {/*  value={keyword}*/}
        {/*  onChange={this.onChange}*/}
        {/*/>*/}
        <View className=''>
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
        <View className='padding-top-lg margin-tb-lg'>
          <View className='text-xxl text-bold margin-bottom-lg padding-lr-lg text-center text-main'>
            <Text>--</Text>
            <Text className='margin-lr-md'>热 卖 产 品</Text>
            <Text>--</Text>
          </View>
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
          {/*<View className='text-base text-bold margin-bottom-md padding-lr-lg'>今日特价</View>*/}
          <View className='text-xxl text-bold margin-bottom-lg padding-lr-lg text-center text-main'>
            <Text>--</Text>
            <Text className='margin-lr-md'>今 日 特 价</Text>
            <Text>--</Text>
          </View>
          <View className='special-list'>
            {
              hotList.map(item => {
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

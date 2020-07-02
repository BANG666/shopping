import { Component } from '@tarojs/taro';
import { Image, ScrollView, Swiper, SwiperItem, View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import './index.scss';


class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount () {
    console.log('componentWillUnmount');
  }

  componentDidShow () {
    console.log('componentDidShow');
  }

  componentDidHide () {
    console.log('componentDidHide');
  }

  onChange = val => {
    this.setState({
      value: val
    });
  };

  onScroll = (e) => {
    console.log(e.detail);
  };

  render () {
    return (
      <View className='index'>
        <AtSearchBar
          value={ this.state.value }
          onChange={ this.onChange }
        />
        <View className='margin-lg'>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
            <SwiperItem>
              <View className='demo-text'>
                <Image lazyLoad src='https://fx-photos.chuxingpay.com/remote/debebdce1da0ca3515b0f420d6884f6c.jpg?&auth_key=1593678192-1e976b23a00a42598fe38ff5d67c50fb-0-ce0fa741c05d0910f21596fe770a9eb2' />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text'>
                <Image lazyLoad src='https://fx-photos.chuxingpay.com/remote/984cb33193f22ebb14f566f1b73e4383.jpg?&auth_key=1593678192-37b66c9fc3364405a4a9b781b1cf0dce-0-a7b6fe81de6cbf2f4818fce994c32ffa' />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text'>
                <Image lazyLoad src='https://fx-photos.chuxingpay.com/remote/d0445c1afcf836c2dd36bc770cb1877e.jpg?&auth_key=1593678192-48e33d9f83bd4236b2ac9ac296818f6a-0-a867112b94b6a2eb8b2cd62fc7ced19c' />
              </View>
            </SwiperItem>
          </Swiper>
        </View>
        <View className='padding-top-lg margin-bottom-lg'>
          <View className='text-xl text-bold margin-bottom-md padding-left-lg padding-right-lg'>热卖中</View>
          <ScrollView
            className='scrollView padding-left-lg'
            scrollX
            scrollWithAnimation
            onScroll={ this.onScroll }
          >
            <View className='margin-right-lg'
                  style={ { width: '340px', height: '100%', background: '#f9f9f9', display: 'inline-block' } }
            >1</View>
            <View className='margin-right-lg'
                  style={ { width: '340px', height: '100%', background: '#f1f1f1', display: 'inline-block' } }
            >2</View>
          </ScrollView>
        </View>
        <View className='padding-top-lg'>
          <View className='text-xl text-bold margin-bottom-md padding-left-lg padding-right-lg'>今日特价</View>
          <View className='margin-lg' style={ { height: '150px', background: '#f1f1f1' } }>1</View>
          <View className='margin-lg' style={ { height: '150px', background: '#f1f1f1' } }>2</View>
          <View className='margin-lg' style={ { height: '150px', background: '#f1f1f1' } }>3</View>
          <View className='margin-lg' style={ { height: '150px', background: '#f1f1f1' } }>4</View>
        </View>
      </View>
    );
  }
}

export default Index;

import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui';
import { Image, RichText, ScrollView, Text, View } from '@tarojs/components';
import WhiteSpace from '../../components/WhiteSpace';
import { getVoucherDetail } from '../../servers/servers';
import handleError from '../../utils/handleError';
import { UPDATE_VOUCHER_DETAIL } from '../../redux/actions/voucher';
import defaultCover from '../../assets/image/hotel-cover.png';
import retreat_icon from '../../assets/image/retreat_icon.png';
import booking_icon from '../../assets/image/booking_icon.png';
import './index.scss';

@connect(({ userModel, voucherModel }) => ({}))
class CouponDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsWrapTop: 0,
      detailTop: 0,
      introductionTop: 0,
      instructionTop: 0,
      scrollTop: 0,
      menuFixed: false,
      toView: '',
      voucherDetail: {}
    };
  }

  config = {
    navigationBarTitleText: '券详情'
  };

  componentDidMount() {
    const { params } = this.$router;
    this.getVoucherDetail(params.id);
  }

  // onShow
  componentDidShow() {
    this.initClientRect();
  };

  componentDidHide() {
  };

  handleScroll = ({ detail }) => {
    const { tabsWrapTop } = this.state;
    const scrollTop = detail.scrollTop;
    // console.log(scrollTop);
    const query = Taro.createSelectorQuery().in(this.$scope);
    query.select('#detail').boundingClientRect(data => {
      if (!data) return false;
      this.setState({
        detailTop: data.top
      })
    }).exec();

    query.select('#introduction').boundingClientRect(data => {
      if (!data) return false;
      this.setState({
        introductionTop: data.top
      })
    }).exec();

    query.select('#instruction').boundingClientRect(data => {
      if (!data) return false;
      this.setState({
        instructionTop: data.top
      })
    }).exec();
    this.setState({
      menuFixed: scrollTop > tabsWrapTop,
      scrollTop: scrollTop,
      toView: ''
    });
  };

  getVoucherDetail = (id) => {
    getVoucherDetail({ id }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          voucherDetail: data
        })
      } else {
        Taro.showToast({
          title: message + '请稍后重试',
          icon: 'none'
        });
        // Taro.navigateBack();
      }
    }).catch(err => {

    })
  };

  handleClickBuy = () => {
    this.props.dispatch({
      type: UPDATE_VOUCHER_DETAIL,
      payload: this.state.voucherDetail
    });
    Taro.navigateTo({ url: '/pages/confirmCoupon/index' })
  };

  handleError = e => {
    e.target.src = defaultCover;
  };

  handleClickTabs = e => {
    this.setState({
      toView: e.target.dataset.hash
    })
  };

  initClientRect = () => {
    const query = Taro.createSelectorQuery().in(this.$scope);
    query.select('#affix').boundingClientRect(data => {
      if (!data) return false;
      this.setState({
        tabsWrapTop: data.top
      })
    }).exec();

  };

  render() {
    const { voucherDetail, toView, menuFixed, detailTop, introductionTop, instructionTop, scrollTop } = this.state;
    const { introduction, instruction, detail, name, image, description, price } = voucherDetail;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <ScrollView
          className='scrollView'
          scrollY
          scrollWithAnimation
          scrollIntoView={toView}
          onScroll={this.handleScroll}
        >
          <View className='hotel-cover'>
            <Image src={image || defaultCover} onError={this.handleError}/>
          </View>
          <View className='padding-lg'>
            <View className='text-red text-line-zh text-base text-bold-4'>{name}</View>
            <View className='text-black text-line-zh text-base text-bold-6 margin-top-md'>{description}</View>
            <View className='text-line-zh margin-top-lg flex align-center'>
              <View className='flex align-center'>
                <Image style={{height: '12px', width: '12px'}} src={booking_icon} />
                <Text className='text-bold-4 text-sm margin-left-sm'>在线预订</Text>
              </View>
              <View className='margin-left-lg flex align-center'>
                <Image style={{height: '12px', width: '12px'}} src={retreat_icon} />
                <Text className='text-bold-4 text-sm margin-left-sm'>未预约全额退</Text>
              </View>
            </View>
            <View className='margin-top-lg text-red'>
              <Text className='text-base'>￥</Text>
              <Text className='text-xxl'>{price}</Text>
            </View>
            {/*<WhiteSpace my-class='padding-top-lg padding-bottom-lg'/>*/}
          </View>
          <WhiteSpace my-class='padding-top-sm padding-bottom-sm bg-gray'/>
          <View className={`flex justify-between align-center menu-wrap ${menuFixed ? 'fixed' : ''}`} id="affix">
            <View
              className={`flex-sub text-center ${toView === 'detail' || (scrollTop >= detailTop && scrollTop < introductionTop-detailTop) ? 'currentView' : ''}`}
              onClick={this.handleClickTabs} data-hash='detail'>费用包含</View>
            <View
              className={`flex-sub text-center ${(scrollTop >= introductionTop - detailTop && scrollTop < instructionTop - detailTop) && scrollTop ? 'currentView' : ''}`}
              onClick={this.handleClickTabs} data-hash='introduction'>图文介绍</View>
            <View
              className={`flex-sub text-center ${scrollTop >= instructionTop - detailTop && scrollTop ? 'currentView' : ''}`}
              onClick={this.handleClickTabs} data-hash='instruction'>预订须知</View>
          </View>
          <View id='detail' className={`padding-lr-lg ${menuFixed ? 'richText-wrap' : ''}`}>
            <RichText nodes={detail}/>
          </View>
          <View id='introduction' className={`padding-lr-lg ${menuFixed ? 'richText-wrap' : ''}`}>
            <RichText nodes={introduction}/>
          </View>
          <View id='instruction' className={`padding-lr-lg ${menuFixed ? 'richText-wrap' : ''}`}>
            <RichText nodes={instruction}/>
          </View>
        </ScrollView>
        <View className='booking-btn'>
          <AtButton className='bg-red'
                    onClick={this.handleClickBuy}>立即购买</AtButton>
        </View>
      </View>
    );
  }
}

export default CouponDetail;

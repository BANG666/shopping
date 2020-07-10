import React from 'react';
import { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui';
import { Image, Text, View } from '@tarojs/components';
import WhiteSpace from '../../components/WhiteSpace';
import { getVoucherDetail } from '../../servers/servers';
import './index.scss';
import handleError from '../../utils/handleError';
import { UPDATE_VOUCHER_DETAIL } from '../../redux/actions/voucher';

@connect(({ userModel, voucherModel }) => ({
}))
class CouponDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      detail: {}
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
  };

  componentDidHide() {
  };

  handleSegmentedClick = current => {
    this.setState({
      current
    });
  };

  getVoucherDetail = (id) => {
    getVoucherDetail({ id }).then(res => {
      const { data, code } = res;
      const { message = '' } = handleError(res);
      if (!message) {
        this.setState({
          detail: data
        })
      }else{
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
      payload: this.state.detail
    });
    Taro.navigateTo({ url: '/pages/confirmCoupon/index' })
  };

  render() {
    const { current, detail } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='hotel-cover'>
          <Image
            src={detail.image || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593670274645&di=a830446a157ce2d8619c5e56784115b2&imgtype=0&src=http%3A%2F%2Fimages4.c-ctrip.com%2Ftarget%2F2A020800000030cxh7F27.jpg'}/>
        </View>
        <View className='padding-lg'>
          <View className='text-red text-line-zh text-base text-bold-4'>{detail.name}</View>
          <View className='text-black text-line-zh text-base text-bold-6 margin-top-md'>{detail.description}</View>
          {/*<View className='text-line-zh text-sm margin-top-lg'>{detail.detail}</View>*/}
          <View className='text-line-zh margin-top-lg'>
            {/*<Text className='text-bold-4 text-sm'>未预约全额退</Text>*/}
          </View>
          <View className='margin-top-lg text-red'>
            <Text className='text-base'>￥</Text>
            <Text className='text-xxl'>{detail.price}</Text>
          </View>
          <WhiteSpace my-class='padding-top-lg padding-bottom-lg'/>
        </View>
        <WhiteSpace my-class='padding-top-sm padding-bottom-sm bg-gray'/>
        <View>
          <View className='flex justify-between align-center segmented text-base'>
            <View onClick={() => this.handleSegmentedClick(0)}
                  className={`flex-sub text-center segmented-item ${current === 0
                    ? 'text-bold'
                    : 'text-bold-4'}`}>费用包含</View>
            <View onClick={() => this.handleSegmentedClick(1)}
                  className={`flex-sub text-center segmented-item ${current === 1
                    ? 'text-bold'
                    : 'text-bold-4'}`}>注意事项</View>
          </View>
          {
            current === 0 ? (<View className='padding-lr-lg'>
              {detail.detail}
              {/*<View className='text-line-zh text-base text-bold-5 margin-top-lg margin-bottom-lg'>套餐内容：</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>晚柏悦客房 45平米 大床1.8米/2双床1.2米</View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>每日双人自助早餐</View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    双人中西晚餐套餐一份（需至少提前一天酒店电话预约0574-28881234 ，2晚仅一份）*/}
              {/*    <View>参考菜单：</View>*/}
              {/*    <View>中式：精选冷菜拼盘；每日中式例汤；杭椒牛柳；时令蔬菜；波特色手工汤圆；位上水果；橙汁</View>*/}
              {/*    <View>*/}
              {/*      西式：蔬菜沙拉；总汇三明治或意大利肉酱面；提拉米苏；橙汁*/}
              {/*    </View>*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    逸帆航海俱乐部体验门票2张（30分钟无动力帆船体验或60分钟皮划艇体验任选，需至少提前一天酒店电话预约0574-28881234，2晚共2张，若遇大雾、大风等恶劣天气，活动将视具体情况取消）*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    该房券支持（未兑换）随时退/过期自动退*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    此房券入住有效期从2020.06.11起至2020.10.31*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    <View>加价政策(每间夜)：</View>*/}
              {/*    <View>周五, 周六加价200元,</View>*/}
              {/*    <View>2020.7.1--2020.8.31期间周五，周六加价300元</View>*/}
              {/*  </View>*/}
              {/*</View>*/}
              {/*<View className='flex align-start text-line-zh'>*/}
              {/*  <Text className='cuIcon-title text-xs text-gray-8'/>*/}
              {/*  <View className='text-sm margin-left-lg'>*/}
              {/*    不能入住时段：*/}
              {/*    <View>2020.6.25--2020.6.26</View>*/}
              {/*    <View>2020.9.30--2020.10.7</View>*/}
              {/*  </View>*/}
              {/*</View>*/}
            </View>) : null
          }
          {
            current === 1 ? <View>注意事项</View> : null
          }
        </View>
        <View className='booking-btn'>
          <AtButton className='bg-red'
                    onClick={this.handleClickBuy}>立即购买</AtButton>
        </View>
      </View>
    );
  }
}

export default CouponDetail;

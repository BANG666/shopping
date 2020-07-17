import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Button, Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtButton, AtMessage, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import handleError from '../../utils/handleError';
import { authLoading, bindPhone } from '../../servers/servers';
import logo from '../../assets/image/logo.png';
import './index.scss';
import { UPDATE_USER } from '../../redux/actions/user';

@connect(({ userModel }) => ({
  user: userModel.user
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModel: false,
      showPhoneModel: false
    };
  }

  config = {
    navigationBarTitleText: '登录'
  };

  componentWillUnmount() {
  };

  componentDidMount() {
  }

  componentDidShow() {
    const info = Taro.getStorageSync('info') || {};
    if (info.mobileNum) {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    }
  };

  componentDidHide() {
  };

  bindGetPhone = e => {
    const { user } = this.props;
    const { detail } = e;
    if (detail.errMsg === 'getPhoneNumber:ok') {
      bindPhone({ openid: user.openid, encryptedData: detail.encryptedData, iv: detail.iv }).then(res => {
        const { message = '' } = handleError(res);
        if (!message) {
          Taro.navigateBack();
        } else {
          Taro.showToast({
            title: message,
            icon: 'none'
          })
        }
      }).catch(err => {

      });
    }
  };

  login = () => {
    const { dispatch } = this.props;
    Taro.login({
      success: (info) => {
        authLoading({ jscode: info.code }).then(res => {
          const { data } = res;
          const { message = '' } = handleError(res);
          if (!message) {
            Taro.setStorageSync('token', data.token);
            Taro.setStorageSync('info', data);
            dispatch({
              type: UPDATE_USER,
              payload: data
            });
            this.setState({
              showLoginModel: false
            });
            if(!data.mobileNum){
              this.setState({
                showPhoneModel: true
              })
            } else {
              Taro.navigateBack();
            }

          } else {
            Taro.showToast({
              title: message,
              icon: 'none'
            })
          }
        }).catch(err => {
          Taro.showToast({
            title: '服务器异常，请稍后重试',
            icon: 'none'
          })
        });
      }
    })
  };

  bindGetUserInfo = ({ detail }) => {
    const { userInfo } = detail;
    if (userInfo) {
      this.login();
      Taro.setStorageSync('wxUserInfo', userInfo);
    }
  };

  render() {
    const { showLoginModel, showPhoneModel } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <AtMessage/>
        <AtModal isOpened={showLoginModel}>
          <AtModalHeader>申请获得以下权限</AtModalHeader>
          <AtModalContent>
            获得您的公开信息（昵称，头像等）来成为注册用户，您也可以暂不注册..
          </AtModalContent>
          <AtModalAction> <Button
            onClick={() => this.setState({ showLoginModel: false, showLoginBtn: true })}>取消</Button> <Button
            openType="getUserInfo" type='primary'
            onGetUserInfo={this.bindGetUserInfo}>确定</Button> </AtModalAction>
        </AtModal>
        <View className='flex flex-direction justify-center align-center main-wrap'>
          <View className='logo-wrap text-center flex flex-direction justify-center align-center'>
            <View className='logo'>
              <Image src={logo}/>
            </View>
            <View className='margin-top-lg'>特惠酒店套餐</View>
          </View>
          <View className='phone-btn margin-lg'>
            {/*<AtButton openType="getPhoneNumber" type='primary' onGetPhoneNumber={this.bindGetPhone}>绑定手机号</AtButton>*/}
            <AtButton type='primary' onClick={() => this.setState({ showLoginModel: true })}>登录</AtButton>
          </View>
        </View>
        <AtModal isOpened={showPhoneModel}>
          <AtModalHeader>申请获得以下权限</AtModalHeader>
          <AtModalContent>
            获得您的手机号，您也可以暂不授权..
          </AtModalContent>
          <AtModalAction> <Button onClick={() => this.setState({ showPhoneModel: false })}>取消</Button> <Button
            openType="getPhoneNumber" type='primary'
            onGetPhoneNumber={this.bindGetPhone}>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    );
  }
}

export default Login;

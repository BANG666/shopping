import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtMessage } from 'taro-ui';
import { fetchLogin } from '../../servers/servers';
import { UPDATE_USER } from '../../redux/actions/user';
import handleError from '../../utils/handleError';
import './index.scss';

@connect(({ userModel }) => ({}))
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }


  config = {
    navigationBarTitleText: '登录'
  };

  componentWillUnmount () {
  };

  componentDidMount () {
    this.login();
  }

  componentDidShow () {
  };

  componentDidHide () {
  };

  login = () => {
    const { dispatch } = this.props;
    fetchLogin({
      account: 'admin',
      password: 'fuxun2020',
      type: 'account'
    }).then(res => {
      const { data, code } = res;
      const { isLogin = false, message= '' } = handleError(res);
      if ( message ) {
        Taro.atMessage({
          message,
          type: 'error'
        });
      } else {
        Taro.setStorageSync('token', data.token);
        Taro.setStorageSync('userInfo', data);
        dispatch({
          type: UPDATE_USER,
          payload: { user: data }
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  render () {
    return (
      <View className='index'>
        <AtMessage />
        <View><Text>login</Text></View>
      </View>
    );
  }
}

export default Login;

import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

export default class WhiteSpace extends Component {
  static externalClasses = [ 'my-class' ];

  render () {
    return <View className='my-class'/>;
  };
};

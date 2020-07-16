import React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './skeleton.scss';

export default class Skeleton extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return <View className="skeleton skeleton-type-row skeleton-animate-blink">
      <View className='skeleton-content text-center'>
        <View className='skeleton-title' style={{ width: '40%' }}/>
        <View className='skeleton-rows'>
          {
            [1, 2, 3].map(el => {
              return (
                <View key={el} className='skeleton-row' style={{ width: '100%', height: '12px' }}/>
              )
            })
          }
        </View>
      </View>
    </View>
  }
}

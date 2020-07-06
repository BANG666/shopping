import React from 'react';
import { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import defaultImage from '../../assets/image/hotel-cover.png';
import './index.scss';

@connect(({ hotelModel }) => ({
  hotelDetail: hotelModel.hotelDetail
}))
class HotelPhoto extends Component {
  constructor(props) {
    super(props);
    const { hotelDetail } = props;
    const { photos = [] } = hotelDetail;
    this.state = {
      defaultImg: null,
      list: _.pluck(photos, 'url')
    };
  }

  config = {
    navigationBarTitleText: '酒店相册'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
  };

  componentDidHide() {
  };

  handleImageClick = url => {
    const { list } = this.state;
    Taro.previewImage({
      current: url,
      urls: list
    })
  };

  render() {
    const { defaultImg, list } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='flex justify-between align-center flex-wrap padding-sm'>
          {
            list.map((item, index) => {
              return (
                <View key={item} className='item-wrap' onClick={() => this.handleImageClick(item)}>
                  <Image
                    lazyLoad
                    onError={(e) => {
                      this.setState({
                        list: list.map((el, elIndex) => {
                          if (elIndex === index) {
                            return defaultImage;
                          } else {
                            return el;
                          }
                        })
                      })
                    }}
                    src={defaultImg || item}/>
                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
}

export default HotelPhoto;

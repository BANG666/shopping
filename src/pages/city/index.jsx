import React from 'react';
import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtIndexes, AtSearchBar } from 'taro-ui';
import _ from 'underscore';
import { connect } from '@tarojs/redux';
import { citys as cities, groupingCities } from 'x-city';
import { UPDATE_PARAMS } from '../../redux/actions/hotel';
import './index.scss';
const cityList = groupingCities().filter(item => item.items.length > 0);

@connect(({ hotelModel }) => ({
}))
class CitySelect extends Component {
  constructor (props) {
    super(props);
    this.state = {
      keyword: '',
      filterCityList: [],
      isFocused: false
    };
    this.handleInputChange = _.throttle(this.handleInputChange, 600);
  }

  config = {
    navigationBarTitleText: '选择城市'
  };

  componentDidMount () {
  }

  componentWillUnmount () {
  };

  componentDidShow () {
  };

  componentDidHide () {
  };

  handleCityClick = item => {
    this.props.dispatch({
      type: UPDATE_PARAMS,
      payload: {
        city: item.id,
        cityName: item.name
      }
    });
    Taro.navigateBack();
  };

  handleInputFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  handleInputBlur = () => {
    this.setState({
      isFocused: false
    });
  };

  handleInputChange = val => {
    if ( val.length ) {
      this.setState({
        filterCityList: _.map(_.filter(cities, el => el.name.indexOf(val) !== -1), el => ({
          ...el,
          name1: el.name,
          typecode: 'fx0000',
          isSearchCity: true
        }))
      });
    }
    this.setState({
      keyword: val
    });
  };

  handleInputClear = () => {
    this.setState({
      keyword: '',
      filterCityList: [],
      isFocused: false
    });
  };

  render () {
    const { keyword, filterCityList, isFocused } = this.state;
    return (
      <View className='index'>
        <View className='pageTopLine' />
        <AtSearchBar
          fixed
          value={ keyword }
          onChange={ this.handleInputChange }
          onClear={ this.handleInputClear }
          onBlur={ this.handleInputBlur }
          onFocus={ this.handleInputFocus }
          onActionClick={ this.handleInputBlur }
          actionName='取消'
          placeholder='输入城市名搜索'
        />
        <View className='city-list'>
          {
            !_.isEmpty(cityList) ? (
              <AtIndexes
                list={ cityList }
                onClick={ this.handleCityClick }
              >
              </AtIndexes>
            ) : null
          }
        </View>
        {
          !isFocused ? null : (
            <View className='search-result-wrap'>
              {
                filterCityList.map(item => {
                  return (
                    <View key={ item.id } className='padding-lg bg-white' onClick={ e => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.handleCityClick(item);
                    } }>{ item.name }</View>
                  );
                })
              }
            </View>
          )
        }
      </View>
    );
  }
}

export default CitySelect;

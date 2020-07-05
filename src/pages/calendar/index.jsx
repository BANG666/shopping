import React from 'react';
import { Component } from '@tarojs/taro';
import { ScrollView, Text, View } from '@tarojs/components';
import dayJs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { connect } from '@tarojs/redux';
import _ from 'underscore';
import './index.scss';
import { createLogger } from 'redux-logger/src';
import { UPDATE_PARAMS } from '../../redux/actions/hotel';
import { dateSpace, getDay } from '../../utils/util';
import { ViewProps } from '@tarojs/components/types/View';

dayJs.extend(isBetween);
const MIN_DATE = dayJs().format('YYYY-MM-DD');
const MAX_DATE = 6;

@connect(({hotelModel}) => ({
  params: hotelModel.params
}))
class Calendar extends Component {
  constructor(props) {
    super(props);
    const {params} = props;
    const {checkInAt, checkOutAt} = params;
    this.state = {
      maxDate: MAX_DATE, // 可选结束日期，默认6个月后
      minDate: MIN_DATE, // 可选开始日期，默认今天
      maxSelect: checkOutAt, // 当前选择的结束日期，默认是明天
      minSelect: checkInAt, // 当前选择的开始日期, 默认是今天
      showMonth: [],
      start: null,
      end: null,
      scrollIntoViewId: null
    };
  }

  config = {
    navigationBarTitleText: '选择时间'
  };

  componentWillUnmount() {
  };

  componentDidShow() {
    this.getShowMonth();
    const tempTimer = setTimeout(() => {
      clearTimeout(tempTimer);
      this.defaultScroll();
    }, 0);
  };

  componentDidHide() {
  };

  // 如果有默认日期，滚动到默认日期，没有则滚动到今日
  defaultScroll = () => {
    const {minSelect, maxSelect} = this.state;
    if (minSelect) {
      this.scrollToMonth(minSelect);
    } else if (maxSelect) {
      this.scrollToMonth(maxSelect);
    } else {
      this.scrollToMonth(dayJs());
    }
  };

  // 页面滚动到指定的月份
  scrollToMonth = date => {
    // 获取当前月份在所有列表中的索引
    const {showMonth} = this.state;
    let index = 0;
    for (let i = 0; i < showMonth.length; i++) {
      if (dayJs(date).isSame(dayJs(showMonth[i].date), 'month')) {
        index = i;
        break;
      }
    }
    // 累计高度
    this.setState({
      scrollIntoViewId: 'calendar_item_' + index
    });
    // let height = 0;
    // const query = Taro.createSelectorQuery().in(this.$scope);
    // query.select('#calendar_item_'+index).boundingClientRect(data => {
    //   console.log(data.top-130);
    // }).exec();
  };

  // 计算当前月份对应的日历
  setMonthData = props => {
    const {min, date} = props;
    const items = [];
    // 获取本月第一天是周几
    const startWeek = dayJs(date)
      .startOf('month')
      .day();
    for (let i = 0; i < startWeek; i++) {
      items.push({
        text: '',
        disabled: true,
        date: null,
        index: i
      });
    }
    // 获取本月总共天数
    const total = dayJs(date).daysInMonth();
    for (let i = 0; i < total; i++) {
      const curDate = dayJs(date).add(i, 'd');
      items.push({
        text: i + 1,
        disabled: dayJs(curDate).isBefore(dayJs(min)),
        date: curDate,
        index: i + startWeek
      });
    }
    return {
      list: items,
      date
    };
  };

  // 根据maxDate 和 minDate 计算显示的月份
  getShowMonth = () => {
    // 默认显示最近一年
    const {minDate, maxDate} = this.state;
    const minMonth = dayJs(minDate).month();
    const monthArr = [];
    for (let i = minMonth; i < maxDate + minMonth; i++) {
      monthArr.push(
        this.setMonthData({
          min: minDate,
          date: dayJs()
            .month(i)
            .format('YYYY-MM')
        })
      );
    }

    this.setState({
      showMonth: monthArr
    });
  };

  setMinSelectDate = (date, showMonth, minDate) => {
    this.setState({
      minSelect: date,
      maxSelect: null,
      showMonth: _.map(showMonth, item => ({
        ...item,
        list: _.map(item.list, el => ({
          ...el,
          disabled:
            (!dayJs(el.date).isBetween(dayJs(date), dayJs(date).add(30, 'd')) &&
              dayJs(el.date).isAfter(dayJs(date))) ||
            dayJs(el.date).isBefore(dayJs(minDate).add(0, 'd'))
        }))
      }))
    })
  };

  selectDate = date => {
    const {showMonth, minDate, minSelect, maxSelect} = this.state;
    if (minSelect && maxSelect) {
      this.setMinSelectDate(date, showMonth, minDate);
    } else if (minSelect && !maxSelect) {
      if (dayJs(date).isBefore(minSelect) || dayJs(date).isSame(dayJs(minSelect), 'd')) {
        this.setMinSelectDate(date, showMonth, minDate);
      } else {
        this.setState({
          maxSelect: date,
          showMonth: _.map(showMonth, item => ({
            ...item,
            list: _.map(item.list, el => ({
              ...el,
              disabled: dayJs(el.date).isBefore(dayJs(minDate).add(0, 'd'))
            }))
          }))
        });
        this.props.dispatch({
          type: UPDATE_PARAMS,
          payload: {
            checkInAt: dayJs(minSelect).startOf('d')
              .toDate()
              .toISOString(),
            checkOutAt: dayJs(date).startOf('d')
              .toDate()
              .toISOString(),
            dateNum: dateSpace(minSelect, date)
          }
        });
        const tempTimer = setTimeout(() => {
          clearTimeout(tempTimer);
          Taro.navigateBack();
        }, 500);
      }
    } else {
      this.setMinSelectDate(date, showMonth, minDate);
    }
  };

  render() {
    const {showMonth, minSelect, maxSelect, scrollIntoViewId} = this.state;
    const {params} = this.props;
    const {checkInAt, checkOutAt} = params;
    const buke = ['2020-07-05', '2020-07-06', '2020-07-07', '2020-07-10'];
    return (
      <View className='index'>
        <View className='pageTopLine'/>
        <View className='flex justify-between align-center top-date-wrap'>
          <View className='text-center flex-twice'>
            <View className='text-base text-gray-8'>入住日期</View>
            <View className='flex align-center justify-center'>
              <View className='date-num'>{dayJs(minSelect).format('DD')}</View>
              <View className='text-base margin-left-sm'>
                <View>{getDay(dayJs(minSelect).day())}</View>
                <View>{dayJs(minSelect).format('MM')}月</View>
              </View>
            </View>
          </View>
          <View className='dividing-line'/>
          <View className='text-center flex-twice'>
            <View className='text-base text-gray-8'>离店日期</View>
            {
              maxSelect ? (
                <View className='flex align-center justify-center'>
                  <View className='date-num'>{dayJs(maxSelect).format('DD')}</View>
                  <View className='text-base margin-left-sm'>
                    <View>{getDay(dayJs(maxSelect).day())}</View>
                    <View>{dayJs(maxSelect).format('MM')}月</View>
                  </View>
                </View>
              ) : (<View>请选择日期</View>)
            }
          </View>
        </View>
        <View className='flex align-center text-base calendar-week-title'>
          <View className='flex-sub text-center text-main'>日</View>
          <View className='flex-sub text-center'>一</View>
          <View className='flex-sub text-center'>二</View>
          <View className='flex-sub text-center'>三</View>
          <View className='flex-sub text-center'>四</View>
          <View className='flex-sub text-center'>五</View>
          <View className='flex-sub text-center text-main'>六</View>
        </View>
        <ScrollView className='calendar-scrollView'
                    scrollY
                    scrollIntoView={scrollIntoViewId}
                    scrollWithAnimation>
          {
            showMonth.map((item, index) => {
              const {list = [], date: titleDate} = item;
              return (
                <View key={index} id={'calendar_item_' + index}>
                  <View className='text-bold calendar-title'>{titleDate}</View>
                  <View className='flex flex-wrap align-center text-center'>
                    {
                      list.map(dateItem => {
                        const {text, date: subDate, disabled} = dateItem;
                        let week = dayJs(subDate).day();
                        const isWeekDay = week === 0 || week === 6;
                        const isCheckInDay = dayJs(subDate).isSame(dayJs(minSelect), 'd');
                        const isCheckOutDay = dayJs(subDate).isSame(dayJs(maxSelect), 'd');
                        const notAvailable = _.find(buke, el => dayJs(subDate).isSame(dayJs(el), 'd'));
                        const isSelected = dayJs(subDate).isBetween(dayJs(minSelect), dayJs(maxSelect)) || dayJs(subDate).isSame(dayJs(minSelect), 'd') || dayJs(subDate).isSame(dayJs(maxSelect), 'd');
                        return (
                          <View
                            className={`flex-sub calendar_date_item calendar_date_disabled text-base ${isWeekDay ? 'weekend' : ''} ${isCheckInDay || isCheckOutDay ? 'current' : ''} ${isSelected ? 'selected' : ''} ${disabled || notAvailable ? 'disabled' : ''} ${notAvailable ? 'notAvailable' : ''}`}
                            onClick={() => !disabled && !notAvailable && this.selectDate(subDate)}
                          >
                            <View>{text}</View>
                            {
                              isCheckInDay && !notAvailable ? (<View className='text-sm'>入住</View>) : null
                            }
                            {
                              isCheckOutDay && !notAvailable ? (<View className='text-sm'>离店</View>) : null
                            }
                            {
                              notAvailable ? (<View className='text-sm'>不可订</View>) : null
                            }
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

export default Calendar;

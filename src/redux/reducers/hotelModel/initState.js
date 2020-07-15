import dayJs from 'dayjs';
import { cities } from '../../../utils/util';

const checkInAt = dayJs()
  .startOf('d')
  .add(2, 'd')
  .toDate()
  .toISOString();
const groupingCities = () => {
  const tmp = [];
  const cityList = [
    {
      title: 'C',
      items: [],
      key: 'C'
    },
    {
      title: 'E',
      items: [],
      key: 'E'
    },
    {
      title: 'G',
      items: [],
      key: 'G'
    },

    {
      title: 'H',
      items: [],
      key: 'H'
    },
    {
      title: 'J',
      items: [],
      key: 'J'
    }, {
      title: 'K',
      items: [],
      key: 'K'
    }, {
      title: 'L',
      items: [],
      key: 'L'
    }, {
      title: 'P',
      items: [],
      key: 'P'
    },
    {
      title: 'Q',
      items: [],
      key: 'Q'
    }, {
      title: 'S',
      items: [],
      key: 'S'
    }, {
      title: 'W',
      items: [],
      key: 'W'
    }, {
      title: 'X',
      items: [],
      key: 'X'
    }, {
      title: 'Y',
      items: [],
      key: 'Y'
    },

    {
      title: 'Z',
      items: [],
      key: 'Z'
    }
  ];
  for (let i = 0; i < cityList.length; i++) {
    const item = cityList[i].title;
    for (let j = 0; j < cities.length; j++) {
      const py = cities[j].pinyin;
      if (py.substring(0, 1).toUpperCase() === item.toUpperCase()) {
        if (tmp.indexOf(item) === -1) {
          cityList[i]['items'] = [cities[j]];
          tmp.push(item)
        } else {
          cityList[i]['items'].push(cities[j])
        }
      }
    }
  }
  return cityList
};
const initSate = {
  params: {
    city: '310100',
    cityName: '上海市',
    guestCount: 1,
    roomCount: 1,
    template: '',
    checkInAt: checkInAt,
    checkOutAt: dayJs(checkInAt)
      .startOf('d')
      .add(1, 'd')
      .toDate()
      .toISOString(),
    dateNum: 1
  },
  hotelDetail: { _id: '5e6052c65527ef0011fbde9d' },
  roomType: {},
  voucher: [],
  notAvailableDates: [dayJs(), dayJs().add(1, 'd')], // 不可预订日期
  cityList: groupingCities(),
  orderPaginate:{
    pageLimit: 20,
    pageNum: 1
  }
};

export default initSate;

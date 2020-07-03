import moment from 'moment';
import { cities } from '../../../assets/city';

function cityList () {
  const tmp = [];
  const cityList = [
    {
      title: 'A',
      items: [],
      key: 'A'
    },
    {
      title: 'B',
      items: [],
      key: 'B'
    },
    {
      title: 'C',
      items: [],
      key: 'C'
    },
    {
      title: 'D',
      items: [],
      key: 'D'
    },
    {
      title: 'E',
      items: [],
      key: 'E'
    },
    {
      title: 'F',
      items: [],
      key: 'F'
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
      title: 'H',
      items: [],
      key: 'H'
    },
    // {
    //   title: 'I',
    //   items: [],
    //   key: 'I',
    // },
    {
      title: 'J',
      items: [],
      key: 'J'
    },
    {
      title: 'K',
      items: [],
      key: 'K'
    },
    {
      title: 'L',
      items: [],
      key: 'L'
    },
    {
      title: 'M',
      items: [],
      key: 'M'
    },
    {
      title: 'N',
      items: [],
      key: 'N'
    },
    // {
    //   title: 'O',
    //   items: [],
    //   key: 'O',
    // },
    {
      title: 'P',
      items: [],
      key: 'P'
    },
    {
      title: 'Q',
      items: [],
      key: 'Q'
    },
    {
      title: 'R',
      items: [],
      key: 'R'
    },
    {
      title: 'S',
      items: [],
      key: 'S'
    },
    {
      title: 'T',
      items: [],
      key: 'T'
    },
    // {
    //   title: 'U',
    //   items: [],
    //   key: 'U',
    // },
    // {
    //   title: 'V',
    //   items: [],
    //   key: 'V'
    // },
    {
      title: 'W',
      items: [],
      key: 'W'
    },
    {
      title: 'X',
      items: [],
      key: 'X'
    },
    {
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
  for ( let i = 0; i < cityList.length; i++ ) {
    const item = cityList[ i ].title;
    for ( let j = 0; j < cities.length; j++ ) {
      const py = cities[ j ].pinyin;
      if ( py.substring(0, 1).toUpperCase() === item.toUpperCase() ) {
        if ( tmp.indexOf(item) === -1 ) {
          cityList[ i ][ 'items' ] = [ cities[ j ] ];
          tmp.push(item);
        } else {
          cityList[ i ][ 'items' ].push(cities[ j ]);
        }
      }
    }
  }
  return cityList;
}

const initSate = {
  cityList: cityList(),
  params: {
    city: '310100',
    cityName: '上海市',
    guestCount: 1,
    roomCount: 1,
    checkInAt: moment()
      .startOf('day')
      .toDate()
      .toISOString(),
    checkOutAt: moment()
      .startOf('day')
      .add(1, 'days')
      .toDate()
      .toISOString(),
    dateNum: 1
  }
};

export default initSate;

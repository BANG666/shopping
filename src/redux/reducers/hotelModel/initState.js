import dayJs from 'dayjs';
import { cities } from '../../../assets/city';

function cityList() {
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
  for (let i = 0; i < cityList.length; i++) {
    const item = cityList[i].title;
    for (let j = 0; j < cities.length; j++) {
      const py = cities[j].pinyin;
      if (py.substring(0, 1).toUpperCase() === item.toUpperCase()) {
        if (tmp.indexOf(item) === -1) {
          cityList[i]['items'] = [cities[j]];
          tmp.push(item);
        } else {
          cityList[i]['items'].push(cities[j]);
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
    checkInAt: dayJs()
      .startOf('d')
      .toDate()
      .toISOString(),
    checkOutAt: dayJs()
      .startOf('d')
      .add(1, 'd')
      .toDate()
      .toISOString(),
    dateNum: 1
  },
  hotelDetail: {
    'policies': {
      'checkInAndOut': [
        '14:00',
        '12:00'
      ],
      'payMethods': [
        'union',
        'master',
        'visa',
        'ax',
        'dc'
      ],
      'isSupportForeign': true
    },
    'contractState': 0,
    'star': 4,
    'standardStar': 0,
    'group': '华住（汉庭）',
    'tags': [],
    'contactNumber': '021-52068000',
    'roomsCount': 273,
    'country': '100000',
    'province': '310000',
    'city': '310100',
    'district': '310105',
    'address': '武夷路789号',
    'location': '',
    'lng': '121.41314594389398',
    'lat': '31.214584024125067',
    'facilities': [
      'FCT05206',
      'FCT05207',
      'FCT05208',
      'FCT02210',
      'FCT05214',
      'FCT05215',
      'FCT04218',
      'FCT04220',
      'FCT05221',
      'FCT03225',
      'FCT03226',
      'FCT03236',
      'FCT05782',
      'FCT05784',
      'FCT05785',
      'FCT05786',
      'FCT051049',
      'FCT051052',
      'FCT031311',
      'FCT01198',
      'FCT05201',
      'FCT01205',
      'FCT04160',
      'FCT0210',
      'FCT0312',
      'FCT0114',
      'FCT0215',
      'FCT0217',
      'FCT0219',
      'FCT02238',
      'FCT01240',
      'FCT02244',
      'FCT06247',
      'FCT06770',
      'FCT02771',
      'FCT02773',
      'FCT02775',
      'FCT02777',
      'FCT02779',
      'FCT02780',
      'FCT021039',
      'FCT051041',
      'FCT021363'
    ],
    'photos': [
      {
        'type': 'PC01',
        'name': 'remote/0469ee59fd21adb9dcc5d8d034965d6d.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/0469ee59fd21adb9dcc5d8d034965d6d.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-083423923c6d453dbfec92d7e1c1f900-0-fdbede125b03063593390d1b17ef67e1'
      },
      {
        'type': 'PC01',
        'name': 'remote/ef4ebda87704f50b23c09274fc8b9699.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/ef4ebda87704f50b23c09274fc8b9699.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-bdff4f1a1b9041a78d94f7524687ac30-0-43e49d26fe881f4129648c8342c04198'
      },
      {
        'type': 'PC01',
        'name': 'remote/101ca9c03914cf81a847bdc46d6de4bc.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/101ca9c03914cf81a847bdc46d6de4bc.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-47c881145ccd4ddd9d302ba92803ea26-0-e569972f92598183e9079a9a74a2bf4f'
      },
      {
        'type': 'PC01',
        'name': 'remote/89e43a8f7ea1a988d7d2ca380d205921.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/89e43a8f7ea1a988d7d2ca380d205921.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-d9eaa09d018d43a2ba5600cf53125c34-0-1206e9c6e342f06011468bab51a28f5b'
      },
      {
        'type': 'PC01',
        'name': 'remote/cacdea2f33a0e16ece2756efce16827f.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/cacdea2f33a0e16ece2756efce16827f.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-90c5e2d793374db3aeb137c651fad1e0-0-31206453098a32a38dc6615dc6950f31'
      },
      {
        'type': 'PC04',
        'name': 'remote/75bfcc8bb4dc861dbdbbef4c6b10dfac.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/75bfcc8bb4dc861dbdbbef4c6b10dfac.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-36c46596032a43aebe07bfa8869b2f32-0-6f2861b86e80c17eb5f2b801e64c364a'
      },
      {
        'type': 'PC04',
        'name': 'remote/dac3b13a4bde756c746590d1fda5da78.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/dac3b13a4bde756c746590d1fda5da78.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-5bd77470dd0d4bc4910a05eebd45a471-0-3c09f58852318a36e27458988b88a1db'
      },
      {
        'type': 'PC04',
        'name': 'remote/4a97699a52cc12c14d6a074785747775.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/4a97699a52cc12c14d6a074785747775.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-0b25abfad58644aab584832a8faa1890-0-9705c6c8acf6cd93c8243a3d9c497469'
      },
      {
        'type': 'PC03',
        'name': 'remote/425acf03f771477c7ca8b9fda7e7b881.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/425acf03f771477c7ca8b9fda7e7b881.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-a2e22a6a13af4f068f5776b139cd0f7d-0-b9af94a4c43f87cb1dafa97b388d51ea'
      },
      {
        'type': 'PC03',
        'name': 'remote/4f9a959848d5431b2b0256d3f8cd263c.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/4f9a959848d5431b2b0256d3f8cd263c.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-eef33a8ec71b413b9e8d4f79728c95fe-0-d5b7104b2810dfc769514f424f7058ab'
      },
      {
        'type': 'PC04',
        'name': 'remote/ee821cd1d2b397171fea8b469ef64e60.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/ee821cd1d2b397171fea8b469ef64e60.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-807902c7041d4d43aa94eedbbf453f82-0-96a03fd386317755c3ade9bcee3cc1bf'
      },
      {
        'type': 'PC03',
        'name': 'remote/313a56602031164d03faaf2e467bb64a.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/313a56602031164d03faaf2e467bb64a.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-8b73b7b31938447ca96fed1b88c4cb45-0-1b76c1070aac013c0ba6b2cf2e00f64a'
      },
      {
        'type': 'PC03',
        'name': 'remote/c20edb12c2463bb2e77c4779c7821b02.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/c20edb12c2463bb2e77c4779c7821b02.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-67136134a2ab480c80aa53de4009c9ca-0-9b0a33f0d9e05022ca490fa0cb9b1b00'
      },
      {
        'type': 'PC03',
        'name': 'remote/9f898d25a59f8ec91a760dfd16f6b5ac.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/9f898d25a59f8ec91a760dfd16f6b5ac.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-182dad47eee846bc8382d0839c47bb54-0-3958bc6a228a6bd1690a4e74aa85e2f3'
      },
      {
        'type': 'PC03',
        'name': 'remote/ea4e486190160b3d728082b40a7064ef.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/ea4e486190160b3d728082b40a7064ef.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-7aadc1935ad346cebc1f5c13b97ccf92-0-8ce5c0a2d9ab297a0972565b845a2915'
      },
      {
        'type': 'PC03',
        'name': 'remote/91f40102c586873248d9fcec0925234b.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/91f40102c586873248d9fcec0925234b.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-e4c81cd21b864f5cb752b2aeb578381d-0-385ce1b38933f06c2e26a3c743c62111'
      },
      {
        'type': 'PC03',
        'name': 'remote/418a984719267ddc508017145c908c6c.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/418a984719267ddc508017145c908c6c.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-d3b3580a3a554689b69131512a1d3876-0-fa740a63bfc06365ae64dca70236bf30'
      },
      {
        'type': 'PC03',
        'name': 'remote/e0a352527a5e78c022b7029b457af147.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/e0a352527a5e78c022b7029b457af147.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-cc9aa0b33dcb451dbda9ea08328df5cd-0-bf7ab95ff71f10f2e97c6c9ec517a469'
      },
      {
        'type': 'PC03',
        'name': 'remote/ab28ca7dd788d3302d5313452d4972ff.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/ab28ca7dd788d3302d5313452d4972ff.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-7beb610019884543abb3b6a90c228780-0-291c7f6086206cbceb3d01a7a1dd4061'
      },
      {
        'type': 'PC03',
        'name': 'remote/48ab55a5c2a2935ccb4fa2e2ff47fc53.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/48ab55a5c2a2935ccb4fa2e2ff47fc53.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-de003f6007e449c18b41181ad35b13b9-0-bb35deae66ca69dd106306f970e857f3'
      },
      {
        'type': 'PC03',
        'name': 'remote/50b73c2f22a2af0ac8e738e1718c9554.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/50b73c2f22a2af0ac8e738e1718c9554.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-b76f31a21a0e442186ad85321f0b5015-0-46c3ffec730e4849f77d85a9fdd51df6'
      },
      {
        'type': 'PC03',
        'name': 'remote/650a3b0eed683b883386b4e31ccdc8fc.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/650a3b0eed683b883386b4e31ccdc8fc.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-f169b9cf65ba41db8609c99dfcf8345e-0-a0e74b300f708cebdb92dc88cef170cc'
      },
      {
        'type': 'PC03',
        'name': 'remote/bf73157171bae8b533de6a076b9446ac.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/bf73157171bae8b533de6a076b9446ac.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-4c039a902611491d892e422ecbbf341b-0-7cfa932532d0d64a56f1c89fe1267f14'
      },
      {
        'type': 'PC07',
        'name': 'remote/86d70d45d87675fd6e8aaa29626d2fc0.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/86d70d45d87675fd6e8aaa29626d2fc0.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-1fd11349870b4f15bec285b496d5d4ca-0-56539c6f0962a66f31c8db05fd24a7b6'
      },
      {
        'type': 'PC03',
        'name': 'remote/1e073d4743e3a325a9150088826f9f9f.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/1e073d4743e3a325a9150088826f9f9f.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-0214ef1c2c2446be8a70b74dcebad459-0-6424f16c54eab0db4a58c3fdf072b73f'
      },
      {
        'type': 'PC99',
        'name': 'remote/5f01db453d56afc90c8028463763f26c.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/5f01db453d56afc90c8028463763f26c.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-4fcd435d55704dc89b074fae8924b68d-0-187482eeaace471c79bc09b831f260ea'
      },
      {
        'type': 'PC03',
        'name': 'remote/269ab68aa6c4a95f79e4dd88d0f40c5c.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/269ab68aa6c4a95f79e4dd88d0f40c5c.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-e6a191c63ec34ffcbfc8d325bad94be5-0-d59e9bffb53e4c102f24860d4721c5c8'
      },
      {
        'type': 'PC99',
        'name': 'remote/7cd0dc948be87a807084405fa423417f.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/7cd0dc948be87a807084405fa423417f.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-113a9b159d86439da510ab0380a74c62-0-5ab88351c13fca4020a836cd83eda69c'
      },
      {
        'type': 'PC03',
        'name': 'remote/a7fdd01ccda4fb5109c62efb9449d4bf.jpg',
        'url': 'https://fx-photos.chuxingpay.com/remote/a7fdd01ccda4fb5109c62efb9449d4bf.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-7c1ba37b7e85484393d0ac9b3a67f324-0-06707f55adeb7270567d9d6a7b4c2520'
      }
    ],
    'fax': '021-52060710',
    'contactPerson': '',
    'state': 'normal',
    'currencyCode': 'CNY',
    'contractRate': 0.006,
    'latestPaymentAt': null,
    '_id': '5ee05508e86db40011633537',
    'channelHotelIds': [
      {
        '_id': '5ef850da91071600117bea28',
        'channel': 'elong',
        'hotelId': '40201065'
      }
    ],
    'introduction': '上海虹桥美仑美居酒店位于虹桥开发区、紧邻长宁体操中心，毗邻中山公园；周边配套设施完善，闻名上海的龙之梦购物中心和长宁来福士广场也在此站。<br><br>酒店拥有宽敞优雅的各式客房，房内均配有无线wifi，给喜欢上网冲浪的朋友带来便利。无论商务出行还是旅游度假，虹桥美仑美居都是您理想的选择。',
    'description': '酒店开业时间2003年1月，新近装修时间2011年12月，局部装修，主楼高23层，客房总数234间（套）。',
    'businessZone2': '',
    'conferenceFacility': '设有大小不等的8个会议室，可容纳15-250人不等。',
    'recreationFacility': '',
    'diningFacility': '中餐厅：主要供应上海菜，可容纳200人用餐；\n日本餐厅：主要供应日本料理，可容纳80人用餐；\n西班牙餐厅：主要供应各种西班牙美食，可容纳120人用餐。',
    'name': '上海虹桥美仑美居酒店',
    'brand': '美仑',
    'zipcode': '200051',
    'traffic': '从虹桥机场往上海虹桥美仑美居酒店：从虹桥机场主出口出发沿沪青平高速公路（A9）西向东方向行驶。至虹许路口下高架，继续直行。车辆到中山西路交叉口左转。沿中山西路行驶2公里到武夷路交叉口按酒店路牌指示抵达。',
    'openedAt': '2003-01',
    'decoratedAt': '2017-03',
    'thirdHotelIds': [],
    'createdAt': '2020-06-10T03:35:36.173Z',
    'updatedAt': '2020-06-28T08:12:10.923Z',
    'id': 95082,
    'cover': 'https://fx-photos.chuxingpay.com/remote/89e43a8f7ea1a988d7d2ca380d205921.jpg?&x-oss-process=image/quality,q_50&auth_key=1594015189-c32abedacca549ffad5022a648f51a61-0-bde861f3f0ab91dc565b504296d05b79',
    'preference': {
      'collect': {
        'bank': {
          'state': 0,
          'verifyFee': null
        },
        'alipay': {
          'state': 0,
          'verifyFee': null
        },
        'current': 'bank'
      },
      'invoiceSettings': {
        'invoiceType': 10,
        'feeInvoiceType': 1
      },
      '_id': '5ee06d22e86db4001163725b',
      'checkInAndOutNotify': {
        'emails': [],
        'isEnabled': false
      },
      'reconciler': {
        'isEnabled': false,
        'emails': []
      },
      'reception': {
        'isEnabled': false,
        'users': []
      },
      'hotel': '5ee05508e86db40011633537',
      'roomState': 'normal',
      'bookingDeptEmails': [],
      'createdAt': '2020-06-10T05:18:26.539Z',
      'updatedAt': '2020-06-10T05:18:26.539Z'
    },
    'contract': null
  },
  notAvailableDates: ['2020-07-10', '2020-07-26', '2020-07-16', '2020-08-10'] // 不可预订日期
};

export default initSate;

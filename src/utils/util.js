import Taro from '@tarojs/taro';
import dayJs from 'dayjs';
import _ from 'underscore';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';

dayJs.extend(LocalizedFormat);

// 床型
export const roomBedType = [
  { name: '其它', nameEn: 'Others', code: 'BT00', bedCount: 1 },
  { name: '双床', nameEn: 'Twin Bed', code: 'BT01', bedCount: 2 },
  { name: '大床', nameEn: 'Double Bed', code: 'BT02', bedCount: 1 },
  { name: '单床', nameEn: 'Single Bed', code: 'BT03', bedCount: 1 },
  { name: '双人大床', nameEn: 'Queen Bed', code: 'BT04', bedCount: 1 },
  { name: '经济双床', nameEn: 'Semi-double Bed', code: 'BT05', bedCount: 2 },
  { name: '三床', nameEn: 'Three Bed', code: 'BT06', bedCount: 3 },
  { name: '四床', nameEn: 'Four Bed', code: 'BT07', bedCount: 4 },
  { name: '榻榻米', nameEn: '榻榻米', code: 'BT10', bedCount: 1 },
  { name: '水床', nameEn: '水床', code: 'BT11', bedCount: 1 },
  { name: '圆床', nameEn: '圆床', code: 'BT12', bedCount: 1 },
  { name: '拼床', nameEn: '拼床', code: 'BT13', bedCount: 1 },
  { name: '炕', nameEn: '炕', code: 'BT14', bedCount: 1 },
  { name: '特殊床型', nameEn: '特殊床型', code: 'BT15', bedCount: 1 },
  { name: '大/双床', nameEn: '大/双床', code: 'BT17', bedCount: 2 }
];
// 酒店设施
export const facilityTypes = [
  {
    code: 'FCT01197',
    name: '免费停车',
    nameEn: 'Free parking',
    icon: 'cuIcon-tingchechang'
  },
  {
    code: 'FCT01198',
    name: '收费停车',
    nameEn: 'Fee-paying parking',
    icon: 'cuIcon-tingchechang'
  },
  {
    code: 'FCT01196',
    name: '无停车场',
    nameEn: 'No parking lot',
    icon: 'cuIcon-tingchechang'
  },
  { code: 'FCT011302', name: '有停车场', nameEn: 'parking', icon: 'cuIcon-tingchechang' },
  { code: 'FCT01195', name: '停车', nameEn: 'Parking', icon: 'cuIcon-tingchechang' },
  {
    code: 'FCT01768',
    name: '接机服务',
    nameEn: 'Pick-up service',
    icon: 'cuIcon-jiejifuwu'
  },
  {
    code: 'FCT01269',
    name: '收费接机服务',
    nameEn: 'Charged Airport Pick-up',
    icon: 'cuIcon-jiejifuwu'
  },
  {
    code: 'FCT01242',
    name: '免费接机服务',
    nameEn: 'Airport pick-up service',
    icon: 'cuIcon-tubiao-'
  },
  { code: 'FCT01767', name: '接站服务', nameEn: 'Pick-up service', icon: 'cuIcon-tubiao-' },
  {
    code: 'FCT0114',
    name: '租车服务',
    nameEn: 'Car rental service',
    icon: 'cuIcon-tubiao-'
  },
  {
    code: 'FCT01240',
    name: '叫车服务',
    nameEn: 'Taxi calling service',
    icon: 'cuIcon-tubiao-'
  },
  {
    code: 'FCT011121',
    name: '共用卫生间(部分)',
    nameEn: 'Shared toilet(part)',
    icon: 'cuIcon-zhinengmatongbeifen'
  },
  {
    code: 'FCT011120',
    name: '共用卫生间',
    nameEn: 'Shared toilet',
    icon: 'cuIcon-zhinengmatongbeifen'
  },
  {
    code: 'FCT01224',
    name: '24小时热水',
    nameEn: '24-Hour hot water',
    icon: 'cuIcon-xiaoshireshui'
  },
  {
    code: 'FCT01205',
    name: '免费wifi',
    nameEn: 'With Wi-Fi in public area (free)',
    icon: 'cuIcon-wifi1'
  },
  {
    code: 'FCT01213',
    name: '安全消防系统',
    nameEn: 'Fire protection system',
    icon: 'cuIcon-miehuoqi'
  },
  {
    code: 'FCT01203',
    name: '不能上网',
    nameEn: 'No internet in public area',
    icon: 'cuIcon-wifi1'
  },
  {
    code: 'FCT01222',
    name: '无障碍通道',
    nameEn: 'Barrier free access',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT011418', name: '公用区wifi', nameEn: '', icon: 'cuIcon-wifi1' },
  { code: 'FCT011491', name: '酒店各处wifi覆盖', nameEn: '', icon: 'cuIcon-wifi1' },
  {
    code: 'FCT0215',
    name: '专职行李员',
    nameEn: 'Concierge service',
    icon: 'cuIcon-shiwu-hanglixiang'
  },
  {
    code: 'FCT0217',
    name: '行李寄存',
    nameEn: 'Baggage storage service',
    icon: 'cuIcon-shiwu-hanglixiang'
  },
  { code: 'FCT021419', name: '免费行李寄送', nameEn: '', icon: 'cuIcon-jiejifuwu' },
  {
    code: 'FCT021363',
    name: '办理私人登记入住/退房手续',
    nameEn: 'Private check-in/check-out',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT0210', name: '叫醒服务', nameEn: 'Wake-up calls', icon: 'cuIcon-naozhong' },
  { code: 'FCT0211', name: '洗衣服务', nameEn: 'Laundry service', icon: 'cuIcon-xiyiji' },
  { code: 'FCT021064', name: '洗衣机', nameEn: 'Washing machine', icon: 'cuIcon-xiyiji' },
  {
    code: 'FCT02777',
    name: '外送洗衣服务',
    nameEn: 'Outside laundry service',
    icon: 'cuIcon-xiyiji'
  },
  { code: 'FCT021448', name: '洗衣房', nameEn: '', icon: 'cuIcon-xiyiji' },
  {
    code: 'FCT021065',
    name: '洗衣机(部分)',
    nameEn: 'Washing machine(part)',
    icon: 'cuIcon-xiyiji'
  },
  {
    code: 'FCT02773',
    name: '24小时大堂经理',
    nameEn: '24-Houre lobby manager',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT021492', name: '24小时中文服务', nameEn: '', icon: 'cuIcon-zhongwen' },
  {
    code: 'FCT02776',
    name: '旅游票务服务',
    nameEn: 'Travel ticket service',
    icon: 'cuIcon-fapiao'
  },
  {
    code: 'FCT02210',
    name: '旅游交通图',
    nameEn: 'Travel and transportation map',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT0213', name: '旅游服务', nameEn: 'Travel service', icon: 'cuIcon-check1' },
  {
    code: 'FCT02775',
    name: '旅游票务专柜',
    nameEn: 'Travel ticket office',
    icon: 'cuIcon-fapiao'
  },
  {
    code: 'FCT0219',
    name: '外币兑换服务',
    nameEn: 'Currency exchange',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT02771',
    name: '礼宾服务',
    nameEn: 'Concierge service',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT021039',
    name: '熨衣服务',
    nameEn: 'Ironing service',
    icon: 'cuIcon-yundouyunyiban'
  },
  {
    code: 'FCT02807',
    name: '熨衣设备',
    nameEn: 'Ironing equipment',
    icon: 'cuIcon-yundouyunyiban'
  },
  {
    code: 'FCT02859',
    name: '熨衣设备(部分)',
    nameEn: 'Ironing equipment (part)',
    icon: 'cuIcon-yundouyunyiban'
  },
  { code: 'FCT021038', name: '干洗', nameEn: 'Dry cleaning', icon: 'cuIcon-hangeryijia' },
  {
    code: 'FCT02779',
    name: '信用卡结算服务',
    nameEn: 'Credit card settlement service',
    icon: 'cuIcon-xinyongqia1'
  },
  {
    code: 'FCT02780',
    name: '一次性账单结算服务',
    nameEn: 'One-time billing services',
    icon: 'cuIcon-xinyongqia1'
  },
  {
    code: 'FCT02238',
    name: '邮政服务',
    nameEn: 'Postal service',
    icon: 'cuIcon-youzhengline'
  },
  { code: 'FCT0218', name: '票务服务', nameEn: 'Ticket service', icon: 'cuIcon-fapiao' },
  {
    code: 'FCT02772',
    name: '部分时段前台服务',
    nameEn: 'Part of the front desk service',
    icon: 'cuIcon-qiantaiai-01'
  },
  {
    code: 'FCT021364',
    name: '中文服务',
    nameEn: 'Front?desk?Chinese',
    icon: 'cuIcon-zhongwen'
  },
  {
    code: 'FCT02244',
    name: '多种语言服务人员',
    nameEn: 'Multi-lingual staff',
    icon: 'cuIcon-guanjia'
  },
  {
    code: 'FCT021359',
    name: '中文指示',
    nameEn: 'Chinese?indication',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT021513', name: '部分时段中文服务', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT021365',
    name: '唤醒服务(部分)',
    nameEn: 'Wake up service(part)',
    icon: 'cuIcon-naozhong'
  },
  {
    code: 'FCT03225',
    name: '中餐厅',
    nameEn: 'Chinese restaurant',
    icon: 'cuIcon-canting'
  },
  {
    code: 'FCT03226',
    name: '西餐厅',
    nameEn: 'Western restaurant',
    icon: 'cuIcon-canting'
  },
  { code: 'FCT031311', name: '餐厅', nameEn: 'The restaurant', icon: 'cuIcon-canting' },
  { code: 'FCT0312', name: '送餐服务', nameEn: 'Room service', icon: 'cuIcon-canting' },
  { code: 'FCT031102', name: '用餐区', nameEn: 'Dining area', icon: 'cuIcon-canting' },
  {
    code: 'FCT031103',
    name: '用餐区(部分)',
    nameEn: 'Dining area(part)',
    icon: 'cuIcon-canting'
  },
  { code: 'FCT031420', name: '儿童餐', nameEn: '', icon: 'cuIcon-canting' },
  { code: 'FCT031531', name: '野餐区', nameEn: '', icon: 'cuIcon-canting' },
  { code: 'FCT03217', name: '咖啡厅', nameEn: 'Coffee house', icon: 'cuIcon-kafeiting' },
  { code: 'FCT03236', name: '宴会厅', nameEn: 'Banquet hall', icon: 'cuIcon-yanhuiting' },
  { code: 'FCT041501', name: '儿童室内游乐区', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041045', name: '儿童俱乐部', nameEn: 'Kids club', icon: 'cuIcon-check1' },
  { code: 'FCT041534', name: '儿童泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  { code: 'FCT04160', name: '健身中心', nameEn: 'Fitiness center', icon: 'cuIcon-check1' },
  { code: 'FCT041521', name: '健身课程', nameEn: '', icon: 'cuIcon-jianshenfang' },
  { code: 'FCT04162', name: '卡拉OK厅', nameEn: 'Karaoke room', icon: 'cuIcon-kalaok' },
  {
    code: 'FCT04220',
    name: '大堂报纸',
    nameEn: 'Newspaper at lobby',
    icon: 'cuIcon-newspaper_'
  },
  { code: 'FCT04158', name: '棋牌室', nameEn: 'Game room', icon: 'cuIcon-qipaishi1' },
  { code: 'FCT04211', name: '茶室', nameEn: 'Tea house', icon: 'cuIcon-check1' },
  {
    code: 'FCT04268',
    name: '室外游泳池',
    nameEn: 'Outdoor Swimming Pool',
    icon: 'cuIcon-weibiaoti-'
  },
  { code: 'FCT041048', name: '吸烟区', nameEn: 'Smoking area', icon: 'cuIcon-xiyanqu' },
  {
    code: 'FCT04245',
    name: '自行车租借服务',
    nameEn: 'Bicycle rental service',
    icon: 'cuIcon-zihangche'
  },
  { code: 'FCT04218', name: '酒吧', nameEn: 'Bar', icon: 'cuIcon-jiuba' },
  { code: 'FCT04166', name: '足浴/足疗', nameEn: 'Foot massage', icon: 'cuIcon-check1' },
  { code: 'FCT041367', name: '徒步旅行', nameEn: 'hiking', icon: 'cuIcon-check1' },
  { code: 'FCT04168', name: '按摩保健', nameEn: 'Massage', icon: 'cuIcon-check1' },
  {
    code: 'FCT04167',
    name: '乒乓球室',
    nameEn: 'Ping-pong room',
    icon: 'cuIcon-pingpangqiu'
  },
  { code: 'FCT04787', name: '桌球室', nameEn: 'Billiard room', icon: 'cuIcon-zhuoqiu' },
  { code: 'FCT04178', name: '垂钓', nameEn: 'Fishing', icon: 'cuIcon-check1' },
  {
    code: 'FCT04180',
    name: '海边娱乐',
    nameEn: 'Seaside entertainment',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT04161', name: '美容美发室', nameEn: 'Beauty salon', icon: 'cuIcon-beaut' },
  { code: 'FCT041444', name: '自动售货机', nameEn: '', icon: 'cuIcon-zidongshouhuoji' },
  { code: 'FCT04174', name: '温泉', nameEn: 'Hot spring', icon: 'cuIcon-check1' },
  { code: 'FCT04778', name: '鲜花店', nameEn: 'Flower shop', icon: 'cuIcon-check1' },
  {
    code: 'FCT04163',
    name: '室内游泳池',
    nameEn: 'Swimming pool',
    icon: 'cuIcon-weibiaoti-'
  },
  { code: 'FCT04165', name: 'SPA', nameEn: 'Spa', icon: 'cuIcon-check1' },
  { code: 'FCT04171', name: '休闲会所', nameEn: 'Leisure center', icon: 'cuIcon-check1' },
  { code: 'FCT04173', name: '篮球场', nameEn: 'Basketball court', icon: 'cuIcon-lanqiuchang' },
  {
    code: 'FCT0416',
    name: '擦鞋服务',
    nameEn: 'Shoe shines service',
    icon: 'cuIcon-tuoxie'
  },
  { code: 'FCT04169', name: '网球场', nameEn: 'Tennis court', icon: 'cuIcon-wangqiu' },
  { code: 'FCT04170', name: '夜总会', nameEn: 'Night club', icon: 'cuIcon-jiuba' },
  {
    code: 'FCT04870',
    name: '收费电影(部分)',
    nameEn: 'Charge film (part)',
    icon: 'cuIcon-dianying'
  },
  { code: 'FCT04791', name: '潜水', nameEn: 'Diving', icon: 'cuIcon-check1' },
  { code: 'FCT04789', name: '沙滩排球', nameEn: 'Beach Volleyball', icon: 'cuIcon-paiqiu' },
  {
    code: 'FCT04175',
    name: '羽毛球馆',
    nameEn: 'Badminton stadium',
    icon: 'cuIcon-yumaoqiu'
  },
  { code: 'FCT041046', name: '浮潜', nameEn: 'Snorkeling', icon: 'cuIcon-check1' },
  { code: 'FCT04788', name: '足球', nameEn: 'None', icon: 'cuIcon-zuqiu' },
  { code: 'FCT04251', name: '高尔夫', nameEn: 'Golf course', icon: 'cuIcon-gaoerfu' },
  { code: 'FCT04164', name: '台球室', nameEn: 'Billiards room', icon: 'cuIcon-zhuoqiu' },
  { code: 'FCT04176', name: '歌舞厅', nameEn: 'Dancing hall', icon: 'cuIcon-kalaok' },
  { code: 'FCT041368', name: '滑雪', nameEn: 'skiing', icon: 'cuIcon-huaxue' },
  { code: 'FCT041518', name: '身体护理', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041533', name: '恒温泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  {
    code: 'FCT041129',
    name: '私人游泳池(部分)',
    nameEn: 'Private swimming pool(part)',
    icon: 'cuIcon-weibiaoti-'
  },
  {
    code: 'FCT041131',
    name: '私人温泉(部分)',
    nameEn: 'Private hot spring(part)',
    icon: 'cuIcon-shuiwen'
  },
  { code: 'FCT041514', name: '景观泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  {
    code: 'FCT04177',
    name: '保龄球馆',
    nameEn: 'Bowling Alley',
    icon: 'cuIcon-BowlingSpare'
  },
  { code: 'FCT041505', name: '美发护发', nameEn: '', icon: 'cuIcon-ranfa' },
  {
    code: 'FCT041128',
    name: '私人游泳池',
    nameEn: 'Private swimming pool',
    icon: 'cuIcon-weibiaoti-'
  },
  { code: 'FCT041522', name: '私人教练', nameEn: '', icon: 'cuIcon-guanjia' },
  { code: 'FCT041520', name: '瑜伽课程', nameEn: '', icon: 'cuIcon-yuqiedian' },
  {
    code: 'FCT041130',
    name: '私人温泉',
    nameEn: 'Private hot spring',
    icon: 'cuIcon-shuiwen'
  },
  { code: 'FCT041526', name: '脸部护理', nameEn: '', icon: 'cuIcon-lianbuhuli' },
  { code: 'FCT041507', name: '染发', nameEn: '', icon: 'cuIcon-ranfa' },
  { code: 'FCT041535', name: '沙滩/泳池遮阳伞', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041519', name: '身体去角质', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041517', name: '趾甲护理', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT041347',
    name: '无充电车位',
    nameEn: 'No charging parking space',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT041538', name: '无边泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  { code: 'FCT041537', name: '沙滩毛巾', nameEn: '', icon: 'cuIcon-maojin' },
  { code: 'FCT041524', name: '美甲', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT04179', name: '壁球室', nameEn: 'Squash court', icon: 'cuIcon-check1' },
  { code: 'FCT041523', name: '美容化妆', nameEn: '', icon: 'cuIcon-beaut' },
  { code: 'FCT041528', name: '纤体', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041530', name: '水上乐园', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041536', name: '池边酒吧', nameEn: '', icon: 'cuIcon-jiuba' },
  { code: 'FCT041539', name: '骑马', nameEn: '', icon: 'cuIcon-qima' },
  { code: 'FCT041508', name: '水上滑梯', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041529', name: '光疗', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT041494', name: '迷你高尔夫', nameEn: '', icon: 'cuIcon-gaoerfu' },
  { code: 'FCT041516', name: '屋顶泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  { code: 'FCT041540', name: '沙滩酒吧', nameEn: '', icon: 'cuIcon-jiuba' },
  { code: 'FCT041047', name: '赌场', nameEn: 'Casino', icon: 'cuIcon-check1' },
  {
    code: 'FCT041043',
    name: '可免费携带宠物',
    nameEn: 'Pets allowed （free）',
    icon: 'cuIcon-chongwu'
  },
  { code: 'FCT041541', name: '盐水泳池', nameEn: '', icon: 'cuIcon-weibiaoti-' },
  {
    code: 'FCT05781',
    name: '商务服务',
    nameEn: 'Business Services',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT05820', name: '电视机', nameEn: 'TV', icon: 'cuIcon-dianshi' },
  {
    code: 'FCT05208',
    name: '会议设施',
    nameEn: 'Meeting facilities',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT05782',
    name: '多功能厅',
    nameEn: 'Multi-Function Hall',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT05784',
    name: '多媒体演示系统',
    nameEn: 'Multimedia demonstration system',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT051041', name: '传真/复印', nameEn: 'Fax/copy', icon: 'cuIcon-dayin' },
  { code: 'FCT05821', name: '传真', nameEn: 'Fax', icon: 'cuIcon-chuanzhenji-xian' },
  {
    code: 'FCT05874',
    name: '传真(部分)',
    nameEn: 'Fax (part)',
    icon: 'cuIcon-chuanzhenji-xian'
  },
  { code: 'FCT05201', name: '有电梯', nameEn: 'With elevator', icon: 'cuIcon-dianti' },
  { code: 'FCT05200', name: '无电梯', nameEn: 'No elevator', icon: 'cuIcon-dianti' },
  { code: 'FCT05199', name: '电梯', nameEn: 'Elevator', icon: 'cuIcon-dianti' },
  {
    code: 'FCT05215',
    name: '公共区域闭路电视监控系统',
    nameEn: 'Closed Circuit Television in public area',
    icon: 'cuIcon-jiankong'
  },
  {
    code: 'FCT051049',
    name: '所有公共及私人场所严禁吸烟',
    nameEn: 'Non-smoking hotel',
    icon: 'cuIcon-wuyanfang'
  },
  {
    code: 'FCT05202',
    name: '公共区域上网',
    nameEn: 'Wi-Fi in public area',
    icon: 'cuIcon-wifi1'
  },
  {
    code: 'FCT05206',
    name: '前台保险柜',
    nameEn: 'Safe-deposit boxes at front desk',
    icon: 'cuIcon-qiantaibaoxiangui'
  },
  {
    code: 'FCT05212',
    name: '商品部',
    nameEn: 'commodity department',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT05214', name: '大堂吧', nameEn: 'Lobby bar', icon: 'cuIcon-check1' },
  {
    code: 'FCT05774',
    name: '部分时段大堂经理',
    nameEn: 'Part of the lobby manager',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT05227',
    name: '大堂提供上网电脑',
    nameEn: 'Computers at lobby',
    icon: 'cuIcon-diannao'
  },
  {
    code: 'FCT05216',
    name: '残障人客房',
    nameEn: 'Handicapped room',
    icon: 'cuIcon-lunyi'
  },
  {
    code: 'FCT05221',
    name: '无烟楼层',
    nameEn: 'Non-smoking floor',
    icon: 'cuIcon-wuyanfang'
  },
  { code: 'FCT05785', name: '行政楼层', nameEn: 'Administration', icon: 'cuIcon-check1' },
  { code: 'FCT05223', name: '行政酒廊', nameEn: 'Executive lounge', icon: 'cuIcon-jiuba' },
  { code: 'FCT05786', name: '礼品廊', nameEn: 'Gift Gallery', icon: 'cuIcon-lipin' },
  { code: 'FCT051052', name: '暖气', nameEn: 'Heating', icon: 'cuIcon-nuanqi' },
  { code: 'FCT051053', name: '暖气(部分)', nameEn: 'Heating(part)', icon: 'cuIcon-nuanqi' },
  { code: 'FCT051439', name: '灭火器', nameEn: '', icon: 'cuIcon-miehuoqi' },
  { code: 'FCT05207', name: '商务中心', nameEn: 'Business center', icon: 'cuIcon-check1' },
  { code: 'FCT051496', name: '烟雾报警器', nameEn: '', icon: 'cuIcon-yanwubaojingqi' },
  { code: 'FCT051431', name: '净水机', nameEn: '', icon: 'cuIcon-kongqijinghuaqi' },
  { code: 'FCT05209', name: '自助取款机', nameEn: 'ATM banking', icon: 'cuIcon-check1' },
  { code: 'FCT05237', name: '医疗支援', nameEn: 'Medical support', icon: 'cuIcon-jijiubao' },
  { code: 'FCT051504', name: '自动售货机（饮品）', nameEn: '', icon: 'cuIcon-zidongshouhuoji' },
  { code: 'FCT051503', name: '自动售货机（零食）', nameEn: '', icon: 'cuIcon-zidongshouhuoji' },
  {
    code: 'FCT061323',
    name: '儿童拖鞋',
    nameEn: 'Children\'s slippers',
    icon: 'cuIcon-tuoxie'
  },
  {
    code: 'FCT061325',
    name: '儿童牙刷',
    nameEn: 'Child toothbrush',
    icon: 'cuIcon-zu'
  },
  { code: 'FCT061324', name: '儿童玩具', nameEn: 'kids toys', icon: 'cuIcon-check1' },
  { code: 'FCT06239', name: '婴儿或儿童看护', nameEn: 'Child care', icon: 'cuIcon-check1' },
  {
    code: 'FCT061326',
    name: '儿童浴袍',
    nameEn: 'Children\'s bathrobe',
    icon: 'cuIcon-yupao'
  },
  { code: 'FCT061502', name: '儿童书籍/影音', nameEn: '', icon: 'cuIcon-dianying' },
  { code: 'FCT061493', name: '儿童桌面游戏/拼图', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT061512', name: '公共交通票', nameEn: '', icon: 'cuIcon-fapiao' },
  { code: 'FCT061433', name: '火灾报警器', nameEn: '', icon: 'cuIcon-baojingqibeifen' },
  {
    code: 'FCT06219',
    name: '电子结账系统',
    nameEn: 'Electronic check-out system',
    icon: 'cuIcon-xitong'
  },
  { code: 'FCT06696', name: '提供发票', nameEn: 'Provide invoice', icon: 'cuIcon-fapiao' },
  {
    code: 'FCT06889',
    name: '共用浴室(部分)',
    nameEn: 'Shared Bathroom (part)',
    icon: 'cuIcon-weiyu'
  },
  {
    code: 'FCT06811',
    name: '客房WIFI覆盖免费',
    nameEn: 'Free wifi in room',
    icon: 'cuIcon-wifi1'
  },
  {
    code: 'FCT06738',
    name: '免费自动擦鞋机',
    nameEn: 'Free automatic shoe polishing machine',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061436', name: '门禁系统', nameEn: '', icon: 'cuIcon-menjin' },
  { code: 'FCT061366', name: '唤醒服务', nameEn: 'Wake up service', icon: 'cuIcon-naozhong' },
  { code: 'FCT061497', name: '安全报警器', nameEn: '', icon: 'cuIcon-baojingqibeifen' },
  {
    code: 'FCT06247',
    name: '婚宴服务',
    nameEn: 'Wedding banquet service',
    icon: 'cuIcon-yanhuiting'
  },
  { code: 'FCT061435', name: '投影设备', nameEn: '', icon: 'cuIcon-touyingyi-copy' },
  { code: 'FCT06799', name: '沙发', nameEn: 'Sofa', icon: 'cuIcon-shafa' },
  {
    code: 'FCT061081',
    name: '电脑(部分)',
    nameEn: 'Computer(part)',
    icon: 'cuIcon-diannao'
  },
  { code: 'FCT061122', name: '露台', nameEn: 'Terrace', icon: 'cuIcon-yangtai' },
  { code: 'FCT06849', name: '书桌(部分)', nameEn: 'Desk (part)', icon: 'cuIcon-shuzhuo' },
  { code: 'FCT061447', name: '送机服务', nameEn: '', icon: 'cuIcon-tubiao-' },
  { code: 'FCT06246', name: '管家服务', nameEn: 'butler service', icon: 'cuIcon-guanjia' },
  { code: 'FCT061430', name: '急救包', nameEn: '', icon: 'cuIcon-jijiubao' },
  { code: 'FCT06812', name: '欢迎礼品', nameEn: 'Welcome gifts', icon: 'cuIcon-lipin' },
  { code: 'FCT061498', name: '保安人员', nameEn: '', icon: 'cuIcon-guanjia' },
  { code: 'FCT06805', name: '闹钟', nameEn: 'Alarm clock', icon: 'cuIcon-naozhong' },
  { code: 'FCT061446', name: '储物柜', nameEn: '', icon: 'cuIcon-yigui' },
  { code: 'FCT061441', name: '洗涤用具', nameEn: '', icon: 'cuIcon-zu' },
  {
    code: 'FCT06797',
    name: '房内保险箱',
    nameEn: 'Safety box',
    icon: 'cuIcon-qiantaibaoxiangui'
  },
  { code: 'FCT06817', name: '收费电影', nameEn: 'Charge film', icon: 'cuIcon-dianying' },
  {
    code: 'FCT06212',
    name: '商品部',
    nameEn: 'commodity department',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT06770',
    name: '专职门童',
    nameEn: 'Full-time Doorman',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061437', name: '新风系统', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT06204',
    name: '收费wifi',
    nameEn: 'With Wi-Fi in public area (surcharge)',
    icon: 'cuIcon-wifi1'
  },
  { code: 'FCT06159', name: '桑拿浴室', nameEn: 'Sauna', icon: 'cuIcon-weiyu' },
  { code: 'FCT06813', name: '语音留言', nameEn: 'Voicemail', icon: 'cuIcon-check1' },
  {
    code: 'FCT061362',
    name: '智能门锁',
    nameEn: 'Smart door lock',
    icon: 'cuIcon-menjin'
  },
  { code: 'FCT061429', name: '干衣机', nameEn: '', icon: 'cuIcon-xiyiji' },
  { code: 'FCT061510', name: '送站服务', nameEn: '', icon: 'cuIcon-tubiao-' },
  { code: 'FCT061062', name: '坐卧两用长沙发', nameEn: 'Sofa bed', icon: 'cuIcon-shafa' },
  { code: 'FCT061440', name: '加湿器', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT06872',
    name: '液晶电视机(部分)',
    nameEn: 'LCD TV (part)',
    icon: 'cuIcon-dianshi'
  },
  {
    code: 'FCT06865',
    name: '欢迎礼品(部分)',
    nameEn: 'Welcome gifts (part)',
    icon: 'cuIcon-lipin'
  },
  { code: 'FCT061069', name: '电风扇(部分)', nameEn: 'Fan(part)', icon: 'cuIcon-fengshan' },
  { code: 'FCT06835', name: '共用浴室', nameEn: 'Shared Bathroom', icon: 'cuIcon-weiyu' },
  { code: 'FCT061345', name: '调味品', nameEn: 'Condiment', icon: 'cuIcon-ganhuotiaowei' },
  { code: 'FCT061068', name: '电风扇', nameEn: 'Fan', icon: 'cuIcon-fengshan' },
  { code: 'FCT061333', name: '花园景', nameEn: 'Garden view', icon: 'cuIcon-check1' },
  { code: 'FCT061499', name: '花园', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT06783',
    name: '专用展览厅',
    nameEn: 'Special exhibition hall',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061500', name: '电话中文翻译', nameEn: '', icon: 'cuIcon-dianhua' },
  { code: 'FCT061445', name: '共用厨房', nameEn: '', icon: 'cuIcon-weibolu' },
  { code: 'FCT06769', name: '穿梭机场班车', nameEn: 'Shuttle bus', icon: 'cuIcon-check1' },
  { code: 'FCT061532', name: '户外家具', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT06243',
    name: '租借笔记本电脑',
    nameEn: 'Laptop lease',
    icon: 'cuIcon-diannao'
  },
  { code: 'FCT061040', name: '滑雪用具寄存', nameEn: 'Ski storage', icon: 'cuIcon-huaxue' },
  {
    code: 'FCT061126',
    name: '更衣室',
    nameEn: 'Dressing room',
    icon: 'cuIcon-hangeryijia'
  },
  { code: 'FCT061509', name: '婴儿推车', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT06822', name: '音响', nameEn: 'Sound', icon: 'cuIcon-yinxiang' },
  {
    code: 'FCT061125',
    name: '阳台(部分)',
    nameEn: 'Balcony(part)',
    icon: 'cuIcon-yangtai'
  },
  {
    code: 'FCT061099',
    name: '烤箱(部分)',
    nameEn: 'Oven(part)',
    icon: 'cuIcon-shaokaoxiangbeifen'
  },
  {
    code: 'FCT06814',
    name: '免费报纸',
    nameEn: 'Free newspaper',
    icon: 'cuIcon-newspaper_'
  },
  {
    code: 'FCT061127',
    name: '更衣室(部分)',
    nameEn: 'Dressing room(part)',
    icon: 'cuIcon-hangeryijia'
  },
  {
    code: 'FCT06804',
    name: '电子秤',
    nameEn: 'Electronic scale',
    icon: 'cuIcon-dianzicheng'
  },
  {
    code: 'FCT06885',
    name: '24小时热水(部分)',
    nameEn: 'Non 24 hour hot water (part)',
    icon: 'cuIcon-xiaoshireshui'
  },
  {
    code: 'FCT061095',
    name: '烤面包机(部分)',
    nameEn: 'Toaster(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061037',
    name: '穿梭机场班车免费',
    nameEn: 'Free airport shuttle',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061321', name: '电话', nameEn: 'Telephone', icon: 'cuIcon-dianhua' },
  { code: 'FCT061360', name: '空气净化器', nameEn: 'Air cleaner', icon: 'cuIcon-kongqijinghuaqi' },
  { code: 'FCT061056', name: '享有风景', nameEn: 'View', icon: 'cuIcon-check1' },
  {
    code: 'FCT061079',
    name: '3D电视(部分)',
    nameEn: '3D TV(part)',
    icon: 'cuIcon-dianshi'
  },
  { code: 'FCT06892', name: '拖鞋(部分)', nameEn: 'Slippers(part)', icon: 'cuIcon-tuoxie' },
  {
    code: 'FCT061342',
    name: '私人入口',
    nameEn: 'Private entrance',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061057',
    name: '享有风景(部分)',
    nameEn: 'View(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061124', name: '阳台', nameEn: 'Balcony', icon: 'cuIcon-yangtai' },
  {
    code: 'FCT06866',
    name: '语音留言(部分)',
    nameEn: 'Voicemail (part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061343',
    name: '私人入口(部分)',
    nameEn: 'Private entrance(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061098', name: '烤箱', nameEn: 'Oven', icon: 'cuIcon-shaokaoxiangbeifen' },
  { code: 'FCT061094', name: '烤面包机', nameEn: 'Toaster', icon: 'cuIcon-check1' },
  {
    code: 'FCT061073',
    name: '壁炉(部分)',
    nameEn: 'Fireplace(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061050', name: '蚊帐', nameEn: 'Mosquito net', icon: 'cuIcon-check1' },
  {
    code: 'FCT061111',
    name: '洗碗机(部分)',
    nameEn: 'Dishwasher(part)',
    icon: 'cuIcon-xiwanji'
  },
  { code: 'FCT061327', name: '海景', nameEn: 'Sea view', icon: 'cuIcon-check1' },
  {
    code: 'FCT061087',
    name: '收音机(部分)',
    nameEn: 'Radio(part)',
    icon: 'cuIcon-shouyinji'
  },
  { code: 'FCT061340', name: '山景', nameEn: 'Mountain view', icon: 'cuIcon-check1' },
  {
    code: 'FCT061089',
    name: 'iPod音乐基座(部分)',
    nameEn: 'iPod docking station(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT06832',
    name: '非24小时热水',
    nameEn: 'Non 24 hour hot water',
    icon: 'cuIcon-xiaoshireshui'
  },
  { code: 'FCT061449', name: '机器人服务', nameEn: '', icon: 'cuIcon-guanjia' },
  {
    code: 'FCT06790',
    name: '模拟高尔夫球场',
    nameEn: 'A simulated golf course',
    icon: 'cuIcon-gaoerfu'
  },
  { code: 'FCT061086', name: '收音机', nameEn: 'Radio', icon: 'cuIcon-shouyinji' },
  { code: 'FCT061525', name: '海滩', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT061076', name: '游戏机', nameEn: 'Game console', icon: 'cuIcon-youxiji' },
  { code: 'FCT061495', name: '泳池玩具', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT06862',
    name: '房间内高速上网(部分)',
    nameEn: 'High speed Internet in room (part)',
    icon: 'cuIcon-wifi1'
  },
  { code: 'FCT06875', name: '音响(部分)', nameEn: 'Sound (part)', icon: 'cuIcon-yinxiang' },
  { code: 'FCT061438', name: '桌面足球', nameEn: '', icon: 'cuIcon-zuqiu' },
  {
    code: 'FCT06867',
    name: '免费报纸(部分)',
    nameEn: 'Free newspaper (part)',
    icon: 'cuIcon-newspaper_'
  },
  {
    code: 'FCT06864',
    name: '客房WIFI覆盖免费(部分)',
    nameEn: 'Free wifi in room (part)',
    icon: 'cuIcon-wifi1'
  },
  { code: 'FCT061336', name: '连通房', nameEn: 'connecting room', icon: 'cuIcon-check1' },
  {
    code: 'FCT061088',
    name: 'iPod音乐基座',
    nameEn: 'iPod docking station',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061083',
    name: '录像机(部分)',
    nameEn: 'Video(part)',
    icon: 'cuIcon-luxiangji'
  },
  { code: 'FCT061313', name: '城景', nameEn: 'City view', icon: 'cuIcon-check1' },
  { code: 'FCT061506', name: '理发', nameEn: '', icon: 'cuIcon-lifajiandao' },
  {
    code: 'FCT061058',
    name: '无插座',
    nameEn: 'No electrical outlet',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT061314',
    name: '城景(部分)',
    nameEn: 'City view(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT06861',
    name: '夜床服务(部分)',
    nameEn: 'Night bed service (part)',
    icon: 'cuIcon-chuang'
  },
  { code: 'FCT061329', name: '河景', nameEn: 'River view', icon: 'cuIcon-check1' },
  { code: 'FCT061090', name: 'CD播放机', nameEn: 'CD player', icon: 'cuIcon-cd' },
  { code: 'FCT061084', name: 'iPad', nameEn: 'iPad', icon: 'cuIcon-ipad24' },
  {
    code: 'FCT061341',
    name: '山景(部分)',
    nameEn: 'Mountain view(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061320',
    name: '地标景(部分)',
    nameEn: 'Landmark view(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061331', name: '湖景', nameEn: 'Lake view', icon: 'cuIcon-check1' },
  {
    code: 'FCT06876',
    name: 'DVD播放机(部分)',
    nameEn: 'DVD player (part)',
    icon: 'cuIcon-DVD-'
  },
  {
    code: 'FCT061042',
    name: '翻译服务',
    nameEn: 'Translation service',
    icon: 'cuIcon-zhongwen'
  },
  { code: 'FCT061082', name: '录像机', nameEn: 'Video', icon: 'cuIcon-luxiangji' },
  { code: 'FCT061319', name: '地标景', nameEn: 'Landmark view', icon: 'cuIcon-check1' },
  {
    code: 'FCT061328',
    name: '海景(部分)',
    nameEn: 'Sea view(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT061527', name: '脱毛服务', nameEn: '', icon: 'cuIcon-check1' },
  {
    code: 'FCT061330',
    name: '河景(部分)',
    nameEn: 'River view(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061093',
    name: '按次点播收费电视(部分)',
    nameEn: 'Pay-per-view TV(part)',
    icon: 'cuIcon-dianshi'
  },
  {
    code: 'FCT061332',
    name: '湖景(部分)',
    nameEn: 'Lake view(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061322',
    name: '电话(部分)',
    nameEn: 'Telephone (part)',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT061339',
    name: '淋浴(部分)',
    nameEn: 'take a shower(part)',
    icon: 'cuIcon-linyu'
  },
  {
    code: 'FCT06886',
    name: '非24小时热水(部分)',
    nameEn: 'Non 24 hour hot water (part)',
    icon: 'cuIcon-xiaoshireshui'
  },
  {
    code: 'FCT061315',
    name: '充电车位',
    nameEn: 'Electric vehicle charging',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT061354',
    name: '游泳池景(部分)',
    nameEn: 'Pool view(part)',
    icon: 'cuIcon-weibiaoti-'
  },
  {
    code: 'FCT061055',
    name: '智能马桶(部分)',
    nameEn: 'Washlet(part)',
    icon: 'cuIcon-zhinengmatongbeifen'
  },
  { code: 'FCT061348', name: '无床具', nameEn: 'No bed', icon: 'cuIcon-chuang' },
  {
    code: 'FCT061317',
    name: '抽油烟机(部分)',
    nameEn: 'Range hood (part)',
    icon: 'cuIcon-chouyouyanji'
  },
  {
    code: 'FCT061115',
    name: '无热水(部分)',
    nameEn: 'No hot water(part)',
    icon: 'cuIcon-chuang'
  },
  { code: 'FCT061353', name: '游泳池景', nameEn: 'Pool view', icon: 'cuIcon-weibiaoti-' },
  {
    code: 'FCT061346',
    name: '调味品（部分）',
    nameEn: 'Condiment(part)',
    icon: 'cuIcon-ganhuotiaowei'
  },
  { code: 'FCT061369', name: '桑拿(部分)', nameEn: 'sauna(part)', icon: 'cuIcon-sangna' },
  { code: 'FCT061370', name: '桑拿', nameEn: 'sauna', icon: 'cuIcon-sangna' },
  {
    code: 'FCT061344',
    name: '速食品(部分)',
    nameEn: 'Fast food(part)',
    icon: 'cuIcon-sushi'
  },
  {
    code: 'FCT061044',
    name: '携带宠物需额外收费',
    nameEn: 'Pets allowed (surcharge)',
    icon: 'cuIcon-chongwu'
  },
  {
    code: 'FCT061357',
    name: '中文设施清单',
    nameEn: 'Chinese facilities list',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT07796',
    name: '手动窗帘',
    nameEn: 'Manual curtain',
    icon: 'cuIcon-chuanglian'
  },
  { code: 'FCT07808', name: '空调', nameEn: 'AirCondition', icon: 'cuIcon-kongtiao' },
  {
    code: 'FCT07860',
    name: '空调(部分)',
    nameEn: 'AirCondition (part)',
    icon: 'cuIcon-kongtiao'
  },
  {
    code: 'FCT071350',
    name: '无空调',
    nameEn: 'No air conditioning',
    icon: 'cuIcon-kongtiao'
  },
  { code: 'FCT07815', name: '国内长途电话', nameEn: 'DDD', icon: 'cuIcon-dianhua' },
  { code: 'FCT07816', name: '国际长途电话', nameEn: 'IDD', icon: 'cuIcon-dianhua' },
  {
    code: 'FCT07868',
    name: '国内长途电话(部分)',
    nameEn: 'DDD (part)',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT07869',
    name: '国际长途电话(部分)',
    nameEn: 'IDD (part)',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT07824',
    name: '免费国内长途电话',
    nameEn: 'Free DDD',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT07877',
    name: '免费国内长途电话(部分)',
    nameEn: 'Free DDD (part)',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT07792',
    name: '多种规格电源插座',
    nameEn: 'Various kinds of sockets',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT071309',
    name: '单一规格电源插座',
    nameEn: 'Single-type outlets',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT07843',
    name: '多种规格电源插座(部分)',
    nameEn: 'Various kinds of sockets (part)',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT071318',
    name: '单一规格电源插座(部分)',
    nameEn: 'Single-type outlets (part)',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  { code: 'FCT07829', name: '小冰箱', nameEn: 'Refrigerator', icon: 'cuIcon-bingxiang' },
  {
    code: 'FCT07882',
    name: '小冰箱(部分)',
    nameEn: 'Refrigerator(part)',
    icon: 'cuIcon-bingxiang'
  },
  {
    code: 'FCT07858',
    name: '雨伞租借服务(部分)',
    nameEn: 'Umbrella rental service (part)',
    icon: 'cuIcon-yusan'
  },
  {
    code: 'FCT071074',
    name: '卫星频道',
    nameEn: 'Satellite channels',
    icon: 'cuIcon-shouyinji'
  },
  {
    code: 'FCT071075',
    name: '卫星频道(部分)',
    nameEn: 'Satellite channels(part)',
    icon: 'cuIcon-shouyinji'
  },
  {
    code: 'FCT07826',
    name: '电热水壶',
    nameEn: 'Electric Kettle',
    icon: 'cuIcon-dianreshuihu'
  },
  {
    code: 'FCT071112',
    name: '电热水器',
    nameEn: 'Electric water heater',
    icon: 'cuIcon-reshuiqi_'
  },
  { code: 'FCT071070', name: '电热毯', nameEn: 'Electric blankets', icon: 'cuIcon-check1' },
  {
    code: 'FCT07879',
    name: '电热水壶(部分)',
    nameEn: 'Electric Kettle (part)',
    icon: 'cuIcon-dianreshuihu'
  },
  {
    code: 'FCT071113',
    name: '电热水器(部分)',
    nameEn: 'Electric water heater(part)',
    icon: 'cuIcon-dianreshuihu'
  },
  {
    code: 'FCT071071',
    name: '电热毯(部分)',
    nameEn: 'Electric blankets(part)',
    icon: 'cuIcon-check1'
  },
  {
    code: 'FCT07842',
    name: '洗浴间电话',
    nameEn: 'Bathroom phone',
    icon: 'cuIcon-dianhua'
  },
  {
    code: 'FCT07896',
    name: '洗浴间电话(部分)',
    nameEn: 'Bathroom phone (part)',
    icon: 'cuIcon-dianhua'
  },
  { code: 'FCT07841', name: '洗浴间电视', nameEn: 'Bathroom TV', icon: 'cuIcon-dianshi' },
  {
    code: 'FCT07895',
    name: '洗浴间电视(部分)',
    nameEn: 'Bathroom TV (part)',
    icon: 'cuIcon-dianshi'
  },
  { code: 'FCT07820', name: '电视机', nameEn: 'TV', icon: 'cuIcon-dianshi' },
  {
    code: 'FCT07803',
    name: '床具：毯子或被子',
    nameEn: 'Bedding: a blanket or a quilt',
    icon: 'cuIcon-leibuliaochuangdanx'
  },
  {
    code: 'FCT07834',
    name: '独立淋浴间',
    nameEn: 'Independent shower',
    icon: 'cuIcon-linyu'
  },
  { code: 'FCT07838', name: '拖鞋', nameEn: 'Slipper', icon: 'cuIcon-tuoxie' },
  {
    code: 'FCT071427',
    name: '被单更换：1客1换',
    nameEn: '',
    icon: 'cuIcon-leibuliaochuangdanx'
  },
  { code: 'FCT071421', name: '打扫卫生：1客1扫', nameEn: '', icon: 'cuIcon-saoba' },
  {
    code: 'FCT07794',
    name: '遮光窗帘',
    nameEn: 'Shade curtain',
    icon: 'cuIcon-chuanglian'
  },
  { code: 'FCT07819', name: '液晶电视机', nameEn: 'LCD TV', icon: 'cuIcon-dianshi' },
  {
    code: 'FCT071308',
    name: '220V电压插座',
    nameEn: '220V power outlets',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  { code: 'FCT07798', name: '书桌', nameEn: 'Desk', icon: 'cuIcon-shuzhuo' },
  {
    code: 'FCT07818',
    name: '有线频道',
    nameEn: 'Cable channel',
    icon: 'cuIcon-youxianshangwang'
  },
  {
    code: 'FCT071106',
    name: '厨房用具',
    nameEn: 'Kitchenware',
    icon: 'cuIcon-chouyouyanji'
  },
  { code: 'FCT071104', name: '厨房', nameEn: 'Kitchen', icon: 'cuIcon-chouyouyanji' },
  {
    code: 'FCT07241',
    name: '房间消毒',
    nameEn: 'Room disinfection',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT071422', name: '每日打扫', nameEn: '', icon: 'cuIcon-saoba' },
  { code: 'FCT07801', name: '备用床具', nameEn: 'Spare bedding', icon: 'cuIcon-check1' },
  { code: 'FCT07806', name: '针线包', nameEn: 'Sewing kit', icon: 'cuIcon-zhen' },
  {
    code: 'FCT07802',
    name: '床具：鸭绒被',
    nameEn: 'Bedding: duck down quilt',
    icon: 'cuIcon-leibuliaochuangdanx'
  },
  {
    code: 'FCT07827',
    name: '咖啡壶/茶壶',
    nameEn: 'Coffee pot / teapot',
    icon: 'cuIcon-kafeiting'
  },
  { code: 'FCT071100', name: '炉灶', nameEn: 'Stove', icon: 'cuIcon-check1' },
  {
    code: 'FCT071066',
    name: '衣柜/衣橱',
    nameEn: 'Wardrobe/closet',
    icon: 'cuIcon-yigui'
  },
  {
    code: 'FCT07793',
    name: '110V电压插座',
    nameEn: '110V socket',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  { code: 'FCT071434', name: '打扫工具', nameEn: '', icon: 'cuIcon-saoba' },
  { code: 'FCT071432', name: '晾衣架', nameEn: '', icon: 'cuIcon-hangeryijia' },
  { code: 'FCT07810', name: '客房WIFI覆盖', nameEn: 'WIFI in room', icon: 'cuIcon-wifi1' },
  {
    code: 'FCT07809',
    name: '房间内高速上网',
    nameEn: 'High speed Internet in room',
    icon: 'cuIcon-wifi1'
  },
  { code: 'FCT07828', name: '迷你吧', nameEn: 'Mini Bar', icon: 'cuIcon-jiuba' },
  { code: 'FCT071108', name: '微波炉', nameEn: 'Microwave', icon: 'cuIcon-weibolu' },
  {
    code: 'FCT071063',
    name: '坐卧两用长沙发(部分)',
    nameEn: 'Sofa bed(part)',
    icon: 'cuIcon-shafa'
  },
  { code: 'FCT071442', name: '熨斗/挂烫机', nameEn: '', icon: 'cuIcon-yundouyunyiban' },
  {
    code: 'FCT07852',
    name: '备用床具(部分)',
    nameEn: 'Spare bedding (part)',
    icon: 'cuIcon-bed'
  },
  {
    code: 'FCT071067',
    name: '衣柜/衣橱(部分)',
    nameEn: 'Wardrobe/closet(part)',
    icon: 'cuIcon-yigui'
  },
  { code: 'FCT071123', name: '露台(部分)', nameEn: 'Terrace(part)', icon: 'cuIcon-yangtai' },
  {
    code: 'FCT07848',
    name: '房内保险箱(部分)',
    nameEn: 'Safety box (part)',
    icon: 'cuIcon-qiantaibaoxiangui'
  },
  {
    code: 'FCT07890',
    name: '吹风机(部分)',
    nameEn: 'Hair-dryer(part)',
    icon: 'cuIcon-chuifengji-01'
  },
  {
    code: 'FCT07857',
    name: '针线包(部分)',
    nameEn: 'Sewing kit (part)',
    icon: 'cuIcon-zhen'
  },
  {
    code: 'FCT07851',
    name: '特长睡床（超过两米）(部分)',
    nameEn: 'Extra long bed (more than 2 meters) (part)',
    icon: 'cuIcon-chuang'
  },
  {
    code: 'FCT07881',
    name: '迷你吧(部分)',
    nameEn: 'Mini Bar (part)',
    icon: 'cuIcon-jiuba'
  },
  { code: 'FCT071443', name: '家庭影院', nameEn: '', icon: 'cuIcon-dianying' },
  { code: 'FCT071080', name: '电脑', nameEn: 'Computer', icon: 'cuIcon-diannao' },
  {
    code: 'FCT07853',
    name: '床具：鸭绒被(部分)',
    nameEn: 'Bedding: duck down quilt (part)',
    icon: 'cuIcon-leibuliaochuangdanx'
  },
  {
    code: 'FCT07795',
    name: '自动窗帘',
    nameEn: 'Automatic curtain',
    icon: 'cuIcon-chuanglian'
  },
  { code: 'FCT071105', name: '厨房(部分)', nameEn: 'Kitchen(part)', icon: 'cuIcon-weibolu' },
  {
    code: 'FCT07844',
    name: '110V电压插座(部分)',
    nameEn: '110V socket(part)',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT07880',
    name: '咖啡壶/茶壶(部分)',
    nameEn: 'Coffee pot / teapot (part)',
    icon: 'cuIcon-kafeiting'
  },
  {
    code: 'FCT07856',
    name: '闹钟(部分)',
    nameEn: 'Alarm clock (part)',
    icon: 'cuIcon-naozhong'
  },
  {
    code: 'FCT071109',
    name: '微波炉(部分)',
    nameEn: 'Microwave(part)',
    icon: 'cuIcon-weibolu'
  },
  {
    code: 'FCT071310',
    name: '220V电压插座(部分)',
    nameEn: '220V power outlets(part)',
    icon: 'cuIcon-duozhongguigedianyuanchazuo'
  },
  {
    code: 'FCT07883',
    name: '免费洗漱用品（6样以上）(部分)',
    nameEn: 'Free wash supplies (≥6) (part)',
    icon: 'cuIcon-zu'
  },
  {
    code: 'FCT071107',
    name: '厨房用具(部分)',
    nameEn: 'Kitchenware(part)',
    icon: 'cuIcon-weibolu'
  },
  {
    code: 'FCT07845',
    name: '遮光窗帘(部分)',
    nameEn: 'Shade curtain (part)',
    icon: 'cuIcon-chuanglian'
  },
  {
    code: 'FCT07800',
    name: '特长睡床（超过两米）',
    nameEn: 'Extra long bed (more than 2 meters)',
    icon: 'cuIcon-chuang'
  },
  {
    code: 'FCT07871',
    name: '有线频道(部分)',
    nameEn: 'Cable channel (part)',
    icon: 'cuIcon-youxianshangwang'
  },
  { code: 'FCT07850', name: '沙发(部分)', nameEn: 'Sofa (part)', icon: 'cuIcon-shafa' },
  {
    code: 'FCT071337',
    name: '连通房(部分)',
    nameEn: 'connecting room(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT07873', name: '电视机(部分)', nameEn: 'TV (part)', icon: 'cuIcon-dianshi' },
  {
    code: 'FCT07846',
    name: '自动窗帘(部分)',
    nameEn: 'Automatic curtain (part)',
    icon: 'cuIcon-chuanglian'
  },
  {
    code: 'FCT07847',
    name: '手动窗帘(部分)',
    nameEn: 'Manual curtain (part)',
    icon: 'cuIcon-chuanglian'
  },
  {
    code: 'FCT07854',
    name: '床具：毯子或被子(部分)',
    nameEn: 'Bedding: a blanket or a quilt (part)',
    icon: 'cuIcon-leibuliaochuangdanx'
  },
  {
    code: 'FCT071051',
    name: '蚊帐(部分)',
    nameEn: 'Mosquito net(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT071114', name: '无热水', nameEn: 'No hot water', icon: 'cuIcon-shuiwen' },
  { code: 'FCT071101', name: '炉灶(部分)', nameEn: 'Stove(part)', icon: 'cuIcon-check1' },
  { code: 'FCT071078', name: '3D电视', nameEn: '3D TV', icon: 'cuIcon-dianshi' },
  { code: 'FCT071054', name: '智能马桶', nameEn: 'Washlet', icon: 'cuIcon-zhinengmatongbeifen' },
  {
    code: 'FCT071091',
    name: 'CD播放机(部分)',
    nameEn: 'CD player(part)',
    icon: 'cuIcon-cd'
  },
  { code: 'FCT071072', name: '壁炉', nameEn: 'Fireplace', icon: 'cuIcon-check1' },
  { code: 'FCT071110', name: '洗碗机', nameEn: 'Dishwasher', icon: 'cuIcon-xiwanji' },
  { code: 'FCT071085', name: 'iPad(部分)', nameEn: 'iPad(part)', icon: 'cuIcon-ipad24' },
  {
    code: 'FCT071077',
    name: '游戏机(部分)',
    nameEn: 'Game console(part)',
    icon: 'cuIcon-youxiji'
  },
  { code: 'FCT071060', name: '无窗帘', nameEn: 'No curtain', icon: 'cuIcon-chuanglian' },
  {
    code: 'FCT07863',
    name: '客房WIFI覆盖(部分)',
    nameEn: 'WIFI in room (part)',
    icon: 'cuIcon-wifi1'
  },
  {
    code: 'FCT071092',
    name: '按次点播收费电视',
    nameEn: 'Pay-per-view TV',
    icon: 'cuIcon-dianshi'
  },
  { code: 'FCT07823', name: 'DVD播放机', nameEn: 'DVD player', icon: 'cuIcon-DVD-' },
  {
    code: 'FCT071316',
    name: '抽油烟机',
    nameEn: 'Range hood',
    icon: 'cuIcon-chouyouyanji'
  },
  {
    code: 'FCT071361',
    name: '空气净化器（部分）',
    nameEn: 'Air cleaner（part）',
    icon: 'cuIcon-kongqijinghuaqi'
  },
  {
    code: 'FCT071334',
    name: '空气检测器',
    nameEn: 'Air detector',
    icon: 'cuIcon-kongqijinghuaqi'
  },
  {
    code: 'FCT071355',
    name: '智能客控',
    nameEn: 'Intelligent customer control',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT071312', name: '茶包(部分)', nameEn: 'tea bag(part)', icon: 'cuIcon-check1' },
  {
    code: 'FCT071335',
    name: '空气检测器(部分)',
    nameEn: 'Air detector（part）',
    icon: 'cuIcon-kongqijinghuaqi'
  },
  { code: 'FCT071428', name: '每日换被单', nameEn: '', icon: 'cuIcon-leibuliaochuangdanx' },
  {
    code: 'FCT071358',
    name: '中文设施清单(部分)',
    nameEn: 'Chinese facilities list(part)',
    icon: 'cuIcon-check1'
  },
  { code: 'FCT072029', name: '加厚床垫', nameEn: '', icon: 'cuIcon-check1' },
  { code: 'FCT072035', name: '独立卧室', nameEn: '', icon: 'cuIcon-chuang' },
  { code: 'FCT072043', name: '数码电视服务', nameEn: '', icon: 'cuIcon-dianshi' },
  { code: 'FCT072126', name: '免费洗浴用品', nameEn: '', icon: 'cuIcon-zu' },
  {
    code: 'FCT08825',
    name: '免费瓶装水',
    nameEn: 'Free bottled water',
    icon: 'cuIcon-shui'
  },
  {
    code: 'FCT08878',
    name: '免费瓶装水(部分)',
    nameEn: 'Free bottled water (part)',
    icon: 'cuIcon-shui'
  },
  {
    code: 'FCT081097',
    name: '咖啡机(部分)',
    nameEn: 'Coffee machine(part)',
    icon: 'cuIcon-kafeiting'
  },
  {
    code: 'FCT08739',
    name: '自助咖啡机（投币）',
    nameEn: 'Self-help coffee machine',
    icon: 'cuIcon-kafeiting'
  },
  { code: 'FCT081096', name: '咖啡机', nameEn: 'Coffee machine', icon: 'cuIcon-kafeiting' },
  { code: 'FCT091118', name: '浴室', nameEn: 'Bathroom', icon: 'cuIcon-weiyu' },
  {
    code: 'FCT09894',
    name: '浴室化妆放大镜(部分)',
    nameEn: 'Bathroom make-up magnifying glass (part)',
    icon: 'cuIcon-huazhuangjing'
  },
  {
    code: 'FCT09837',
    name: '公用吹风机',
    nameEn: 'Shared Hair-dryer',
    icon: 'cuIcon-chuifengji-01'
  },
  { code: 'FCT091338', name: '淋浴', nameEn: 'take a shower', icon: 'cuIcon-linyu' },
  {
    code: 'FCT09891',
    name: '公用吹风机(部分)',
    nameEn: 'Shared Hair-dryer (part)',
    icon: 'cuIcon-chuifengji-01'
  },
  {
    code: 'FCT09884',
    name: '免费洗漱用品（6样以内）(部分)',
    nameEn: 'Free wash supplies (≤6) (part)',
    icon: 'cuIcon-zu'
  },
  {
    code: 'FCT09855',
    name: '电子秤(部分)',
    nameEn: 'Electronic scale (part)',
    icon: 'cuIcon-dianzicheng'
  },
  {
    code: 'FCT091119',
    name: '浴室(部分)',
    nameEn: 'Bathroom(part)',
    icon: 'cuIcon-weiyu'
  },
  {
    code: 'FCT091351',
    name: '无免费洗漱用品',
    nameEn: 'No free toiletries',
    icon: 'cuIcon-zu'
  }
];
// 房型
export const unitType = [
  {
    name: '标准房',
    code: 'RU01'
  },
  {
    name: '高级房',
    code: 'RU02'
  },
  {
    name: '豪华房',
    code: 'RU03'
  },
  {
    name: '商务房',
    code: 'RU04'
  },
  {
    name: '套房',
    code: 'RU05'
  },
  {
    name: '海景房',
    code: 'RU06'
  },
  {
    name: '山景房',
    code: 'RU07'
  },
  {
    name: '园景房',
    code: 'RU08'
  }
];
// 支付方式icon
export const paymentMethods = {
  union: 'union',
  alipay: 'alipay',
  wechat: 'wechat',
  visa: 'visa',
  apple: 'ApplePay',
  master: 'master',
  ae: 'AmericanExpress',
  ds: 'DinersClubCard',
  dc: 'DiscoverCard'
};

// 获取当前页url
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/login'
    });
  }
};

// 获取星期几
export const getDay = num => {
  let str = '';
  switch (num) {
    case 0:
      str = '日';
      break;
    case 1:
      str = '一';
      break;
    case 2:
      str = '二';
      break;
    case 3:
      str = '三';
      break;
    case 4:
      str = '四';
      break;
    case 5:
      str = '五';
      break;
    case 6:
      str = '六';
      break;
  }
  return `星期${str}`;
};

// 获取今天，明天，后天
export const getToDayAndAfterDay = date => {
  const day1 = dayJs().startOf('day');
  const day2 = dayJs()
    .add(1, 'd')
    .startOf('day');
  const day3 = dayJs()
    .add(2, 'd')
    .startOf('day');
  if (dayJs(date).isSame(day1, 'd')) {
    return '今天';
  }
  if (dayJs(date).isSame(day2, 'd')) {
    return '明天';
  }
  if (dayJs(date).isSame(day3, 'd')) {
    return '后天';
  }
  return '';
};

export const formatRoomBed = code => _.find(roomBedType, el => el.code === code) || {};

export const formatRoomWindow = key => {
  const obj = {
    1: '有窗',
    2: '部分有窗',
    3: '内窗',
    4: '天窗',
    5: '封闭窗',
    6: '飘窗'
  };
  return obj[key];
};

export const formatRoomWifi = key => {
  const obj = {
    0: '没有Wifi',
    1: '有WIFI',
    2: '有WIFI',
    3: '有WIFI',
    4: '有WIFI'
  };
  return obj[key];
};

// 计算两个时间相差的天数
export const dateSpace = (checkItAt, checkOutAt) =>
  dayJs(checkOutAt).diff(dayJs(checkItAt), 'd');

export const cities = [
  {
    'id': '150600',
    'name': '鄂尔多斯市',
    'parentId': '150000',
    'shortName': '鄂尔多斯',
    'levelType': '2',
    'cityCode': '0477',
    'zipcode': '017004',
    'lng': '109.99029',
    'lat': '39.817179',
    'pinyin': 'Eerduosi',
    'status': '1'
  },
  {
    'id': '310100',
    'name': '上海市',
    'parentId': '310000',
    'shortName': '上海',
    'levelType': '2',
    'cityCode': '021',
    'zipcode': '200000',
    'lng': '121.472644',
    'lat': '31.231706',
    'pinyin': 'Shanghai',
    'status': '1'
  },
  {
    'id': '320400',
    'name': '常州市',
    'parentId': '320000',
    'shortName': '常州',
    'levelType': '2',
    'cityCode': '0519',
    'zipcode': '213000',
    'lng': '119.946973',
    'lat': '31.772752',
    'pinyin': 'Changzhou',
    'status': '1'
  },
  {
    'id': '320900',
    'name': '盐城市',
    'parentId': '320000',
    'shortName': '盐城',
    'levelType': '2',
    'cityCode': '0515',
    'zipcode': '224005',
    'lng': '120.139998',
    'lat': '33.377631',
    'pinyin': 'Yancheng',
    'status': '1'
  },
  {
    'id': '321000',
    'name': '扬州市',
    'parentId': '320000',
    'shortName': '扬州',
    'levelType': '2',
    'cityCode': '0514',
    'zipcode': '225002',
    'lng': '119.421003',
    'lat': '32.393159',
    'pinyin': 'Yangzhou',
    'status': '1'
  }, {
    'id': '330400',
    'name': '嘉兴市',
    'parentId': '330000',
    'shortName': '嘉兴',
    'levelType': '2',
    'cityCode': '0573',
    'zipcode': '314000',
    'lng': '120.750865',
    'lat': '30.762653',
    'pinyin': 'Jiaxing',
    'status': '1'
  }, {
    'id': '350300',
    'name': '莆田市',
    'parentId': '350000',
    'shortName': '莆田',
    'levelType': '2',
    'cityCode': '0594',
    'zipcode': '351100',
    'lng': '119.007558',
    'lat': '25.431011',
    'pinyin': 'Putian',
    'status': '1'
  }, {
    'id': '360700',
    'name': '赣州市',
    'parentId': '360000',
    'shortName': '赣州',
    'levelType': '2',
    'cityCode': '0797',
    'zipcode': '341000',
    'lng': '114.940278',
    'lat': '25.85097',
    'pinyin': 'Ganzhou',
    'status': '1'
  },
  {
    'id': '360800',
    'name': '吉安市',
    'parentId': '360000',
    'shortName': '吉安',
    'levelType': '2',
    'cityCode': '0796',
    'zipcode': '343000',
    'lng': '114.986373',
    'lat': '27.111699',
    'pinyin': 'Ji\'an',
    'status': '1'
  }, {
    'id': '410100',
    'name': '郑州市',
    'parentId': '410000',
    'shortName': '郑州',
    'levelType': '2',
    'cityCode': '0371',
    'zipcode': '450000',
    'lng': '113.665412',
    'lat': '34.757975',
    'pinyin': 'Zhengzhou',
    'status': '1'
  }, {
    'id': '420100',
    'name': '武汉市',
    'parentId': '420000',
    'shortName': '武汉',
    'levelType': '2',
    'cityCode': '',
    'zipcode': '430014',
    'lng': '114.298572',
    'lat': '30.584355',
    'pinyin': 'Wuhan',
    'status': '1'
  }, {
    'id': '430700',
    'name': '常德市',
    'parentId': '430000',
    'shortName': '常德',
    'levelType': '2',
    'cityCode': '0736',
    'zipcode': '415000',
    'lng': '111.691347',
    'lat': '29.040225',
    'pinyin': 'Changde',
    'status': '1'
  },
  {
    'id': '430800',
    'name': '张家界市',
    'parentId': '430000',
    'shortName': '张家界',
    'levelType': '2',
    'cityCode': '0744',
    'zipcode': '427000',
    'lng': '110.479921',
    'lat': '29.127401',
    'pinyin': 'Zhangjiajie',
    'status': '1'
  }, {
    'id': '510300',
    'name': '自贡市',
    'parentId': '510000',
    'shortName': '自贡',
    'levelType': '2',
    'cityCode': '0813',
    'zipcode': '643000',
    'lng': '104.773447',
    'lat': '29.352765',
    'pinyin': 'Zigong',
    'status': '1'
  }, {
    'id': '530100',
    'name': '昆明市',
    'parentId': '530000',
    'shortName': '昆明',
    'levelType': '2',
    'cityCode': '0871',
    'zipcode': '650500',
    'lng': '102.712251',
    'lat': '25.040609',
    'pinyin': 'Kunming',
    'status': '1'
  },
  {
    'id': '530300',
    'name': '曲靖市',
    'parentId': '530000',
    'shortName': '曲靖',
    'levelType': '2',
    'cityCode': '0874',
    'zipcode': '655000',
    'lng': '103.797851',
    'lat': '25.501557',
    'pinyin': 'Qujing',
    'status': '1'
  }, {
    'id': '532500',
    'name': '红河哈尼族彝族自治州',
    'parentId': '530000',
    'shortName': '红河',
    'levelType': '2',
    'cityCode': '0873',
    'zipcode': '661400',
    'lng': '103.384182',
    'lat': '23.366775',
    'pinyin': 'Honghe',
    'status': '1'
  },
  {
    'id': '532600',
    'name': '文山壮族苗族自治州',
    'parentId': '530000',
    'shortName': '文山',
    'levelType': '2',
    'cityCode': '0876',
    'zipcode': '663000',
    'lng': '104.24401',
    'lat': '23.36951',
    'pinyin': 'Wenshan',
    'status': '1'
  }, {
    'id': '610100',
    'name': '西安市',
    'parentId': '610000',
    'shortName': '西安',
    'levelType': '2',
    'cityCode': '029',
    'zipcode': '710003',
    'lng': '108.948024',
    'lat': '34.263161',
    'pinyin': 'Xi\'an',
    'status': '1'
  }, {
    'id': '620100',
    'name': '兰州市',
    'parentId': '620000',
    'shortName': '兰州',
    'levelType': '2',
    'cityCode': '0931',
    'zipcode': '730030',
    'lng': '103.823557',
    'lat': '36.058039',
    'pinyin': 'Lanzhou',
    'status': '1'
  }
];



import Taro from '@tarojs/taro';
const customMessage = {
  '-1': '服务器异常，建议稍后再试',
  '40000': '会话过期',
  '40001': '登陆过期, 请重新登陆',
  '40002': '手机号或密码错误，你确认后再登录',
  '40003': '参数有误',
  '40004': '资源不存在',
  '40005': '导入失败',
  '40006': 'API 不存在',
  '40007': '密码错误',
  '40008': '酒店已签约，不能重复签约',
  '40009': '酒店未指定管理员账号, 请联系工作人员',
  '40010': '订单已支付, 请勿重复支付',
  '40011': '不支持该操作',
  '40012': '发票已开票, 请勿重复开票',
  '40013': '收款账户未通过认证，不支持设置为默认收款账户',
  '40014': '收款账户目前不支持编辑, 请确认后再重试',
  '40015': '验证金额有误，请确认后重试',
  '40016': '用户已存在',
  '40017': '用户被禁用',
  '40018': 'PBACError, pbac 服务调用错误',
  '40019': 'pbac 权限错误',
  '40020': '无效的 App secret',
  '40021': '房间已订满',
  '40022': '酒店未签约',
  '40023': '酒店未上线',
  '40024': '请款失败',
  '40025': '账户类型有误',
  '40026': '当前酒店收款账号不可用',
  '40027': '预订失败',
  '40028': '当前用户不能预订酒店',
  '40029': '账户余额不足'
};

const handleError = response => {
  const { code, message } = response;
  const codeStr = code.toString();
  if ( response && customMessage[ codeStr ] ) {
    if ( codeStr === '40000' || codeStr === '40001' ) {
      Taro.reLaunch({
        url: '/pages/login/index'
      });
      return {
        isLogin: true,
        message: message
      };
    }
    if ( codeStr !== '0' ) {
      return {
        message: message,
        isLogin: false
      };
    }
  }
  return {};
};

export default handleError;

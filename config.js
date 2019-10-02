/**
 * 本地localhost测试 上线服务端需要把debug设置成false
 * @type {{debug: boolean, mockPrefixUrl: string}}
 */
module.exports = {
  debug: true, //用于Localhost个人开发环境
  mockPrefixUrl: "http://localhost:8065", //testyapi时用到的api 在 Utility.js 的getUrl用上，用于假数据测试
};

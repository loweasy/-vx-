var app = getApp();

Page({
  data: {
    userInfo: {"nickname":"社区管理员"},
    mode: [ { "pagePath":"../../pages/putaway/putaway","text":"商品上架"},{"pagePath":"../../pages/out/out","text":"商品下架"}, {
      "pagePath": "../../pages/collection/collection", "text": "我的收藏"
    }, {
      "pagePath": "../../pages/order/order",
      "text": "我的订单"
    }, {
      "pagePath": "../../pages/msg/msg",
      "text": "消息中心"
      }, {
        "pagePath": "../../pages/clean/clean",
        "text": "设置"
      }]
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: '../localhost:8092/user/getUser',
      
    })
    /*wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
            });
          }
        })
      }
    });*/
  }
})
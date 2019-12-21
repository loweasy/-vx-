// pages/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '完成', index: 0 }, { name: '待付', index: 1 }, { name: '取消', index: 2 }],
    orderList:[],
    orderList2:[],
    orderList3:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8092/order/getorder',
      method: 'GET',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          orderList:res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })

    wx.request({
      url: 'http://localhost:8092/order/getorder2',
      method: 'GET',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          orderList2: res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })

    wx.request({
      url: 'http://localhost:8092/order/getorder3',
      method: 'GET',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          orderList3: res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度= 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function () {
    this.setData({
      alreadyOrder: [{ orderno: "201904251111112", name: "主机电脑", state: "交易成功", time: "2018-09-30 14:00-16:00", status: "已结束", url: "../../images/icon-fujin.png", money: "132" }, { orderno: "201904251111113", name: "曲面屏显示器", state: "交易成功", time: "2018-10-12 18:00-20:00", status: "未开始", url: "../../images/icon-fujin.png", money: "205" }]
    })
  },

  waitPayShow: function () {
    this.setData({
      waitPayOrder: [{ orderno: "201904251111113", name: "polo衫", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "../../images/icon-fujin.png", money: "186" }],
    })
  },

  lostShow: function () {
    this.setData({
      lostOrder: [{ orderno: "201904251111114", name: "运动鞋", state: "已取消", time: "2018-10-4 10:00-12:00", status: "未开始", url: "../../images/icon-fujin.png", money: "122" }],
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
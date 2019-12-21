const app = getApp()

var websocket = require('../../utils/websocket.js');

var utils = require('../../utils/util.js');

Page({



  /**
  * 页面的初始数据
  */

  data: {

    newslist: [],

    userInfo: {},

    scrollTop: 0,

    increase: false,//图片添加区域隐藏

    aniStyle: true,//动画效果

    message: "",

    previewImgList: [],

    wallist: []

  },

  /**
  * 生命周期函数--监听页面加载
  */

  onLoad: function () {

    var that = this

    if (app.globalData.userInfo) {

      this.setData({

        userInfo: app.globalData.userInfo

      })

    }
    setInterval(function () {
      wx.request({
        url: 'http://localhost:8092/msg/getmsg',
        method: 'GET',
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            newslist: res.data
          })
        },
        fail: function () {
          console.log("fail");
        }

      })
    }, 1000);

  },

  // 页面卸载

  onUnload() {

    wx.closeSocket();

    wx.showToast({

      title: '连接已断开~',

      icon: "none",

      duration: 2000

    })

  },

  //事件处理函数

  send: function () {

    var flag = this;
    var that = this;
    console.log(this.data.message);
    if (false) {
      // if (this.data.message.trim() == "") {

      wx.showToast({

        title: '消息不能为空哦~',

        icon: "none",

        duration: 2000

      })

    } else {

      setTimeout(function () {

        flag.setData({

          increase: false

        })


      }, 500)

      wx.request({
        url: 'http://localhost:8092/msg/addmsg',
        method: 'POST',
        data: { "msg": that.data.message },
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            message: ''
          })
        },
        fail: function () {
          console.log("fail");
        }

      })

    }



  },

  //监听input值的改变

  bindChange: function (event) {
    console.log("test");
    var that = this;
    that.setData({

      message: event.detail.value

    })


  },

  cleanInput: function () {

    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值

    this.setData({

      message: this.data.message

    })

  },

  increase: function () {

    this.setData({

      increase: true,

      aniStyle: true

    })

  },

  //点击空白隐藏message下选框

  outbtn: function () {

    this.setData({

      increase: false,

      aniStyle: true

    })

  },

  //聊天消息始终显示最底端

  bottom: function () {

    var query = wx.createSelectorQuery()

    query.select('#flag').boundingClientRect()

    query.selectViewport().scrollOffset()

    query.exec(function (res) {

      wx.pageScrollTo({

        scrollTop: res[0].bottom // #the-id节点的下边界坐标

      })

      res[1].scrollTop // 显示区域的竖直滚动位置

    })

  },

})

var app = getApp();
Page({
  data: {
    mask_background: false,
    mask_search: false,
    searchMessage: '',
    newSearch: '取消',
    currIndex: 0,
    theCity: '1',//城市选择
    cityName: '武汉市',//城市姓名
    brand_id: '',//商品品牌ID列表
    cataList: [

    ],
    cataItems: [

    ],
    imgUrls: [
      '/images/001.jpg',
      '/images/002.jpg',
      '/images/003.jpg'
    ]
  },
  cityEvent: function () {
    wx.navigateTo({
      url: '../cityChoose/cityChoose',
      success: function (res) {
        // success
      }
    })
  },
  searchEvent: function (event) {
    var that = this;
    this.setData({
      mask_background: true,
      mask_search: true
    })
  },
  selectIndex: function (event) {
    var that = this;
    var index = parseInt(event.currentTarget.dataset.index);
    // console.log(index);
    var data = [];
    app.getCataList(1, function (success) {
      var cataName = success.data.data;
      that.setData({
        cataItems: cataName[index].cat_children
      })
    })

    self = this;
    this.setData({
      currIndex: index
    })
  },
  //商品列表
  goodsEvent: function (e) {
    var that = this;
    var area_id = that.data.theCity;
    var brand_id = e.currentTarget.dataset.brandid;
    // console.log(area_id,brand_id);
    wx.navigateTo({
      url: '../goods_item/goods_item?area_id=' + area_id + '&brand_id=' + JSON.stringify(brand_id),
      success: function (res) {
        // success
      }
    })
  },
  //查询弹出层时间
  retrunEvent: function (event) {
    var that = this;
    that.setData({
      mask_background: false,
      mask_search: false
    })
  },
  searchHandle: function (event) {
    var that = this;
    var message = event.detail.value;
    if (!message.length) {
      that.setData({
        newSearch: '取消'
      })
    } else {
      that.setData({
        newSearch: '搜索'
      })
    }
    that.setData({
      searchMessage: message
    })
  },
  messageEvent: function (event) {
    var that = this;
    var message = that.data.searchMessage;
    console.log(message);
    if (message.length > 0) {

    } else {
      that.setData({
        mask_background: false,
        mask_search: false
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var city = that.data.theCity;
    // console.log(city);
    var itemArray = [
      {
        "pagePath": "",
        "itemUrl": '../../images/jc001.jpg',
        "itemText": '钢材购买预约'
      },
      {
        "pagePath": "",
        "itemUrl": '../../images/sg001.jpg',
        "itemText": '水管购买预约'
      },
      {
        "pagePath": "",
        "itemUrl": '../../images/db001.jpg',
        "itemText": '地板购买预约'
      },
    ]
    var images = [
      {
        imgUrl: '../../images/cata_water.png'
      },
      {
        imgUrl: '../../images/cata_dian.png'
      },
      {
        imgUrl: '../../images/cata_ni.png'
      },
      {
        imgUrl: '../../images/cata_mu.png'
      },
      {
        imgUrl: '../../images/cata_oil.png'
      },
      {
        imgUrl: '../../images/cata_wujin.png'
      },
      {
        imgUrl: '../../images/cata_zhuanqu.png'
      }
    ];
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_shoucang: 0,
    goods_info:[],
    goods_img: [],
    img:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pjDataList: [{ headpic: '../../images/001.jpg', author: '张三', add_time: '2019-11-25', content: '好评好评，真实太好了!' },
    { headpic: '../../images/001.jpg', author: '张三', add_time: '2019-11-29', content: '好评好评，真实太好了!' }
    ],//评价数据
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    wx.request({
      url: 'http://localhost:8092/product/getproductbyid',
      method: 'GET',
      data:{id:id},
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data.productUrl);
        console.log(res.data)
        that.setData({
          goods_info: res.data,
          goods_img: res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })
  },
  buy: function (event){
    let value = event.currentTarget.dataset.value
    console.log("value：" + value)
    wx.request({
      url: 'http://localhost:8092/order/addorder',
      method: 'GET',
      data: { id: value },
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: 'http://localhost:8092/msg/addmsg',
          method: 'POST',
          data: { "msg": "购买成功！" },
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
      },
      fail: function () {
        console.log("fail");
      }

    })
  }
})
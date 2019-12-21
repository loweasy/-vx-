
var app = getApp();
Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    mask_background: false,
    mask_search: false,
    searchMessage: '',
    newSearch: '取消',
    currIndex: 0,
    productList: []
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
  changestatus: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id);
    wx.request({
      url: 'http://localhost:8092/product/updatestatus',
      method: 'POST',
      data:{id:id},
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          productList: res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages();
      }
    })

    wx.request({
      url: 'http://localhost:8092/product/getproduct',
      method: 'GET',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          productList: res.data
        })
      },
      fail: function () {
        console.log("fail");
      }

    })
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj);
    } else {
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    let images = [
      {
        goodId: 0,
        name: '商品1',
        url: 'bill',
        imageurl: '../../images/001.jpg',
        product: '../product/product',
        newprice: "86",
        oldprice: "88",
        discount: "8.8",
        height: 0,
      },
      {
        goodId: 1,
        name: '商品1',
        url: 'bill',
        imageurl: '../../images/001.jpg',
        product: '../product/product',
        newprice: "147.00",
        oldprice: "150.00",
        discount: "8.8",
        height: 0,
      },
      {
        goodId: 2,
        name: '商品1',
        url: 'bill',
        imageurl: '../../images/001.jpg',
        product: '../product/product',
        newprice: "86.00",
        oldprice: "88.00",
        discount: "8.8",
        height: 0,
      },
      {
        goodId: 3,
        name: '商品1',
        url: 'bill',
        imageurl: '../../images/001.jpg',
        product: '../product/product',
        newprice: "97.00",
        oldprice: "99.00",
        discount: "8.8",
        height: 0,
      },
      {
        goodId: 4,
        name: '商品1',
        url: 'bill',
        imageurl: '../../images/001.jpg',
        product: '../product/product',
        newprice: "398.00",
        oldprice: "459.00",
        discount: "8.8",
        height: 0,
      }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }
})
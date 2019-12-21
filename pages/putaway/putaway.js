import util from './../../utils/util.js';
const app = getApp();
Page({
  data: {
    name: '',
    num: '',
    price: '',
    productdescripton: '',
    kindarr: [],
    kindindex: 0,
    brandarr: [],
    brandindex: 0,
    showtab: 0,  //顶部选项卡索引
    showtabtype: '', //选中类型
    showfootertab: 0,  //底部标签页索引
    tabnav: {},  //顶部选项卡数据
    questionsall: [],  //所有问题
    questions: [], //问题列表
    showquestionindex: null, //查看问题索引,
    baseurl: '',
    baseimg: '',
    uploadimgs: [], //上传图片列表  
    editable: false //是否可编辑
  },
  onLoad: function () {
    this.setData({
      uploadimgs: []

    })
  },

  chooseImage: function () {
    let _this = this;
    var imgs = _this.data.uploadimgs;
    console.log(imgs);
    if (imgs.length == 0 || imgs.length == null) {
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              _this.chooseWxImage('album')
            } else if (res.tapIndex == 1) {
              _this.chooseWxImage('camera')
            }
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '上传图片不能大于1张!',
        icon: 'none'
      });

    }
  },
  chooseWxImage: function (type) {
    var base64 = [];
    let _this = this;
    var imgs = _this.data.uploadimgs;
    console.log(imgs);
    if (imgs.length == 0 || imgs.length == null) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: function (res) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              base64.push('data:image/png;base64,' + res.data)
              console.log(base64[0]);
              _this.setData({
                baseurl: base64[0],
                baseimg: res.data
              })
              console.log(_this.data.baseurl);
            }
          })

          console.log(res.tempFilePaths[0]);
          _this.setData({
            uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths[0])
          });
          console.log(_this.data.uploadimgs);
        }
      })
    }
    else {
      wx.showToast({
        title: '上传图片不能大于1张!',
        icon: 'none'
      });
    }
  },
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var valImg = e.currentTarget.dataset;
    console.log(index);
    console.log(valImg);
    const imgs = this.data.uploadimgs
    this.setData({
      uploadimgs: imgs.length == 1 ? [] : imgs.splice(index, 1)
    });
  },
  submitValidate: function (val) {
    var that = this;
    if (that.data.uploadimgs.length == 0) {
      wx.showToast({

        title: '图片不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }
    if (val.productname.length == 0) {

      wx.showToast({

        title: '名称不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    if (val.productnum.length == 0) {

      wx.showToast({

        title: '数量不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    if (val.productprice.length == 0) {

      wx.showToast({

        title: '价格不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    return true;
  },
  productSubmit: function (e) {
    var that = this;
    let formdata = e.detail.value;
    console.log(formdata);
    if (this.submitValidate(formdata)) {

      wx.request({
        url: 'http://localhost:8092/product/addproduct',
        data: {
          file: that.data.baseimg,
          num: formdata.productnum,
          name: formdata.productname,
          price: formdata.productprice,
          desc: formdata.productdescription

        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          wx.showToast({

            title: res.data.message,

            icon: 'loading',

            duration: 1500

          })
        }
      });

    }
  }
})

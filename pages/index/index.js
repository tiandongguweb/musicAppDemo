const db = wx.cloud.database();
const _ = db.command;
const _banners = [{
    id: 1,
    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=71594397,1452765852&fm=27&gp=0.jpg',
    name: "日式浓香盖饭"
  },
  {
    id: 2,
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523954724538&di=bf83d8c7b5114f63d26afbebf5bb8b6e&imgtype=0&src=http%3A%2F%2Ffs01.bokee.net%2Fuserfilespace%2F2013%2F09%2F13%2Fxihegroup19837567.jpg',
    name: "鱼香茄子"
  },
  {
    id: 3,
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523954724534&di=c9dbda0b5defeb2b4b2b2917b87db306&imgtype=0&src=http%3A%2F%2Fp1.ifengimg.com%2Ffck%2F2016_28%2F51c633e132225a7_w638_h325.jpg',
    name: "外卖产品新套装"
  }

]
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: [],
    banners: _banners,
    filterID: 'xiaoliangzuigao',
    scrollDown: false,
    shopData1: [{
      shopUrl: "/imgs/index/icon_1.jpg",
      shopName: "美食"
    }, {
      shopUrl: "/imgs/index/icon_2.jpg",
      shopName: "超市便利"
    }, {
      shopUrl: "/imgs/index/icon_3.jpg",
      shopName: "蔬菜水果"
    }, {
      shopUrl: "/imgs/index/icon_4.jpg",
      shopName: "甜点饮品"
    }],
    shopData2: [{
      shopUrl: "/imgs/index/icon_5.jpg",
      shopName: "新品上市"
    }, {
      shopUrl: "/imgs/index/icon_6.jpg",
      shopName: "专业配送"
    }, {
      shopUrl: "/imgs/index/icon_7.jpg",
      shopName: "果汁饮料"
    }, {
      shopUrl: "/imgs/index/icon_8.jpg",
      shopName: "便捷快餐"
    }],
    shopData3: [{
      shopUrl: "/imgs/index/icon_9.jpg",
      shopName: "新商家"
    }, {
      shopUrl: "/imgs/index/icon_10.jpg",
      shopName: "免费品尝"
    }, {
      shopUrl: "/imgs/index/icon_11.jpg",
      shopName: "浪漫鲜花"
    }, {
      shopUrl: "/imgs/index/icon_12.jpg",
      shopName: "星级服务"
    }],
    shopData4: [{
      shopUrl: "/imgs/index/icon_13.jpg",
      shopName: "饺子馆"
    }, {
      shopUrl: "/imgs/index/icon_14.jpg",
      shopName: "暖胃粉面"
    }, {
      shopUrl: "/imgs/index/icon_15.jpg",
      shopName: "披萨"
    }]

  },
  //获取地址没有申请api暂不支持
  getLocal(latitude, longitude) {
    // let that = this;
    // qqmapsdk.reverseGeocoder({
    //   location: {
    //     latitude: latitude,
    //     longitude: longitude
    //   },
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  getLocation() {
    let that = this;
    wx.getLocation({
      success: function(res) {
        let latitude = res.latitude;
        let longitude = res.longitude;
        let speed = res.speed;
        that.getLocal(latitude, longitude)
      },
      fail() {
        console.log("fail", JSON.stringify(res))
      }
    })
  },
  /**
   * 跳转搜索
   */
  tapSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })

  },

  /**
   * 附近商家
   */
  tapFilter(e) {
    this.setData({
      filterID: e.currentTarget.dataset.id
    })
    let that = this;
    db.collection("shoplist").where({
      shopClass: e.currentTarget.dataset.id
    }).get().then((res) => {
      that.setData({
        shoplist: res.data[0].shoplist
      })
    }).catch((res) => {
      console.log(res);
    })
  },

  onPageScroll(res) {
    if (res.scrollTop >= 100) {
      this.setData({
        scrollDown: true
      })
    }
    if (res.scrollTop < 100) {
      this.setData({
        scrollDown: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    db.collection("shoplist").where({
      shopClass: "xiaoliangzuigao"
    }).get().then((res) => {
      that.setData({
        shoplist: res.data[0].shoplist
      })
    }).catch((res) => {
      console.log(res);
    })
    qqmapsdk = new QQMapWX({

      key: 'XXXX-XXXX-XXXX-XXXX' //这里自己的key秘钥进行填充

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
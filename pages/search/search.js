// pages/search/search.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    shoplist: ""
  },
  flatten(arr) {
    return arr.reduce((result, current) => {
      return result.concat(Array.isArray(current) ? current : flatten(current));
    }, [])
  },
  getsearchdata() {
    if (this.data.value == "" || this.data.value == null) {
      wx.showToast({
        title: '请入店名',
        icon: "none",
        duration: 500
      })
      this.setData({
        shoplist: ""
      })
      return;
    }
    db.collection("shopsearch").get().then((e) => {
      let value = this.data.value;
      let _shoplist = [];
      e.data.forEach(e => {
        if (e.shopname.indexOf(value) != -1) {
          _shoplist.push(e.shoplist)
        }
      })
      let newshop = this.flatten(_shoplist)
      if (newshop == 0) {
        this.setData({
          shoplist: ""
        })
        wx.showToast({
          title: "对不起暂时没有该店铺的信息",
          icon: "none",
          duration: 500
        })
      } else {
        this.setData({
          shoplist: newshop
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  getsearch(e) {
    this.setData({
      value: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
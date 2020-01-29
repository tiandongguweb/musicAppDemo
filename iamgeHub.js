// pages/imageHub/iamgeHub.js
const db = wx.cloud.database();
const _comd = db.command;
const imageHub = db.collection("imageHub")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getTime() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;;
    }
    if (day >= 1 && day <= 9) {
      day = "0" + day;;
    }
    let currentDay = date.getFullYear() + seperator1 + month + seperator1 + day + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentDay;
  },
  addCloudData(id) {
    let that = this;
    if (id == "") {
      wx.showToast({
        title: "请选择图片",
        icon: "none"
      })
      return
    }
    let currentTime = this.getTime();
    let option = {
      time: currentTime,
      author: "gutiandong",
      iamgeUrl: id
    }
    imageHub.add({
      data: option,
      success() {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/imageList/imageList',
        })
      }
    })
  },
  uploadImage(imageUrl) {
    if (imageUrl == "") {
      wx.showToast({
        title: "请选择图片",
        icon: "none"
      })
      return
    }
    let that = this;
    imageUrl.forEach((e) => {
      let cloudPath = Math.random() * 100 + "png"
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: e,
        success(res) {
          that.addCloudData(res.fileID)
        }
      })
    })
  },
  uploadFile() {
    let that = this;
    wx.chooseImage({
      count: 9,
      success(res) {
        that.uploadImage(res.tempFilePaths)
        wx.showLoading({
          title: "正在上传请稍后",
        })
      }
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
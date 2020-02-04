// pages/shop/shop.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname: "",
    defalutClass: "defalutClass",
    addflag: true,
    numobj: {},
    numb: "",
    valueNum: 0,
    topNum: "0rpx",
    classifyIsactive: ["classifyIsactive", "classify", "classify", "classify", "classify", "classify"],
    classify: [],
    isActive: 1,
    gonggao: "",
    guanggao: "",
    shopimage: "/imgs/default.jpg",
    isliking: false,
    shopname: "",
    caidan_list: [
      [
        "     ", [{
          name: "请稍等",
          yuxiao: "请稍等",
          jiage: "请稍等",
          url: "/imgs/default.jpg"
        }]
      ],
      [
        "  ", [{
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          }
        ]
      ],
      [
        "  ", [{
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          }
        ]
      ],
      [
        "  ", [{
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          }
        ]
      ],
      [
        "  ", [{
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          }
        ]
      ],
      [
        "  ", [{
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          },
          {
            name: "请稍等",
            yuxiao: "请稍等",
            jiage: "请稍等",
            url: "/imgs/default.jpg"
          }
        ]
      ]
    ]
  },
  addnum(res) {
    let index = res.currentTarget.dataset.index;
    this.setData({
      parentNum: index,
    })
  },
  removeNum(res) {
    res.currentTarget.dataset.numname;
    if (this.data.numobj[res.currentTarget.dataset.numname] !== undefined && this.data.numobj[res.currentTarget.dataset.numname] !== 0) {
      let index = res.currentTarget.dataset.index;
      let parentArray = this.data.caidan_list[this.data.parentNum];
      let childArray = parentArray[1];
      let itemArray = childArray[index].jiage.replace("￥", "");
      let _numb = --this.data.numb;
      let _valueNum = this.data.valueNum - parseInt(itemArray);
      --this.data.numobj[res.currentTarget.dataset.numname];
      this.setData({
        numb: _numb,
        valueNum: _valueNum
      })
    } else {
      return;
    }

  },
  addNum(res) {
    if (this.data.addflag) {
      this.data.addflag = false;
      let promise = new Promise((resolve, reject) => {
        let index = res.currentTarget.dataset.index;
        let parentArray = this.data.caidan_list[this.data.parentNum];
        let childArray = parentArray[1];
        let itemArray = childArray[index].jiage.replace("￥", "");
        let _numb = ++this.data.numb
        let _valueNum = this.data.valueNum + parseInt(itemArray);
        if (this.data.numobj[res.currentTarget.dataset.numname] == undefined) {
          this.data.numobj[res.currentTarget.dataset.numname] = 1
        } else {
          this.data.numobj[res.currentTarget.dataset.numname] += 1
        }
        this.setData({
          numb: _numb,
          valueNum: _valueNum
        })
        resolve()
      })
      promise.then(() => {
        this.data.addflag = true;
      })
    }
  },
  chooseClassify(res) {
    let index = res.currentTarget.dataset.index;
    let _classifyIsactive = [];
    for (let i = 0; i < this.data.classifyIsactive.length; i++) {
      if (i == index) {
        _classifyIsactive.push("classifyIsactive")
      } else {
        _classifyIsactive.push("classify")
      }
    }
    if (index == 0) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "0",
      })
    } else if (index == 1) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "240rpx",
      })
    } else if (index == 2) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "980rpx",
      })
    } else if (index == 3) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "1880rpx",
      })
    } else if (index == 4) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "2620rpx",
      })
    } else if (index == 5) {
      this.setData({
        classifyIsactive: _classifyIsactive,
        topNum: "3000rpx",
      })
    }

  },
  addActive() {
    let _isActive = ++this.data.isActive;
    this.setData({
      isActive: _isActive
    })
    if (this.data.isActive % 2 == 0) {
      wx.cloud.callFunction({
        name: "upDate",
        data: {
          shopname: this.data.shopname,
          isliking: "true"
        }
      }).then((res) => {
        console.log(this)
      }).catch((res) => {
        console.log(res);
      })
    } else {
      wx.cloud.callFunction({
        name: "upDate",
        data: {
          shopname: this.data.shopname,
          isliking: "false"
        }
      }).then((res) => {}).catch((res) => {
        console.log(res);
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      shopname: options.shopname
    })
    db.collection("shopInfo").where({
        shopname: options.shopname
      })
      .get().then((res) => {
        let data = res.data[0];
        that.setData({
          classify: data.classify,
          shopname: data.shopname,
          defaultSrc: data.image,
          gonggao: data.gonggao,
          guanggao: data.guanggao,
          shopimage: data.image,
          caidan_list: data.caidan_list,
          defalutClass: ""
        })
        if (data.isliking == "true") {
          that.setData({
            isActive: 2
          })
        }
      }).catch(res => {
        console.log(res)
      })
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
    // db.collection("shopInfo").where({
    //   shopname: this.data.shopname
    // }).get().then(res => {
    //   let data = res.data[0];
    //   if (data.isliking == "true") {
    //     this.setData({
    //       isActive: 2
    //     })
    //   }
    // })
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
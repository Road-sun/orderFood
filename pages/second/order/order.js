// pages/second/order/order.js
var order = ['L1', 'L2', 'L3', 'L4']
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    currentTab:'0', 

    tip0: [
    ],


    tip1: [
    ],


    tip2: [
    ],


    tip3: [],
  },


  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ 
      currentTab: e.detail.current ,
    });
  },  
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://m.box-get.com/meal/menu', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          tip0: res.data["1"],
          tip1: res.data["2"],
          tip2: res.data["3"],
          tip3: res.data["4"],
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
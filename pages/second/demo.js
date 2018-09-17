

// pages/second/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '0',

    address: '点击进行定位......',

    userInfo: {},

    movies: [
      { url: '../img/4.jpg' },
      { url: '../img/2.jpg' },
      { url: '../img/3.jpg' },
      { url: '../img/np.jpg' }
    ]
  },


  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
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
  onLoad: function (e) {
    var that = this;
    var add = wx.getStorageSync('address');
    if(add){
      that.setData({
        address: add
      })
    }
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
        })
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
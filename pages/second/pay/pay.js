// pages/second/pay/pay.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listUrl: '',
    isTrue: '',
    isTureColor: 'fail'
  },

  //copy剪切板
  copyTBL: function (e) {
    var self = this;
    var text = this.data.listUrl;
    wx.setClipboardData({
      data: 'https://m.box-get.com/meal/pay?water=' + text,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 500
        })
        wx.getClipboardData({
          success: function (res) {
            // console.log(res.data) // data
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var listUrl = e.listUrl;
    that.setData({
      listUrl: listUrl
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
  onShow: function (e) {
    var that = this;
    var num = this.data.listUrl;
    wx.request({
      url: 'https://m.box-get.com/meal/paid', //仅为示例，并非真实的接口地址
      data: {
        water: num
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data == '1') {
          that.setData({
            isTrue: '已支付',
            isTureColor: 'success',
          })
        }
        else {
          that.setData({
            isTrue: '未支付',
            isTureColor: 'fail',
          })
        }
      }
    })
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
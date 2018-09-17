// pages/second/location/addLoca/addLoca.js
var bmap = require('../../../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    ak: "wWpfDwS9Vh5Vtxq3OfqAjOcQM86Le8ox",
    user: {
      name: '',
      sex: '女士',
      phone: '',
      address: '',
      address2: '',
    },
    sexkind: [{ name: '先生', value: '先生' },
      { name: '女士', value: '女士', checked: 'true' },]
  },
  getName: function (e) {
    this.data.user.name = e.detail.value;
  },
  radioChange: function (e) {
    this.data.user.sex = e.detail.value;
  },
  getPhone: function (e) {
    this.data.user.phone = e.detail.value;
  },
  getAddress: function (e) {
    this.data.user.address2 = e.detail.value;
  },

  submit: function (e) {
    console.log(this.data.user);
    wx.setStorageSync('user', this.data.user);
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;



    /* 获取定位地理位置 */
    // 新建bmap对象     
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度    
      console.log(data);
      //使用wxMarkerData获取数据    
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内
      var addr='user.address'
      that.setData({
        [addr]: wxMarkerData[0].address,
      });    
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });
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
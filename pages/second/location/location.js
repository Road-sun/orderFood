// pages/second/location/location.js
var bmap = require('../../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    ak: "wWpfDwS9Vh5Vtxq3OfqAjOcQM86Le8ox",
    addressInto: [
    ],
  },

  //tiaozhuan
  redirectTo: function () {
    var a = this.data.address;
    wx.reLaunch({
      url: '../demo?add=' + a
    })
    wx.setStorageSync('address', a)
    console.log('同步保存成功');
  },
  //tiaozhuan
  reLaunchTo: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var b = this.data.addressInto[id].address;
    wx.reLaunch({
      url: '../demo?add=' + b
    })
    wx.setStorage({
      key: 'address',
      data: b,
      success: function (res) {
        console.log('异步保存成功')
      }
    })
  },
  //重新定位
  reLocation: function () {
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
      that.setData({
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    // 获取定位地理位置 */
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
      that.setData({
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });


    // //GetUser
    // var user = wx.getStorageSync('user');
    // // console.log(user);
    // var L = this.data.addressInto.length;
    // var into = { id: L, address: user.address2, secondAddress: user.address, name: user.name, sex: user.sex, phone: user.phone }
    // var add ='addressInto['+L+']';
    // that.setData({
    //   [add]:into
    // })
    
    
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
    var user = wx.getStorageSync('user');
    // console.log(user);
    var L = this.data.addressInto.length;
    var into = { id: L, address: user.address2, secondAddress: user.address, name: user.name, sex: user.sex, phone: user.phone }
    var add = 'addressInto[' + L + ']';
    this.setData({
      [add]: into
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
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  //事件处理函数
  onLoad: function () {
    wx.redirectTo({
      url: '../second/demo',
    })
  },
})
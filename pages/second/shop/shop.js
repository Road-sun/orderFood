// pages/second/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopImg: '',

    currentTab: '',

    isChecked: false,

    shop: {},

    toView: '',

    selectFood: [],

    allPrice: 0,

    shopId: 0,

    isHave: false,

    showModalStatus: false,

  },

  // //change-css
  // serviceSelection: function (e) {
  //   this.setData({
  //     isChecked: true
  //   })
  // },




  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  //serviceSelection
  serviceSelection: function (e) {
    var kind = e.currentTarget.dataset.name;
    // console.log(kind)
    this.setData({
      toView: encodeURI(kind).split("%").join("")
    })
  },

  //+++++++

  //列表中计数
  refreshShopAddFoodCount: function (foodId, num) {
    let newShop = this.data.shop;
    // console.log(newShop);
    for (let index in newShop) {
      let foodSort = newShop[index];
      for (let i = 0; i < foodSort.length; ++i) {
        let food = foodSort[i];
        if (food.id == foodId && !(food.count == 0 && num < 0)) {
          food.count += num;
        }
      }
      // console.log(foodSort);
    }
    return newShop;
  },


  //向盒子添加食物
  addFoodToBox: function (item, num) {
    var addFood = this.data.selectFood;
    if (addFood.length == 0) {
      item.count++
      addFood.push(item)
      // console.log("first")
    }
    else {
      let x = 0;
      for (let i = 0; i < addFood.length; i++) {
        if (item.id === addFood[i].id) {
          if (num > 0) {
            addFood[i].count += num
            addFood[i].foodPrice = (item.foodPrice * addFood[i].count).toFixed(2)
            // console.log("有相同，count+1")
            x = 1
            break
          }
          else {
            addFood[i].count += num
            addFood[i].foodPrice = (item.foodPrice * addFood[i].count).toFixed(2)
            // console.log("有相同，count-1")
            if (addFood[i].count == 0) {
              addFood.splice(i, 1)
              // console.log("减到为0，移除该项")
            }
          }

        }
      }
      if (!x) {
        if (num > 0) {
          item.count++
          addFood.push(item)
          // console.log("无相同，填入")
        }
      }
    }
    return addFood
    // console.log(addFood)
  },

  //计算总金额
  caculateAllprice: function (e) {
    var allFood = this.data.selectFood;
    var allprice = 0;
    for (let j = 0; j < allFood.length; j++) {
      allprice += Number(allFood[j].foodPrice)
    }
    this.setData({
      allPrice: allprice.toFixed(2)
    })
    var allprice = this.data.allPrice
    if (allprice == 0) {
      this.setData({
        isHave: false
      })
    }
    else (
      this.setData({
        isHave: true
      })
    )
    
  },


  //列表中添加
  addFoodnum: function (e) {
    var foodId = e.target.dataset.id;
    // console.log(id)
    this.setData({
      shop: this.refreshShopAddFoodCount(foodId, 1)
    })

    //addfood
    var item = e.target.dataset.type;
    this.setData({
      selectFood: this.addFoodToBox(item, 1)
    })

    this.caculateAllprice();
  },

  //列表中减少
  minFoodnum: function (e) {
    var foodId = e.target.dataset.id;
    this.setData({
      shop: this.refreshShopAddFoodCount(foodId, -1)
    })

    //minfood
    var item = e.target.dataset.type;
    if (item.count > 0) {
      this.setData({
        selectFood: this.addFoodToBox(item, -1)
      })
      this.caculateAllprice();
    }
  },


  //盒子数据绑定
  boxDataToList: function (index, id, num) {
    
    let selectFood = this.data.selectFood
    let foodType = selectFood[index].type
    let allFood = this.data.shop
    
    if (num > 0 || (num < 0 && selectFood[index].count > 0)) {
      //box数据处理
      selectFood[index].count += num 
      //list数据处理
      for (let i = 0; i < allFood[foodType].length; i++) {
        if (id == allFood[foodType][i].id) {
          allFood[foodType][i].count += num
          selectFood[index].foodPrice = (allFood[foodType][i].foodPrice * selectFood[index].count).toFixed(2)
        }
      }
      if (!selectFood[index].count) {
        selectFood.splice(index, 1)
      }
      this.setData({
        shop: allFood,
        selectFood: selectFood
      })
      this.caculateAllprice()
    }
  },

  //盒子里增加
  boxAddNumber: function (e) {
    // console.log(this.data.selectFood)
    let index = e.target.dataset.index
    // console.log(item)
    let id = e.target.dataset.id
    this.boxDataToList(index, id, 1) 

  },

  //盒子里减少
  boxMinNumber: function (e) {
    // console.log(this.data.selectFood)
    let index = e.target.dataset.index
    // console.log(item)
    let id = e.target.dataset.id
    this.boxDataToList(index, id, -1)
  },

  //清空box
  emptyBoxData:function(e){
    let emptyData=[]
    let allprice=0
    let newShop=this.data.shop
    for (let index in newShop) {
      let foodSort = newShop[index]
      for (let i = 0; i < foodSort.length; ++i) {
        let food = foodSort[i]
        food.count=0
      }
    }
    this.setData({
      shop:newShop,
      allPrice:allprice,
      selectFood:emptyData
    })  
  },


  //down-box
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 300,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0, //0则不延迟 
      transformOrigin: "left bottom 9.5%",
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(350).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },


  //支付
  payFor: function (e) {
    var that = this

    var user = wx.getStorageSync('user');

    let selectFood = this.data.selectFood
    var mes = {};
    for (let k = 0; k < selectFood.length; k++) {
      let first = "" + selectFood[k].id
      let second = "" + selectFood[k].count
      mes[first] = second
    }

    var shopid = this.data.shopId

    var formId = e.detail.formId

    wx.login({
      success: function (res) {

        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://m.box-get.com/meal/buy', //仅为示例，并非真实的接口地址
            data: {
              username: res.code,
              form_id: formId,
              phone: user.phone,
              seller: shopid,//商家id
              place: user.address2,
              message: mes
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (s) {
              // console.log(res.data)
              wx.navigateTo({
                url: '../pay/pay?listUrl=' + s.data,
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var id = e.dataid;
    var img = e.shopImg;
    that.setData({
      shopImg: 'https://dinner-public-picture.oss-cn-beijing.aliyuncs.com/seller/' + img,
      shopId: id
    })
    wx.request({
      url: 'https://m.box-get.com/meal/seller', //仅为示例，并非真实的接口地址
      data: {
        seller: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          shop: res.data,
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
// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    cartList: []
  },
  addToCart(obj) {
    //先判断一下是加入一个新商品还是旧商品的数量加一
    return new Promise((resolve,reject) => {
      const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid);
      if (oldInfo) {
        oldInfo.count += 1;
        resolve('商品数量+1');
      } else {
        obj.count = 1;
        this.globalData.cartList.push(obj);
        resolve('已加入购物车')
      }

      //购物车回调
      // if (this.addCartCallback) {
      //   this.addCartCallback()
      // }
    })
  }
})

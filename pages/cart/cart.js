// pages/cart/cart.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],
        isAllChecked: false,
        totalPrice: 0,
        count: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        // app.addCartCallback = () => {
        //     this.setData({
        //       cartList: app.globalData.cartList
        //     })
        //     // this.changeData()
        // }
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
        //拿到全局变量中的购物车商品列表
        this.setData({
            cartList: app.globalData.cartList
        });
        //设置标题
        this._changeTitle();
        //页面显示后要重现计算商品的总价和数量
        this._getTotalPrice();
        //一进入页面就要判断全选按钮是不是要全选
        this._allBtnStatus();
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

    },


    // -----------------------事件监听函数---------------------
    
    //单选按钮被点击
    btnClick(event) {
        //改变cartList
        const newCartList = this.data.cartList;
        newCartList.forEach((item) => {
            if(item.iid === event.detail.iid) {
                item.checked = !item.checked;
            }
        });
        this.setData({
            cartList: newCartList
        });
        //判断全选按钮是否应该被选中
        this._allBtnStatus();
        //计算总价格
        this._getTotalPrice();
    },

    //全选按钮被点击
    allBtnClick() {
        //先改变全选按钮的状态
        this.setData({
            isAllChecked: !this.data.isAllChecked
        });
        //然后改变cartList中商品的状态
        const newCartList = this.data.cartList;
        newCartList.forEach((item) => {
            item.checked = this.data.isAllChecked
        });
        this.setData({
            cartList: newCartList
        });
        //计算总价格
        this._getTotalPrice();
    },

    //删除购物车的商品
    deleteGood(event) {
        //改变cartList,即删除其中的商品
        const newCartList = this.data.cartList;
        let goodIndex = 0;
        newCartList.forEach((item,index) => {
            if(item.iid === event.detail.iid) {
                goodIndex = index;
            }
        });
        newCartList.splice(goodIndex,1);
        this.setData({
            cartList: newCartList
        });
        //删除完成后要重新计算总价和总数量
        this._getTotalPrice();
        //删除商品后要重新判断全选按钮的状态
        this._allBtnStatus();
        //如果所有的商品都删除了，全选按钮要变成不被选中的状态
        if(newCartList.length === 0 && this.data.isAllChecked === true) {
            this.setData({
                isAllChecked: false
            })
        };
        //删除完后要改变商品的标题
        this._changeTitle();
    },

    //增加商品数量
    addCount(event) {
        this._addSubCount(event.detail.iid,event.detail.type);
        //重新计算总价
        this._getTotalPrice();
    },

    //减少商品数量
    subCount(event) {
        console.log(event)
        this._addSubCount(event.detail.iid,event.detail.type);
        //重新计算总价
        this._getTotalPrice();
    },

    //----------------------------------------私有函数-----------------------------
    
    //计算总价格和当前选中的商品数
    _getTotalPrice() {
        const cartList = this.data.cartList;
        let sum = 0;
        let count = 0;
        cartList.forEach((item) => {
            if(item.checked === true) {
                sum += item.price * item.count;
                count++;
            }
        });
        this.setData({
            totalPrice: sum,
            count: count
        })
    },

    //判断全选按钮是不是应该被选中
    _allBtnStatus() {
        const isAllChecked = this.data.cartList.find((item) => {
            return item.checked === false;
        });
        if(isAllChecked) {
            this.setData({
                isAllChecked: false
            })
        } else{
            this.setData({
                isAllChecked: true
            })
        };
    },

    //增加减少商品数量
    _addSubCount(iid,type) {
        const newCartList = this.data.cartList;
        newCartList.forEach((item) => {
            if(item.iid === iid) {
                if(type === 'add') {
                    item.count += 1;
                } else {
                    if(item.count === 1) {
                        wx.showToast({
                          title: '该商品不能再减少了',
                          duration: 1000,
                          icon: 'none'
                        })
                    } else{
                        item.count -= 1;
                    }
                }
            }
        });
        this.setData({
            cartList: newCartList
        })
    },

    //改变当前页面顶部导航栏的标题
    _changeTitle() {
        wx.setNavigationBarTitle({
            title: `购物车(${this.data.cartList.length})`
        });
    }
})
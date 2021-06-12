// pages/home/home.js
// const app = getApp();
import {getMultiData,getHomeGoods} from "../../service/home"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        binners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
            'pop': {page: 1, list: []},
            'new': {page: 1, list: []},
            'sell': {page: 1, list: []}
        },
        currentIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getMultiData();
        this._getHomeGoods('pop');
        this._getHomeGoods('new');
        this._getHomeGoods('sell');
        
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

    },

    //------------------网络请求的函数-------------------------
    _getMultiData() {
        getMultiData().then((res) => {
            const multidata = res.data.data;
            this.setData({
                binners: multidata.banner.list,
                recommends: multidata.recommend.list
            })
        })
    },
    _getHomeGoods(type) {
        const page = this.data.goods[type].page + 1;
        getHomeGoods(type,page).then((res) => {
            const list = res.data.data.list;
            const oldList = this.data.goods[type].list;
            oldList.push(...list);
            const typeKey = `goods.${type}.list`;
            const pageKey = `goods.${type}.page`;
            this.setData({
                [typeKey]: oldList,
                [pageKey]: page
            })
        })
    },



    // ------------------事件监听的函数-------------------------
    handleTabcontrolClick(event) {
        const index = event.detail.index;
        this.setData({
            currentIndex: index
        })
    }
})
// pages/home/home.js
// const app = getApp();
import {getMultiData,getHomeGoods} from "../../service/home"
const type = ['pop','new','sell']
Page({

    /**
     * 页面的初始数据
     */
    data: {
        binners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isBacktopShow: false,
        isTabcontrolShow: false,
        tabcontrolToTop: 0
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
        this._getHomeGoods(this.data.currentType);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //tabcontrol和backtop的显示和隐藏
    onPageScroll(options) {
        const backtoptemp = options.scrollTop >= 1000 ? true : false;
        if(backtoptemp !== this.data.isBacktopShow) {
            this.setData({
                isBacktopShow: backtoptemp
            })
        }
        const tabcontroltemp = options.scrollTop >= this.data.tabcontrolToTop ? true : false;
        if(tabcontroltemp !== this.data.isTabcontrolShow) {
            this.setData({
                isTabcontrolShow: tabcontroltemp
            })
        }
    },

    //------------------网络请求的函数-------------------------
    //请求首页的多个数据
    _getMultiData() {
        getMultiData().then((res) => {
            const multidata = res.data.data;
            this.setData({
                binners: multidata.banner.list,
                recommends: multidata.recommend.list
            })
        })
    },
    //请求商品数据
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
    //点击tabcontrol切换到不同的商品
    handleTabcontrolClick(event) {
        const index = event.detail.index;
        this.setData({
            currentType: type[index]
        });
        //重新改变两个tabcontrol的currentIndex
        this.selectComponent('#tab-control1').setData({
            currentIndex: index
        });
        this.selectComponent('#tab-control2').setData({
            currentIndex: index
        })
    },
    //返回顶部按钮点击
    handleBacktop() {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    //推荐图片加载完成后获取tabcontrol距离顶端的距离
    handleRecImgLoad() {
        wx.createSelectorQuery().select('#tab-control1').boundingClientRect(rect => {
            this.setData({
                tabcontrolToTop: rect.top
            })
        }).exec()
    }
})
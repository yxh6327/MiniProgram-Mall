// pages/category/category.js
import {getCategory,getSubcategory,getCategoryDetail} from '../../service/category'
const type = ['pop','sell','news']
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category: [],
        currentIndex: 0,
        subCategory: [],
        titles: ['综合','新品','销量'],
        categoryDetail: {
            'pop': [],
            'sell': [],
            'news': []
        },
        currentType: 'pop',
        idBacktopShow: false,
        topPosition: 0,
        isTabcontrolShow: false,
        toTop: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getCategory();
        this._getSubcategory(3627);
        this._getCategoryDetail(10062603);
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

    // --------------------------网络请求函数----------------------
    //请求左侧的分类数据
    _getCategory() {
        getCategory().then(res => {
            this.setData({
                category: res.data.data.category.list
            })
        })
    },
    //请求右侧的分类数据
    _getSubcategory(maitKey) {
        getSubcategory(maitKey).then((res) => {
            this.setData({
                subCategory: res.data.data.list
            })
        })
    },
    //请求商品数据
    _getCategoryDetail(miniWallkey) {
        const pop = `categoryDetail.pop`;
        const sell = `categoryDetail.sell`;
        const news = `categoryDetail.news`;
        getCategoryDetail(miniWallkey, 'pop').then(res => {
            this.setData({
                [pop]: res.data
            })
        });
        getCategoryDetail(miniWallkey, 'sell').then(res => {
            this.setData({
                [sell]: res.data
            })
        });
        getCategoryDetail(miniWallkey, 'new').then(res => {
            this.setData({
                [news]: res.data
            })
        })
    },

    //---------------------------事件处理函数----------------------
    //左侧分类被点击
    itemClick(event) {   
        const index = event.detail.index;
        this.setData({
            currentIndex: index,
            topPosition: 0,
            isTabcontrolShow: false
        });
        this._getSubcategory(this.data.category[this.data.currentIndex].maitKey);
        this._getCategoryDetail(this.data.category[this.data.currentIndex].miniWallkey);
        
    },
    //tabcontrol被点击
    handleTabcontrolClick(event) {
        console.log(event)
        this.setData({
            currentType: type[event.detail.index]
        });
        this.selectComponent('#category-tabcontrol1').setData({
            currentIndex: event.detail.index
        });
        this.selectComponent('#category-tabcontrol2').setData({
            currentIndex: event.detail.index
        })
    },
    //返回顶部按钮
    handleBacktop() {
        this.setData({
            topPosition: 0
        })
    },
    //监听滚动
    bindscroll(event) {
        const toTop = event.detail.scrollTop;
        // console.log(toTop)
        const temp1 = toTop >= 500 ? true : false;
        const temp2 = toTop >= this.data.toTop ? true : false;
        //处理tabcontrol和backtop的显示和隐藏
        if(temp1 !== this.data.isBacktopShow) {
            this.setData({
                isBacktopShow: temp1
            })
        };
        if(temp2 !== this.data.isTabcontrolShow) {
            this.setData({
                isTabcontrolShow: temp2
            })
        };
    },
    //图片加载完成后
    handleImageLoaded() {
        console.log('111')
        wx.createSelectorQuery().select("#category-tabcontrol1").boundingClientRect(rect => {
            this.setData({
                toTop: Math.abs(rect.top)
            })
        }).exec();
    }
})
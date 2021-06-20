// pages/detail/detail.js
import {getGoodDetail,Goods,Shop,getRecommend} from '../../service/detail'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        iid: '',
        titles: ['商品','参数','评论','推荐'],
        isTabcontrolShow: false,
        topImage: [],
        goods: {},
        shop: {},
        detailImage: [],
        goodParams: [],
        comment: {},
        recommend: [],
        isBacktopShow: false,
        topPosition: 0,
        toTopDistance: [0,0,0,0],
        currentIndex: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            iid: options.iid
        });
        this._getGoodDetail(this.data.iid);
        this._getRecommend();
        
        
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
    onPageScroll(options) {
        
    },


    // ---------------------数据请求的函数----------------------
    //获取商品的详细数据
    _getGoodDetail(iid) {
        getGoodDetail(iid).then(res => {
            const goodData = res.data.result;
            console.log(goodData)
            this.setData({
                topImage: goodData.itemInfo.topImages,
                goods: new Goods(goodData.itemInfo, goodData.columns, goodData.shopInfo.services),
                shop: new Shop(goodData.shopInfo),
                detailImage: goodData.detailInfo.detailImage[0].list,
                goodParams: goodData.itemParams.info.set,
                comment: goodData.rate.list[0]
            });
        });
    },
    //获取推荐数据
    _getRecommend() {
        getRecommend().then(res => {
            this.setData({
                recommend: res.data.data.list
            })
        })
    },  



    // ------------------------事件监听的函数----------------------
    bindscroll(event) {
        const toTop = event.detail.scrollTop;
        const temp = toTop >= 100 ? true : false;
        //处理detail-tabbar和backtop的显示和隐藏
        if(temp !== this.data.isTabcontrolShow) {
            this.setData({
                isTabcontrolShow: temp,
                isBacktopShow: temp
            })
        };
        //滚动到响应的位置时，tabbar切换相应的标题
        for(let i = 0; i < 3; i++) {
            if(this.data.currentIndex !== i) {
                if(toTop+50 >= this.data.toTopDistance[i] && toTop+50 <= this.data.toTopDistance[i+1]) {
                    this.setData({
                        currentIndex: i
                    });
                    const detailTabcontrol = this.selectComponent('.detail-tabcontrol');
                    detailTabcontrol.setData({
                        currentIndex: i
                    })
                }
            }
        };
        if(this.data.currentIndex !== 3) {
            if(toTop+50 >= this.data.toTopDistance[3]) {
                this.setData({
                    currentIndex: 3
                });
                const detailTabcontrol = this.selectComponent('.detail-tabcontrol');
                detailTabcontrol.setData({
                    currentIndex: 3
                })
            }
        }
    },
    //返回顶部按钮点击
    handleBacktop() {
        this.setData({
            topPosition: 0
        })
    },
    //detail-image加载完后获取各模块距离顶部的距离
    imageLoaded() {
        const dis = new Array(4);
        dis[0] = 0;
        wx.createSelectorQuery().select('#good-params').boundingClientRect(rec => {
            dis[1] = rec.top;
        }).exec();
        wx.createSelectorQuery().select('#comment').boundingClientRect(rec => {
            dis[2] = rec.top;
        }).exec();
        wx.createSelectorQuery().select('#recommend').boundingClientRect(rec => {
            dis[3] = rec.top;
        }).exec();
        this.setData({
            toTopDistance: dis
        })
    },
    //点击tabcontrol滚动到相应的位置
    tabcontrolClick(event) {
        const index = event.detail.index;
        this.setData({
            topPosition: this.data.toTopDistance[index]
        })
    }
})
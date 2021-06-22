// pages/cart/childCpns/y-cartlist-item/y-cartlist-item.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartListItem: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isChecked: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //单选按钮点击
        changeBtn(event) {
            //先改变当前的状态
            this.setData({
                isChecked: !this.data.isChecked
            });
            //然后将商品的iid传出去，改变父元素中cartList中的对应商品的checked
            const iid = event.currentTarget.dataset.iid;
            this.triggerEvent("btnClick",{iid},{})
        },

        //删除商品
        deleteGood(event) {
            const iid = event.currentTarget.dataset.iid;
            this.triggerEvent("deleteGood",{iid},{})
        },

        //增加商品数量
        addCount(event) {
            const iid = event.currentTarget.dataset.iid;
            const type = event.currentTarget.dataset.type;
            this.triggerEvent("addCount",{iid,type},{})
        },

        //减少商品数量
        subCount(event) {
            const iid = event.currentTarget.dataset.iid;
            const type = event.currentTarget.dataset.type;
            this.triggerEvent("subCount",{iid,type},{})
        },

        //点击图片进入详情页面
        goDetail(event) {
            const iid = event.currentTarget.dataset.iid;
            wx.navigateTo({
              url: '/pages/detail/detail?iid='+iid,
            })
        }
    }
})

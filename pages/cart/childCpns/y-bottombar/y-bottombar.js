// pages/cart/childCpns/y-bottombar/y-bottombar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isAllChecked: {
            type: Boolean,
            value: false
        },
        totalPrice: {
            type: Number,
            value: 0.00
        },
        count: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //全选按钮被点击
        changeAllBtn() {
            this.triggerEvent("allBtnClick",{},{})
        }
    }
})

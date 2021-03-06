// pages/home/childCpns/y-recommend/y-commend.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        recommends: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        flag: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handelImgLoad() {
            if(!this.data.flag) {
                this.triggerEvent('recImgLoad',{},{});
                this.data.flag = true;
            }
        }
    }
})

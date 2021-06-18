// pages/detail/childCpns/y-detail-image/y-detail-image.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        detailImage: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        count: 0

    },

    /**
     * 组件的方法列表
     */
    methods: {
        imageLoad() {
            this.setData({
                count: this.data.count + 1
            });
            if(this.data.count == this.properties.detailImage.length) {
                this.triggerEvent('imageLoaded',{},{})
            };    
        }
    }
})

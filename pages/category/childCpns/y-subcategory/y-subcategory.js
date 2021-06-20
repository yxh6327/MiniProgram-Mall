// pages/category/childCpns/y-subcategory/y-subcategory.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subCategory: {
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
            if(this.data.count == this.properties.subCategory.length) {
                this.triggerEvent('imageLoaded',{},{});
                //一定要将count重新幅值为0，否则的话下一个分类的距离将不能够被获得
                this.setData({
                    count: 0
                })
            };    
        }
    }
})

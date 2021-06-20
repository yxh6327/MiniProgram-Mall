// pages/category/childCpns/y-category/y-category.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        category: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleCategoryClick(event) {
            const index = event.currentTarget.dataset.index;
            this.setData({
                currentIndex: index
            });
            this.triggerEvent('itemClick',{index},{})
        }

    }
})

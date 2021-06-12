// components/tabcontrol/TabControl.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titles: {
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
        itemclick(event) {
            this.setData({
                currentIndex: event.currentTarget.dataset.index
            })
            this.triggerEvent("itemClick",{
                index: this.data.currentIndex,
                title: this.properties.titles[this.data.currentIndex]},{})
        }
    }
})

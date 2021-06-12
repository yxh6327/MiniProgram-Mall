import request from "./network"

// 请求轮播图和推荐的数据
export function getMultiData() {
  return request({
    "url": "/home/multidata"
  })
}

// 请求商品的数据
export function getHomeGoods(type,page) {
  return request({
    "url": "/home/data",
    "data": {
       "type": type,
       "page": page
    }
  })
}
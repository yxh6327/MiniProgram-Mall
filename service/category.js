import request from "./network"

// 根据的商品的iid请求商品的详细数据
export function getCategory() {
  return request({
    "url": "/category"
  })
}

export function getSubcategory(maitKey) {
    return request({
        "url": "/subcategory",
        "data": {
            "maitKey": maitKey
        }
    })
}

export function getCategoryDetail(miniWallkey, type) {
    return request({
        "url": "/subcategory/detail",
        "data": {
            "miniWallkey": miniWallkey,
            "type": type
        }
    })
}
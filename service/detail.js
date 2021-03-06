import request from "./network"

// 根据的商品的iid请求商品的详细数据
export function getGoodDetail(iid) {
  return request({
    "url": "/detail",
    "data": {
        "iid": iid
     }
  })
}

export function getRecommend() {
  return request({
    "url": "/recommend"
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells > 10000 ? (shopInfo.cSells / 10000).toFixed(2) + '万' : shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
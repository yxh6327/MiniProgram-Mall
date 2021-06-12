export default function request(options) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: "http://152.136.185.210:7878/api/m5" + options.url,
      method: options.method || "GET",
      data: options.data || {},
      success: (res) => {
          resolve(res);
      },
      fail: (err) => {
          reject(err);
      }
    })
  })
}
'use strict'

let ua = navigator.userAgent.toLowerCase()
// console.log(ua);
/*
  app ： 0 - 4 ： '其他','QQ','微信','微博','safari',"QQ浏览器"，“UC”，“百度·”
  device  0 - 2  "none",'android','ios'
*/

let get_device_info = () => {
  if (ua.match('android')) { return 1 }
  else if (ua.match('iphone')) { return 2 }
  else if (ua.match('ipod')) { return 2 }
  else if (ua.match('ipad')) { return 2 }
  else { return 0 }
}
let get_app_info = () => {
  let flag = 0
  if (ua.match('safari')) { flag = 4 }
  if (ua.match('qq')) { flag = 1 }
  if (ua.match('weibo')) { flag = 3 }
  if (ua.match('mqqbrowser')) { flag = 5 }
  if (ua.match('ucbrowser')) { flag = 6 }
  if (ua.match('baidubrowser')) { flag = 7 }
  if (ua.match('crios')) { flag = 8 }
  if (ua.match(/qq/g) && ua.match(/qq/g).length > 1) { flag = 1 }
  if (ua.match('micromessenger')) { flag = 2 }
  // if(ua.match('tbs/') || ua.match('MQQBrowser')){flag = 5}
  return flag
}
let app = get_app_info()
let device = get_device_info()
let isX5 = () => {
  let flag = false
  if (ua.match('tbs') || ua.match('android')) {
    flag = true
  }
  return flag
}
// console.log(app);
let config = {
  device: device,
  app: app,
  X5: isX5(),
  size: {
    w: window.innerWidth,
    h: window.innerHeight
  }
}

export default config

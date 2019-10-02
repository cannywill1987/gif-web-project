import config from "./config";
import _ from "lodash";

export function checkPhoneNum(mobile, countryCode, Toast) {
  if ("in" === countryCode) {
    if (!/^\d{9,12}$/.test(mobile)) {
      if (Toast) {
        Toast.fail(" Nomor handphone tidak valid, harap masukkan kembali");
      }
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 用来做YAPI假数据联调
 * next.config.js devServerProxy 中配置
 * "/mock/": {
      target: "http://testyapi.akulaku.com",
      changeOrigin: true,
    },
 * @param url
 * @param mockPrefix
 * @returns {*}
 */
export function getUrl(url, mockPrefix = config.mockPrefixUrl) {
  if (config.debug === false) {
    return url;
  } else {
    return mockPrefix + url + "".replace(new RegExp("//", "gm"), "/");
  }
}

/**
 * 判断给的图片url是否正确
 * @param srcUrl
 * @returns {*|boolean}
 */
export function isImgUrl(srcUrl) {
  return srcUrl && srcUrl.indexOf("http") !== -1;
}

/**
 * 印度尼西亚手机号生成
 * @returns {string}
 */
export function getRandomInMoble(hideMiddlePart = false) {
  let mobilePrefix = ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"];
  let prefix = mobilePrefix[Math.floor(Math.random() * mobilePrefix.length)];
  let afterfix = Math.floor(Math.random() * 99999999);
  let mobile = prefix + afterfix;
  if (hideMiddlePart === false) {
    return mobile;
  } else {
    return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length - 3);
  }
}

/**
 * 马来西亚
 * @returns {string}
 */
export function getRandomMsMoble(hideMiddlePart = false) {
  let mobilePrefix = ["0"];
  let prefix = mobilePrefix[Math.floor(Math.random() * mobilePrefix.length)];
  let afterfix = Math.floor(Math.random() * 9999999999);
  let mobile = prefix + afterfix;
  if (hideMiddlePart === false) {
    return mobile;
  } else {
    return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length - 3);
  }
}

/**
 * 菲律宾
 * @returns {string}
 */
export function getRandomPhMoble(hideMiddlePart = false) {
  let mobilePrefix = ["09"];
  let prefix = mobilePrefix[Math.floor(Math.random() * mobilePrefix.length)];
  let afterfix = Math.floor(Math.random() * 99999999);
  let mobile = prefix + afterfix;
  if (hideMiddlePart === false) {
    return mobile;
  } else {
    return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length - 3);
  }
}

/**
 * 越南的随机手机号
 * @returns {string}
 */
export function getRandomVnMoble(hideMiddlePart = false) {
  let mobilePrefix = ["0"];
  let prefix = mobilePrefix[Math.floor(Math.random() * mobilePrefix.length)];
  let afterfix = Math.floor(Math.random() * 999999999);
  let mobile = prefix + afterfix;
  if (hideMiddlePart === false) {
    return mobile;
  } else {
    return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length - 3);
  }
}

/**
 * 马来西亚
 */
export function getRandomInMobles(num, hideMiddlePart = false) {
  var mobiles = [];
  for (let i = 0; i < num; i++) {
    mobiles.push(getRandomInMoble(hideMiddlePart));
  }
  return mobiles;
}

/**
 * 马来西亚
 */
export function getRandomMsMobles(num, hideMiddlePart = false) {
  var mobiles = [];
  for (let i = 0; i < num; i++) {
    mobiles.push(getRandomMsMoble(hideMiddlePart));
  }
  return mobiles;
}

/**
 * 越南的随机手机号
 */
export function getRandomPhMobles(num, hideMiddlePart = false) {
  var mobiles = [];
  for (let i = 0; i < num; i++) {
    mobiles.push(getRandomPhMoble(hideMiddlePart));
  }
  return mobiles;
}

/**
 * 越南的随机手机号
 */
export function getRandomVnMobles(num, hideMiddlePart = false) {
  var mobiles = [];
  for (let i = 0; i < num; i++) {
    mobiles.push(getRandomVnMoble(hideMiddlePart));
  }
  return mobiles;
}

export function getRandomMobiles(country, num, hideMiddlePart = false) {
  if ("vi" === country) {
    return getRandomVnMobles(num, hideMiddlePart);
  } else if ("in" === country) {
    return getRandomInMobles(num, hideMiddlePart);
  } else if ("ms" === country) {
    return getRandomMsMobles(num, hideMiddlePart);
  } else {
    return getRandomPhMobles(num, hideMiddlePart);
  }
}

export function getValFromQuery(key = "") {
    if (process.browser === false) return null;
    let url = location.search; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strsSplitted = str.split("&");
        for (let i = 0; i < strsSplitted.length; i++) {
            theRequest[strsSplitted[i].split("=")[0]] = unescape(strsSplitted[i].split("=")[1]);
        }
    }
    return theRequest[key];
}


// 获取cookie
export function getCookie(key, rawCookie) {
    if (process.browser) {
        const name = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } else if(rawCookie) {
        const name = key + "=";
        const ca = rawCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    return "";
}

// 设置cookie,默认是30天
export function setCookie(key, value) {
    if (!process.browser) return true;
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}



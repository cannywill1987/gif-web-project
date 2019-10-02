import fetch from 'isomorphic-fetch'
import axios from "axios"
import qs from "qs";
import http from "./lib/http"

import {getUrl} from "./Utility"
export function getPosts () {
    return fetch('https://jsonplaceholder.typicode.com/posts')
}

export function getPost (slug) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?title=${slug}`)
}
// dwgetDetailListByCid.html
export function getDetailListByCid (params) {
    let url = getUrl(`/gif_detaillist/list.json`);
    console.log(url);
    let obj = http.get(url, {...params});
    return obj;
}

export function getDetailListById (params) {
    let url = getUrl(`/gif_detaillist/item.json`);
    let obj = http.get(url, {...params});
    return obj;
}

// http://localhost:8888/topnews/topnews/dwdincData.html?id=137416&type=4&order=asc
export function incDataById (params) {
    let url = getUrl(`dwdincData.html`);
    let obj = http.get(url, {...params});
    return obj;
}
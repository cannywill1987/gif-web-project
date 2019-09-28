import fetch from 'isomorphic-fetch'
import axios from "axios"
import {getUrl} from "./Utility"
export function getPosts () {
    return fetch('https://jsonplaceholder.typicode.com/posts')
}

export function getPost (slug) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?title=${slug}`)
}

export function getDetailListByCid (params) {
    let url = getUrl(`dwgetDetailListByCid.html?cid=29&page=1&beginId=137412`);
    let obj = axios.get(url, {params: params});
    return obj;
}

export function getDetailListById (params) {
    let url = getUrl(`dwgetDetailListById.html?pid=137413`);
    let obj = axios.get(url, {params: params});
    return obj;
}
import axios from 'axios'
import qs from 'qs'

let http = {
    post: "",
    get: ""
}

http.post = function (api, data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api, params).then((res) => {
            resolve(res);
        }).catch((e)=>{
            reject()
        })
    })
}

http.get = function (api, data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        console.log(api.indexOf("?") !== -1 ? api + params : api + "?" + params)
        axios.get(api.indexOf("?") !== -1 ? api + params : api + "?" + params, data).then((res) => {
            resolve(res);
        }).catch((e)=>{
            reject()
        })
    })
}
export default http;
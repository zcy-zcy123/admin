import axios from 'axios'
import { METHOD } from './url'
import { Message } from 'element-ui'

// 根据环境不同引入不同baseApi地址
import { baseApi } from '../../config/index'
console.log(baseApi)

const axiosRequest = axios.create({
    baseURL: baseApi,
    timeout: 10000,
})

export function request(method, url, params) {
    switch (method) {
        case METHOD.GET:
            return GET(url, params)
        case METHOD.POST:
            return POST(url, params)
        case METHOD.PUT:
            return PUT(url, params)
        case METHOD.DELETE:
            return DELETE(url, params)
    }
}

function GET(url, params) {
    return axiosRequest.get(url, params)
}
function POST(url, params) {
    return axiosRequest.post(url, params)
}
function PUT(url, params) {
    return axiosRequest.put(url, params)
}
function DELETE(url, params) {
    return axiosRequest.delete(url, params)
}


// 请求拦截器
axiosRequest.interceptors.request.use(function (config) {
    // 在发送请求之前
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config;
}, function (error) {
    // 请求错误
    return Promise.reject(error);
});

// 响应拦截器
axiosRequest.interceptors.response.use(function (response) {
    // 响应数据
    if (response.status == 200) {
        return response.data
    } else if (response.status == 201) {
        Message.error(response.data.msg);
        return
    }
    return response
}, function (error) {
    // 响应错误
    Message.error('网络错误');
    return Promise.reject(error);
});
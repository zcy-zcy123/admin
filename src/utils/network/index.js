import { request } from './core'
import { api } from './url'
import { METHOD } from './url'

export default {
    install(Vue) {
        Vue.prototype.$API = this
    },
    login(username, password) { return request(METHOD.POST, api.login + `?username=${username}&password=${password}`) },//登录
    shopList(page) { return request(METHOD.GET, api.shop + `?pageNum=${page}`) },//商品列表
    setStatus(id, status) { return request(METHOD.GET, api.status + `?productId=${id}&status=${status}`) },//商品上架与下架
    setSearch(id) { return request(METHOD.GET, api.search + `?listType=search&pageNum=1&productId=${id}`) },//商品id搜索
    getSearch(name) { return request(METHOD.GET, api.search + `?listType=search&pageNum=1&productName=${name}`) },//商品名称搜索
    detail(id) { return request(METHOD.GET, api.detail + `?productId=${id}`) },//商品详情
    category(id) { return request(METHOD.GET, api.category + `?categoryId=${id}`) },//品级分类
    imgs(upload_file) { return request(METHOD.POST, api.imgs, upload_file) },//上传图片
    setShop(ids, name, title, img, detail, price, num, status, id) { return request(METHOD.GET, api.setShop + `?categoryId=${ids}&name=${name}&subtitle=${title}&subImages=${img}&detail=${detail}&price=${price}&stock=${num}&status=${status}&id=${id}`) },//修改商品
    getShop(ids, name, title, img, detail, price, num, status) { return request(METHOD.GET, api.setShop + `?categoryId=${ids}&name=${name}&subtitle=${title}&subImages=${img}&detail=${detail}&price=${price}&stock=${num}&status=${status}`) },//添加商品
}


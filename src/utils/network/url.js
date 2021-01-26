export const api = {
  login: '/manage/user/login.do',//登录 
  shop: '/manage/product/list.do',//商品列表
  status: '/manage/product/set_sale_status.do',//商品上架与下架
  search: '/manage/product/search.do',//商品搜索
  detail: '/manage/product/detail.do',//商品详情
  category: '/manage/category/get_category.do',//品级分类
  imgs: '/manage/product/upload.do',//上传图片
  setShop: '/manage/product/save.do',//修改商品
}
export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: 'PUT',
  DELETE: 'DELETE',
} 
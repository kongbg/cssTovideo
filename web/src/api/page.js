import request from "@/utils/request";

const urlKey = '/page'

// 新增
export const create = (data, options) => {
  return request({
    url: `${urlKey}/create`,
    method: "post",
    data,
    options
  })
}

// 编辑
export const update = (data, options) => {
  return request({
    url: `${urlKey}/update`,
    method: "post",
    data,
    options
  })
}


// 查询列表
export const getData = (params, options) => {
  return request({
    url: `${urlKey}/getData`,
    method: "get",
    params,
    options
  })
}

// 查询详情
export const getDetails = (params, options) => {
  return request({
    url: `${urlKey}/getDetails`,
    method: "get",
    params,
    options
  })
}

// 删除
export const del = (data, options) => {
  return request({
    url: `${urlKey}/delete`,
    method: "post",
    data,
    options
  })
}

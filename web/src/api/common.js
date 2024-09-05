import request from "@/utils/request";

const urlKey = '/common'
// 新增
export const upload = (data, options) => {
  return request({
    url: `${urlKey}/upload`,
    method: "post",
    data,
    options
  })
}

// 通过模型id提交数据
export const createByModeId = (data, options) => {
  return request({
    url: `${urlKey}/createByModeId`,
    method: "post",
    data,
    options
  })
}

// 通过模型id更新数据
export const updateByModeId = (data, options) => {
  return request({
    url: `${urlKey}/updateByModeId`,
    method: "post",
    data,
    options
  })
}

// 通过模型id获取数据
export const getDataByModeId = (params, options) => {
  return request({
    url: `${urlKey}/getDataByModeId`,
    method: "get",
    params,
    options
  })
}

// // 通过页面id获取数据
// export const getDataByPageId = (data, options) => {
//   return request({
//     url: `/getDataByPageId`,
//     method: "post",
//     data,
//     options
//   })
// }
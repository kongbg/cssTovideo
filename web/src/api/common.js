import request from "@/utils/request";

// 新增
export const upload = (data, options) => {
  return request({
    url: `/upload`,
    method: "post",
    data,
    options
  })
}

// 通过模型id获取数据
export const getDataByModeId = (data, options) => {
  return request({
    url: `/getDataByModeId`,
    method: "post",
    data,
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
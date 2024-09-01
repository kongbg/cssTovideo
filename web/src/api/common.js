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
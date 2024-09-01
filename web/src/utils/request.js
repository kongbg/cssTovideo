import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/token";
import { getType } from "@/utils/index";
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 处理token
    handleToken(config)
    // 处理header
    handleHeader(config)
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    let code = res.data.code;
    if (code == 200) {
      return res.data;
    } else {
      // 处理报错信息
      handleErrorMessage(res)
      return res.data;
    }
  },
  (error) => {
    console.log('响应拦截器:',error)

    handleError(error)
    return error
  }
);

// 处理token
function handleToken(config) {
  // 是否需要设置 token
    const noToken = (config.headers || {}).isToken === false;
    if (getToken() && !noToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
}
// 处理header
function handleHeader(config) {
  config.headers["Content-Type"] = "application/json;charset=utf-8";
}

// 处理提示
function handleErrorMessage(res) {
  let showMsg = res.config?.options?.showMsg;
  let duration = res.config?.options?.duration || 1500;
  let errMsg = res.data.msg;
  // 根据布尔值判断是否提示
  if (getType(showMsg) == 'boolean') {
    if(!(res.config.options.showMsg === false)) {
      ElMessage({ message: errMsg, type: "error", duration });
    }
  }

  // 如是函数，直接执行自定义函数
  if (getType(showMsg) == 'function'){
    showMsg(res.data)
  }
}

// 后端服务直接报错
function handleError(error) {
  let showMsg = error.config?.options?.showMsg;
  let duration = error.config?.options?.duration || 1500;
  let errMsg = error.message;
  // 根据布尔值判断是否提示
  if (getType(showMsg) == 'boolean' || getType(showMsg) == 'undefined' ) {
    if(!(error.config?.options?.showMsg === false)) {
      ElMessage({ message: errMsg, type: "error", duration });
    }
  }

  // 如是函数，直接执行自定义函数
  if (getType(showMsg) == 'function'){
    showMsg(error)
  }
}
export default service;
